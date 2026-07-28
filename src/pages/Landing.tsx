import { Link } from 'react-router-dom'
import { Code2 } from 'lucide-react'
import Hero from '../components/landing/Hero'
import Manifesto from '../components/landing/Manifesto'
import Languages from '../components/landing/Languages'
import Features from '../components/landing/Features'
import OpenSource from '../components/landing/OpenSource'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'

export default function Landing() {
  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-[var(--bg)]/80 backdrop-blur-lg border-b border-[var(--border)]">
        <Link to="/" className="flex items-center gap-2 text-[var(--text)] font-medium text-sm">
          <Code2 className="w-4 h-4 text-[var(--accent)]" />
          <span>cgo<span className="text-[var(--text-muted)]">_</span></span>
        </Link>

        <div className="flex items-center gap-1">
          <a href="#features" className="hidden sm:block px-3 py-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
            Features
          </a>
          <Link
            to="/app"
            className="px-3 py-1.5 text-xs font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-md hover:border-[var(--border-strong)] transition-colors"
          >
            Open Playground
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Languages />
        <Features />
        <OpenSource />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
