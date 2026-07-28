import { Zap, Code2, Eye, Shield } from 'lucide-react'

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
        <div className="mb-16">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">
            Why cgo
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            A scratchpad built for
            <br />
            <span className="text-[var(--color-text-secondary)]">the way you actually <code className="font-mono text-[0.85em] italic -rotate-2 inline-block px-2 py-0.5 mx-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] not-italic font-medium">code</code>.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--color-border)] rounded-xl overflow-hidden border border-[var(--color-border)]">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="group p-8 bg-[var(--color-bg)] hover:bg-[var(--color-surface)] transition-colors"
            >
              <reason.icon className="w-5 h-5 text-[var(--color-text-secondary)] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-base font-medium text-[var(--color-text)] mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
