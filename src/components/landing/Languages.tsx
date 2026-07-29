import { Cpu, Terminal, Layers } from 'lucide-react'
import LanguageCard from './LanguageCard'
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
            <CodeChip rotate={2} size={1.1} width={1.7}>C++</CodeChip>
            {' '}at the core.
            <br />
            <span className="text-[var(--color-text-secondary)]">Everything else <em className="text-[var(--color-text)] not-italic font-semibold">included.</em></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {languages.map((lang, i) => (
            <LanguageCard
              key={lang.name}
              number={lang.number}
              icon={lang.icon}
              name={lang.name}
              description={lang.description}
              detail={lang.detail}
              style={{ animationDelay: `${100 + i * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
