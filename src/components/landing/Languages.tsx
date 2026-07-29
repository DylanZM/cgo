import { useInView } from '../../hooks/useInView'
import CodeChip from './CodeChip'

const languages = [
  {
    ext: '.c',
    name: 'C',
    description: 'Low-level memory control',
    detail: 'C11 standard with full stdlib',
  },
  {
    ext: '.cpp',
    name: 'C++',
    description: 'Modern object-oriented',
    detail: 'C++17 standard, STL included',
  },
  {
    ext: '.bin',
    name: 'System',
    description: 'Direct binary execution',
    detail: 'Native g++ 16 on your machine',
  },
]

export default function Languages() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>()
  const [listRef, listInView] = useInView<HTMLDivElement>()

  return (
    <section id="languages" className="px-6 py-24 border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div
          ref={headerRef}
          className={`mb-12 reveal-up ${headerInView ? 'is-visible' : ''}`}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase mb-4">
            One lab. The whole ecosystem.
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            <CodeChip rotate={-3} size={1.1}>C</CodeChip>
            {' '}and{' '}
            <CodeChip rotate={2} size={1.1} width={1.7}>C++</CodeChip>
            {' '}at the core.
            <br />
            <span className="text-text-secondary">Everything else <em className="text-text not-italic font-semibold">included.</em></span>
          </h2>
        </div>

        <div ref={listRef} className="font-mono">
          {languages.map((lang, i) => (
            <div
              key={lang.name}
              className={`group flex items-baseline gap-4 sm:gap-6 py-4 border-b border-border last:border-b-0 reveal-fade ${listInView ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-[10px] text-text-muted select-none tabular-nums shrink-0 w-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base font-semibold text-accent shrink-0 w-12 sm:w-14">
                {lang.ext}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-text mb-1 font-sans group-hover:text-text transition-colors">
                  {lang.name}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary font-sans">
                  {lang.description}
                </p>
              </div>
              <span className="hidden md:inline text-[10px] text-text-muted italic shrink-0 max-w-[180px] text-right">
                // {lang.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
