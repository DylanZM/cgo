import type { CSSProperties, ReactElement } from 'react'
import type { LucideIcon } from 'lucide-react'

interface ReasonCardProps {
  icon: LucideIcon
  title: string
  description: string
  style?: CSSProperties
}

export default function ReasonCard({
  icon: Icon,
  title,
  description,
  style,
}: ReasonCardProps): ReactElement {
  return (
    <article
      style={style}
      className="group p-8 bg-[var(--color-bg)] hover:bg-[var(--color-surface)] transition-colors duration-300 animate-fade-up rounded-md"
    >
      <Icon className="w-5 h-5 text-[var(--color-text-secondary)] mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-base font-medium text-[var(--color-text)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
        {description}
      </p>
    </article>
  )
}
