const steps = [
  'Select components (CPU, GPU, RAM, storage, cooling).',
  'Get a detailed quote from our team.',
  'Assemble and test in-store before delivery.'
];

export function BuildSteps() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Build Process</h2>
          <p>Simple, transparent, and performance-focused assembly workflow.</p>
        </div>

        <div className="build-steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="build-step-card reveal" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <p>{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
