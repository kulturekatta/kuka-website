import Image from "next/image";
import Link from "next/link";
import type { VerticalStatus } from "../../data/kukaVerticals";
import UniverseStatusBadge from "./UniverseStatusBadge";

type VerticalHeroProps = {
  name: string;
  tagline: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  status: VerticalStatus;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function VerticalHero({
  name,
  tagline,
  description,
  logoSrc,
  logoAlt,
  status,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: VerticalHeroProps) {
  return (
    <section className="kk-section-light kk-hero-padding overflow-hidden">
      <div className="kk-container">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-black/50"
        >
          <Link href="/" className="transition hover:text-[var(--kk-accent)]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href="/kuka-universe"
            className="transition hover:text-[var(--kk-accent)]"
          >
            KuKa Universe
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--kk-text)]">{name}</span>
        </nav>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.7fr)] lg:gap-16">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <p className="kk-page-label">{name}</p>
              <UniverseStatusBadge status={status} />
            </div>

            <h1 className="kk-page-heading mt-5 max-w-4xl">{tagline}</h1>

            <p className="kk-page-intro mt-6 max-w-3xl">{description}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link href={primaryHref} className="kk-button-dark">
                {primaryLabel}
              </Link>

              {secondaryLabel && secondaryHref ? (
                <Link href={secondaryHref} className="kk-button-light">
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="kk-panel flex min-h-[320px] items-center justify-center !p-5 sm:min-h-[390px]">
            <div className="relative h-[270px] w-full sm:h-[330px]">
              <Image
                src={logoSrc}
                alt={logoAlt}
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 80vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
