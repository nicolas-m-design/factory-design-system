import { useId } from 'react'
import './Textarea.css'
import { Field } from '../Field/Field'

interface TextareaProps {
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  value?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  onChange?: (value: string) => void
}

export function Textarea({
  label,
  placeholder = 'Value',
  helperText,
  error,
  value,
  disabled = false,
  readOnly = false,
  required = false,
  onChange,
}: TextareaProps) {
  const id = useId()
  const describedBy = error || helperText ? `${id}-description` : undefined

  return (
    <Field
      disabled={disabled}
      error={error}
      helperText={helperText}
      htmlFor={id}
      label={label}
      required={required}
    >
      <textarea
        aria-describedby={describedBy}
        aria-invalid={!!error}
        aria-readonly={readOnly || undefined}
        className={`textarea-field__input ${error ? 'textarea-field__input--error' : ''} ${readOnly ? 'textarea-field__input--read-only' : ''}`}
        disabled={disabled}
        id={id}
        onChange={event => onChange?.(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={4}
        value={value}
      />
    </Field>
  )
}
