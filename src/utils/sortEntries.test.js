import { describe, it, expect } from 'vitest'
import { sortEntries } from './sortEntries'

const entries = [
  { date: '2026-08-02', platform: 'Appen', hours: '1', earnings: '5' },
  { date: '2026-08-01', platform: 'Outlier AI', hours: '3', earnings: '20' },
]

describe('sortEntries', () => {
  it('sorts by date ascending', () => {
    const result = sortEntries(entries, 'date', 'asc')
    expect(result[0].date).toBe('2026-08-01')
  })

  it('sorts by earnings descending', () => {
    const result = sortEntries(entries, 'earnings', 'desc')
    expect(result[0].earnings).toBe('20')
  })

  it('does not mutate the original array', () => {
    const original = [...entries]
    sortEntries(entries, 'date', 'desc')
    expect(entries).toEqual(original)
  })
})
