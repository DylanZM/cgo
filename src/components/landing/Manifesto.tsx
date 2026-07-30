import { useState, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'

const LINES = ['NO LICENSE KEY.', 'NO CLOUD REQUIRED.', 'NO CONTEXT SWITCHING.']

export default function Manifesto() {
  const [idx, setIdx] = useState(0)
  const [ref, isInView] = useInView<HTMLDivElement>()

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LINES.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="manifesto" className="px-6 py-16 border-y border-border bg-surface">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto reveal-up ${isInView ? 'is-visible' : ''}`}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {LINES.map((line) => (
              <div key={line} className="w-full flex-shrink-0 text-center">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-text tracking-tight leading-tight">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
