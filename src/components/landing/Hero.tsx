import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] mb-8 uppercase">
            Free. Open source. Yours.
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-[var(--color-text)] mb-6">
            Write C/C++.
            <br />
            <span className="text-[var(--color-accent)]">See it run.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed mb-8">
            A scratchpad that compiles. Real g++ on your machine, the same editor as VS Code, and a history that remembers everything you ran.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] font-medium text-sm transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Start coding
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--color-border-strong)] text-[var(--color-text)] font-medium text-sm hover:bg-[var(--color-surface)] transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="relative mt-8">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[9px] tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
            Live · Editable · Real
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-error)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--color-warning)]" />
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
              </div>
              <Link to="/app" className="text-[10px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                Open full app ↗
              </Link>
            </div>

            <div className="p-6 font-mono text-sm">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-8">
                <div className="space-y-1.5">
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">1</span>
                    <span><span className="text-[var(--color-accent)]">#include</span> <span className="text-[#a5d6ff] italic -rotate-2 inline-block">{'<iostream>'}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">2</span>
                    <span>&nbsp;</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">3</span>
                    <span><span className="text-[var(--color-accent)]">int</span> <span className="text-[#79c0ff] italic rotate-2 inline-block">fibonacci</span>(<span className="text-[var(--color-accent)]">int</span> n) {'{'}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">4</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[var(--color-accent)]">if</span> (n {'<='} <span className="text-[#d19a66] italic -rotate-2 inline-block">1</span>) <span className="text-[var(--color-accent)]">return</span> n;</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">5</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[var(--color-accent)]">return</span> <span className="text-[#79c0ff] italic rotate-1 inline-block">fibonacci</span>(n - <span className="text-[#d19a66] italic -rotate-1 inline-block">1</span>) + <span className="text-[#79c0ff] italic rotate-2 inline-block">fibonacci</span>(n - <span className="text-[#d19a66] italic -rotate-2 inline-block">2</span>);</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">6</span>
                    <span>{'}'}</span>
                  </div>
                </div>

                <div className="hidden md:block w-56 pl-6 border-l border-[var(--color-border)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Output</div>
                  <div className="text-[#a5d6ff] italic -rotate-1 inline-block text-xs leading-relaxed">
                    0 1 1 2 3 5 8 13 21 34
                  </div>
                  <div className="mt-3 text-[10px] text-[var(--color-text-muted)]">12ms</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-bg)]">
              <span className="text-[10px] text-[var(--color-text-muted)]">Press Ctrl+Enter to run</span>
              <div className="flex items-center gap-1.5">
                <Play className="w-3 h-3 text-[var(--color-text-muted)]" />
                <span className="text-[10px] text-[var(--color-text-muted)]">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
