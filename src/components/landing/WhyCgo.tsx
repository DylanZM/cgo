import { Zap, Code2, Eye, Shield } from 'lucide-react'
import CodeChip from './CodeChip'
import ReasonCard from './ReasonCard'

const reasons = [
  {
    icon: Zap,
    title: 'Instant feedback',
    description: 'No build pipelines, no waiting. Your code compiles the moment you press run.',
  },
  {
    icon: Code2,
    title: 'Real editor',
    description: 'The same Monaco editor that powers VS Code — autocomplete, errors, themes.',
  },
  {
    icon: Eye,
    title: 'See every run',
    description: 'Every execution is preserved. Compare outputs, restore old versions, never lose work.',
  },
  {
    icon: Shield,
    title: 'Your code, your machine',
    description: 'Everything runs locally. No accounts, no telemetry, no data leaving your laptop.',
  },
]

export default function WhyCgo() {
  return (
    <section id="why" className="px-6 py-24 border-t border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 animate-fade-up">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">
            Why cgo
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            A scratchpad built for
            <br />
            <span className="text-[var(--color-text-secondary)]">the way you actually </span>
            <CodeChip rotate={-2} size={1.1} width={2.4}>code</CodeChip>
            <span className="text-[var(--color-text-secondary)]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)] overflow-hidden border border-[var(--color-border)] rounded-md">
          {reasons.map((reason, i) => (
            <ReasonCard
              key={reason.title}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              style={{ animationDelay: `${100 + i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
