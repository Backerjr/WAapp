import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  title: string;
  description: string;
  imageUrl: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  onClick?: () => void;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  imageUrl,
  level,
  progress = 0,
  onClick,
  className,
}) => {
  const levelColorScheme = {
    'Beginner': 'success' as const,
    'Intermediate': 'info' as const,
    'Advanced': 'accent' as const,
  };
  
  return (
    <Card
      variant="default"
      className={cn(
        'overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl',
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="relative w-full h-40 overflow-hidden rounded-t-lg -m-4 mb-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge colorScheme={levelColorScheme[level]} size="sm">
            {level}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-heading text-h3 text-primary-text dark:text-primary-text-dark mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-4 line-clamp-2">
          {description}
        </p>
        
        {progress > 0 && (
          <div>
            <ProgressBar value={progress} size="sm" />
            <p className="text-small text-secondary-text dark:text-secondary-text-dark mt-1.5">
              {progress}% Complete
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

CourseCard.displayName = 'CourseCard';
