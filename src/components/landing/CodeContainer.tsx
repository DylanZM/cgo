import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import type { CodeTheme, CodeThemeName } from './codeThemes'
import { codeThemes } from './codeThemes'

interface CodeContainerProps {
  filename?: string
  openAppLabel?: string
  openAppTo?: string
  headerExtra?: ReactNode
  footerLeft?: ReactNode
  footerRight?: ReactNode
  theme?: CodeThemeName | CodeTheme
  children: ReactNode
  className?: string
  compact?: boolean
  typewriter?: {
    duration?: number
    steps?: number
  }
}

export default function CodeContainer({
  filename,
  openAppLabel,
  openAppTo = '/app',
  headerExtra,
  footerLeft,
  footerRight,
  theme = 'subtle',
  children,
  className = '',
  compact = false,
  typewriter,
}: CodeContainerProps) {
  const resolvedTheme: CodeTheme =
    typeof theme === 'string' ? codeThemes[theme] : theme

  const padding = compact ? 'p-4' : 'p-6'

  return (
    <div
      className={`border border-border bg-surface overflow-hidden rounded-md ${className}`}
      data-code-theme={typeof theme === 'string' ? theme : 'custom'}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-error transition-transform duration-200 hover:scale-[1.6]" />
          <span className="w-1.5 h-1.5 rounded-full bg-warning transition-transform duration-200 hover:scale-[1.6]" />
          <span className="w-1.5 h-1.5 rounded-full bg-success transition-transform duration-200 hover:scale-[1.6]" />
        </div>
        <div className="flex items-center gap-3">
          {headerExtra}
          {filename && (
            <span className="text-[10px] tracking-0.1em text-text-muted font-mono">
              {filename}
            </span>
          )}
          {openAppLabel && (
            <Link
              to={openAppTo}
              className="text-[10px] text-text-muted hover:text-text transition-colors"
            >
              {openAppLabel}
            </Link>
          )}
        </div>
      </div>

      {typewriter ? (
        <TypewriterContent
          padding={padding}
          themeText={resolvedTheme.text}
          duration={typewriter.duration ?? 4}
          steps={typewriter.steps ?? 140}
        >
          {children}
        </TypewriterContent>
      ) : (
        <div className={`${padding} font-mono text-sm ${resolvedTheme.text}`}>
          {children}
        </div>
      )}

      {(footerLeft || footerRight) && (
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border bg-bg">
          <span className="text-[10px] text-text-muted">
            {footerLeft}
          </span>
          <div className="flex items-center gap-1.5 text-text-muted">
            {footerRight || (
              <>
                <Play className="w-3 h-3" />
                <span className="text-[10px]">Ready</span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

interface TypewriterContentProps {
  children: ReactNode
  padding: string
  themeText: string
  duration: number
  steps: number
}

function TypewriterContent({
  children,
  padding,
  themeText,
  duration,
  steps,
}: TypewriterContentProps) {
  const ref = useRef<HTMLDivElement>(null)
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

  return (
    <div
      ref={ref}
      className={`${padding} font-mono text-sm ${themeText} relative overflow-hidden`}
    >
      <div
        className={start ? 'typewriter-content' : ''}
        style={
          {
            '--typewriter-duration': `${duration}s`,
            '--typewriter-steps': String(steps),
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  )
}
