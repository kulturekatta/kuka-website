import type { VerticalStatus } from "../../data/kukaVerticals";

const statusContent: Record<
  VerticalStatus,
  { label: string; className: string }
> = {
  active: {
    label: "Active now",
    className:
      "border-[var(--kk-accent)] bg-[#f4eee7] text-[var(--kk-accent-hover)]",
  },
  developing: {
    label: "In development",
    className:
      "border-black/15 bg-black/[0.035] text-[var(--kk-text-muted)]",
  },
  future: {
    label: "Future direction",
    className:
      "border-black/15 bg-transparent text-[var(--kk-text-muted)]",
  },
};

export default function UniverseStatusBadge({
  status,
}: {
  status: VerticalStatus;
}) {
  const content = statusContent[status];

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${content.className}`}
    >
      {content.label}
    </span>
  );
}
