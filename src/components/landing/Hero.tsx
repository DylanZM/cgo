import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import Github from '../icons/Github'

export default function Hero() {
  return (
    <section id="hero" className="relative px-6 pt-12 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] mb-8 uppercase animate-fade-down">
            Free. Open source. Yours.
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-[var(--color-text)] mb-6 inline-block w-full animate-fade-up delay-100">
            Write{' '}
            <span className="relative inline-block -rotate-3 align-middle mx-1 animate-float">
              <span className="absolute inset-0 aspect-square h-[0.85em] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md" />
              <code className="relative font-mono text-[0.85em] not-italic font-semibold text-[var(--color-text)] inline-flex items-center justify-center aspect-square h-[0.85em]">C</code>
            </span>
            <span className="text-[var(--color-text)]">/</span>
            <span className="relative inline-block rotate-2 align-middle mx-1 animate-float delay-200">
              <span className="absolute inset-0 aspect-square h-[0.85em] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md" />
              <code className="relative font-mono text-[0.85em] not-italic font-semibold text-[var(--color-text)] inline-flex items-center justify-center aspect-square h-[0.85em]">C++</code>
            </span>
            <span className="text-[var(--color-text)]">.</span>
            <br />
            <span className="text-[var(--color-text-secondary)]">See it </span>
            <span className="relative inline-block -rotate-2 align-middle mx-1 animate-float delay-300">
              <span className="absolute inset-0 aspect-square h-[0.85em] bg-[var(--color-text)] border border-[var(--color-border-strong)] rounded-md" />
              <code className="relative font-mono text-[0.85em] not-italic font-bold text-[var(--color-bg)] inline-flex items-center justify-center aspect-square h-[0.85em]">▶</code>
            </span>
            <span className="text-[var(--color-text-secondary)]">.</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed mb-8 animate-fade-up delay-200">
            A scratchpad that compiles. Real{' '}
            <span className="relative inline-block rotate-1 align-middle mx-1">
              <span className="absolute inset-0 aspect-square h-[1em] bg-[var(--color-surface)] border border-[var(--color-border)] rounded" />
              <code className="relative font-mono text-[0.7em] not-italic font-semibold text-[var(--color-text)] inline-flex items-center justify-center aspect-square h-[1em]">g++</code>
            </span>
            {' '}on your machine, the same editor as VS Code, and a history that remembers everything you ran.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-300">
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

        <div className="relative mt-8 animate-fade-up delay-400">
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
                    <span><span className="text-[var(--color-text-secondary)]">#include</span> <span className="text-[#a5d6ff]">{'<iostream>'}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">2</span>
                    <span>&nbsp;</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">3</span>
                    <span><span className="text-[var(--color-text-secondary)]">int</span> <span className="text-[var(--color-text)]">fibonacci</span>(<span className="text-[var(--color-text-secondary)]">int</span> n) {'{'}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">4</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[var(--color-text-secondary)]">if</span> (n {'<='} <span className="relative inline-block rotate-3 align-middle mx-0.5"><span className="absolute inset-0 aspect-square h-[1em] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded" /><code className="relative font-mono text-[0.75em] not-italic font-semibold text-[#d19a66] inline-flex items-center justify-center aspect-square h-[1em] w-[0.7em]">1</code></span>) <span className="text-[var(--color-text-secondary)]">return</span> n;</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">5</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[var(--color-text-secondary)]">return</span> <span className="text-[var(--color-text)]">fibonacci</span>(n - <span className="relative inline-block -rotate-2 align-middle mx-0.5"><span className="absolute inset-0 aspect-square h-[1em] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded" /><code className="relative font-mono text-[0.75em] not-italic font-semibold text-[#d19a66] inline-flex items-center justify-center aspect-square h-[1em] w-[0.7em]">1</code></span>) + <span className="text-[var(--color-text)]">fibonacci</span>(n - <span className="relative inline-block rotate-2 align-middle mx-0.5"><span className="absolute inset-0 aspect-square h-[1em] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded" /><code className="relative font-mono text-[0.75em] not-italic font-semibold text-[#d19a66] inline-flex items-center justify-center aspect-square h-[1em] w-[0.7em]">2</code></span>);</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[var(--color-text-muted)] select-none w-6 text-right">6</span>
                    <span>{'}'}</span>
                  </div>
                </div>

                <div className="hidden md:block w-56 pl-6 border-l border-[var(--color-border)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Output</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[0, 1, 1, 2, 3, 5, 8, 13, 21, 34].map((n, i) => (
                      <span key={i} className={`relative inline-block ${i % 2 === 0 ? '-rotate-3' : 'rotate-2'} align-middle`}>
                        <span className="absolute inset-0 aspect-square h-[1.4em] w-[1.4em] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded" />
                        <code className="relative font-mono text-[0.7em] not-italic font-semibold text-[#a5d6ff] inline-flex items-center justify-center aspect-square h-[1.4em] w-[1.4em]">{n}</code>
                      </span>
                    ))}
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
