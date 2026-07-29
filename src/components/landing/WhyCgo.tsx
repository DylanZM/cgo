import { useInView } from '../../hooks/useInView'
import CodeChip from './CodeChip'

const reasons = [
  {
    command: 'cgo run',
    title: 'Instant feedback',
    description: 'No build pipelines, no waiting. Your code compiles the moment you press run.',
  },
  {
    command: 'cgo edit',
    title: 'Real editor',
    description: 'The same Monaco editor that powers VS Code — autocomplete, errors, themes.',
  },
  {
    command: 'cgo log',
    title: 'See every run',
    description: 'Every execution is preserved. Compare outputs, restore old versions, never lose work.',
  },
  {
    command: 'cgo local',
    title: 'Your code, your machine',
    description: 'Everything runs locally. No accounts, no telemetry, no data leaving your laptop.',
  },
]

export default function WhyCgo() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>()
  const [listRef, listInView] = useInView<HTMLDivElement>()

  return (
    <section id="why" className="px-6 py-24 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div
          ref={headerRef}
          className={`mb-16 reveal-up ${headerInView ? 'is-visible' : ''}`}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase mb-4">
            Why cgo
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            A scratchpad built for
            <br />
            <span className="text-text-secondary">the way you actually </span>
            <CodeChip rotate={-2} size={1.1} width={2.4}>code</CodeChip>
            <span className="text-text-secondary">.</span>
          </h2>
        </div>

        <div ref={listRef} className="font-mono">
          {reasons.map((reason, i) => (
            <div
              key={reason.command}
              className={`group flex items-baseline gap-4 sm:gap-6 py-4 border-b border-border last:border-b-0 reveal-fade ${listInView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-[10px] text-text-muted select-none tabular-nums shrink-0 w-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-semibold text-accent shrink-0">
                {reason.command}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-text mb-1 font-sans group-hover:text-text transition-colors">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-sans">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
