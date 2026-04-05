import './Alert.css';

type AlertVariant = 'info' | 'success' | 'error';

interface AlertProps {
  title: string;
  description?: string;
  variant?: AlertVariant;
  onDismiss?: () => void;
}

function AlertIcon({ variant }: { variant: AlertVariant }) {
  if (variant === 'success') {
    return (
      <svg className="alert__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1.33a6.67 6.67 0 1 0 0 13.34A6.67 6.67 0 0 0 8 1.33Zm3.06 5.06-3.67 3.67a.5.5 0 0 1-.7 0L4.94 8.31a.5.5 0 1 1 .7-.7l1.4 1.39 3.32-3.32a.5.5 0 0 1 .7.7Z" fill="currentColor"/>
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg className="alert__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 1.33a6.67 6.67 0 1 0 0 13.34A6.67 6.67 0 0 0 8 1.33ZM8 5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 5Zm0 6a.67.67 0 1 1 0-1.33A.67.67 0 0 1 8 11Z" fill="currentColor"/>
      </svg>
    );
  }
  // info
  return (
    <svg className="alert__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 1.33a6.67 6.67 0 1 0 0 13.34A6.67 6.67 0 0 0 8 1.33ZM8 5a.67.67 0 1 1 0 1.33A.67.67 0 0 1 8 5Zm.5 6.5h-1a.5.5 0 0 1 0-1h.17V8.83H7.5a.5.5 0 0 1 0-1H8a.5.5 0 0 1 .5.5v2.17h.17a.5.5 0 0 1-.17 1Z" fill="currentColor"/>
    </svg>
  );
}

export function Alert({ title, description, variant = 'info', onDismiss }: AlertProps) {
  return (
    <div className={`alert alert--${variant}`} role="alert">
      <div className="alert__header">
        <div className="alert__header-content">
          <AlertIcon variant={variant} />
          <strong className="alert__title">{title}</strong>
        </div>
        {onDismiss && (
          <button className="alert__dismiss" onClick={onDismiss} aria-label="Dismiss">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4 4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
      {description && (
        <div className="alert__body">
          <p className="alert__description">{description}</p>
        </div>
      )}
    </div>
  );
}
