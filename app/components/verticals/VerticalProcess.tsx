import IconLead from "../IconLead";
import SequenceMarker from "../SequenceMarker";

export type VerticalProcessItem = {
  title: string;
  description: string;
};

type VerticalProcessProps = {
  label?: string;
  title: string;
  description?: string;
  items: VerticalProcessItem[];
};

export default function VerticalProcess({
  label = "How it works",
  title,
  description,
  items,
}: VerticalProcessProps) {
  return (
    <section className="kk-section-light kk-section-padding">
      <div className="kk-container">
        <div className="mx-auto max-w-3xl text-center">
          <IconLead icon={"\u{2699}\u{FE0F}"} label={label} align="center" />

          <p className="kk-section-label">{label}</p>
          <h2 className="kk-section-heading mt-5">{title}</h2>
          {description ? (
            <p className="kk-body-large mt-6">{description}</p>
          ) : null}
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <article key={item.title} className="kk-card">
              <SequenceMarker index={index} label={item.title} />
              <h3 className="kk-card-title mt-5">{item.title}</h3>
              <p className="kk-card-body mt-4">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
