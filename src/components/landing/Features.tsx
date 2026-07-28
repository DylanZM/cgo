import { Code2, Play, Terminal, History } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'VS Code Editor',
    description: 'Full Monaco editor with syntax highlighting, autocomplete, and error detection for C and C++.',
  },
  {
    icon: Play,
    title: 'Instant Execution',
    description: 'Compile and run your code with a single click or Ctrl+Enter. See results immediately.',
  },
  {
    icon: Terminal,
    title: 'C & C++ Support',
    description: 'Switch between C11 and C++17 standards. Full standard library support.',
  },
  {
    icon: History,
    title: 'Version History',
    description: 'Every execution is saved. Browse, restore, and compare previous versions.',
  },
]

export default function Features() {
  return (
    <section className="px-6 py-24 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
            A minimal environment focused on what matters: writing and running code.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-colors"
            >
              <feature.icon className="w-5 h-5 text-[var(--accent)] mb-4" />
              <h3 className="text-sm font-medium text-[var(--text)] mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
