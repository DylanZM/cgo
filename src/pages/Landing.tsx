import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'
import Hero from '../components/landing/Hero'

export default function Landing() {
  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border)]">
        <Link to="/" className="flex items-center gap-2 text-[var(--text)] font-semibold text-sm">
          <Code2 className="w-5 h-5 text-[var(--accent)]" />
          cgo
        </Link>
        <Link
          to="/app"
          className="px-4 py-2 text-sm font-medium text-[var(--text)] hover:text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-lg transition-colors hover:border-[var(--border-strong)]"
        >
          Open Playground
        </Link>
      </nav>

      <main className="flex-1">
        <Hero />
      </main>
    </div>
  )
}
