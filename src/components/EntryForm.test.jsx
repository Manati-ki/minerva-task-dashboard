import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import EntryForm from './EntryForm'

describe('EntryForm', () => {
  it('calls onAdd with entered values', async () => {
    const onAdd = vi.fn()
    render(<EntryForm onAdd={onAdd} />)

    await userEvent.type(screen.getByLabelText('Hours'), '2')
    await userEvent.type(screen.getByLabelText('Earnings ($)'), '15')
    await userEvent.click(screen.getByRole('button', { name: /log entry/i }))

    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onAdd.mock.calls[0][0]).toMatchObject({ hours: '2', earnings: '15' })
  })

  it('shows a status message after logging an entry', async () => {
    render(<EntryForm onAdd={() => {}} />)

    await userEvent.type(screen.getByLabelText('Hours'), '2')
    await userEvent.type(screen.getByLabelText('Earnings ($)'), '15')
    await userEvent.click(screen.getByRole('button', { name: /log entry/i }))

    expect(screen.getByRole('status')).toHaveTextContent('Entry logged.')
  })
})
