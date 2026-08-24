type Tone = "green" | "amber" | "slate" | "blue" | "red";

const toneClasses: Record<Tone, string> = {
  green: "bg-[#f1e4dc] text-[#a85c36]",
  amber: "bg-[#f2e8d6] text-[#8a6d1c]",
  slate: "bg-[#e9edea] text-[#526259]",
  blue: "bg-[#e2ecf7] text-[#1f4f8a]",
  red: "bg-red-50 text-red-700",
};

export function StatusBadge({ label, tone }: { label: string; tone: Tone }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{label}</span>;
}

export function PublishedBadge({ published }: { published: boolean }) {
  return published ? <StatusBadge label="Publié" tone="green" /> : <StatusBadge label="Brouillon" tone="amber" />;
}

const quoteStatusConfig: Record<string, { label: string; tone: Tone }> = {
  new: { label: "Nouveau", tone: "blue" },
  in_progress: { label: "En cours", tone: "amber" },
  done: { label: "Traité", tone: "green" },
  archived: { label: "Archivé", tone: "slate" },
};

export function QuoteStatusBadge({ status }: { status: string }) {
  const config = quoteStatusConfig[status] ?? { label: status, tone: "slate" as Tone };
  return <StatusBadge label={config.label} tone={config.tone} />;
}

export function ReadBadge({ processed }: { processed: boolean }) {
  return processed ? <StatusBadge label="Lu" tone="slate" /> : <StatusBadge label="Non lu" tone="blue" />;
}
