import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";

export interface HeaderSection {
  id: string;
  label: string;
}

interface HeaderProps {
  sections?: HeaderSection[];
  githubUrl?: string;
  ctaTo?: string;
  ctaLabel?: string;
  brand?: React.ReactNode;
}

export default function Header({
  sections = [],
  githubUrl = "https://github.com",
  ctaTo = "/app",
  ctaLabel = "Open App",
  brand,
}: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
      <Link
        to="/"
        className="flex items-center gap-2.5 text-[var(--color-text)] shrink-0 font-sans"
      >
        {brand ?? (
          <>
            <img src="/cgo.webp" alt="" className="w-8 h-8" />
            <span className="text-base font-semibold tracking-tight leading-none">
              cgo<span className="text-[var(--color-text-muted)]">_</span>
            </span>
          </>
        )}
      </Link>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors font-sans"
          >
            {s.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          title="GitHub"
        >
          <SiGithub className="w-4 h-4" />
        </a>

        <Link
          to={ctaTo}
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md hover:opacity-90 transition-all font-sans text-[var(--color-bg)] bg-[var(--color-text)]"
        >
          {ctaLabel}
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </nav>
  );
}
