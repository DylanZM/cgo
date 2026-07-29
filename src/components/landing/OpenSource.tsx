import { SiGithub } from 'react-icons/si'

export default function OpenSource() {
  return (
    <section id="open-source" className="px-6 py-24 border-t border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-center animate-fade-up">
        <div className="text-6xl font-mono text-[var(--color-text-secondary)] opacity-30">
          {'{ }'}
        </div>

        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-3">
            Free means free
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
            The best tool should not
            <br />
            be another subscription.
          </h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-md">
            Every feature. Every platform. No account and no artificial limits. Inspect the code, report a bug, or build the feature you want next.
          </p>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-2)] transition-colors"
        >
          <SiGithub className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors" />
          <div className="flex flex-col">
            <span className="text-xs text-[var(--color-text-muted)]">github.com/</span>
            <span className="text-sm font-medium text-[var(--color-text)]">View source</span>
          </div>
          <span className="text-[10px] text-[var(--color-text-muted)] ml-2">MIT ↗</span>
        </a>
      </div>
    </section>
  )
}
