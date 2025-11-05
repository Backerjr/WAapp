import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  size?: 'sm' | 'md';
  className?: string;
  showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  size = 'md', 
  className,
  showLabel = false 
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
  };
  
  return (
    <div className={cn('relative w-full', className)}>
      <div 
        className={cn(
          'w-full bg-border dark:bg-border-dark rounded-full overflow-hidden',
          sizeStyles[size]
        )}
      >
        <div
          className="h-full bg-accent dark:bg-accent-dark transition-all duration-500 ease-out rounded-full"
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <span className="text-small text-secondary-text dark:text-secondary-text-dark mt-1 block">
          {clampedValue}%
        </span>
      )}
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
