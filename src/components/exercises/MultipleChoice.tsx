import { useState } from 'react';
import { Exercise } from '../../types';

interface MultipleChoiceProps {
  exercise: Exercise;
  onSubmit: (isCorrect: boolean) => void;
  showResult: 'correct' | 'incorrect' | null;
}

function MultipleChoice({ exercise, onSubmit, showResult }: MultipleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || showResult) return;
    
    const isCorrect = selectedAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();
    onSubmit(isCorrect);
  };

  return (
    <div className="exercise-content">
      <div className="options-grid">
        {exercise.options?.map((option) => (
          <button
            key={option}
            className={`option-btn ${selectedAnswer === option ? 'selected' : ''} ${
              showResult && option.toLowerCase() === exercise.correctAnswer.toLowerCase() ? 'correct' : ''
            } ${
              showResult && selectedAnswer === option && option.toLowerCase() !== exercise.correctAnswer.toLowerCase() ? 'incorrect' : ''
            }`}
            onClick={() => handleSelect(option)}
            disabled={!!showResult}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={!selectedAnswer || !!showResult}
      >
        Sprawdź
      </button>
    </div>
  );
}

export default MultipleChoice;
