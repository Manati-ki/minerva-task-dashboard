export function groupByMonth(entries) {
  const totals = {}

  for (const e of entries) {
    const month = e.date.slice(0, 7) // "YYYY-MM"
    if (!totals[month]) totals[month] = { hours: 0, earnings: 0 }
    totals[month].hours += Number(e.hours)
    totals[month].earnings += Number(e.earnings)
  }

  return Object.entries(totals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, t]) => ({ month, ...t }))
}
