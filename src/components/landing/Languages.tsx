import { Cpu, Terminal, Layers } from 'lucide-react'
import CodeChip from './CodeChip'

const languages = [
  {
    number: '01',
    icon: Cpu,
    name: 'C',
    description: 'Low-level memory control',
    detail: 'C11 standard with full stdlib',
  },
  {
    number: '02',
    icon: Terminal,
    name: 'C++',
    description: 'Modern object-oriented',
    detail: 'C++17 standard, STL included',
  },
  {
    number: '03',
    icon: Layers,
    name: 'System',
    description: 'Direct binary execution',
    detail: 'Native g++ 16 on your machine',
  },
]

export default function Languages() {
  return (
    <section id="languages" className="px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">
            One lab. The whole ecosystem.
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            <CodeChip rotate={-3} size={1.1}>C</CodeChip>
            {' '}and{' '}
            <CodeChip rotate={2} size={1.1}>C++</CodeChip>
            {' '}at the core.
            <br />
            <span className="text-[var(--color-text-secondary)]">Everything else <em className="text-[var(--color-text)] not-italic font-semibold">included.</em></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {languages.map((lang, i) => (
            <article
              key={lang.name}
              className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)] hover:-translate-y-1 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${100 + i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-[10px] tracking-[0.2em] text-[var(--color-text-muted)]">
                  {lang.number}
                </span>
                <lang.icon className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-1">
                  {lang.name}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {lang.description}
                </p>
              </div>

              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                {lang.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
