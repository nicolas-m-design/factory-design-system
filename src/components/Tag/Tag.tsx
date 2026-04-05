import './Tag.css';

type TagVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info';

interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
}

export function Tag({ children, variant = 'neutral' }: TagProps) {
  const className = `tag tag--${variant}`;

  return <span className={className}>{children}</span>;
}
