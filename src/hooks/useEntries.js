import { useState, useEffect, useMemo } from 'react'

const STORAGE_KEY = 'minerva-entries'

export function useEntries() {
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry) => {
    setEntries((prev) => [
      ...prev,
      { ...entry, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
    ])
  }

  const deleteEntry = (id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  const totalsByPlatform = useMemo(() => {
    const totals = {}
    for (const e of entries) {
      if (!totals[e.platform]) totals[e.platform] = { hours: 0, earnings: 0 }
      totals[e.platform].hours += Number(e.hours)
      totals[e.platform].earnings += Number(e.earnings)
    }
    return totals
  }, [entries])

  const grandTotal = useMemo(() => {
    return entries.reduce(
      (acc, e) => ({
        hours: acc.hours + Number(e.hours),
        earnings: acc.earnings + Number(e.earnings),
      }),
      { hours: 0, earnings: 0 }
    )
  }, [entries])

  return { entries, addEntry, deleteEntry, totalsByPlatform, grandTotal }
}
