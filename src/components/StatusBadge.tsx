import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'safe' | 'warning' | 'danger' | 'active' | 'offline';
  children: React.ReactNode;
  className?: string;
}

const StatusBadge = ({ status, children, className }: StatusBadgeProps) => {
  const variants = {
    safe: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-destructive/10 text-destructive border-destructive/20',
    active: 'bg-accent/10 text-accent border-accent/20',
    offline: 'bg-muted text-muted-foreground border-muted'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[status],
        className
      )}
    >
      {children}
    </span>
  );
};

export default StatusBadge;
