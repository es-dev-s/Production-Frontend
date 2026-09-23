"use client";

import Link from "next/link";
import { ScanText } from "lucide-react";

export function BrandMark() {
  return (
    <div className="flex h-full w-[var(--sidebar-w)] shrink-0 items-center justify-center">
      <Link
        href="/documents"
        prefetch
        aria-label="Web OCR"
        className="flex size-7 items-center justify-center rounded-xl bg-accent text-white shadow-[0_4px_12px_rgba(57,198,143,0.35)] outline-none transition-[background-color,transform] duration-[var(--shell-duration)] ease-[var(--shell-ease)] hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        <ScanText
          className="size-3.5"
          strokeWidth={1.75}
          absoluteStrokeWidth
        />
      </Link>
    </div>
  );
}
