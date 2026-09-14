"use client";

import Link from "next/link";

export default function CatalogBreadcrumbs({ breadcrumbs = [] }) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-2 text-xs md:text-sm text-ink/60 py-3"
    >
      {breadcrumbs.map((crumb, idx) => {
        const isLast = idx === breadcrumbs.length - 1;

        return (
          <div key={crumb.label || idx} className="flex items-center gap-2">
            {idx > 0 && (
              <svg
                className="w-3.5 h-3.5 text-ink/30 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}

            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-timber transition-colors font-medium hover:underline underline-offset-4"
              >
                {crumb.label}
              </Link>
            ) : crumb.onClick && !isLast ? (
              <button
                type="button"
                onClick={crumb.onClick}
                className="hover:text-timber transition-colors font-medium hover:underline underline-offset-4 cursor-pointer text-left"
              >
                {crumb.label}
              </button>
            ) : (
              <span
                className={`font-semibold ${
                  isLast ? "text-ink font-display" : "text-ink/80"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {crumb.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
