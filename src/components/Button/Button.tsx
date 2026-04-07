import './Button.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  children,
  onClick,
}: ButtonProps) {
  const className = ['button', `button--${variant}`, `button--${size}`].join(' ')
  const isDisabled = disabled || loading

  return (
    <button
      aria-busy={loading}
      className={className}
      disabled={isDisabled}
      onClick={onClick}
      type="button"
    >
      {loading ? <span aria-hidden="true" className="button__spinner" /> : leadingIcon ? <span className="button__icon">{leadingIcon}</span> : null}
      <span className="button__label">{children}</span>
      {!loading && trailingIcon ? <span className="button__icon">{trailingIcon}</span> : null}
    </button>
  )
}
