import type { ReactNode } from 'react'
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
    duration?: string
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

  const typewriterStyle = typewriter
    ? ({
        '--typewriter-duration': typewriter.duration ?? '4s',
        '--typewriter-steps': String(typewriter.steps ?? 120),
      } as React.CSSProperties)
    : undefined

  return (
    <div
      className={`border border-border bg-surface overflow-hidden rounded-md ${className}`}
      data-code-theme={typeof theme === 'string' ? theme : 'custom'}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-error" />
          <span className="w-1.5 h-1.5 rounded-full bg-warning" />
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
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

      <div
        className={`${padding} font-mono text-sm ${resolvedTheme.text} relative ${
          typewriter ? 'typewriter-content' : ''
        }`}
        style={typewriterStyle}
      >
        {children}
        {typewriter && <span className="typewriter-cursor" aria-hidden />}
      </div>

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
