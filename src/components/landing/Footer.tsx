import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-6 py-6 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors font-sans"
        >
          <img src="/cgo.webp" alt="" className="w-14 h-14" />
          <span className="text-base font-semibold tracking-tight leading-none">
            Cgo<span className="text-[var(--color-text-muted)] animate-blink">_</span>
          </span>
        </Link>

        <p className="text-xs text-[var(--color-text-muted)]">
          Free and open source, built by DylanZM.
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            Web app
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
