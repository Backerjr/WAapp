import { useState, useRef } from 'react';
import { Progress } from '../../types';
import AddLessonModal from './AddLessonModal.tsx';
import UploadAudioTool from './UploadAudioTool.tsx';
import TeacherDashboard from './TeacherDashboard.tsx';
import './TeacherTools.css';

interface TeacherToolsProps {
  onClose: () => void;
  onProgressUpdate: (progress: Progress) => void;
}

type ToolView = 'dashboard' | 'addLesson' | 'uploadAudio' | 'analytics';

const TeacherTools: React.FC<TeacherToolsProps> = ({ onClose }) => {
  const [currentView, setCurrentView] = useState<ToolView>('dashboard');
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  // Drag functionality for floating window
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const handleMouseMove = (e: MouseEvent) => {
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY
        });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const renderToolContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <TeacherDashboard />;
      case 'addLesson':
        return <AddLessonModal onClose={() => setCurrentView('dashboard')} />;
      case 'uploadAudio':
        return <UploadAudioTool />;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <div className={`teacher-tools-overlay ${isDragging ? 'dragging' : ''}`}>
      <div 
        className={`teacher-tools-window ${isMinimized ? 'minimized' : ''}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
        ref={dragRef}
      >
        <div className="tool-header" onMouseDown={handleMouseDown}>
          <div className="header-left">
            <div className="tool-icon">🔮</div>
            <h2 className="tool-title">Teacher Portal</h2>
            <div className="magic-sparkles">
              <span className="sparkle">✨</span>
              <span className="sparkle">⭐</span>
              <span className="sparkle">💫</span>
            </div>
          </div>
          
          <div className="header-controls">
            <button 
              className="minimize-button"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              {isMinimized ? '🔼' : '🔽'}
            </button>
            <button className="close-button" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <nav className="tool-navigation">
              <button 
                className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </button>
              
              <button 
                className={`nav-button ${currentView === 'addLesson' ? 'active' : ''}`}
                onClick={() => setCurrentView('addLesson')}
              >
                <span className="nav-icon">📝</span>
                Add Lesson
              </button>
              
              <button 
                className={`nav-button ${currentView === 'uploadAudio' ? 'active' : ''}`}
                onClick={() => setCurrentView('uploadAudio')}
              >
                <span className="nav-icon">🎵</span>
                Upload Audio
              </button>
            </nav>

            <div className="tool-content">
              {renderToolContent()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherTools;