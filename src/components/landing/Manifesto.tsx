export default function Manifesto() {
  const items = [
    'NO LICENSE KEY.',
    'NO CLOUD REQUIRED.',
    'NO CONTEXT SWITCHING.',
  ]

  return (
    <section id="manifesto" className="px-6 py-12 border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {items.map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-6 animate-fade-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-[10px] sm:text-xs font-medium tracking-[0.2em] text-[var(--color-text-secondary)]">
              {item}
            </p>
            {i < items.length - 1 && (
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-[var(--color-text-muted)]" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
