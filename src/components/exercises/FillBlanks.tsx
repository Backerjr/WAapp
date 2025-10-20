import React, { useState } from 'react';
import { Exercise } from '../../types';
import './FillBlanks.css';

interface FillBlanksProps {
  exercise: Exercise;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const FillBlanks: React.FC<FillBlanksProps> = ({ exercise, onCorrect, onIncorrect }) => {
  // Ensure we have the required fields, fallback to safe defaults
  const exerciseSentence = exercise.sentence || '';
  const exerciseBlanks = exercise.blanks || [];
  
  const [userAnswers, setUserAnswers] = useState<string[]>(
    new Array(exerciseBlanks.length).fill('')
  );
  const [showFeedback, setShowFeedback] = useState<boolean[]>(
    new Array(exerciseBlanks.length).fill(false)
  );

  // Split sentence into parts and identify blank positions
  const sentenceParts = exerciseSentence.split('___');
  
  const handleInputChange = (index: number, value: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
    
    // Reset feedback when user starts typing
    const newFeedback = [...showFeedback];
    newFeedback[index] = false;
    setShowFeedback(newFeedback);
  };

  const checkAnswer = () => {
    const newFeedback = userAnswers.map((answer, index) => 
      answer.toLowerCase().trim() === exerciseBlanks[index].toLowerCase().trim()
    );
    
    setShowFeedback(newFeedback);
    
    if (newFeedback.every(correct => correct)) {
      setTimeout(onCorrect, 500);
    } else {
      setTimeout(onIncorrect, 500);
    }
  };

  const getInputClass = (index: number) => {
    if (!showFeedback[index]) return 'blank-input';
    return showFeedback[index] && 
           userAnswers[index].toLowerCase().trim() === exerciseBlanks[index].toLowerCase().trim()
      ? 'blank-input correct'
      : 'blank-input incorrect';
  };

  const allFieldsFilled = userAnswers.every(answer => answer.trim() !== '');

  return (
    <div className="fill-blanks-container">
      <div className="exercise-prompt">
        <h3>{exercise.prompt_en}</h3>
        <p className="prompt-translation">{exercise.prompt_pl}</p>
      </div>

      <div className="sentence-container">
        {sentenceParts.map((part, index) => (
          <React.Fragment key={index}>
            <span className="sentence-part">{part}</span>
            {index < exerciseBlanks.length && (
              <input
                type="text"
                className={getInputClass(index)}
                value={userAnswers[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                placeholder={`_____`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && allFieldsFilled) {
                    checkAnswer();
                  }
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Hints for incorrect answers */}
      {showFeedback.some(f => f !== null) && (
        <div className="feedback-area">
          {showFeedback.map((isCorrect, index) => {
            if (isCorrect || userAnswers[index].toLowerCase().trim() === exerciseBlanks[index].toLowerCase().trim()) {
              return null;
            }
            return (
              <div key={index} className="hint">
                💡 Blank {index + 1}: Try "{exerciseBlanks[index]}"
              </div>
            );
          })}
        </div>
      )}

      <button 
        className="check-answer-btn"
        onClick={checkAnswer}
        disabled={!allFieldsFilled}
      >
        Check Answer / Sprawdź odpowiedź
      </button>

      {/* Progress indicator */}
      <div className="progress-indicator">
        {userAnswers.filter(answer => answer.trim() !== '').length} / {exerciseBlanks.length} filled
      </div>
    </div>
  );
};

export default FillBlanks;