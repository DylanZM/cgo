import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface ComboBoxOption {
  value: string
  label: string
}

interface ComboBoxProps {
  options: ComboBoxOption[]
  value: string
  onChange: (value: string) => void
  accent: string
  surface: string
  border: string
  fg: string
  labelColor: string
}

export default function ComboBox({ options, value, onChange, accent, surface, border, fg, labelColor }: ComboBoxProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = options.find((o) => o.value === value)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all duration-150 active:scale-95"
        style={{
          fontFamily: value,
          backgroundColor: surface,
          border: `1px solid ${border}`,
          color: fg,
        }}
      >
        <span className="truncate">{active?.label}</span>
        <ChevronDown className={`w-3 h-3 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} style={{ color: labelColor }} />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 py-1 rounded-lg z-50 overflow-hidden"
          style={{
            backgroundColor: surface,
            border: `1px solid ${border}`,
          }}
        >
          {options.map((opt) => {
            const isActive = opt.value === value
            return (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false) }}
                className="w-full px-3 py-2 text-xs text-left transition-colors duration-100"
                style={{
                  fontFamily: opt.value,
                  backgroundColor: isActive ? accent : 'transparent',
                  color: isActive ? '#fff' : fg,
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = border }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
