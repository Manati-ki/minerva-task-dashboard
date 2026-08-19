export default function PlatformSummary({ totalsByPlatform }) {
  const rows = Object.entries(totalsByPlatform)

  if (rows.length === 0) {
    return <p>No entries yet.</p>
  }

  return (
    <table className="summary-table">
      <thead>
        <tr>
          <th>Platform</th>
          <th>Hours</th>
          <th>Earnings</th>
          <th>$/hr</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([platform, t]) => (
          <tr key={platform}>
            <td>{platform}</td>
            <td>{t.hours.toFixed(2)}</td>
            <td>${t.earnings.toFixed(2)}</td>
            <td>${t.hours ? (t.earnings / t.hours).toFixed(2) : '0.00'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
