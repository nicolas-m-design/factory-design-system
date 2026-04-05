import { useId } from 'react'
import './InputField.css'

interface InputFieldProps {
  label: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export function InputField({
  label,
  placeholder,
  helperText,
  error,
  disabled = false,
  value,
  onChange,
}: InputFieldProps) {
  const id = useId()
  const helperId = `${id}-helper`

  const fieldClass = [
    'input-field',
    error ? 'input-field--error' : '',
    disabled ? 'input-field--disabled' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={fieldClass}>
      <label className="input-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="input-field__input"
        id={id}
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        aria-describedby={helperText || error ? helperId : undefined}
        aria-invalid={!!error}
      />
      {(error || helperText) && (
        <span className="input-field__helper" id={helperId}>
          {error || helperText}
        </span>
      )}
    </div>
  )
}
