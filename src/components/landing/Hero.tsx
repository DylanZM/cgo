import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import CodeChip from './CodeChip'
import CodeContainer from './CodeContainer'
import { codeThemes } from './codeThemes'

const CAROUSEL_ITEMS = ['NO LICENSE KEY', 'NO CLOUD REQUIRED', 'NO CONTEXT SWITCHING']

export default function Hero() {
  const [carouselIdx, setCarouselIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCarouselIdx((i) => (i + 1) % CAROUSEL_ITEMS.length), 2500)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="hero" className="relative px-6 pt-12 pb-20 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(192,132,252,0.12), transparent 70%), radial-gradient(40% 40% at 80% 60%, rgba(52,211,153,0.06), transparent 70%)',
        }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted mb-8 uppercase overflow-hidden">
            <span
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
            >
              {CAROUSEL_ITEMS.map((item) => (
                <span key={item} className="w-full flex-shrink-0">
                  {item}
                </span>
              ))}
            </span>
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-text mb-6 animate-fade-up delay-100">
            <span className="inline-block">
              Write{' '}
              <CodeChip rotate={-3} size={1.1} color="var(--color-text)">C</CodeChip>
              <span className="text-text">/</span>
              <CodeChip rotate={2} size={1.1} width={1.7} color="var(--color-text)">C++</CodeChip>
              .
            </span>
            <br />
            <span className="text-text-secondary">
              See it{' '}
              <CodeChip rotate={-2} size={1.1} filled>▶</CodeChip>
              .
            </span>
          </h1>

          <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed mb-8 animate-fade-up delay-200">
            A scratchpad that compiles. Real{' '}
            <CodeChip rotate={1} size={1.2} width={1.7}>g++</CodeChip>
            {' '}on your machine, the same editor as VS Code, and a history that remembers everything you ran.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-300">
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-text text-bg font-medium text-sm transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Start coding
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-strong text-text font-medium text-sm hover:bg-surface transition-colors"
            >
              <SiGithub className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="relative mt-8 animate-fade-up delay-400">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface border border-border text-[9px] tracking-[0.2em] text-text-muted uppercase z-10 flex items-center gap-1.5 shadow-sm shadow-black/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
            </span>
            Real · Native · Yours
          </div>

          <CodeContainer
            openAppLabel="Open full app ↗"
            footerLeft="Press Ctrl+Enter to run"
            theme="github"
            compact
            typewriter={{ duration: 4, steps: 140 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-x-8">
              <div className="space-y-1.5">
                <div className="flex gap-4">
                  <span className={`${codeThemes.github.textMuted} select-none w-6 text-right`}>1</span>
                  <span><span className={codeThemes.github.keyword}>#include</span> <span className={codeThemes.github.string}>{'<iostream>'}</span></span>
                </div>
                <div className="flex gap-4">
                  <span className={`${codeThemes.github.textMuted} select-none w-6 text-right`}>2</span>
                  <span>&nbsp;</span>
                </div>
                <div className="flex gap-4">
                  <span className={`${codeThemes.github.textMuted} select-none w-6 text-right`}>3</span>
                  <span><span className={codeThemes.github.keyword}>int</span> <span className={codeThemes.github.fn}>fibonacci</span>(<span className={codeThemes.github.keyword}>int</span> n) {'{'}</span>
                </div>
                <div className="flex gap-4">
                  <span className={`${codeThemes.github.textMuted} select-none w-6 text-right`}>4</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className={codeThemes.github.keyword}>if</span> (n {'<='} <span className={codeThemes.github.number}>1</span>) <span className={codeThemes.github.keyword}>return</span> n;</span>
                </div>
                <div className="flex gap-4">
                  <span className={`${codeThemes.github.textMuted} select-none w-6 text-right`}>5</span>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;<span className={codeThemes.github.keyword}>return</span> <span className={codeThemes.github.fn}>fibonacci</span>(n - <span className={codeThemes.github.number}>1</span>) + <span className={codeThemes.github.fn}>fibonacci</span>(n - <span className={codeThemes.github.number}>2</span>);</span>
                </div>
                <div className="flex gap-4">
                  <span className={`${codeThemes.github.textMuted} select-none w-6 text-right`}>6</span>
                  <span>{'}'}</span>
                </div>
              </div>

              <div className="hidden md:block w-56 pl-6 border-l border-border">
                <div className={`text-[10px] ${codeThemes.github.textMuted} uppercase tracking-wider mb-3`}>Output</div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {[0, 1, 1, 2, 3, 5, 8, 13, 21, 34].map((n, i) => (
                    <span
                      key={i}
                      className={`${codeThemes.github.number} output-item`}
                      style={{ '--output-delay': `${4.2 + i * 0.08}s` } as React.CSSProperties}
                    >
                      {n}{' '}
                    </span>
                  ))}
                </div>
                <div
                  className={`mt-3 text-[10px] ${codeThemes.github.textMuted} output-item`}
                  style={{ '--output-delay': '5.1s' } as React.CSSProperties}
                >
                  12ms
                </div>
              </div>
            </div>
          </CodeContainer>
        </div>
      </div>
    </section>
  )
}
