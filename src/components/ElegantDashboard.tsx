import React, { useState, useEffect } from 'react';
import { Progress } from '../types';
import QuoteOfTheDay from './elegant/QuoteOfTheDay';
import InteractiveAudio from './elegant/InteractiveAudio';
import ConversationStarter from './elegant/ConversationStarter';
import TeacherTools from './elegant/TeacherTools';
import GlowingProgress from './elegant/GlowingProgress';
import './elegant/ElegantDashboard.css';

interface ElegantDashboardProps {
  progress: Progress;
  onProgressUpdate: (progress: Progress) => void;
}

const ElegantDashboard: React.FC<ElegantDashboardProps> = ({
  progress,
  onProgressUpdate
}) => {
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [showTeacherTools, setShowTeacherTools] = useState(false);

  // Hidden teacher mode activation (Konami code style)
  useEffect(() => {
    let sequence = '';
    const teacherSequence = 'teacher';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toLowerCase();
      if (sequence.length > teacherSequence.length) {
        sequence = sequence.slice(-teacherSequence.length);
      }
      if (sequence === teacherSequence) {
        setIsTeacherMode(true);
        setShowTeacherTools(true);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="elegant-dashboard">
      <div className="cosmic-background">
        <div className="stars"></div>
        <div className="nebula"></div>
      </div>
      
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-main">WAapp</span>
            <span className="title-subtitle">Journey Through Polish</span>
          </h1>
          
          {isTeacherMode && (
            <button 
              className="teacher-mode-toggle"
              onClick={() => setShowTeacherTools(!showTeacherTools)}
            >
              <span className="icon">🔮</span>
              Teacher Tools
            </button>
          )}
        </div>
      </header>

      <main className="dashboard-main">
        <div className="content-grid">
          {/* Main Learning Content */}
          <section className="learning-section">
            <div className="card-container">
              <QuoteOfTheDay />
              <InteractiveAudio />
              <ConversationStarter />
            </div>
          </section>

          {/* Progress Sidebar */}
          <aside className="progress-sidebar">
            <GlowingProgress progress={progress} />
          </aside>
        </div>

        {/* Teacher Tools (Hidden Gem) */}
        {showTeacherTools && (
          <TeacherTools 
            onClose={() => setShowTeacherTools(false)}
            onProgressUpdate={onProgressUpdate}
          />
        )}
      </main>

      <footer className="dashboard-footer">
        <div className="footer-content">
          <p className="footer-quote">
            "Language is the road map of a culture. It tells you where its people come from and where they are going."
          </p>
          <p className="footer-author">— Rita Mae Brown</p>
        </div>
      </footer>
    </div>
  );
};

export default ElegantDashboard;