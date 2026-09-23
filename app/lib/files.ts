export const SOURCE_TOTAL = 4;

export type DocumentStatus = "completed" | "duplicate" | "processing" | "pending_review";

export type StatusTone = DocumentStatus | "original";

export type SourceUniqueness = "unique" | "original" | "duplicate";

export const STATUS_PILL: Record<
  StatusTone,
  { label: string; className: string; surface: string; openClass: string }
> = {
  processing: {
    label: "Processing",
    className: "bg-[#e6f7f1] text-[#1f7a5c]",
    surface: "bg-[#e6f7f1]",
    openClass:
      "bg-[#e6f7f1] hover:bg-[#e6f7f1] focus-visible:bg-[#e6f7f1]",
  },
  completed: {
    label: "Completed",
    className: "bg-[#dcf5ea] text-[#1a6b4f]",
    surface: "bg-[#eef9f3]",
    openClass:
      "bg-[#eef9f3] hover:bg-[#eef9f3] focus-visible:bg-[#eef9f3]",
  },
  original: {
    label: "Original",
    className: "bg-[#d8f3e7] text-[#1f7a4c]",
    surface: "bg-[#f3faf6]",
    openClass:
      "bg-[#f3faf6] hover:bg-[#f3faf6] focus-visible:bg-[#f3faf6]",
  },
  duplicate: {
    label: "Duplicate",
    className: "bg-orange-100 text-orange-800",
    surface: "bg-orange-50",
    openClass:
      "bg-orange-50 hover:bg-orange-50 focus-visible:bg-orange-50",
  },
  pending_review: {
    label: "Pending",
    className: "bg-[#f3efe8] text-[#7a5a2e]",
    surface: "bg-[#faf7f2]",
    openClass:
      "bg-[#faf7f2] hover:bg-[#faf7f2] focus-visible:bg-[#faf7f2]",
  },
};

export const UNIQUENESS_PILL: Record<
  SourceUniqueness,
  { label: string; className: string; hoverClass: string }
> = {
  unique: {
    label: "Unique",
    className: "bg-[#dcf5ea] text-[#1a6b4f]",
    hoverClass: "hover:bg-[#c8eedd]",
  },
  original: {
    label: "Original",
    className: "bg-[#d8f3e7] text-[#1f7a4c]",
    hoverClass: "hover:bg-[#c5e9d6]",
  },
  duplicate: {
    label: "Duplicate",
    className: "bg-orange-100 text-orange-800",
    hoverClass: "hover:bg-orange-200",
  },
};

export function statusMeta(status: StatusTone) {
  return STATUS_PILL[status] ?? STATUS_PILL.completed;
}

export function uniquenessMeta(value: SourceUniqueness) {
  return UNIQUENESS_PILL[value] ?? UNIQUENESS_PILL.unique;
}

export function parseDocumentStatus(value: string | undefined): DocumentStatus {
  if (value === "processing" || value === "duplicate" || value === "pending_review") return value;
  if (value === "original") return "duplicate";
  return "completed";
}

export function parseUniqueness(value: string | undefined): SourceUniqueness {
  if (value === "original" || value === "duplicate") return value;
  return "unique";
}

export function isHashPending(
  status: DocumentStatus,
  source: { uniqueness: SourceUniqueness; score: number | null },
) {
  return status === "processing" && source.uniqueness === "unique" && source.score == null;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) {
    return `${kb < 10 ? kb.toFixed(1) : Math.round(kb)} KB`;
  }
  const mb = kb / 1024;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

export function fileKind(contentType?: string): string {
  const type = (contentType ?? "").toLowerCase();
  if (type === "application/pdf") return "PDF";
  if (type.startsWith("image/")) {
    const sub = type.slice("image/".length);
    if (sub === "jpeg") return "JPEG";
    if (sub === "svg+xml") return "SVG";
    return sub.toUpperCase();
  }
  return "File";
}
