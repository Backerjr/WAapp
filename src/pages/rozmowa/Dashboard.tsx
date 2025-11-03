import React from 'react';
import { 
  ContinueLearningCard, 
  DailyGoalsCard, 
  ReviewQueueCard, 
  StatCard 
} from '../../components/rozmowa';
import { BookOpen, Award, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Welcome back!
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          Continue your English learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Continue Learning Card - spans 2 columns on lg screens */}
        <ContinueLearningCard
          title="Present Perfect Tense"
          course="Grammar Essentials"
          description="Master the present perfect tense with real-world examples and interactive exercises."
          progress={45}
          onStart={() => console.log('Start lesson')}
        />

        {/* Daily Goals Card */}
        <DailyGoalsCard
          streak={7}
          dailyXp={120}
          dailyXpGoal={200}
        />

        {/* Review Queue Card */}
        <ReviewQueueCard
          itemsToReview={15}
          onStartReview={() => console.log('Start review')}
          className="md:col-span-2 lg:col-span-1"
        />

        {/* Stats Overview */}
        <div className="col-span-full">
          <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
            Your Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              value="245"
              label="Words Learned"
              icon={<BookOpen className="w-5 h-5 text-success dark:text-success-dark" />}
            />
            <StatCard
              value="12"
              label="Lessons Completed"
              icon={<Award className="w-5 h-5 text-success dark:text-success-dark" />}
            />
            <StatCard
              value="7"
              label="Day Streak"
              icon={<TrendingUp className="w-5 h-5 text-success dark:text-success-dark" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
