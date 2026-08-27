import IconLead from "../IconLead";
import SemanticIcon from "../SemanticIcon";

const audienceIcons: Record<string, string> = {
  Individuals: "\u{1F464}",
  "Private groups": "\u{1F465}",
  Organizations: "\u{1F3E2}",
  Schools: "\u{1F3EB}",
  "Visiting groups": "\u{1F9F3}",
  Children: "\u{1F9D2}",
  Families: "\u{1F46A}",
  "Homeschooling groups": "\u{1F3E0}",
  Institutions: "\u{1F3DB}\u{FE0F}",
  "Hospitality partners": "\u{1F6CE}\u{FE0F}",
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
            <IconLead icon={"\u{1F39F}\u{FE0F}"} label="Who it is for" />

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
                  icon={audienceIcons[audience] ?? "\u{1F44B}"}
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
