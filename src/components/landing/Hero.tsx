import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.03] blur-[120px]" />
      </div>

      <div className="relative flex flex-col items-center gap-8 max-w-2xl">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text-secondary)]">
          <Zap className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span>Free and open source</span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[var(--text)] leading-[1.1]">
          Write C/C++.
          <br />
          <span className="text-[var(--accent)]">See it run.</span>
        </h1>

        <p className="text-lg text-[var(--text-secondary)] max-w-md leading-relaxed">
          A scratchpad that answers back. Compile and execute C and C++ code instantly in your browser.
        </p>

        <Link
          to="/app"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium text-sm transition-all hover:brightness-110 active:scale-[0.98]"
        >
          Start coding
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div className="flex items-center gap-6 mt-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
            No signup required
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
            Runs locally
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
            C &amp; C++
          </span>
        </div>
      </div>
    </section>
  )
}
