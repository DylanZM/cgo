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
      className="group p-6 border border-border bg-surface rounded-md hover:border-border-strong hover:bg-surface-2 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-[10px] tracking-[0.2em] text-text-muted">
          {number}
        </span>
        <Icon className="w-5 h-5 text-text-secondary" />
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
