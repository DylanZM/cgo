import type { ButtonHTMLAttributes, ElementType, ReactNode } from 'react'
import { Loader } from 'lucide-react'

export type ButtonVariant = 'primary' | 'icon' | 'ghost' | 'outline'
export type ButtonSize = 'xs' | 'sm' | 'md'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  active?: boolean
  iconOnly?: boolean
  children?: ReactNode
  className?: string
  as?: ElementType
}

type ButtonProps = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    [key: string]: unknown
  }

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'h-7 px-2.5 text-xs',
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
}

const iconSizeStyles: Record<ButtonSize, string> = {
  xs: 'w-7 h-7',
  sm: 'w-8 h-8',
  md: 'w-9 h-9',
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-text text-bg hover:opacity-90',
  icon:
    'text-text-secondary hover:text-text hover:bg-surface-2',
  ghost:
    'text-text-secondary hover:text-text hover:bg-surface-2',
  outline:
    'text-text border border-border-strong hover:bg-surface',
}

export default function Button({
  variant = 'icon',
  size = 'sm',
  loading = false,
  active = false,
  iconOnly = false,
  disabled,
  children,
  className = '',
  type,
  as,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading

  const baseLayout = iconOnly
    ? 'inline-flex items-center justify-center rounded-md'
    : 'inline-flex items-center justify-center gap-1.5 rounded-md'
  const dimension = iconOnly ? iconSizeStyles[size] : sizeStyles[size]
  const visual = variantStyles[variant]

  const activeOverlay =
    active && variant !== 'primary'
      ? 'bg-surface-3 text-text'
      : ''

  const disabledStyles =
    isDisabled && variant === 'primary'
      ? 'opacity-40 cursor-not-allowed'
      : ''

  const classes = [
    baseLayout,
    dimension,
    visual,
    activeOverlay,
    disabledStyles,
    'font-medium transition-all active:scale-95',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = loading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : children

  if (as) {
    const Component = as
    const isDisabledLink = isDisabled
    return (
      <Component
        className={classes}
        aria-disabled={isDisabledLink || undefined}
        {...rest}
      >
        {content}
      </Component>
    )
  }

  return (
    <button
      type={type ?? 'button'}
      disabled={isDisabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  )
}
