import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import EntryForm from './EntryForm'

describe('EntryForm', () => {
  it('calls onAdd with entered values', async () => {
    const onAdd = vi.fn()
    render(<EntryForm onAdd={onAdd} />)

    await userEvent.type(screen.getByPlaceholderText('Hours'), '2')
    await userEvent.type(screen.getByPlaceholderText('Earnings ($)'), '15')
    await userEvent.click(screen.getByRole('button', { name: /log entry/i }))

    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onAdd.mock.calls[0][0]).toMatchObject({ hours: '2', earnings: '15' })
  })
})
