import { Link } from 'react-router-dom'
import { Code2, ArrowRight } from 'lucide-react'
import Hero from '../components/landing/Hero'
import Manifesto from '../components/landing/Manifesto'
import Languages from '../components/landing/Languages'
import Features from '../components/landing/Features'
import WhyCgo from '../components/landing/WhyCgo'
import OpenSource from '../components/landing/OpenSource'
import FinalCTA from '../components/landing/FinalCTA'
import Footer from '../components/landing/Footer'
import Github from '../components/icons/Github'

const sections = [
  { id: 'features', label: 'Features' },
  { id: 'languages', label: 'Languages' },
  { id: 'why', label: 'Why cgo' },
]

export default function Landing() {
  return (
    <div className="min-h-dvh flex flex-col">
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
        <Link to="/" className="flex items-center gap-2 text-[var(--color-text)] font-medium text-sm shrink-0">
          <Code2 className="w-4 h-4 text-[var(--color-text-secondary)]" />
          <span>cgo<span className="text-[var(--color-text-muted)]">_</span></span>
        </Link>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <Link
            to="/app"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-[var(--color-text)] bg-[var(--color-text)] rounded-md hover:opacity-90 transition-all"
          >
            <span className="text-[var(--color-bg)]">Open App</span>
            <ArrowRight className="w-3 h-3 text-[var(--color-bg)] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <Hero />
        <Manifesto />
        <Languages />
        <Features />
        <WhyCgo />
        <OpenSource />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
