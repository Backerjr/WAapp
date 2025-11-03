import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

interface StatCardProps {
  value: string | number;
  label: string;
  icon: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  className,
}) => {
  return (
    <Card variant="default" className={cn('', className)}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 dark:bg-success-dark/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="font-heading text-h3 text-primary-text dark:text-primary-text-dark truncate">
            {value}
          </p>
          <p className="text-small text-secondary-text dark:text-secondary-text-dark truncate">
            {label}
          </p>
        </div>
      </div>
    </Card>
  );
};

StatCard.displayName = 'StatCard';
