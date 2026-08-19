import { describe, it, expect } from 'vitest'
import { groupByMonth } from './monthlyTotals'

describe('groupByMonth', () => {
  it('groups entries by year-month and sums hours/earnings', () => {
    const entries = [
      { date: '2026-07-15', hours: '2', earnings: '10' },
      { date: '2026-07-20', hours: '1', earnings: '5' },
      { date: '2026-08-01', hours: '3', earnings: '20' },
    ]

    const result = groupByMonth(entries)

    expect(result).toEqual([
      { month: '2026-07', hours: 3, earnings: 15 },
      { month: '2026-08', hours: 3, earnings: 20 },
    ])
  })

  it('returns an empty array for no entries', () => {
    expect(groupByMonth([])).toEqual([])
  })
})
