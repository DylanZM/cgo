function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export default function OpenSource() {
  return (
    <section className="px-6 py-24 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-center">
        <div className="text-6xl font-mono text-[var(--accent)] opacity-30">
          {'{ }'}
        </div>

        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase mb-3">
            Free means free
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
            The best tool should not
            <br />
            be another subscription.
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-md">
            Every feature. Every platform. No account and no artificial limits. Inspect the code, report a bug, or build the feature you want next.
          </p>
        </div>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors"
        >
          <Github className="w-5 h-5 text-[var(--text-secondary)]" />
          <div className="flex flex-col">
            <span className="text-xs text-[var(--text-muted)]">github.com/</span>
            <span className="text-sm font-medium text-[var(--text)]">View source</span>
          </div>
          <span className="text-[10px] text-[var(--text-muted)] ml-2">MIT ↗</span>
        </a>
      </div>
    </section>
  )
}
