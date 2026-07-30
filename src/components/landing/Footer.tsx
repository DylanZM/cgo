import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="px-6 py-6 border-t border-border bg-surface">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-text-secondary hover:text-text transition-colors font-sans"
        >
          <img src="/cgo.webp" alt="" className="w-14 h-14" />
          <span className="text-base font-semibold tracking-tight leading-none">
            Cgo<span className="text-text-muted animate-blink">_</span>
          </span>
        </Link>

        <p className="text-xs text-text-muted">
          Free and open source, built by DylanZM.
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="text-xs text-text-secondary hover:text-text transition-colors"
          >
            Web app
          </Link>
          <a
            href="https://github.com/DylanZM/cgo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-secondary hover:text-text transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
