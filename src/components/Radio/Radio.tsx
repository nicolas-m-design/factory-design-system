import './Radio.css'

interface RadioProps {
  label: string
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

export function Radio({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
}: RadioProps) {
  return (
    <label className={`radio ${disabled ? 'radio--disabled' : ''}`}>
      <input
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange?.(value)}
      />
      <span className={`radio__box ${checked ? 'radio__box--selected' : ''}`}>
        {checked && <span className="radio__fill" />}
      </span>
      <span className="radio__label">{label}</span>
    </label>
  )
}
