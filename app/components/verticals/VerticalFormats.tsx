export type VerticalFormatItem = {
  title: string;
  description: string;
};

type VerticalFormatsProps = {
  label?: string;
  title: string;
  description?: string;
  items: VerticalFormatItem[];
};

export default function VerticalFormats({
  label = "Formats",
  title,
  description,
  items,
}: VerticalFormatsProps) {
  return (
    <section className="kk-section-light kk-section-padding">
      <div className="kk-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="kk-section-label">{label}</p>
          <h2 className="kk-section-heading mt-5">{title}</h2>
          {description ? (
            <p className="kk-body-large mt-6">{description}</p>
          ) : null}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <article key={item.title} className="kk-card kk-card--interactive">
              <p className="kk-card-number">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="kk-card-title mt-5">{item.title}</h3>
              <p className="kk-card-body mt-4">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
