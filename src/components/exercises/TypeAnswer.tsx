import { useState } from 'react';
import { Exercise } from '../../types';

interface TypeAnswerProps {
  exercise: Exercise;
  onSubmit: (isCorrect: boolean) => void;
  showResult: 'correct' | 'incorrect' | null;
}

function TypeAnswer({ exercise, onSubmit, showResult }: TypeAnswerProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || showResult) return;
    
    const isCorrect = answer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
    onSubmit(isCorrect);
  };

  return (
    <form className="exercise-content" onSubmit={handleSubmit}>
      <input
        type="text"
        className="answer-input"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Wpisz swoją odpowiedź..."
        disabled={!!showResult}
        autoFocus
      />

      <button
        type="submit"
        className="submit-btn"
        disabled={!answer.trim() || !!showResult}
      >
        Sprawdź
      </button>
    </form>
  );
}

export default TypeAnswer;
