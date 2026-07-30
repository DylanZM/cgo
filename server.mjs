import { writeFileSync, unlinkSync, readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import http from 'node:http'

const PORT = 3001
const TIMEOUT = 5000

function compile(code, stdin) {
  const id = randomUUID()
  const sourceFile = join(tmpdir(), `cgo_${id}.cpp`)
  const binaryFile = join(tmpdir(), `cgo_${id}`)
  const start = performance.now()

  try {
    writeFileSync(sourceFile, code, 'utf-8')

    execSync(`g++ -std=c++17 -o ${binaryFile} ${sourceFile} 2>&1`, {
      timeout: TIMEOUT,
      encoding: 'utf-8',
    })

    let output = ''
    try {
      output = execSync(`${binaryFile}`, {
        input: stdin || '',
        timeout: TIMEOUT,
        encoding: 'utf-8',
        maxBuffer: 1024 * 1024,
      })
    } catch (runErr) {
      return {
        output: runErr.stdout || '',
        error: runErr.stderr || `Process exited with code ${runErr.status}`,
        exitCode: runErr.status || 1,
        time: Math.round(performance.now() - start),
      }
    }

    return {
      output,
      error: '',
      exitCode: 0,
      time: Math.round(performance.now() - start),
    }
  } catch (compileErr) {
    return {
      output: '',
      error: compileErr.stderr || compileErr.message || 'Compilation failed',
      exitCode: compileErr.status || 1,
      time: Math.round(performance.now() - start),
    }
  } finally {
    try { unlinkSync(sourceFile) } catch {}
    try { unlinkSync(binaryFile) } catch {}
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.method === 'POST' && req.url === '/api/compile') {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        const { code, stdin } = JSON.parse(body)
        if (!code) {
          res.writeHead(400, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Missing code' }))
          return
        }
        const result = compile(code, stdin)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Invalid request body' }))
      }
    })
    return
  }

  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ error: 'Not found' }))
})

server.listen(PORT, () => {
  console.log(`CGO compilation server running on http://localhost:${PORT}`)
})
