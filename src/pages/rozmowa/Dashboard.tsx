import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ContinueLearningCard, 
  DailyGoalsCard, 
  ReviewQueueCard, 
  StatCard 
} from '../../components/rozmowa';
import { Award, TrendingUp } from 'lucide-react';
import { skillTree } from '../../data/lessons';

// Define the structure for user progress
interface UserProgress {
  completedLessons: string[];
  xp: number;
  streak: number;
  hearts: number;
  lastActiveDate: string;
  joinDate: string;
  level: number;
  dailyGoal: number;
  dailyXP: number;
  achievements: string[];
  weeklyStreak: number;
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Initialize state from localStorage once
  const [progress] = useState<UserProgress | null>(() => {
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      return JSON.parse(savedProgress) as UserProgress;
    } else {
      // Return a default progress object if nothing is saved
      return {
        completedLessons: [],
        xp: 0,
        streak: 1,
        hearts: 5,
        lastActiveDate: new Date().toDateString(),
        joinDate: new Date().toISOString(),
        level: 1,
        dailyGoal: 20,
        dailyXP: 0,
        achievements: [],
        weeklyStreak: 0,
      };
    }
  });

  if (!progress) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  // Find the next lesson to continue
  const allLessons = skillTree.flatMap(unit => unit.lessons);
  const currentLesson = allLessons.find(lesson => !progress.completedLessons.includes(lesson.id)) || allLessons[0];

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
          title={currentLesson.title_en}
          course={skillTree.find(unit => unit.lessons.some(l => l.id === currentLesson.id))?.title_en || 'English Basics'}
          description={currentLesson.description_en || ''}
          progress={progress.completedLessons.includes(currentLesson.id) ? 100 : 0}
          onStart={() => navigate(`/lesson/${currentLesson.id}`)}
        />

        {/* Daily Goals Card */}
        <DailyGoalsCard
          streak={progress.streak || 1}
          dailyXp={progress.dailyXP || 0}
          dailyXpGoal={progress.dailyGoal || 20}
        />

        {/* Review Queue Card */}
        <ReviewQueueCard
          itemsToReview={Math.min(progress.completedLessons.length * 3, 15)}
          onStartReview={() => navigate('/review')}
          className="md:col-span-2 lg:col-span-1"
        />

        {/* Stats Overview */}
        <div className="col-span-full">
          <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
            Your Progress
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              value={(progress.completedLessons.length * 20).toString()}
              label="Words Learned"
              icon={<Award className="w-5 h-5 text-success dark:text-success-dark" />}
            />
            <StatCard
              value={progress.completedLessons.length.toString()}
              label="Lessons Completed"
              icon={<Award className="w-5 h-5 text-success dark:text-success-dark" />}
            />
            <StatCard
              value={(progress.streak || 1).toString()}
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
