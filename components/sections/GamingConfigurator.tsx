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

export function GamingConfigurator() {
  const [cpu, setCpu] = useState(cpuOptions[0].label);
  const [gpu, setGpu] = useState(gpuOptions[0].label);
  const [ram, setRam] = useState(ramOptions[0].label);

  const estimate = useMemo(() => {
    const cpuPrice = cpuOptions.find((option) => option.label === cpu)?.price || 0;
    const gpuPrice = gpuOptions.find((option) => option.label === gpu)?.price || 0;
    const ramPrice = ramOptions.find((option) => option.label === ram)?.price || 0;
    const base = 28000;
    const total = base + cpuPrice + gpuPrice + ramPrice;

    const tier = total < 100000 ? 'Entry' : total < 170000 ? 'Pro' : 'Elite';

    return { total, tier };
  }, [cpu, gpu, ram]);

  return (
    <section className="section">
      <div className="container">
        <div className="configurator">
          <h2>Build Configurator</h2>
          <p>Select parts and get an instant estimated tier and budget.</p>

          <div className="config-grid">
            <label>
              CPU
              <select value={cpu} onChange={(event) => setCpu(event.target.value)}>
                {cpuOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              GPU
              <select value={gpu} onChange={(event) => setGpu(event.target.value)}>
                {gpuOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              RAM
              <select value={ram} onChange={(event) => setRam(event.target.value)}>
                {ramOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="config-estimate">
            <p>
              Estimated Budget: <strong>₹{estimate.total.toLocaleString('en-IN')}</strong>
            </p>
            <p>
              Recommended Tier: <strong>{estimate.tier}</strong>
            </p>
            <a href="#enquiry" className="primary-btn">
              Request Exact Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
