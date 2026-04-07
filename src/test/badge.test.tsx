import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '../components/Badge/Badge'

describe('Badge', () => {
  it('respects explicit overflow maximum', () => {
    render(<Badge count={125} max={99} tone="info" />)

    expect(screen.getByText('99+')).toBeInTheDocument()
    expect(screen.getByLabelText('informational notifications: 99+')).toBeInTheDocument()
  })

  it('applies semantic tone classes', () => {
    render(<Badge count={5} tone="neutral" />)
    expect(screen.getByText('5').closest('.badge')).toHaveClass('badge--neutral')
  })
})
