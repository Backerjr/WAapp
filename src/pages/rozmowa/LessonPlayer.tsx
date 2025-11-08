import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/rozmowa';
import Header from '../../components/Header';
import { skillTree } from '../../data/lessons';
import { sm2 } from '../../lib/sm2';
import { Exercise, LessonAction, LessonState } from '../../types';
import MultipleChoice from '../../components/exercises/MultipleChoice';
import ListenAndSelect from '../../components/exercises/ListenAndSelect';
import TypeAnswer from '../../components/exercises/TypeAnswer';
import ListenAndType from '../../components/exercises/ListenAndType';
import DragWords from '../../components/exercises/DragWords';
import FillBlanks from '../../components/exercises/FillBlanks';

const initialState: LessonState = {
  exerciseIndex: 0,
  xpEarned: 0,
  showQualityButtons: false,
   showResult: false,
};

const lessonReducer = (state: LessonState, action: LessonAction): LessonState => {
  switch (action.type) {
    case 'RESET':
      return initialState;
    case 'INCREMENT_INDEX':
      return { ...state, exerciseIndex: state.exerciseIndex + 1, showResult: false };
    case 'ADD_XP':
      return { ...state, xpEarned: state.xpEarned + action.payload };
    case 'SHOW_QUALITY_BUTTONS':
      return { ...state, showQualityButtons: true };
    case 'SHOW_RESULT':
      return { ...state, showResult: action.payload };
    default:
      return state;
  }
};

export const LessonPlayer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const reviewExerciseId = searchParams.get('exercise');
  const isReviewMode = !!reviewExerciseId;

  const [state, dispatch] = useReducer(lessonReducer, initialState);

  const lesson = skillTree.flatMap(unit => unit.lessons).find(l => l.id === lessonId);

  const exercises = isReviewMode
    ? lesson?.exercises.filter(ex => ex.id === reviewExerciseId) || []
    : lesson?.exercises || [];

  useEffect(() => {
    // Reset state whenever the lesson or review mode changes
    dispatch({ type: 'RESET' });
  }, [lessonId, reviewExerciseId]);

  if (!lesson) {
    return <div>Lesson not found</div>;
  }

  const currentExercise = exercises[state.exerciseIndex];
  const isLastExercise = state.exerciseIndex === exercises.length - 1;

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

  const handleSubmit = (isCorrect: boolean) => {
    dispatch({ type: 'SHOW_RESULT', payload: true });

    if (isCorrect) {
      if (isReviewMode) {
        dispatch({ type: 'SHOW_QUALITY_BUTTONS' });
      } else {
        const earnedXP = 10;
        dispatch({ type: 'ADD_XP', payload: earnedXP });
        setTimeout(() => {
          if (isLastExercise) {
            handleLessonComplete();
          } else {
            dispatch({ type: 'INCREMENT_INDEX' });
          }
        }, 1000);
      }
    } else {
      if (isReviewMode) {
        handleReviewComplete(0);
      }
    }
  };

  const handleLessonComplete = () => {
    const savedProgress = localStorage.getItem('progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { completedLessons: [], xp: 0 };

    if (lessonId && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
    progress.xp = (progress.xp || 0) + state.xpEarned;

    localStorage.setItem('progress', JSON.stringify(progress));
    navigate('/learn');
  };

  const renderExercise = (exercise: Exercise) => {
   // Fix showResult type and add missing handlers
   let showResult: "correct" | "incorrect" | null = null;
   if (state.showResult) {
    showResult = state.showQualityButtons ? null : "correct"; // Example logic, adjust as needed
   }
   const commonProps = { exercise, onSubmit: handleSubmit, showResult };
   const correctHandler = () => dispatch({ type: 'ADD_XP', payload: 10 });
   const incorrectHandler = () => {};
    switch (exercise.type) {
      case 'multiple_choice':
      return <MultipleChoice {...commonProps} />;
      case 'listen_and_select':
      return <ListenAndSelect {...commonProps} />;
      case 'type_answer':
      return <TypeAnswer {...commonProps} />;
      case 'listen_and_type':
      return <ListenAndType {...commonProps} />;
      case 'drag_words':
      return <DragWords {...commonProps} onCorrect={correctHandler} onIncorrect={incorrectHandler} />;
      case 'fill_blanks':
      return <FillBlanks {...commonProps} onCorrect={correctHandler} onIncorrect={incorrectHandler} />;
      default:
        return <div>Unsupported exercise type</div>;
    }
  };

  if (!currentExercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-primary-background dark:bg-primary-background-dark">
      <Header progress={{
        completedLessons: [],
        xp: state.xpEarned,
        streak: 0,
        hearts: 5,
        lastActiveDate: new Date().toISOString(),
        joinDate: new Date().toISOString(),
        level: 1,
        dailyGoal: 10,
        dailyXP: state.xpEarned,
        achievements: [],
        weeklyStreak: 0
      }} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {state.showQualityButtons ? (
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