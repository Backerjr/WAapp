import React, { useState } from 'react';
import { Exercise } from '../../types';
import './DragWords.css';

interface DragWordsProps {
  exercise: Exercise;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const DragWords: React.FC<DragWordsProps> = ({ exercise, onCorrect, onIncorrect }) => {
  const [draggedWords, setDraggedWords] = useState<string[]>([]);
  
  // Shuffle words once on initial render and store in state
  const [shuffledWords] = useState(() => 
    [...(exercise.words || [])].sort(() => Math.random() - 0.5)
  );

  const [availableWords, setAvailableWords] = useState<string[]>(shuffledWords);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (word: string) => {
    setDraggedItem(word);
  };

  const handleDrop = (e: React.DragEvent, zone: 'available' | 'answer') => {
    e.preventDefault();
    if (!draggedItem) return;

    if (zone === 'answer' && !draggedWords.includes(draggedItem)) {
      setDraggedWords([...draggedWords, draggedItem]);
      setAvailableWords(availableWords.filter(w => w !== draggedItem));
    } else if (zone === 'available' && draggedWords.includes(draggedItem)) {
      setAvailableWords([...availableWords, draggedItem]);
      setDraggedWords(draggedWords.filter(w => w !== draggedItem));
    }

    setDraggedItem(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const removeWord = (word: string) => {
    setDraggedWords(draggedWords.filter(w => w !== word));
    setAvailableWords([...availableWords, word]);
  };

  const checkAnswer = () => {
    const userAnswer = draggedWords.join(' ');
    if (userAnswer.toLowerCase().trim() === exercise.correctAnswer.toLowerCase().trim()) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  return (
    <div className="drag-words-container">
      <div className="exercise-prompt">
        <h3>{exercise.prompt_en}</h3>
        <p className="prompt-translation">{exercise.prompt_pl}</p>
      </div>

      {/* Answer Zone */}
      <div 
        className="answer-zone"
        onDrop={(e) => handleDrop(e, 'answer')}
        onDragOver={handleDragOver}
      >
        {draggedWords.length === 0 ? (
          <div className="drop-hint">Drag words here / Przeciągnij słowa tutaj</div>
        ) : (
          <div className="word-sentence">
            {draggedWords.map((word, index) => (
              <span 
                key={`${word}-${index}`}
                className="dropped-word"
                onClick={() => removeWord(word)}
              >
                {word}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Available Words */}
      <div 
        className="words-bank"
        onDrop={(e) => handleDrop(e, 'available')}
        onDragOver={handleDragOver}
      >
        {availableWords.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="draggable-word"
            draggable
            onDragStart={() => handleDragStart(word)}
          >
            {word}
          </span>
        ))}
      </div>

      <button 
        className="check-answer-btn"
        onClick={checkAnswer}
        disabled={draggedWords.length === 0}
      >
        Check Answer / Sprawdź odpowiedź
      </button>
    </div>
  );
};

export default DragWords;
