import { useInView } from '../../hooks/useInView'
import CodeChip from './CodeChip'
import CodeContainer from './CodeContainer'
import { codeThemes } from './codeThemes'

const t = codeThemes.github

const features = [
  {
    number: '01',
    overline: 'NATIVE COMPILATION',
    title: 'Compile and run.',
    span: 'In real time.',
    description:
      'Write C or C++ code and watch it compile with g++ 16. Output streams as the binary executes, errors highlight the exact line that broke.',
    code: [
      {
        line: 1,
        content: (
          <>
            <span className={t.keyword}>int</span> main() {'{'}
          </>
        ),
        time: '',
      },
      {
        line: 2,
        content: (
          <>
            &nbsp;&nbsp;std::cout {'<<'} <span className={t.string}>"Hello"</span>;
          </>
        ),
        time: '0.2 ms',
      },
      {
        line: 3,
        content: (
          <>
            &nbsp;&nbsp;<span className={t.keyword}>return</span> <span className={t.number}>0</span>;
          </>
        ),
        time: '',
      },
      {
        line: 4,
        content: <>{'}'}</>,
        time: '',
      },
    ],
    output: 'Hello',
  },
  {
    number: '02',
    overline: 'VERSION HISTORY',
    title: 'Every run is',
    span: 'a snapshot.',
    description:
      'Forget losing code. Every execution is saved with the exact code, language, and output. Restore any version with a single click.',
    code: [
      {
        line: 1,
        content: (
          <>
            <span className={t.keyword}>auto</span> start ={' '}
            <span className={t.fn}>std::chrono::now</span>();
          </>
        ),
        time: '',
      },
      {
        line: 2,
        content: (
          <>
            <span className={t.fn}>process</span>(code, lang, output);{' '}
            <span className={t.comment}>// run</span>
          </>
        ),
        time: '124 ms',
      },
      {
        line: 3,
        content: (
          <>
            <span className={t.fn}>save_snapshot</span>(start, output);{' '}
            <span className={t.comment}>// store</span>
          </>
        ),
        time: '',
      },
    ],
    output: '3 versions saved',
  },
  {
    number: '03',
    overline: 'PERSONALIZATION',
    title: 'Your space,',
    span: 'your way.',
    description:
      'Nine editor themes, two font families, full control over minimap, ligatures, and line numbers. Every preference persists across sessions.',
    code: [
      {
        line: 1,
        content: <span className={t.comment}>// theme: GitHub Dark</span>,
        time: '',
      },
      {
        line: 2,
        content: <span className={t.comment}>// font: JetBrains Mono</span>,
        time: '',
      },
      {
        line: 3,
        content: <span className={t.comment}>// size: 14px</span>,
        time: '',
      },
    ],
    output: 'Settings saved',
  },
]

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[number]
  index: number
}) {
  const [textRef, textInView] = useInView<HTMLDivElement>()
  const [codeRef, codeInView] = useInView<HTMLDivElement>()

  return (
    <article className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-start">
      <div
        ref={textRef}
        className={`reveal-left ${textInView ? 'is-visible' : ''}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium tracking-[0.2em] text-text-secondary font-mono">
            {feature.number}
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase mb-3">
          {feature.overline}
        </p>

        <h3 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] mb-4">
          {feature.title}
          <br />
          <span className="text-text-secondary">
            {feature.span}
          </span>
        </h3>

        <p className="text-text-secondary leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div
        ref={codeRef}
        className={`reveal-right ${codeInView ? 'is-visible' : ''}`}
        style={{ transitionDelay: `${100 + index * 100}ms` }}
      >
        <CodeContainer
          filename="experiment.cpp"
          compact
          headerExtra={
            <span className="text-[10px] tracking-[0.2em] text-text-muted uppercase">
              Auto-run
            </span>
          }
          footerLeft="stdout"
          footerRight={
            <span className={`text-xs font-mono ${t.string}`}>
              {feature.output}
            </span>
          }
          theme="github"
        >
          <ol className="space-y-1 text-xs">
            {feature.code.map((item) => (
              <li
                key={item.line}
                className="flex items-start gap-3 group"
              >
                <span className={`${t.textMuted} select-none w-4 text-right text-[10px]`}>
                  {item.line}
                </span>
                <span className="flex-1">
                  {item.content}
                </span>
                {item.time && (
                  <span className={`${t.textMuted} text-[10px] shrink-0`}>
                    {item.time}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </CodeContainer>
      </div>
    </article>
  )
}

export default function Features() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>()

  return (
    <section id="features" className="px-6 py-24 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headerRef}
          className={`mb-16 reveal-up ${headerInView ? 'is-visible' : ''}`}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted uppercase mb-4">
            The distance between idea and answer: zero.
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1]">
            A lab for{' '}
            <CodeChip rotate={-2} size={1.3} width={2.6}>code</CodeChip>
            <br />
            <span className="text-text-secondary">
              that is not a project{' '}
              <em className="text-text not-italic font-semibold">
                yet.
              </em>
            </span>
          </h2>
        </div>

        <div className="space-y-20">
          {features.map((feature, i) => (
            <FeatureRow key={feature.number} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
