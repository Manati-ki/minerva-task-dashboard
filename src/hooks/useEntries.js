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

  const [filters, setFilters] = useState({ platform: '', from: '', to: '' })

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

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      if (filters.platform && e.platform !== filters.platform) return false
      if (filters.from && e.date < filters.from) return false
      if (filters.to && e.date > filters.to) return false
      return true
    })
  }, [entries, filters])

  const totalsByPlatform = useMemo(() => {
    const totals = {}
    for (const e of filteredEntries) {
      if (!totals[e.platform]) totals[e.platform] = { hours: 0, earnings: 0 }
      totals[e.platform].hours += Number(e.hours)
      totals[e.platform].earnings += Number(e.earnings)
    }
    return totals
  }, [filteredEntries])

  const grandTotal = useMemo(() => {
    return filteredEntries.reduce(
      (acc, e) => ({
        hours: acc.hours + Number(e.hours),
        earnings: acc.earnings + Number(e.earnings),
      }),
      { hours: 0, earnings: 0 }
    )
  }, [filteredEntries])

  return {
    entries: filteredEntries,
    filters,
    setFilters,
    addEntry,
    deleteEntry,
    totalsByPlatform,
    grandTotal,
  }
}
