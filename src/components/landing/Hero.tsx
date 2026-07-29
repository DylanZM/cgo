import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import CodeChip from './CodeChip'
import CodeContainer from './CodeContainer'
import { codeThemes } from './codeThemes'

export default function Hero() {
  return (
    <section id="hero" className="relative px-6 pt-12 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] font-medium tracking-[0.2em] text-[var(--color-text-muted)] mb-8 uppercase animate-fade-down">
            Free. Open source. Yours.
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] text-[var(--color-text)] mb-6 animate-fade-up delay-100">
            <span className="inline-block">
              Write{' '}
              <CodeChip rotate={-3} size={1.1} color="var(--color-text)">C</CodeChip>
              <span className="text-[var(--color-text)]">/</span>
              <CodeChip rotate={2} size={1.1} width={1.7} color="var(--color-text)">C++</CodeChip>
              .
            </span>
            <br />
            <span className="text-[var(--color-text-secondary)]">
              See it{' '}
              <CodeChip rotate={-2} size={1.1} filled>▶</CodeChip>
              .
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed mb-8 animate-fade-up delay-200">
            A scratchpad that compiles. Real{' '}
            <CodeChip rotate={1} size={1.2} width={1.7}>g++</CodeChip>
            {' '}on your machine, the same editor as VS Code, and a history that remembers everything you ran.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-up delay-300">
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-text)] text-[var(--color-bg)] font-medium text-sm transition-all hover:opacity-90 active:scale-[0.97]"
            >
              Start coding
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--color-border-strong)] text-[var(--color-text)] font-medium text-sm hover:bg-[var(--color-surface)] transition-colors"
            >
              <SiGithub className="w-4 h-4" />
              View on GitHub
            </a>
          </div>
        </div>

        <div className="relative mt-8 animate-fade-up delay-400">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[9px] tracking-[0.2em] text-[var(--color-text-muted)] uppercase z-10">
            Live · Editable · Real
          </div>

          <CodeContainer
            openAppLabel="Open full app ↗"
            footerLeft="Press Ctrl+Enter to run"
            theme="github"
            compact
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

              <div className="hidden md:block w-56 pl-6 border-l border-[var(--color-border)]">
                <div className={`text-[10px] ${codeThemes.github.textMuted} uppercase tracking-wider mb-3`}>Output</div>
                <div className="flex flex-wrap gap-1.5 items-center">
                  {[0, 1, 1, 2, 3, 5, 8, 13, 21, 34].map((n, i) => (
                    <span key={i} className={codeThemes.github.number}>
                      {n}{' '}
                    </span>
                  ))}
                </div>
                <div className={`mt-3 text-[10px] ${codeThemes.github.textMuted}`}>12ms</div>
              </div>
            </div>
          </CodeContainer>
        </div>
      </div>
    </section>
  )
}
