import { useInView } from '../../hooks/useInView'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function FinalCTA() {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <section id="cta" className="relative px-6 py-32 border-t border-border overflow-hidden">
      <div
        ref={ref}
        className={`relative max-w-5xl mx-auto text-center reveal-up ${inView ? 'is-visible' : ''}`}
      >
        <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase mb-6">
          Ready when you are.
        </p>

        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-8">
          Your next scratch file
          <br />
          deserves better.
        </h2>

        <Link
          to="/app"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-text text-bg font-medium text-sm transition-all hover:opacity-90 active:scale-[0.97]"
        >
          Open Playground
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
