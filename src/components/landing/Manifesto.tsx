import { useInView } from '../../hooks/useInView'

export default function Manifesto() {
  const lines = [
    { num: '01', text: 'NO LICENSE KEY.', note: 'forever, not a trial' },
    { num: '02', text: 'NO CLOUD REQUIRED.', note: 'compiles on your machine' },
    { num: '03', text: 'NO CONTEXT SWITCHING.', note: 'editor + runner, one tab' },
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
            <span className="text-xs sm:text-sm font-semibold text-text tracking-tight shrink-0">
              {line.text}
            </span>
            <span className="hidden sm:inline flex-1 border-b border-dotted border-border" />
            <span className="text-[10px] text-text-muted italic shrink-0 hidden sm:inline">
              // {line.note}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
