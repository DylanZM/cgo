import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'lucide-react'

interface TerminalLine {
  prompt?: string
  text: string
  output?: string
  delay: number
}

interface TerminalProps {
  lines: TerminalLine[]
  startDelay?: number
  className?: string
}

export default function Console({ lines, startDelay = 0, className = '' }: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const [start, setStart] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!start) return

    const timers: ReturnType<typeof setTimeout>[] = []
    let cumulativeDelay = startDelay

    lines.forEach((line, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), cumulativeDelay)
      timers.push(t)
      cumulativeDelay += line.delay
    })

    return () => timers.forEach(clearTimeout)
  }, [start, lines, startDelay])

  return (
    <div
      ref={ref}
      className={`border border-border rounded-md bg-[#0a0e0c] overflow-hidden font-mono text-[12.5px] leading-relaxed ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '100% 28px',
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-bg">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-error" />
          <span className="w-1.5 h-1.5 rounded-full bg-warning" />
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
        </div>
        <div className="flex items-center gap-1.5 text-text-muted text-[10px]">
          <Terminal className="w-3 h-3" />
          <span className="font-medium">zsh — cgo</span>
        </div>
        <div className="w-12" />
      </div>

      <div className="p-4 text-[#c9d1d9]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="mb-1.5 last:mb-0">
            {line.prompt && (
              <div className="flex gap-2 items-start">
                <span className="text-accent shrink-0">{line.prompt}</span>
                <span className="text-[#79c0ff]">{line.text}</span>
              </div>
            )}
            {!line.prompt && (
              <div className="text-[#8b949e] pl-0">{line.text}</div>
            )}
            {line.output && (
              <div className="text-[#8b949e] mt-0.5 pl-0">{line.output}</div>
            )}
          </div>
        ))}
        {start && visibleCount === lines.length && (
          <div className="flex gap-2 items-center mt-2">
            <span className="text-accent">~/cgo</span>
            <span className="text-text-muted">$</span>
            <span className="inline-block w-1.5 h-3 bg-text animate-blink" />
          </div>
        )}
      </div>
    </div>
  )
}
