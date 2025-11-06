import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/rozmowa';
import { ArrowLeft, Heart, Trophy } from 'lucide-react';
import { skillTree } from '../../data/lessons';
import ExerciseCard from '../../components/legacy/ExerciseCard';

export const LessonPlayer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);

  const lesson = skillTree
    .flatMap(unit => unit.lessons)
    .find(l => l.id === lessonId);

  useEffect(() => {
    // Reset state when lesson changes
    setExerciseIndex(0);
    setHearts(5);
    setXpEarned(0);
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="secondary"
          onClick={() => navigate('/learn')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lessons
        </Button>
        <div className="text-center py-12">
          <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-4">
            Lesson Not Found
          </h1>
          <p className="text-body text-secondary-text dark:text-secondary-text-dark">
            The lesson you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const currentExercise = lesson.exercises[exerciseIndex];
  const isLastExercise = exerciseIndex === lesson.exercises.length - 1;

  const handleCorrect = () => {
    const earnedXP = 10;
    setXpEarned(prev => prev + earnedXP);
    
    // Auto-advance after correct answer with delay
    setTimeout(() => {
      if (isLastExercise) {
        handleComplete();
      } else {
        setExerciseIndex(prev => prev + 1);
      }
    }, 1500);
  };

  const handleIncorrect = () => {
    setHearts(prev => Math.max(0, prev - 1));
  };

  const handleComplete = () => {
    // Save progress to localStorage
    const savedProgress = localStorage.getItem('progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { completedLessons: [], xp: 0 };
    
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
    progress.xp = (progress.xp || 0) + xpEarned;
    
    localStorage.setItem('progress', JSON.stringify(progress));
    
    // Navigate back to learn page
    navigate('/learn');
  };

  const handleExit = () => {
    navigate('/learn');
  };

  if (hearts === 0) {
    return (
      <div className="min-h-screen bg-primary-background dark:bg-primary-background-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <Heart className="w-24 h-24 text-error dark:text-error-dark mx-auto mb-4" />
            <h1 className="font-heading text-h1 text-primary-text dark:text-primary-text-dark mb-2">
              Out of Hearts
            </h1>
            <p className="text-body text-secondary-text dark:text-secondary-text-dark">
              You've run out of hearts. Try again later or review the lesson material.
            </p>
          </div>
          <div className="space-y-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleExit}
              className="w-full"
            >
              Return to Lessons
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-background dark:bg-primary-background-dark">
      {/* Header with stats */}
      <div className="sticky top-0 z-10 bg-container-background dark:bg-container-background-dark border-b border-border dark:border-border-dark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit
            </Button>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-error dark:text-error-dark" />
                <span className="font-semibold text-primary-text dark:text-primary-text-dark">
                  {hearts}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-accent dark:text-accent-dark" />
                <span className="font-semibold text-primary-text dark:text-primary-text-dark">
                  {xpEarned} XP
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 bg-primary-background dark:bg-primary-background-dark rounded-full overflow-hidden">
              <div
                className="h-full bg-success dark:bg-success-dark transition-all duration-300"
                style={{ width: `${((exerciseIndex + 1) / lesson.exercises.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Exercise content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <ExerciseCard
            exercise={currentExercise}
            exerciseIndex={exerciseIndex}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
