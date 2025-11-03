import { Lesson } from '../../types';
import ExerciseCard from './ExerciseCard';

interface LessonViewProps {
  lesson: Lesson;
  exerciseIndex: number;
  onComplete: (lessonId: string, earnedXP: number) => void;
  onLoseHeart: () => void;
  onExit: () => void;
  onNextExercise: (index: number) => void;
}

function LessonView({
  lesson,
  exerciseIndex,
  onComplete,
  onLoseHeart,
  onExit,
  onNextExercise
}: LessonViewProps) {
  const currentExercise = lesson.exercises[exerciseIndex];
  const progress = ((exerciseIndex + 1) / lesson.exercises.length) * 100;

  const handleCorrect = () => {
    if (exerciseIndex < lesson.exercises.length - 1) {
      setTimeout(() => {
        onNextExercise(exerciseIndex + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        onComplete(lesson.id, lesson.xp);
      }, 1500);
    }
  };

  const handleIncorrect = () => {
    onLoseHeart();
  };

  if (!currentExercise) {
    return null;
  }

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <button className="exit-btn" onClick={onExit}>✕ Wyjdź</button>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="lesson-title">
          {lesson.title_pl} ({exerciseIndex + 1}/{lesson.exercises.length})
        </div>
      </div>

      <div className="lesson-content">
        <ExerciseCard
          exercise={currentExercise}
          exerciseIndex={exerciseIndex}
          onCorrect={handleCorrect}
          onIncorrect={handleIncorrect}
        />
      </div>
    </div>
  );
}

export default LessonView;
