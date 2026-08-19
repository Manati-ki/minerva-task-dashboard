export function sortEntries(entries, sortBy, direction) {
  const sorted = [...entries].sort((a, b) => {
    let cmp
    if (sortBy === 'earnings' || sortBy === 'hours') {
      cmp = Number(a[sortBy]) - Number(b[sortBy])
    } else {
      cmp = String(a[sortBy]).localeCompare(String(b[sortBy]))
    }
    return direction === 'desc' ? -cmp : cmp
  })
  return sorted
}
