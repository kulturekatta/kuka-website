type VerticalIntroProps = {
  label: string;
  title: string;
  paragraphs: string[];
  principles?: string[];
};

export default function VerticalIntro({
  label,
  title,
  paragraphs,
  principles = [],
}: VerticalIntroProps) {
  return (
    <section className="kk-section-light kk-section-padding">
      <div className="kk-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className="kk-section-label">{label}</p>
            <h2 className="kk-section-heading mt-5">{title}</h2>
          </div>

          <div>
            <div className="space-y-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="kk-body-large">
                  {paragraph}
                </p>
              ))}
            </div>

            {principles.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {principles.map((principle) => (
                  <span key={principle} className="kk-chip">
                    {principle}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
