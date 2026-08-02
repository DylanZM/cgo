import { writeFileSync, unlinkSync, existsSync, readFileSync, statSync, mkdirSync, readdirSync, renameSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'
import { createHash, randomUUID } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join, extname, normalize } from 'node:path'
import http from 'node:http'
import { WebSocketServer } from 'ws'

const PORT = process.env.PORT || 3001
const COMPILE_TIMEOUT = 10000
const PROCESS_TIMEOUT = 30000
const MAX_BODY_SIZE = 256 * 1024          // 256 KB max request body
const MAX_CODE_SIZE = 100 * 1024          // 100 KB max source code
const MAX_CONCURRENT_PROCESSES = 4        // max simultaneous compile/run
const RATE_LIMIT_WINDOW = 60 * 1000       // 60s window
const RATE_LIMIT_MAX = 10                 // max compiles per window per IP
const MAX_WS_CONNECTIONS = 20             // max simultaneous WebSocket clients
const DIST_DIR = new URL('./dist', import.meta.url).pathname
const CACHE_DIR = join(tmpdir(), 'cgo_cache')
const CACHE_MAX_ENTRIES = 64              // max cached binaries
const CACHE_MAX_SIZE = 64 * 1024 * 1024   // 64 MB cache budget

mkdirSync(CACHE_DIR, { recursive: true })

const activeProcesses = new Set()
let activeCompiles = 0
const wsConnections = new Set()

const rateBuckets = new Map()

function getClientIp(req) {
  return req.socket.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW }
  if (now > bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + RATE_LIMIT_WINDOW
  }
  bucket.count += 1
  rateBuckets.set(ip, bucket)

  // Cleanup old buckets occasionally
  if (rateBuckets.size > 1000) {
    for (const [key, value] of rateBuckets) {
      if (now > value.resetAt) rateBuckets.delete(key)
    }
  }

  return bucket.count > RATE_LIMIT_MAX
}

function evictCacheIfNeeded() {
  try {
    const entries = readdirSync(CACHE_DIR).map((name) => {
      const path = join(CACHE_DIR, name)
      const st = statSync(path)
      return { path, size: st.size, mtime: st.mtimeMs }
    })
    let total = entries.reduce((sum, e) => sum + e.size, 0)
    if (entries.length <= CACHE_MAX_ENTRIES && total <= CACHE_MAX_SIZE) return
    entries.sort((a, b) => a.mtime - b.mtime)
    let i = 0
    while (i < entries.length && (entries.length - i > CACHE_MAX_ENTRIES || total > CACHE_MAX_SIZE)) {
      try { unlinkSync(entries[i].path) } catch {}
      total -= entries[i].size
      i++
    }
  } catch {}
}

function compileWithCache(code) {
  const hash = createHash('sha256').update(code).digest('hex')
  const cached = join(CACHE_DIR, hash)

  if (existsSync(cached)) {
    return { binary: cached, fromCache: true }
  }

  const sourceFile = join(tmpdir(), `cgo_${randomUUID()}.cpp`)
  const binaryFile = join(tmpdir(), `cgo_${randomUUID()}`)
  writeFileSync(sourceFile, code, 'utf-8')

  let compileRes
  try {
    compileRes = spawnSync('g++', ['-std=c++17', '-o', binaryFile, sourceFile], {
      timeout: COMPILE_TIMEOUT,
      encoding: 'utf-8',
    })
  } finally {
    try { unlinkSync(sourceFile) } catch {}
  }

  if (compileRes.error) {
    throw new Error(compileRes.error.message)
  }
  if (compileRes.status !== 0) {
    const err = new Error(compileRes.stderr || `g++ exited with code ${compileRes.status}`)
    err.code = compileRes.status
    throw err
  }

  try { renameSync(binaryFile, cached) } catch {
    try { unlinkSync(binaryFile) } catch {}
  }
  evictCacheIfNeeded()
  return { binary: cached, fromCache: false }
}

function applySecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data:",
      "connect-src 'self' ws: wss:",
      "worker-src 'self' blob:",
      "frame-ancestors 'none'",
    ].join('; ')
  )
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
}

function serveStatic(req, res) {
  let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)

  if (pathname === '/' || pathname === '/app') {
    pathname = '/index.html'
  }

  const filePath = normalize(join(DIST_DIR, pathname))

  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  if (!existsSync(filePath)) {
    const indexFile = join(DIST_DIR, 'index.html')
    if (existsSync(indexFile)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(readFileSync(indexFile))
      return
    }
    res.writeHead(404)
    res.end('Not found')
    return
  }

  const stat = statSync(filePath)
  const type = MIME_TYPES[extname(filePath)] || 'application/octet-stream'

  res.writeHead(200, {
    'Content-Type': type,
    'Content-Length': stat.size,
  })
  res.end(readFileSync(filePath))
}

const server = http.createServer((req, res) => {
  applySecurityHeaders(res)

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/api/compile') {
    const ip = getClientIp(req)

    if (isRateLimited(ip)) {
      res.writeHead(429, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Too many requests. Try again later.' }))
      return
    }

    if (activeCompiles >= MAX_CONCURRENT_PROCESSES) {
      res.writeHead(503, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ error: 'Server busy. Try again in a moment.' }))
      return
    }

    let body = ''
    let aborted = false

    req.on('data', (chunk) => {
      if (aborted) return
      body += chunk
      if (body.length > MAX_BODY_SIZE) {
        aborted = true
        res.writeHead(413, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Request body too large' }))
        req.destroy()
      }
    })

    req.on('end', () => {
      if (aborted) return
      try {
        const { code, stdin } = JSON.parse(body)
        if (!code) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Missing code' }))
          return
        }
        if (typeof code !== 'string' || code.length > MAX_CODE_SIZE) {
          res.writeHead(413, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Code too large' }))
          return
        }
        if (stdin && (typeof stdin !== 'string' || stdin.length > MAX_CODE_SIZE)) {
          res.writeHead(413, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Input too large' }))
          return
        }
        activeCompiles += 1
        const result = compile(code, stdin)
        activeCompiles -= 1
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } catch {
        activeCompiles = Math.max(0, activeCompiles - 1)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid request body' }))
      }
    })
    return
  }

  serveStatic(req, res)
})

const wss = new WebSocketServer({ server, path: '/ws' })

wss.on('connection', (ws, req) => {
  if (wsConnections.size >= MAX_WS_CONNECTIONS) {
    ws.close(1013, 'Too many connections')
    return
  }
  wsConnections.add(ws)

  ws.on('close', () => {
    wsConnections.delete(ws)
  })
  let childProcess = null
  let processTimer = null
  let startTime = 0
  let cleanedUp = false
  let stdinBuffer = []

  function close() {
    try { ws.close() } catch {}
  }

  function cleanup() {
    if (cleanedUp) return
    cleanedUp = true
    if (childProcess) {
      try { childProcess.kill() } catch {}
      childProcess = null
    }
    activeProcesses.delete(ws)
    if (processTimer) {
      clearTimeout(processTimer)
      processTimer = null
    }
  }

  function resetTimer() {
    if (processTimer) clearTimeout(processTimer)
    processTimer = setTimeout(() => {
      send('error', 'Process timed out')
      cleanup()
      close()
    }, PROCESS_TIMEOUT)
  }

  const send = (type, data) => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type, data }))
    }
  }

  ws.on('message', (raw) => {
    if (cleanedUp) return

    let msg
    try {
      msg = JSON.parse(raw.toString())
    } catch {
      return
    }

    if (msg.type === 'run') {
      if (typeof msg.code !== 'string' || msg.code.length > MAX_CODE_SIZE) {
        send('error', 'Code too large')
        return
      }

      if (activeProcesses.size >= MAX_CONCURRENT_PROCESSES) {
        send('error', 'Server busy. Try again in a moment.')
        return
      }

      cleanup()
      cleanedUp = false
      activeProcesses.add(ws)
      startTime = performance.now()

      let binaryFile
      try {
        const res = compileWithCache(msg.code)
        binaryFile = res.binary
      } catch (e) {
        send('error', e.stderr || e.message || 'Compilation failed')
        cleanup()
        close()
        return
      }

      resetTimer()

      childProcess = spawn(binaryFile, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
      })

      if (stdinBuffer.length) {
        for (const data of stdinBuffer) {
          childProcess.stdin.write(data)
        }
        stdinBuffer = []
      }

      childProcess.stdout.on('data', (chunk) => {
        send('stdout', chunk.toString())
      })

      childProcess.stderr.on('data', (chunk) => {
        send('stderr', chunk.toString())
      })

      childProcess.on('exit', (exitCode) => {
        if (cleanedUp) return
        if (processTimer) clearTimeout(processTimer)
        send('exit', { code: exitCode, time: Math.round(performance.now() - startTime) })
        cleanup()
        close()
      })
    } else if (msg.type === 'stdin') {
      if (typeof msg.data !== 'string' || msg.data.length > MAX_CODE_SIZE) return
      if (childProcess && childProcess.stdin.writable) {
        childProcess.stdin.write(msg.data)
        resetTimer()
      } else {
        stdinBuffer.push(msg.data)
      }
    }
  })

  ws.on('close', () => {
    cleanup()
  })
})

function compile(code, stdin) {
  const start = performance.now()

  try {
    const { binary } = compileWithCache(code)

    const runRes = spawnSync(binary, [], {
      input: stdin || '',
      timeout: PROCESS_TIMEOUT,
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024,
    })

    if (runRes.error) {
      return {
        output: runRes.stdout || '',
        error: runRes.error.message || `Process exited with code ${runRes.status}`,
        exitCode: runRes.status || 1,
        time: Math.round(performance.now() - start),
      }
    }

    return {
      output: runRes.stdout || '',
      error: runRes.status !== 0 ? runRes.stderr || `Process exited with code ${runRes.status}` : '',
      exitCode: runRes.status || 0,
      time: Math.round(performance.now() - start),
    }
  } catch (compileErr) {
    return {
      output: '',
      error: compileErr.stderr || compileErr.message || 'Compilation failed',
      exitCode: compileErr.code || 1,
      time: Math.round(performance.now() - start),
    }
  }
}

server.listen(PORT, () => {
  console.log(`CGO server on http://localhost:${PORT} (static + HTTP + WebSocket)`)
})
