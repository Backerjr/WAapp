import React from 'react';
import { Card } from './Card';
import { Flame, Target } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DailyGoalsCardProps {
  streak: number;
  dailyXp: number;
  dailyXpGoal: number;
  className?: string;
}

export const DailyGoalsCard: React.FC<DailyGoalsCardProps> = ({
  streak,
  dailyXp,
  dailyXpGoal,
  className,
}) => {
  const progressPercentage = Math.min(100, (dailyXp / dailyXpGoal) * 100);
  
  return (
    <Card variant="default" className={cn('', className)}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent-dark/10 flex items-center justify-center">
              <Flame className="w-6 h-6 text-accent dark:text-accent-dark" />
            </div>
            <div>
              <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                Day Streak
              </p>
              <p className="font-heading text-h3 text-primary-text dark:text-primary-text-dark">
                {streak}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-secondary-text dark:text-secondary-text-dark" />
              <span className="text-small text-secondary-text dark:text-secondary-text-dark">
                Daily Goal
              </span>
            </div>
            <span className="text-small font-medium text-primary-text dark:text-primary-text-dark">
              {dailyXp} / {dailyXpGoal} XP
            </span>
          </div>
          
          <div className="w-full h-2.5 bg-border dark:bg-border-dark rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-success dark:from-accent-dark dark:to-success-dark transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={progressPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

DailyGoalsCard.displayName = 'DailyGoalsCard';
