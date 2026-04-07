import './Checkbox.css'
import { Icon } from '../Icon/Icon'

interface CheckboxProps {
  label: string
  checked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
}

export function Checkbox({
  label,
  checked = false,
  disabled = false,
  onChange,
}: CheckboxProps) {
  return (
    <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
      <input
        className="checkbox__input"
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
      />
      <span className={`checkbox__box ${checked ? 'checkbox__box--checked' : ''}`}>
        {checked && <Icon name="check-line" size={24} className="checkbox__icon" />}
      </span>
      <span className="checkbox__label">{label}</span>
    </label>
  )
}
