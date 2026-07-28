const features = [
  {
    number: '01',
    overline: 'NATIVE COMPILATION',
    title: 'Compile and run.',
    span: 'In real time.',
    description: 'Write C or C++ code and watch it compile with g++ 16. Output streams as the binary executes, errors highlight the exact line that broke.',
    code: [
      { line: 1, content: <><span className="text-[var(--color-accent)]">int</span> main() {'{'}</>, time: '' },
      { line: 2, content: <>&nbsp;&nbsp;std::cout {'<<'} <span className="text-[#a5d6ff] italic -rotate-2 inline-block">"Hello"</span>;</>, time: '0.2 ms' },
      { line: 3, content: <>&nbsp;&nbsp;<span className="text-[var(--color-accent)]">return</span> <span className="text-[#d19a66] italic rotate-2 inline-block">0</span>;</>, time: '' },
      { line: 4, content: <>{'}'}</>, time: '' },
    ],
    output: 'Hello',
  },
  {
    number: '02',
    overline: 'VERSION HISTORY',
    title: 'Every run is',
    span: 'a snapshot.',
    description: 'Forget losing code. Every execution is saved with the exact code, language, and output. Restore any version with a single click.',
    code: [
      { line: 1, content: <><span className="text-[var(--color-accent)]">const</span> prices = [<span className="text-[#d19a66] italic -rotate-2 inline-block">12</span>, <span className="text-[#d19a66] italic rotate-2 inline-block">19</span>, <span className="text-[#d19a66] italic -rotate-1 inline-block">8</span>];</>, time: '' },
      { line: 2, content: <>prices.<span className="text-[#79c0ff] italic rotate-2 inline-block">map</span>(n {'=>'} n * <span className="text-[#d19a66] italic -rotate-2 inline-block">1.21</span>);</>, time: '[14.52, 22.99, 9.68]' },
      { line: 3, content: <></>, time: '' },
    ],
    output: '3 versions saved',
  },
  {
    number: '03',
    overline: 'PERSONALIZATION',
    title: 'Your space,',
    span: 'your way.',
    description: 'Nine editor themes, two font families, full control over minimap, ligatures, and line numbers. Every preference persists across sessions.',
    code: [
      { line: 1, content: <><span className="text-[var(--color-text-muted)]">// theme: Tokyo Night</span></>, time: '' },
      { line: 2, content: <><span className="text-[var(--color-text-muted)]">// font: JetBrains Mono</span></>, time: '' },
      { line: 3, content: <><span className="text-[var(--color-text-muted)]">// size: 14px</span></>, time: '' },
    ],
    output: 'Settings saved',
  },
]

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 border-t border-[var(--color-border)]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-4">
            The distance between idea and answer: zero.
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            A lab for code
            <br />
            <span className="text-[var(--color-text-secondary)]">that is not a project <em className="text-[var(--color-accent)] not-italic font-semibold">yet.</em></span>
          </h2>
        </div>

        <div className="space-y-20">
          {features.map((feature) => (
            <article key={feature.number} className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium tracking-[0.2em] text-[var(--color-accent)]">
                    {feature.number}
                  </span>
                  <span className="h-px flex-1 bg-[var(--color-border)]" />
                </div>

                <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] uppercase mb-3">
                  {feature.overline}
                </p>

                <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
                  {feature.title}
                  <br />
                  <span className="text-[var(--color-text-secondary)]">{feature.span}</span>
                </h3>

                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--color-border)]">
                  <span className="text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] font-mono">
                    experiment.{feature.number === '01' ? 'cpp' : feature.number === '02' ? 'cpp' : 'cpp'}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-[var(--color-text-muted)] uppercase">
                    Auto-run
                  </span>
                </div>

                <div className="p-4 font-mono text-xs">
                  <ol className="space-y-1">
                    {feature.code.map((item) => (
                      <li key={item.line} className="flex items-start gap-3 group">
                        <span className="text-[var(--color-text-muted)] select-none w-4 text-right">
                          {item.line}
                        </span>
                        <span className="flex-1 text-[var(--color-text)]">{item.content}</span>
                        {item.time && (
                          <span className="text-[var(--color-text-muted)] text-[10px] shrink-0">
                            {item.time}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="px-4 py-2.5 border-t border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-between">
                  <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                    stdout
                  </span>
                  <span className="text-xs font-mono text-[#a5d6ff] italic -rotate-1 inline-block">
                    {feature.output}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
