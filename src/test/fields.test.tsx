import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { describe, expect, it } from 'vitest'
import { InputField } from '../components/InputField/InputField'
import { Select } from '../components/Select/Select'
import { Textarea } from '../components/Textarea/Textarea'

describe('Field components', () => {
  it('wires labels, helper text, and error text for inputs', () => {
    render(<InputField error="Name is required." label="Name" />)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAttribute('aria-describedby')
    expect(screen.getByText('Name is required.')).toBeInTheDocument()
  })

  it('renders read-only select as a labelled textbox', () => {
    render(
      <Select
        label="Theme"
        options={[{ value: 'alpha', label: 'Alpha' }]}
        readOnly
        value="alpha"
      />,
    )

    expect(screen.getByRole('textbox', { name: 'Theme' })).toHaveAttribute('aria-readonly', 'true')
  })

  it('keeps textarea accessible', async () => {
    const { container } = render(<Textarea helperText="Add detail" label="Notes" />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
