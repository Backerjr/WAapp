import { useState, useEffect } from 'react';
import { Progress, UserStats } from './types';
import { skillTree } from './data/lessons';
import { ALL_ACHIEVEMENTS } from './data/achievements';
import SkillTree from './components/legacy/SkillTree';
import LessonView from './components/legacy/LessonView';
import Header from './components/Header';
import ProgressionDashboard from './components/legacy/ProgressionDashboard';
import LandingPage from './components/legacy/LandingPage';
import AboutPage from './components/legacy/AboutPage';
import Sidebar from './components/Sidebar';
import './App.css';

const INITIAL_PROGRESS: Progress = {
  completedLessons: [],
  xp: 0,
  streak: 1,
  hearts: 5,
  lastActiveDate: new Date().toDateString(),
  joinDate: new Date().toISOString(),
  // Enhanced progression features
  level: 1,
  dailyGoal: 20, // 20 XP per day
  dailyXP: 0,
  achievements: [],
  weeklyStreak: 0
};

const INITIAL_STATS: UserStats = {
  currentLesson: null,
  exerciseIndex: 0
};

type ViewMode = 'home' | 'learn' | 'progress' | 'about';

function App() {
  const [progress, setProgress] = useState<Progress>(INITIAL_PROGRESS);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_STATS);
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Load and migrate saved data on mount
    const loadSavedData = () => {
      const savedProgress = localStorage.getItem('progress');
      const savedStats = localStorage.getItem('userStats');
      
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        const today = new Date().toDateString();
        
        // Migration: add joinDate if it doesn't exist
        if (!parsed.joinDate) {
          parsed.joinDate = new Date().toISOString();
        }
        
        if (parsed.lastActiveDate !== today) {
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          if (parsed.lastActiveDate === yesterday) {
            parsed.streak += 1;
          } else {
            parsed.streak = 1;
          }
          parsed.lastActiveDate = today;
        }
        
        return { progress: parsed, stats: savedStats ? JSON.parse(savedStats) : null };
      }
      
      return { progress: null, stats: savedStats ? JSON.parse(savedStats) : null };
    };

    // Use microtask to batch state updates
    Promise.resolve().then(() => {
      const { progress: loadedProgress, stats: loadedStats } = loadSavedData();
      
      if (loadedProgress) {
        setProgress(loadedProgress);
      }
      
      if (loadedStats) {
        setUserStats(loadedStats);
      }
    });
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

  const handleNavigation = (page: string) => {
    setViewMode(page as ViewMode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Mobile overlay when sidebar is open */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Conditionally render Sidebar based on mobile state */}
      {(!isMobile || isMobileMenuOpen) && (
        <Sidebar 
          activePage={viewMode} 
          setActivePage={(page) => {
            const normalizedPage = page.toLowerCase();
            const validModes: ViewMode[] = ['home', 'learn', 'progress', 'about'];
            if (validModes.includes(normalizedPage as ViewMode)) {
              setViewMode(normalizedPage as ViewMode);
            }
            if (isMobile) {
              setIsMobileMenuOpen(false);
            }
          }} 
        />
      )}
      
      <main className="main-content">
        <Header
          progress={progress}
          currentView={viewMode as string}
          onViewChange={(view) => setViewMode(view as ViewMode)}
          isMobile={isMobile}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
        
        {!currentLesson ? (
          <>
            {viewMode === 'learn' && (
              <SkillTree 
                units={skillTree} 
                progress={progress}
                onStartLesson={startLesson}
              />
            )}
            {viewMode === 'progress' && (
              <ProgressionDashboard 
                progress={progress}
                achievements={ALL_ACHIEVEMENTS}
              />
            )}
            {viewMode === 'home' && <LandingPage onNavigate={handleNavigation} />}
            {viewMode === 'about' && <AboutPage onNavigate={handleNavigation} />}

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
      </main>
    </div>
  );
}

export default App;
