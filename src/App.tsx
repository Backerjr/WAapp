import { useState, useEffect } from 'react';
import { Progress, UserStats } from './types';
import { skillTree } from './data/lessons';
import SkillTree from './components/SkillTree';
import LessonView from './components/LessonView';
import Header from './components/Header';
import LessonPlanner from './components/LessonPlanner';
import './App.css';

const INITIAL_PROGRESS: Progress = {
  completedLessons: [],
  xp: 0,
  streak: 1,
  hearts: 5,
  lastActiveDate: new Date().toDateString()
};

const INITIAL_STATS: UserStats = {
  currentLesson: null,
  exerciseIndex: 0
};

type ViewMode = 'learning' | 'planner';

function App() {
  const [progress, setProgress] = useState<Progress>(INITIAL_PROGRESS);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_STATS);
  const [viewMode, setViewMode] = useState<ViewMode>('learning');

  useEffect(() => {
    const savedProgress = localStorage.getItem('progress');
    const savedStats = localStorage.getItem('userStats');
    
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      const today = new Date().toDateString();
      
      if (parsed.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        if (parsed.lastActiveDate === yesterday) {
          parsed.streak += 1;
        } else {
          parsed.streak = 1;
        }
        parsed.lastActiveDate = today;
      }
      
      setProgress(parsed);
    }
    
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  const startLesson = (lessonId: string) => {
    setUserStats({ currentLesson: lessonId, exerciseIndex: 0 });
  };

  const completeLesson = (lessonId: string, earnedXP: number) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...prev.completedLessons, lessonId],
      xp: prev.xp + earnedXP
    }));
    setUserStats({ currentLesson: null, exerciseIndex: 0 });
  };

  const loseHeart = () => {
    setProgress(prev => ({
      ...prev,
      hearts: Math.max(0, prev.hearts - 1)
    }));
  };

  const exitLesson = () => {
    setUserStats({ currentLesson: null, exerciseIndex: 0 });
  };

  const currentLesson = userStats.currentLesson
    ? skillTree
        .flatMap(unit => unit.lessons)
        .find(lesson => lesson.id === userStats.currentLesson)
    : null;

  return (
    <div className="app">
      <Header progress={progress} />
      
      {!currentLesson && (
        <nav className="app-navigation">
          <button
            className={`nav-btn ${viewMode === 'learning' ? 'active' : ''}`}
            onClick={() => setViewMode('learning')}
          >
            🌙 Learn English
          </button>
          <button
            className={`nav-btn ${viewMode === 'planner' ? 'active' : ''}`}
            onClick={() => setViewMode('planner')}
          >
            ✨ Lesson Planner
          </button>
        </nav>
      )}
      
      {!currentLesson ? (
        <>
          {viewMode === 'learning' ? (
            <SkillTree 
              units={skillTree} 
              progress={progress}
              onStartLesson={startLesson}
            />
          ) : (
            <LessonPlanner />
          )}
          <footer className="app-footer">
            <p className="footer-dedication">
              Dedicated to the one who teaches the world how to listen.
            </p>
          </footer>
        </>
      ) : (
        <LessonView
          lesson={currentLesson}
          exerciseIndex={userStats.exerciseIndex}
          onComplete={completeLesson}
          onLoseHeart={loseHeart}
          onExit={exitLesson}
          onNextExercise={(index) => setUserStats(prev => ({ ...prev, exerciseIndex: index }))}
        />
      )}
    </div>
  );
}

export default App;
