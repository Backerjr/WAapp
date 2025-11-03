import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  colorScheme?: 'info' | 'success' | 'warning' | 'accent';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ colorScheme = 'info', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap';
    
    const colorStyles = {
      info: 'bg-info/10 text-info border border-info/20 dark:bg-info-dark/10 dark:text-info-dark dark:border-info-dark/20',
      success: 'bg-success/10 text-success border border-success/20 dark:bg-success-dark/10 dark:text-success-dark dark:border-success-dark/20',
      warning: 'bg-yellow-500/10 text-yellow-700 border border-yellow-500/20 dark:bg-yellow-400/10 dark:text-yellow-300 dark:border-yellow-400/20',
      accent: 'bg-accent/10 text-accent border border-accent/20 dark:bg-accent-dark/10 dark:text-accent-dark dark:border-accent-dark/20',
    };
    
    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          colorStyles[colorScheme],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
