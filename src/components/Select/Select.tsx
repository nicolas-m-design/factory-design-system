import { useId } from 'react'
import './Select.css'
import { Field } from '../Field/Field'

interface SelectProps {
  label?: string
  placeholder?: string
  value?: string
  helperText?: string
  error?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  options: { value: string; label: string }[]
  onChange?: (value: string) => void
}

export function Select({
  label,
  placeholder = 'Select...',
  value,
  helperText,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  options,
  onChange,
}: SelectProps) {
  const id = useId()
  const describedBy = error || helperText ? `${id}-description` : undefined
  const selectedLabel = options.find(option => option.value === value)?.label ?? placeholder

  return (
    <Field
      disabled={disabled}
      error={error}
      helperText={helperText}
      htmlFor={id}
      label={label}
      required={required}
    >
      <div className="select-field__wrapper">
        {readOnly ? (
          <div
            aria-describedby={describedBy}
            aria-labelledby={`${id}-label`}
            aria-readonly="true"
            className={`select-field__display ${error ? 'select-field__display--error' : ''}`}
            id={id}
            role="textbox"
            tabIndex={0}
          >
            {selectedLabel}
          </div>
        ) : (
          <select
            aria-describedby={describedBy}
            aria-invalid={!!error}
            className={`select-field__input ${error ? 'select-field__input--error' : ''}`}
            disabled={disabled}
            id={id}
            onChange={event => onChange?.(event.target.value)}
            value={value}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        <svg className="select-field__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14.5l-4-4h8l-4 4z" fill="currentColor" />
        </svg>
      </div>
    </Field>
  )
}
