import { useInView } from '../../hooks/useInView'
import { SiGithub } from 'react-icons/si'

export default function OpenSource() {
  const [bracketRef, bracketInView] = useInView<HTMLDivElement>()
  const [textRef, textInView] = useInView<HTMLDivElement>()
  const [buttonRef, buttonInView] = useInView<HTMLAnchorElement>()

  return (
    <section id="open-source" className="px-6 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
        <div
          ref={bracketRef}
          className={`text-6xl font-mono text-text-secondary opacity-30 reveal-scale ${bracketInView ? 'is-visible' : ''}`}
        >
          {'{ }'}
        </div>

        <div
          ref={textRef}
          className={`reveal-up ${textInView ? 'is-visible' : ''}`}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase mb-3">
            Free means free
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
            The best tool should not
            <br />
            be another subscription.
          </h2>
          <p className="text-text-secondary leading-relaxed max-w-md">
            Every feature. Every platform. No account and no artificial limits. Inspect the code, report a bug, or build the feature you want next.
          </p>
        </div>

        <a
          ref={buttonRef}
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-3 px-4 py-3 rounded-lg border border-border-strong bg-surface hover:bg-surface-2 transition-all reveal-up ${buttonInView ? 'is-visible' : ''}`}
          style={{ transitionDelay: '200ms' }}
        >
          <SiGithub className="w-5 h-5 text-text-secondary group-hover:text-text transition-colors" />
          <div className="flex flex-col">
            <span className="text-xs text-text-muted">github.com/</span>
            <span className="text-sm font-medium text-text">View source</span>
          </div>
          <span className="text-[10px] text-text-muted ml-2">MIT ↗</span>
        </a>
      </div>
    </section>
  )
}
