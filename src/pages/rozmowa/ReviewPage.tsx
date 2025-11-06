import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components/rozmowa';
import { RefreshCw, BookOpen, CheckCircle } from 'lucide-react';
import { skillTree } from '../../data/lessons';

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [reviewItems, setReviewItems] = useState<any[]>([]);

  useEffect(() => {
    // Load completed lessons for review
    const savedProgress = localStorage.getItem('progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const completedLessonIds = progress.completedLessons || [];
      
      // Get all completed lessons
      const completedLessons = skillTree
        .flatMap(unit => unit.lessons)
        .filter(lesson => completedLessonIds.includes(lesson.id))
        .map(lesson => ({
          ...lesson,
          unitTitle: skillTree.find(u => u.lessons.some(l => l.id === lesson.id))?.title_en
        }));
      
      setReviewItems(completedLessons);
    }
  }, []);

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
            No Lessons to Review Yet
          </h2>
          <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-6">
            Complete some lessons first, then come back here to review and reinforce your learning.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate('/learn')}>
            Start Learning
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
          Review {reviewItems.length} completed lessons to strengthen your knowledge
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {reviewItems.map((lesson) => (
          <Card key={lesson.id} variant="default" className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-small text-secondary-text dark:text-secondary-text-dark mb-1">
                  {lesson.unitTitle}
                </p>
                <h3 className="font-heading text-h3 text-primary-text dark:text-primary-text-dark mb-2">
                  {lesson.title_en}
                </h3>
                <p className="text-small text-secondary-text dark:text-secondary-text-dark">
                  {lesson.description_en || ''}
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-success dark:text-success-dark flex-shrink-0 ml-2" />
            </div>
            <div className="flex items-center gap-2 text-small text-secondary-text dark:text-secondary-text-dark mb-3">
              <BookOpen className="w-4 h-4" />
              <span>{lesson.exercises.length} exercises</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={() => navigate(`/lesson/${lesson.id}`)}
            >
              Review Lesson
            </Button>
          </Card>
        ))}
      </div>

      <Card variant="elevated" className="max-w-2xl mx-auto text-center py-8">
        <RefreshCw className="w-12 h-12 text-info dark:text-info-dark mx-auto mb-4" />
        <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-2">
          Quick Review Mode
        </h2>
        <p className="text-body text-secondary-text dark:text-secondary-text-dark mb-6">
          Review all lessons in a randomized sequence for maximum learning efficiency.
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            // Navigate to first review item
            if (reviewItems.length > 0) {
              const randomLesson = reviewItems[Math.floor(Math.random() * reviewItems.length)];
              navigate(`/lesson/${randomLesson.id}`);
            }
          }}
        >
          Start Quick Review
        </Button>
      </Card>
    </div>
  );
};

export default ReviewPage;
