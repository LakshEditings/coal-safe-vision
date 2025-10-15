import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
  status?: 'safe' | 'warning' | 'danger';
}

const DashboardCard = ({ 
  title, 
  description, 
  value, 
  icon: Icon, 
  trend,
  className,
  status = 'safe'
}: DashboardCardProps) => {
  const statusColors = {
    safe: 'text-success',
    warning: 'text-warning',
    danger: 'text-destructive'
  };

  return (
    <Card className={cn('hover:shadow-lg transition-shadow', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn('h-5 w-5', statusColors[status])} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <p className={cn(
            'text-xs mt-1',
            trend.positive ? 'text-success' : 'text-destructive'
          )}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
