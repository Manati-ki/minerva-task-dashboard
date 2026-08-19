import { describe, it, expect } from 'vitest'
import { entriesToCsv } from './exportCsv'

describe('entriesToCsv', () => {
  it('produces a header row and one row per entry', () => {
    const entries = [
      { date: '2026-08-01', platform: 'Outlier AI', hours: '2', earnings: '15' },
      { date: '2026-08-02', platform: 'Appen', hours: '1.5', earnings: '10' },
    ]

    const csv = entriesToCsv(entries)
    const lines = csv.split('\n')

    expect(lines).toHaveLength(3)
    expect(lines[0]).toBe('"Date","Platform","Hours","Earnings"')
    expect(lines[1]).toBe('"2026-08-01","Outlier AI","2","15"')
  })

  it('returns just a header row for an empty list', () => {
    const csv = entriesToCsv([])
    expect(csv.split('\n')).toHaveLength(1)
  })
})
