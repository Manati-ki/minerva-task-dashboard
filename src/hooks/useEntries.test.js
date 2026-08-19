import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { useEntries } from './useEntries'

describe('useEntries', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds an entry and computes totals', () => {
    const { result } = renderHook(() => useEntries())

    act(() => {
      result.current.addEntry({ platform: 'Appen', hours: '2', earnings: '10', date: '2026-08-01' })
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.grandTotal).toEqual({ hours: 2, earnings: 10 })
    expect(result.current.totalsByPlatform.Appen).toEqual({ hours: 2, earnings: 10 })
  })

  it('filters entries by platform', () => {
    const { result } = renderHook(() => useEntries())

    act(() => {
      result.current.addEntry({ platform: 'Appen', hours: '1', earnings: '5', date: '2026-08-01' })
      result.current.addEntry({ platform: 'Outlier AI', hours: '2', earnings: '20', date: '2026-08-02' })
    })

    act(() => {
      result.current.setFilters({ platform: 'Appen', from: '', to: '' })
    })

    expect(result.current.entries).toHaveLength(1)
    expect(result.current.entries[0].platform).toBe('Appen')
  })

  it('updates and deletes entries', () => {
    const { result } = renderHook(() => useEntries())

    act(() => {
      result.current.addEntry({ platform: 'Appen', hours: '1', earnings: '5', date: '2026-08-01' })
    })
    const id = result.current.entries[0].id

    act(() => {
      result.current.updateEntry(id, { hours: '3' })
    })
    expect(result.current.entries[0].hours).toBe('3')

    act(() => {
      result.current.deleteEntry(id)
    })
    expect(result.current.entries).toHaveLength(0)
  })
})
