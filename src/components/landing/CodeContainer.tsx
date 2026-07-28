import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

interface CodeContainerProps {
  filename?: string
  openAppLabel?: string
  openAppTo?: string
  status?: 'idle' | 'running' | 'ready'
  headerExtra?: ReactNode
  footerLeft?: ReactNode
  footerRight?: ReactNode
  children: ReactNode
  className?: string
}

export default function CodeContainer({
  filename,
  openAppLabel,
  openAppTo = '/app',
  headerExtra,
  footerLeft,
  footerRight,
  children,
  className = '',
}: CodeContainerProps) {
  return (
    <div
      className={`border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-error)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-warning)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
        </div>
        <div className="flex items-center gap-3">
          {headerExtra}
          {filename && (
            <span className="text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] font-mono">
              {filename}
            </span>
          )}
          {openAppLabel && (
            <Link
              to={openAppTo}
              className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {openAppLabel}
            </Link>
          )}
        </div>
      </div>

      <div className="p-6 font-mono text-sm">
        {children}
      </div>

      {(footerLeft || footerRight) && (
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <span className="text-[10px] text-[var(--color-text-muted)]">
            {footerLeft}
          </span>
          <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
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
