import { useInView } from '../../hooks/useInView'

export default function Manifesto() {
  const lines = ['NO LICENSE KEY.', 'NO CLOUD REQUIRED.', 'NO CONTEXT SWITCHING.']
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <section id="manifesto" className="px-6 py-16 border-y border-border bg-surface">
      <div
        ref={ref}
        className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-4 text-center sm:text-left"
      >
        {lines.map((line, i) => (
          <div
            key={line}
            className={`reveal-up ${isInView ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-text tracking-tight leading-tight">
              {line}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
