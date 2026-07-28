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
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
        <Link to="/" className="flex items-center gap-2 text-[var(--color-text)] font-medium text-sm">
          <Code2 className="w-4 h-4 text-[var(--color-accent)]" />
          <span>cgo<span className="text-[var(--color-text-muted)]">_</span></span>
        </Link>

        <div className="flex items-center gap-1">
          <a href="#features" className="hidden sm:block px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
            Features
          </a>
          <Link
            to="/app"
            className="px-3 py-1.5 text-xs font-medium text-[var(--color-text)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md hover:border-[var(--color-border-strong)] transition-colors"
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
