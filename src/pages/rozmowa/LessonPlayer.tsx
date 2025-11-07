
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/rozmowa';
import { ArrowLeft, Heart, Trophy } from 'lucide-react';
import { skillTree } from '../../data/lessons';
import { sm2 } from '../../lib/sm2';
import { Exercise } from '../../types';

// Import individual exercise components
import { MultipleChoice } from '../../components/exercises/MultipleChoice';
import { ListenAndSelect } from '../../components/exercises/ListenAndSelect';
import { TypeAnswer } from '../../components/exercises/TypeAnswer';
import { ListenAndType } from '../../components/exercises/ListenAndType';
import { DragWords } from '../../components/exercises/DragWords';
import { FillBlanks } from '../../components/exercises/FillBlanks';

export const LessonPlayer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reviewExerciseId = searchParams.get('exercise');
  const isReviewMode = !!reviewExerciseId;

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [xpEarned, setXpEarned] = useState(0);
  const [showQualityButtons, setShowQualityButtons] = useState(false);

  const lesson = skillTree.flatMap(unit => unit.lessons).find(l => l.id === lessonId);

  // Determine the exercises to be played
  const exercises = isReviewMode
    ? lesson?.exercises.filter(ex => ex.id === reviewExerciseId) || []
    : lesson?.exercises || [];

  useEffect(() => {
    setExerciseIndex(0);
    setHearts(5);
    setXpEarned(0);
    setShowQualityButtons(false);
  }, [lessonId, reviewExerciseId]);

  if (!lesson) {
    return <div>Lesson not found</div>; // Simplified error display
  }

  const currentExercise = exercises[exerciseIndex];
  const isLastExercise = exerciseIndex === exercises.length - 1;

  const handleReviewComplete = (quality: number) => {
    const savedProgress = localStorage.getItem('progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { reviewSchedule: {} };
    const reviewSchedule = progress.reviewSchedule || {};

    const currentData = reviewSchedule[currentExercise.id] || {
      interval: 0,
      repetitions: 0,
      easeFactor: 2.5,
    };

    const { interval, repetitions, easeFactor } = sm2(
      quality,
      currentData.repetitions,
      currentData.easeFactor,
      currentData.interval
    );

    reviewSchedule[currentExercise.id] = {
      interval,
      repetitions,
      easeFactor,
      lastReviewed: new Date().getTime(),
    };

    progress.reviewSchedule = reviewSchedule;
    localStorage.setItem('progress', JSON.stringify(progress));
    navigate('/review'); // Go back to review page
  };

  const handleCorrect = () => {
    if (isReviewMode) {
      setShowQualityButtons(true);
    } else {
      const earnedXP = 10;
      setXpEarned(prev => prev + earnedXP);
      setTimeout(() => {
        if (isLastExercise) {
          handleLessonComplete();
        } else {
          setExerciseIndex(prev => prev + 1);
        }
      }, 1000);
    }
  };

  const handleIncorrect = () => {
    if (isReviewMode) {
      // Treat incorrect answers in review as the lowest quality
      handleReviewComplete(0);
    } else {
      setHearts(prev => Math.max(0, prev - 1));
    }
  };

  const handleLessonComplete = () => {
    const savedProgress = localStorage.getItem('progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { completedLessons: [], xp: 0 };

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
    progress.xp = (progress.xp || 0) + xpEarned;

    localStorage.setItem('progress', JSON.stringify(progress));
    navigate('/learn');
  };

  const renderExercise = (exercise: Exercise) => {
    const props = { exercise, onCorrect: handleCorrect, onIncorrect: handleIncorrect };
    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice {...props} />;
      case 'listen_and_select':
        return <ListenAndSelect {...props} />;
      case 'type_answer':
        return <TypeAnswer {...props} />;
      case 'listen_and_type':
        return <ListenAndType {...props} />;
      case 'drag_words':
        return <DragWords {...props} />;
      case 'fill_blanks':
        return <FillBlanks {...props} />;
      default:
        return <div>Unsupported exercise type</div>;
    }
  };

  if (!currentExercise) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-primary-background dark:bg-primary-background-dark">
      <div className="sticky top-0 z-10 bg-container-background dark:bg-container-background-dark border-b border-border dark:border-border-dark">
        {/* Header */}
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {showQualityButtons ? (
            <div className="text-center">
              <h2 className="font-heading text-h2 text-primary-text dark:text-primary-text-dark mb-4">How did you do?</h2>
              <div className="flex justify-center gap-4">
                <Button variant="secondary" onClick={() => handleReviewComplete(2)}>Hard</Button>
                <Button variant="secondary" onClick={() => handleReviewComplete(4)}>Good</Button>
                <Button variant="primary" onClick={() => handleReviewComplete(5)}>Easy</Button>
              </div>
            </div>
          ) : (
            renderExercise(currentExercise)
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
