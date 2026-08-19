import { groupByMonth } from '../utils/monthlyTotals'

export default function MonthlySummary({ entries }) {
  const months = groupByMonth(entries)

  if (months.length === 0) {
    return <p>No entries yet.</p>
  }

  const maxEarnings = Math.max(...months.map((m) => m.earnings))

  return (
    <table className="monthly-summary">
      <caption className="sr-only">Earnings and hours by month</caption>
      <thead>
        <tr>
          <th scope="col">Month</th>
          <th scope="col">Hours</th>
          <th scope="col">Earnings</th>
          <th scope="col">Relative</th>
        </tr>
      </thead>
      <tbody>
        {months.map((m) => (
          <tr key={m.month}>
            <th scope="row">{m.month}</th>
            <td>{m.hours.toFixed(2)}</td>
            <td>${m.earnings.toFixed(2)}</td>
            <td>
              <div
                className="bar"
                style={{ width: `${maxEarnings ? (m.earnings / maxEarnings) * 100 : 0}%` }}
                role="img"
                aria-label={`$${m.earnings.toFixed(2)} in ${m.month}`}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
