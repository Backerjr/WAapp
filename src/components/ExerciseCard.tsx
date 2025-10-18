import { useState, useEffect } from 'react';
import { Exercise } from '../types';
import MultipleChoice from './exercises/MultipleChoice';
import TypeAnswer from './exercises/TypeAnswer';
import ListenAndSelect from './exercises/ListenAndSelect';
import ListenAndType from './exercises/ListenAndType';

interface ExerciseCardProps {
  exercise: Exercise;
  exerciseIndex: number;
  onCorrect: () => void;
  onIncorrect: () => void;
  isLastExercise: boolean;
}

function ExerciseCard({ exercise, exerciseIndex, onCorrect, onIncorrect, isLastExercise }: ExerciseCardProps) {
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setShowResult(null);
    setShowHint(false);
  }, [exerciseIndex]);

  const handleSubmit = (isCorrect: boolean) => {
    setShowResult(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const renderExercise = () => {
    const props = {
      exercise,
      onSubmit: handleSubmit,
      showResult,
    };

    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice {...props} />;
      case 'type_answer':
        return <TypeAnswer {...props} />;
      case 'listen_and_select':
        return <ListenAndSelect {...props} />;
      case 'listen_and_type':
        return <ListenAndType {...props} />;
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return (
    <div className="exercise-card">
      <div className="exercise-prompt">
        <h2>{exercise.prompt_pl}</h2>
        {exercise.prompt_en && (
          <p className="prompt-subtitle">{exercise.prompt_en}</p>
        )}
      </div>

      {renderExercise()}

      {exercise.hint_pl && (
        <div className="hint-section">
          {!showHint ? (
            <button 
              className="hint-btn" 
              onClick={() => setShowHint(true)}
            >
              💡 Podpowiedź
            </button>
          ) : (
            <div className="hint-box">
              <strong>Podpowiedź:</strong> {exercise.hint_pl}
            </div>
          )}
        </div>
      )}

      {showResult && (
        <div className={`result-banner ${showResult}`}>
          {showResult === 'correct' ? (
            <>
              <div className="result-icon">✅</div>
              <div className="result-text">
                <strong>Świetnie!</strong>
                <p>Poprawna odpowiedź</p>
              </div>
            </>
          ) : (
            <>
              <div className="result-icon">❌</div>
              <div className="result-text">
                <strong>Spróbuj ponownie</strong>
                <p>Poprawna odpowiedź: {exercise.correctAnswer}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ExerciseCard;
