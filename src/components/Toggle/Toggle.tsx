import './Toggle.css'

interface ToggleProps {
  label?: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export function Toggle({
  label,
  checked = false,
  disabled = false,
  onChange,
}: ToggleProps) {
  return (
    <label className={`toggle ${disabled ? 'toggle--disabled' : ''}`}>
      <input
        className="toggle__input"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
      />
      <span className={`toggle__track ${checked ? 'toggle__track--on' : ''}`}>
        <span className="toggle__thumb" />
      </span>
      {label && <span className="toggle__label">{label}</span>}
    </label>
  )
}
