import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/rozmowa';
import { RefreshCw, BookOpen } from 'lucide-react';
import { skillTree } from '../../data/lessons';
import { SM2Result } from '../../lib/sm2';
import { Exercise } from '../../types';

// Define types for better safety
interface ReviewItem extends Exercise {
  lessonId: string;
  unitTitle: string;
}

interface UserProgress {
  completedLessons: string[];
  reviewSchedule?: { [key: string]: SM2Result & { lastReviewed: number } };
}

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();

  // Load and calculate review items once on component initialization
  const [reviewItems] = useState<ReviewItem[]>(() => {
    const savedProgress = localStorage.getItem('progress');
    if (!savedProgress) {
      return [];
    }

    const progress: UserProgress = JSON.parse(savedProgress);
    const reviewSchedule = progress.reviewSchedule || {};
    const completedLessons = new Set(progress.completedLessons || []);

    // Get all exercises from completed lessons only
    const relevantExercises = skillTree.flatMap(unit =>
      unit.lessons
        .filter(lesson => completedLessons.has(lesson.id))
        .flatMap(lesson =>
          lesson.exercises.map(ex => ({ ...ex, lessonId: lesson.id, unitTitle: unit.title_en }))
        )
    );

    const itemsToReview = relevantExercises.filter(ex => {
      const reviewData = reviewSchedule[ex.id];
      if (!reviewData) {
        // If an exercise from a completed lesson has no review data, it needs review.
        return true;
      }
      const now = new Date().getTime();
      const daysSinceLastReview = (now - reviewData.lastReviewed) / (1000 * 60 * 60 * 24);
      return daysSinceLastReview >= reviewData.interval;
    });

    return itemsToReview;
  });

  const handleStartReview = () => {
    if (reviewItems.length > 0) {
      const firstItem = reviewItems[0];
      navigate(`/lesson/${firstItem.lessonId}?exercise=${firstItem.id}`);
    }
  };

  if (reviewItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
            Review
          </h1>
          <p className="text-body text-secondary-text dark:text-secondary-text-dark">
            Strengthen your knowledge with spaced repetition
          </p>
        </div>

        <Card variant="elevated" className="max-w-2xl mx-auto text-center py-12">
          <RefreshCw className="w-16 h-16 text-info dark:text-info-dark mx-auto mb-4" />
          <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-2">
            All Caught Up!
          </h2>
          <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-6">
            You have no exercises due for review right now. Keep learning new material!
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/learn')}>
            Explore Lessons
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
          Review Queue
        </h1>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark">
          You have {reviewItems.length} exercises to review
        </p>
      </div>

      <Card variant="elevated" className="max-w-2xl mx-auto text-center py-8">
        <BookOpen className="w-12 h-12 text-info dark:text-info-dark mx-auto mb-4" />
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-2">
          Ready to Review?
        </h2>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-6">
          Reinforce your knowledge and commit it to long-term memory.
        </p>
        <Button variant="primary" size="lg" onClick={handleStartReview}>
          Start Review Session
        </Button>
      </Card>
    </div>
  );
};

export default ReviewPage;
