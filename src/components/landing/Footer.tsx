import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="px-6 py-6 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
          <img src="/cgo.webp" alt="" className="w-6 h-6" />
          <span className="text-sm">cgo<span className="text-[var(--color-text-muted)]">_</span></span>
        </Link>

        <p className="text-xs text-[var(--color-text-muted)]">
          Built with React, Monaco Editor, and g++.
        </p>

        <div className="flex items-center gap-4">
          <Link to="/app" className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
            Web app
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
