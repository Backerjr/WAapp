import React from 'react';
import { Card, Badge, Button } from '../../components/rozmowa';
import { User, Mail, Calendar, Award, BookOpen, TrendingUp, Edit2 } from 'lucide-react';
import { Progress } from '../../types';

const achievements = [
  { id: '1', name: 'First Lesson', unlocked: true },
  { id: '2', name: '7-Day Streak', unlocked: true },
  { id: '3', name: '50 Words', unlocked: true },
  { id: '4', name: '14-Day Streak', unlocked: false },
  { id: '5', name: '100 Words', unlocked: false },
  { id: '6', name: 'Course Complete', unlocked: false },
];

// Helper function to format the join date
const formatJoinDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
};

// Get join date from localStorage or use current date as fallback
const getJoinDate = (): string => {
  try {
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      const progress: Progress = JSON.parse(savedProgress);
      if (progress.joinDate) {
        return formatJoinDate(progress.joinDate);
      }
    }
  } catch (error) {
    console.error('Error reading join date from localStorage:', error);
  }
  // Fallback to current date if no saved progress
  return formatJoinDate(new Date().toISOString());
};

export const ProfilePage: React.FC = () => {
  const joinDate = getJoinDate();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Profile
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          Track your progress and manage your account
        </p>
      </div>

      {/* Profile Header */}
      <Card variant="elevated" className="mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-success dark:from-accent-dark dark:to-success-dark flex items-center justify-center flex-shrink-0">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-1">
              John Doe
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-small text-secondary-text dark:text-secondary-text-dark mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {joinDate}</span>
              </div>
            </div>
            <Badge colorScheme="accent">Intermediate Learner</Badge>
          </div>
          <Button variant="secondary" size="md" leftIcon={<Edit2 className="w-4 h-4" />}>
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Statistics */}
      <div className="mb-6">
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
          Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card variant="default">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-success/10 dark:bg-success-dark/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-success dark:text-success-dark" />
              </div>
              <div>
                <p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
                  245
                </p>
                <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                  Words Learned
                </p>
              </div>
            </div>
          </Card>
          
          <Card variant="default">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-info/10 dark:bg-info-dark/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-info dark:text-info-dark" />
              </div>
              <div>
                <p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
                  12
                </p>
                <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                  Lessons Completed
                </p>
              </div>
            </div>
          </Card>
          
          <Card variant="default">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 dark:bg-accent-dark/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent dark:text-accent-dark" />
              </div>
              <div>
                <p className="font-heading text-h2 text-primary-text dark:text-primary-text-dark">
                  7
                </p>
                <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                  Day Streak
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">
          Achievements
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              variant="default"
              className={
                !achievement.unlocked ? 'text-center transition-all duration-300 opacity-40' : 'text-center transition-all duration-300'
              }
            >
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-accent to-success dark:from-accent-dark dark:to-success-dark flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className="text-small text-primary-text dark:text-primary-text-dark font-medium">
                {achievement.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
