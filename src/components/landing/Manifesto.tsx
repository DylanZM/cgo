const LINES = ['NO LICENSE KEY.', 'NO CLOUD REQUIRED.', 'NO CONTEXT SWITCHING.']

export default function Manifesto() {
  return (
    <section id="manifesto" className="px-6 py-16 border-y border-border bg-surface">
      <div className="max-w-5xl mx-auto flex justify-center gap-x-8 sm:gap-x-12 md:gap-x-16">
        {LINES.map((line) => (
          <p
            key={line}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-text tracking-tight leading-tight whitespace-nowrap"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
