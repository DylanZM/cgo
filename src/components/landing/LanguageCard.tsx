import type { CSSProperties, ReactElement } from 'react'
import type { LucideIcon } from 'lucide-react'

interface LanguageCardProps {
  number: string
  icon: LucideIcon
  name: string
  description: string
  detail: string
  style?: CSSProperties
}

export default function LanguageCard({
  number,
  icon: Icon,
  name,
  description,
  detail,
  style,
}: LanguageCardProps): ReactElement {
  return (
    <article
      style={style}
      className="group relative p-6 border border-border bg-surface rounded-md hover:border-border-strong hover:bg-surface-2 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(192,132,252,0.06), transparent 70%)',
        }}
      />
      <div className="flex items-start justify-between mb-6">
        <span className="text-[10px] tracking-[0.2em] text-text-muted">
          {number}
        </span>
        <Icon className="w-5 h-5 text-text-secondary group-hover:text-accent group-hover:scale-110 transition-all duration-300 ease-out" />
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-text mb-1">
          {name}
        </h3>
        <p className="text-sm text-text-secondary">
          {description}
        </p>
      </div>

      <p className="text-[10px] text-text-muted uppercase tracking-wider">
        {detail}
      </p>
    </article>
  )
}
