import './Field.css'

interface FieldProps {
  label?: string
  htmlFor: string
  helperText?: string
  error?: string
  required?: boolean
  disabled?: boolean
  children: React.ReactNode
}

export function Field({
  label,
  htmlFor,
  helperText,
  error,
  required = false,
  disabled = false,
  children,
}: FieldProps) {
  const description = error || helperText

  return (
    <div className={`field ${disabled ? 'field--disabled' : ''}`}>
      {label && (
        <label className="field__label" htmlFor={htmlFor} id={`${htmlFor}-label`}>
          <span>{label}</span>
          {required && <span className="field__required" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {description && (
        <p className={`field__description ${error ? 'field__description--error' : ''}`} id={`${htmlFor}-description`}>
          {description}
        </p>
      )}
    </div>
  )
}
