import type { CompileResponse } from '../types'

export async function compileCode(code: string): Promise<CompileResponse> {
  const res = await fetch('/api/compile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })

  if (!res.ok) {
    return {
      output: '',
      error: `Server error: ${res.status}`,
      exitCode: 1,
      time: 0,
    }
  }

  return res.json()
}
