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
    <article className="group relative p-6 border border-border bg-surface rounded-md hover:border-border-strong hover:bg-surface-2 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, rgba(192,132,252,0.06), transparent 70%)',
        }}
      />
      <Icon className="w-5 h-5 text-text-secondary mb-4 group-hover:scale-110 group-hover:text-accent transition-all duration-300 ease-out" />
      <h3 className="text-base font-medium text-text mb-2">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </article>
  )
}
