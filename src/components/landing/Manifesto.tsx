import { useInView } from '../../hooks/useInView'

export default function Manifesto() {
  const lines = [
    { num: '01', text: 'NO LICENSE KEY.' },
    { num: '02', text: 'NO CLOUD REQUIRED.' },
    { num: '03', text: 'NO CONTEXT SWITCHING.' },
  ]
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <section id="manifesto" className="px-6 py-10 border-y border-border bg-surface">
      <div
        ref={ref}
        className="max-w-3xl mx-auto font-mono"
      >
        {lines.map((line, i) => (
          <div
            key={line.num}
            className={`flex items-baseline gap-3 sm:gap-5 py-2 reveal-fade ${isInView ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span className="text-[10px] text-text-muted select-none shrink-0 tabular-nums">
              {line.num}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-text tracking-tight">
              {line.text}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
