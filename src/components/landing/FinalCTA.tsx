import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="relative px-6 py-32 border-t border-[var(--border)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[100px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--text-muted)] uppercase mb-6">
          Ready when you are.
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">
          Your next scratch file
          <br />
          <span className="text-[var(--accent)]">deserves better.</span>
        </h2>

        <Link
          to="/app"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent)] text-white font-medium text-sm transition-all hover:brightness-110 active:scale-[0.97]"
        >
          Open Playground
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
