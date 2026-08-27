import IconLead from "../IconLead";
import SemanticIcon from "../SemanticIcon";

const audienceIcons: Record<string, string> = {
  Individuals: "👤",
  "Private groups": "👥",
  Organizations: "🏢",
  Schools: "🏫",
  "Visiting groups": "🧳",
  Children: "🧒",
  Families: "👪",
  "Homeschooling groups": "🏠",
  Institutions: "🏛️",
  "Hospitality partners": "🛎️",
};

type VerticalAudienceProps = {
  title: string;
  description: string;
  audiences: string[];
};

export default function VerticalAudience({
  title,
  description,
  audiences,
}: VerticalAudienceProps) {
  return (
    <section className="kk-section-cream kk-section-padding">
      <div className="kk-container">
        <div className="kk-panel grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-14">
          <div>
            <IconLead icon="🎟️" label="Who it is for" />

            <p className="kk-section-label">Who it is for</p>
            <h2 className="kk-section-heading mt-5">{title}</h2>
            <p className="kk-body-large mt-6">{description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience}
                className="flex min-h-[88px] items-center gap-4 rounded-2xl border border-black/10 bg-white px-5 py-4 text-lg font-semibold leading-7 text-[var(--kk-text)]"
              >
                <SemanticIcon
                  icon={audienceIcons[audience] ?? "👋"}
                  label={audience}
                  size="compact"
                />
                {audience}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
