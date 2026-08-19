export function entriesToCsv(entries) {
  const header = ['Date', 'Platform', 'Hours', 'Earnings']
  const rows = entries.map((e) => [e.date, e.platform, e.hours, e.earnings])

  return [header, ...rows]
    .map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export function downloadCsv(csvContent, filename = 'entries.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
