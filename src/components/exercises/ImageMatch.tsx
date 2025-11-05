import React, { useState, useMemo } from 'react';
import { Exercise } from '../../types';
import './ImageMatch.css';

interface ImageMatchProps {
  exercise: Exercise;
  onCorrect: () => void;
  onIncorrect: () => void;
}

const ImageMatch: React.FC<ImageMatchProps> = ({ exercise, onCorrect }) => {
  // Ensure we have pairs array, fallback to empty array
  const exercisePairs = exercise.pairs || [];
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [correctMatches, setCorrectMatches] = useState<Set<string>>(new Set());
  const [incorrectMatches, setIncorrectMatches] = useState<Set<string>>(new Set());

  // Shuffle the right side for variety - memoize to prevent re-shuffling on every render
  const shuffledPairs = useMemo(
    () => [...exercisePairs].sort(() => Math.random() - 0.5),
    [exercisePairs]
  );
  const leftItems = exercisePairs;
  const rightItems = useMemo(
    () => shuffledPairs.map(pair => pair.pl),
    [shuffledPairs]
  );

  const handleLeftClick = (item: string) => {
    if (correctMatches.has(item)) return;
    setSelectedLeft(selectedLeft === item ? null : item);
    setSelectedRight(null);
  };

  const handleRightClick = (item: string) => {
    if (correctMatches.has(item)) return;
    setSelectedRight(selectedRight === item ? null : item);
    
    if (selectedLeft) {
      checkMatch(selectedLeft, item);
    }
  };

  const checkMatch = (leftItem: string, rightItem: string) => {
    const correctPair = exercisePairs.find(pair => pair.en === leftItem);
    
    if (correctPair && correctPair.pl === rightItem) {
      // Correct match
      setMatches(prev => ({ ...prev, [leftItem]: rightItem }));
      setCorrectMatches(prev => new Set([...prev, leftItem, rightItem]));
      setIncorrectMatches(prev => {
        const newSet = new Set(prev);
        newSet.delete(leftItem);
        newSet.delete(rightItem);
        return newSet;
      });
      
      // Check if all matches are complete
      if (correctMatches.size + 2 >= exercisePairs.length * 2) {
        setTimeout(onCorrect, 500);
      }
    } else {
      // Incorrect match
      setIncorrectMatches(prev => new Set([...prev, leftItem, rightItem]));
      setTimeout(() => {
        setIncorrectMatches(prev => {
          const newSet = new Set(prev);
          newSet.delete(leftItem);
          newSet.delete(rightItem);
          return newSet;
        });
      }, 1000);
    }
    
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const getItemClass = (item: string, side: 'left' | 'right') => {
    let className = `match-item ${side}-item`;
    
    if (correctMatches.has(item)) {
      className += ' correct';
    } else if (incorrectMatches.has(item)) {
      className += ' incorrect';
    } else if ((side === 'left' && selectedLeft === item) || 
               (side === 'right' && selectedRight === item)) {
      className += ' selected';
    }
    
    return className;
  };

  return (
    <div className="image-match-container">
      <div className="exercise-prompt">
        <h3>{exercise.prompt_en}</h3>
        <p className="prompt-translation">{exercise.prompt_pl}</p>
      </div>

      <div className="matching-area">
        {/* Left side - English/Images */}
        <div className="left-column">
          {leftItems.map((pair, index) => (
            <div
              key={`left-${index}`}
              className={getItemClass(pair.en, 'left')}
              onClick={() => handleLeftClick(pair.en)}
            >
              {pair.image ? (
                <div className="image-item">
                  <img src={pair.image} alt={pair.en} />
                  <span>{pair.en}</span>
                </div>
              ) : (
                <span className="text-item">{pair.en}</span>
              )}
            </div>
          ))}
        </div>

        {/* Connecting lines (visual feedback) */}
        <div className="connections">
          {Object.entries(matches).map(([left, right]) => (
            <div key={`${left}-${right}`} className="connection-line" />
          ))}
        </div>

        {/* Right side - Polish translations */}
        <div className="right-column">
          {rightItems.map((item, index) => (
            <div
              key={`right-${index}`}
              className={getItemClass(item, 'right')}
              onClick={() => handleRightClick(item)}
            >
              <span className="text-item">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="progress-indicator">
        {correctMatches.size / 2} / {exercisePairs.length} matches
      </div>
    </div>
  );
};

export default ImageMatch;