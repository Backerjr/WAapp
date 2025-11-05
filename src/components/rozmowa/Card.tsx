import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-container-background border border-border dark:bg-container-background-dark dark:border-border-dark',
      glass: 'bg-white/25 backdrop-blur-md border border-white/20 dark:bg-white/10',
      elevated: 'bg-container-background shadow-lg border border-border dark:bg-container-background-dark dark:border-border-dark',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-4 transition-all duration-300',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
