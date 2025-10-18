import { useState } from 'react';
import { Exercise } from '../../types';

interface ListenAndTypeProps {
  exercise: Exercise;
  onSubmit: (isCorrect: boolean) => void;
  showResult: 'correct' | 'incorrect' | null;
}

function ListenAndType({ exercise, onSubmit, showResult }: ListenAndTypeProps) {
  const [answer, setAnswer] = useState('');

  const playAudio = () => {
    if (exercise.audioText && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(exercise.audioText);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || showResult) return;
    
    const isCorrect = answer.trim().toLowerCase() === exercise.correctAnswer.toLowerCase();
    onSubmit(isCorrect);
  };

  return (
    <form className="exercise-content" onSubmit={handleSubmit}>
      <button type="button" className="audio-btn" onClick={playAudio}>
        🔊 Odtwórz audio
      </button>

      <input
        type="text"
        className="answer-input"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Wpisz co słyszysz..."
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

export default ListenAndType;
