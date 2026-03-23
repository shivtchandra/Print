'use client';

import { useMemo, useState } from 'react';

const cpuOptions = [
  { label: 'Ryzen 5', price: 18000 },
  { label: 'Ryzen 7', price: 28000 },
  { label: 'Intel i7', price: 32000 }
];

const gpuOptions = [
  { label: 'RTX 4060', price: 32000 },
  { label: 'RTX 4070', price: 52000 },
  { label: 'RTX 4070 Ti', price: 78000 }
];

const ramOptions = [
  { label: '16GB', price: 4500 },
  { label: '32GB', price: 9000 },
  { label: '64GB', price: 18000 }
];

const BASE_BUILD = 28000;

type TierKey = 'entry' | 'pro' | 'elite';

function tierFromTotal(total: number): { key: TierKey; label: string; blurb: string } {
  if (total < 100_000) {
    return { key: 'entry', label: 'Entry', blurb: 'Solid 1080p gaming & daily power' };
  }
  if (total < 170_000) {
    return { key: 'pro', label: 'Pro', blurb: 'High-refresh & creator workflows' };
  }
  return { key: 'elite', label: 'Elite', blurb: 'Max settings & headroom to grow' };
}

function formatINR(n: number) {
  return `₹${n.toLocaleString('en-IN')}`;
}

export function GamingConfigurator() {
  const [cpu, setCpu] = useState(cpuOptions[0].label);
  const [gpu, setGpu] = useState(gpuOptions[0].label);
  const [ram, setRam] = useState(ramOptions[0].label);

  const estimate = useMemo(() => {
    const cpuPrice = cpuOptions.find((option) => option.label === cpu)?.price || 0;
    const gpuPrice = gpuOptions.find((option) => option.label === gpu)?.price || 0;
    const ramPrice = ramOptions.find((option) => option.label === ram)?.price || 0;
    const partsTotal = cpuPrice + gpuPrice + ramPrice;
    const total = BASE_BUILD + partsTotal;
    const tier = tierFromTotal(total);
    return { total, partsTotal, tier };
  }, [cpu, gpu, ram]);

  const fields = [
    {
      key: 'cpu',
      title: 'CPU',
      subtitle: 'Processor',
      icon: 'developer_board' as const,
      options: cpuOptions,
      value: cpu,
      onChange: setCpu
    },
    {
      key: 'gpu',
      title: 'GPU',
      subtitle: 'Graphics',
      icon: 'auto_awesome' as const,
      options: gpuOptions,
      value: gpu,
      onChange: setGpu
    },
    {
      key: 'ram',
      title: 'RAM',
      subtitle: 'Memory',
      icon: 'memory' as const,
      options: ramOptions,
      value: ram,
      onChange: setRam
    }
  ];

  return (
    <section className="section section--build-config">
      <div className="container">
        <div className="section-head build-config-head">
          <h2>Build configurator</h2>
          <p>Select parts and get an instant estimated tier and budget.</p>
        </div>

        <div className="configurator build-configurator">
          <div className="build-configurator-glow" aria-hidden="true" />

          <div className="build-configurator-layout">
            <div className="build-config-pickers">
              <p className="build-config-kicker">
                <span className="material-icons" aria-hidden="true">
                  tune
                </span>
                Choose your core parts
              </p>

              <div className="build-config-grid">
                {fields.map((field) => (
                  <div className="build-config-field" key={field.key}>
                    <div className="build-config-field-head">
                      <span className="build-config-field-icon" aria-hidden="true">
                        <span className="material-icons">{field.icon}</span>
                      </span>
                      <div>
                        <span className="build-config-field-title">{field.title}</span>
                        <span className="build-config-field-sub">{field.subtitle}</span>
                      </div>
                    </div>
                    <div className="build-config-select-wrap">
                      <select
                        className="build-config-select"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        aria-label={`${field.title}: ${field.subtitle}`}
                      >
                        {field.options.map((option) => (
                          <option key={option.label} value={option.label}>
                            {option.label} · {formatINR(option.price)}
                          </option>
                        ))}
                      </select>
                      <span className="material-icons build-config-select-chevron" aria-hidden="true">
                        expand_more
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="build-config-summary" aria-live="polite">
              <div className={`build-config-tier tier-${estimate.tier.key}`}>
                <span className="build-config-tier-label">Estimated tier</span>
                <span className="build-config-tier-name">{estimate.tier.label}</span>
                <p className="build-config-tier-blurb">{estimate.tier.blurb}</p>
              </div>

              <div className="build-config-budget">
                <span className="build-config-budget-label">Ballpark budget</span>
                <span className="build-config-budget-value">{formatINR(estimate.total)}</span>
                <p className="build-config-budget-meta">
                  Base build {formatINR(BASE_BUILD)} + parts {formatINR(estimate.partsTotal)}
                </p>
              </div>

              <p className="build-config-disclaimer">
                Final price depends on case, storage, PSU, and current component rates — we’ll lock an exact quote on enquiry.
              </p>

              <a href="#enquiry" className="primary-btn build-config-cta">
                <span className="material-icons" aria-hidden="true" style={{ fontSize: '18px' }}>
                  mail
                </span>
                Request exact quote
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
