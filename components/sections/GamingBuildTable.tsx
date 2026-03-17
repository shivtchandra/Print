const rows = [
  { tier: 'Entry', cpu: 'Ryzen 5', gpu: 'RTX 4060', ram: '16GB', price: '₹80k+' },
  { tier: 'Pro', cpu: 'Ryzen 7 / i7', gpu: 'RTX 4070', ram: '32GB', price: '₹1.2L+' },
  { tier: 'Elite', cpu: 'i7 / i9', gpu: 'RTX 4070 Ti+', ram: '32-64GB', price: '₹1.5L+' }
];

export function GamingBuildTable() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Custom Build Tiers</h2>
          <p>Pick from pre-built tiers or configure your own components.</p>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tier</th>
                <th>CPU</th>
                <th>GPU</th>
                <th>RAM</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.tier}>
                  <td>{row.tier}</td>
                  <td>{row.cpu}</td>
                  <td>{row.gpu}</td>
                  <td>{row.ram}</td>
                  <td>{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
