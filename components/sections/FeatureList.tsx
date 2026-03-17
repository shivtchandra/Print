interface FeatureListProps {
  title: string;
  items: string[];
}

export function FeatureList({ title, items }: FeatureListProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="feature-block">
          <h2>{title}</h2>
          <ul>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
