import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import CodeChip from './CodeChip'
import Console from './Console'

const consoleLines = [
  {
    prompt: '~/cgo',
    text: 'cat fibonacci.c',
    delay: 700,
  },
  {
    prompt: '',
    text: '#include <stdio.h>',
    delay: 100,
  },
  {
    prompt: '',
    text: '',
    delay: 0,
  },
  {
    prompt: '',
    text: 'int fib(int n) {',
    delay: 120,
  },
  {
    prompt: '',
    text: '  if (n <= 1) return n;',
    delay: 120,
  },
  {
    prompt: '',
    text: '  return fib(n-1) + fib(n-2);',
    delay: 150,
  },
  {
    prompt: '',
    text: '}',
    delay: 80,
  },
  {
    prompt: '',
    text: '',
    delay: 400,
  },
  {
    prompt: '~/cgo',
    text: 'gcc fibonacci.c -O2 -o fib && ./fib',
    delay: 800,
  },
  {
    prompt: '',
    text: '0 1 1 2 3 5 8 13 21 34',
    delay: 900,
  },
  {
    prompt: '',
    text: '✓ process exited · 12ms',
    delay: 200,
  },
]

export default function Hero() {
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
          <p className="text-[10px] font-medium tracking-[0.2em] text-text-muted mb-8 uppercase animate-fade-down">
            Free. Open source. Yours.
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

          <Console
            lines={consoleLines}
            startDelay={500}
            className="animate-fade-up"
          />
        </div>
      </div>
    </section>
  )
}
