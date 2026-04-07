import { useId } from 'react'
import './InputField.css'
import { Field } from '../Field/Field'

interface InputFieldProps {
  label: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function InputField({
  label,
  placeholder,
  helperText,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  value,
  onChange,
}: InputFieldProps) {
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
      <input
        aria-describedby={describedBy}
        aria-invalid={!!error}
        aria-readonly={readOnly || undefined}
        className={`input-field__input ${error ? 'input-field__input--error' : ''} ${readOnly ? 'input-field__input--read-only' : ''}`}
        disabled={disabled}
        id={id}
        onChange={event => onChange?.(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        type="text"
        value={value}
      />
    </Field>
  )
}
