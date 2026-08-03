const LINES = ['NO LICENSE KEY.', 'NO CLOUD REQUIRED.', 'NO CONTEXT SWITCHING.']

export default function Manifesto() {
  return (
    <section id="manifesto" className="px-6 py-16 border-y border-border bg-surface">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-8 md:gap-x-16">
        {LINES.map((line) => (
          <p
            key={line}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-text tracking-tight leading-tight text-center"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  )
}
