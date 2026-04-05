import './Button.css'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const className = [
    'button',
    `button--${variant}`,
    `button--${size}`,
  ].join(' ')

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      <span className="button__label">{children}</span>
    </button>
  )
}
