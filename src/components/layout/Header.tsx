import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import Button from '../ui/Button'

export interface HeaderSection {
  id: string
  label: string
}

interface HeaderProps {
  sections?: HeaderSection[]
  githubUrl?: string
  ctaTo?: string
  ctaLabel?: string
  brand?: React.ReactNode
}

export default function Header({
  sections = [],
  githubUrl = 'https://github.com/DylanZM/cgo',
  ctaTo = '/app',
  ctaLabel = 'Open App',
  brand,
}: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 h-14 bg-bg/80 backdrop-blur-lg border-b border-border">
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex items-center gap-0.5 text-text shrink-0 font-sans"
      >
        {brand ?? (
          <>
            <img src="/cgo.webp" alt="" className="w-10 h-10 sm:w-14 sm:h-14" />
            <span className="text-base font-semibold tracking-tight leading-none">
              Cgo<span className="text-text-muted animate-blink">_</span>
            </span>
          </>
        )}
      </Link>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
        {sections.map((s) =>
          s.id === 'hero' ? (
            <Link
              key={s.id}
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-3 py-1.5 text-xs text-text-secondary hover:text-text transition-colors font-sans"
            >
              {s.label}
            </Link>
          ) : (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 text-xs text-text-secondary hover:text-text transition-colors font-sans"
            >
              {s.label}
            </a>
          )
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="icon"
          size="sm"
          iconOnly
          as="a"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
        >
          <SiGithub className="w-4 h-4" />
        </Button>

        <Button
          variant="primary"
          size="sm"
          as={Link}
          to={ctaTo}
        >
          {ctaLabel}
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </nav>
  )
}
