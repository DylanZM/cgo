import { Code2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[var(--text-secondary)] text-sm">
          <Code2 className="w-4 h-4 text-[var(--accent)]" />
          <span>cgo playground</span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Built with React, Monaco Editor, and g++.
        </p>
      </div>
    </footer>
  )
}
