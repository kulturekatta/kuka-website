import Link from "next/link";

type VerticalCTAProps = {
  label?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function VerticalCTA({
  label = "Start a conversation",
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: VerticalCTAProps) {
  return (
    <section className="kk-section-cream kk-section-padding">
      <div className="kk-container text-center">
        <div className="kk-panel mx-auto max-w-5xl">
          <p className="kk-section-label">{label}</p>
          <h2 className="kk-section-heading mx-auto mt-5 max-w-4xl">
            {title}
          </h2>
          <p className="kk-body-large mx-auto mt-6 max-w-3xl">
            {description}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
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
      </div>
    </section>
  );
}
