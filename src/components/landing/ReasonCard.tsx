import type { ReactElement } from 'react'
import type { LucideIcon } from 'lucide-react'

interface ReasonCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function ReasonCard({
  icon: Icon,
  title,
  description,
}: ReasonCardProps): ReactElement {
  return (
    <article className="group p-6 border border-[var(--color-border)] bg-[var(--color-surface)] rounded-md hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-2)] hover:-translate-y-1 transition-all duration-300">
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
