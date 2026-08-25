import IconLead from "../IconLead";
import SemanticIcon from "../SemanticIcon";

export type VerticalExperienceItem = {
  title: string;
  description: string;
  icon: string;
};

type VerticalExperienceGridProps = {
  label: string;
  title: string;
  description?: string;
  items: VerticalExperienceItem[];
  sectionIcon?: string;
};

export default function VerticalExperienceGrid({
  label,
  title,
  description,
  items,
  sectionIcon = "🎪",
}: VerticalExperienceGridProps) {
  return (
    <section className="kk-section-cream kk-section-padding">
      <div className="kk-container">
        <div className="mx-auto max-w-3xl text-center">
          <IconLead icon={sectionIcon} label={label} align="center" />

          <p className="kk-section-label">{label}</p>
          <h2 className="kk-section-heading mt-5">{title}</h2>
          {description ? (
            <p className="kk-body-large mt-6">{description}</p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="kk-card kk-card--interactive">
              <SemanticIcon icon={item.icon} label={item.title} size="card" />
              <h3 className="kk-card-title mt-6">{item.title}</h3>
              <p className="kk-card-body mt-4">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
