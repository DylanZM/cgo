import type { ReactNode } from 'react'

interface CodeChipProps {
  children: ReactNode
  rotate?: number
  size?: number
  width?: number
  color?: string
  filled?: boolean
}

export default function CodeChip({
  children,
  rotate = 0,
  size = 1,
  width,
  color = 'var(--color-text)',
  filled = false,
}: CodeChipProps) {
  const rotation = rotate === 0 ? '' : rotate > 0 ? `rotate-${rotate}` : `-rotate-${Math.abs(rotate)}`
  const dim = `${size}em`
  const w = width !== undefined ? `${width}em` : dim
  const fontSize = `calc(${Math.max(size, width ?? size)}em * 0.6)`

  return (
    <span
      className={`relative inline-block ${rotation} align-middle mx-0.5`}
      style={{ height: dim, width: w, lineHeight: 1 }}
    >
      <span
        className={`absolute inset-0 ${filled ? 'bg-[var(--color-text)]' : 'bg-[var(--color-surface)]'} border ${filled ? 'border-[var(--color-border-strong)]' : 'border-[var(--color-border)]'} rounded`}
      />
      <span
        className="absolute inset-0 flex items-center justify-center font-mono font-semibold whitespace-nowrap"
        style={{ color: filled ? 'var(--color-bg)' : color, fontSize, lineHeight: 1 }}
      >
        {children}
      </span>
    </span>
  )
}
