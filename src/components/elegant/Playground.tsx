import React from 'react';
import MultipleChoice from '../exercises/MultipleChoice';
import ListenAndType from '../exercises/ListenAndType';
import DragWords from '../exercises/DragWords';
import { Exercise } from '../../types';

interface PlaygroundProps {
  exercises: Exercise[];
}

const Playground: React.FC<PlaygroundProps> = ({ exercises }) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = React.useState(0);

  const renderExercise = () => {
    const exercise = exercises[currentExerciseIndex];
    switch (exercise.type) {
      case 'multiple_choice':
        return <MultipleChoice {...exercise} />;
      case 'listen_and_type':
        return <ListenAndType {...exercise} />;
      case 'drag_words':
        return <DragWords {...exercise} />;
      default:
        return <p>Unsupported exercise type</p>;
    }
  };

  return (
    <div className="playground">
      {renderExercise()}
      <div className="playground-nav">
        <button
          onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
          disabled={currentExerciseIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentExerciseIndex(prev => Math.min(exercises.length - 1, prev + 1))}
          disabled={currentExerciseIndex === exercises.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Playground;
