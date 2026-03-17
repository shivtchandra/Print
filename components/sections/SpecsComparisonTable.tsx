interface ComparisonRow {
  type: string;
  speed: string;
  cost: string;
  bestFor: string;
}

interface SpecsComparisonTableProps {
  rows: ComparisonRow[];
}

export function SpecsComparisonTable({ rows }: SpecsComparisonTableProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Speed (ppm)</th>
                <th>Cost per Print</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.type}>
                  <td>{row.type}</td>
                  <td>{row.speed}</td>
                  <td>{row.cost}</td>
                  <td>{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
