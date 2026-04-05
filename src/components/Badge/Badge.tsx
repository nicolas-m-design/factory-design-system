import './Badge.css';

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeState = 'new' | 'informational';

interface BadgeProps {
  count?: number;
  size?: BadgeSize;
  state?: BadgeState;
}

export function Badge({ count, size = 'md', state = 'new' }: BadgeProps) {
  const hasCount = count !== undefined;
  const isOverflow = hasCount && count > 99;
  const digitClass = !hasCount
    ? 'badge--dot'
    : isOverflow
      ? 'badge--dot'
      : count! > 9
        ? 'badge--multiple'
        : 'badge--single';

  const className = [
    'badge',
    `badge--${size}`,
    `badge--${state}`,
    digitClass,
  ].join(' ');

  return (
    <span className={className} aria-label={hasCount ? `${count} notifications` : 'notification'}>
      {hasCount && !isOverflow && <span className="badge__count">{count}</span>}
      {isOverflow && <span className="badge__dot" />}
    </span>
  );
}
