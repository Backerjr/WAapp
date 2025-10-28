import React, { useState } from 'react';
import MultipleChoice from '../exercises/MultipleChoice';
import ListenAndType from '../exercises/ListenAndType';
import DragWords from '../exercises/DragWords';
import { Exercise } from '../../types';

interface PlaygroundProps {
  exercises: Exercise[];
}

const Playground: React.FC<PlaygroundProps> = ({ exercises }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showResult, setShowResult] = useState<'correct' | 'incorrect' | null>(null);

  const handleNext = () => {
    setShowResult(null);
    setCurrentExerciseIndex(prev => Math.min(exercises.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setShowResult(null);
    setCurrentExerciseIndex(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = (isCorrect: boolean) => {
    setShowResult(isCorrect ? 'correct' : 'incorrect');
  };

  const handleCorrect = () => {
    setShowResult('correct');
  };

  const handleIncorrect = () => {
    setShowResult('incorrect');
  };

  const renderExercise = () => {
    const exercise = exercises[currentExerciseIndex];
    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice exercise={exercise} onSubmit={handleSubmit} showResult={showResult} />;
      case 'listen_and_type':
        return <ListenAndType exercise={exercise} onSubmit={handleSubmit} showResult={showResult} />;
      case 'drag_words':
        return <DragWords exercise={exercise} onCorrect={handleCorrect} onIncorrect={handleIncorrect} />;
      default:
        return <p>Unsupported exercise type</p>;
    }
  };

  return (
    <div className="playground">
      {renderExercise()}
      <div className="playground-nav">
        <button
          onClick={handlePrev}
          disabled={currentExerciseIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentExerciseIndex === exercises.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Playground;
