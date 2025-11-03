import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ReviewQueueCardProps {
  itemsToReview: number;
  onStartReview: () => void;
  className?: string;
}

export const ReviewQueueCard: React.FC<ReviewQueueCardProps> = ({
  itemsToReview,
  onStartReview,
  className,
}) => {
  return (
    <Card variant="default" className={cn('', className)}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-info/10 dark:bg-info-dark/10 flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-info dark:text-info-dark" />
          </div>
          <div>
            <p className="text-small text-secondary-text dark:text-secondary-text-dark">
              Review Queue
            </p>
            <p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
              {itemsToReview}
            </p>
          </div>
        </div>
        
        <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-4">
          {itemsToReview === 0 
            ? 'Great work! Nothing to review right now.' 
            : `${itemsToReview} ${itemsToReview === 1 ? 'item' : 'items'} ready for review`
          }
        </p>
        
        <div className="mt-auto">
          <Button 
            variant="secondary" 
            size="md" 
            onClick={onStartReview}
            disabled={itemsToReview === 0}
            className="w-full"
          >
            Start Review
          </Button>
        </div>
      </div>
    </Card>
  );
};

ReviewQueueCard.displayName = 'ReviewQueueCard';
