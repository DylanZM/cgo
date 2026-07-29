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
      className="group p-6 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-md hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)] hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <span className="text-[10px] tracking-[0.2em] text-[var(--color-text-muted)]">
          {number}
        </span>
        <Icon className="w-5 h-5 text-[var(--color-text-secondary)]" />
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-1">
          {name}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>

      <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
        {detail}
      </p>
    </article>
  )
}
