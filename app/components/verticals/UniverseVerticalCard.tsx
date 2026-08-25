import Image from "next/image";
import Link from "next/link";
import type { KukaVertical } from "../../data/kukaVerticals";
import SemanticIcon from "../SemanticIcon";
import UniverseStatusBadge from "./UniverseStatusBadge";

export default function UniverseVerticalCard({
  vertical,
}: {
  vertical: KukaVertical;
}) {
  const content = (
    <>
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-[1.25rem] border border-black/10 bg-white p-5">
        <Image
          src={vertical.logoSrc}
          alt={vertical.logoAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-4"
        />
      </div>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <p className="kk-card-label">{vertical.shortName}</p>
          <h2 className="kk-card-title mt-3">{vertical.name}</h2>
        </div>

        <SemanticIcon
          icon={vertical.mark}
          label={vertical.name}
          size="compact"
        />
      </div>

      <p className="mt-4 text-lg font-semibold leading-7 text-[var(--kk-text)]">
        {vertical.tagline}
      </p>

      <p className="kk-card-body mt-3 flex-1">{vertical.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {vertical.themes.slice(0, 4).map((theme) => (
          <span key={theme} className="kk-chip !px-3 !py-1.5">
            {theme}
          </span>
        ))}
      </div>

      <div className="mt-7 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
        <UniverseStatusBadge status={vertical.status} />

        <span className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--kk-accent)]">
          {vertical.href ? "Explore →" : "More soon"}
        </span>
      </div>
    </>
  );

  if (vertical.href) {
    return (
      <Link
        href={vertical.href}
        className="kk-card kk-card--interactive group min-h-full focus-visible:outline-none"
        aria-label={`Explore ${vertical.name}`}
      >
        {content}
      </Link>
    );
  }

  return <article className="kk-card min-h-full">{content}</article>;
}
