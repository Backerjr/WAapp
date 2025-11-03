import React from 'react';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { Button } from './Button';
import { PlayCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ContinueLearningCardProps {
  title: string;
  course: string;
  description?: string;
  progress: number;
  onStart: () => void;
  className?: string;
}

export const ContinueLearningCard: React.FC<ContinueLearningCardProps> = ({
  title,
  course,
  description,
  progress,
  onStart,
  className,
}) => {
  return (
    <Card variant="elevated" className={cn('col-span-full lg:col-span-2', className)}>
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <p className="text-small text-secondary-text dark:text-secondary-text-dark uppercase tracking-wide">
            {course}
          </p>
        </div>
        <h3 className="font-heading text-h3 text-primary-text dark:text-primary-text-dark mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-4">
            {description}
          </p>
        )}
        <div className="mb-4">
          <ProgressBar value={progress} size="md" />
          <p className="text-small text-secondary-text dark:text-secondary-text-dark mt-2">
            {progress}% Complete
          </p>
        </div>
        <div className="mt-auto">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={onStart}
            leftIcon={<PlayCircle size={20} />}
            className="w-full sm:w-auto"
          >
            {progress === 0 ? 'Start Lesson' : 'Continue Learning'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

ContinueLearningCard.displayName = 'ContinueLearningCard';
