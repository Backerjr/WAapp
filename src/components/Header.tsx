import { Progress } from '../types';
import StatusBeacon from './StatusBeacon';

interface HeaderProps {
  progress: Progress;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

function Header({ progress, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="logo">🌙 Rozmowa</h1>
          <StatusBeacon position="inline" showLabel={false} />
        </div>
        
        {onViewChange && (
          <nav className="view-nav">
            <button
              className={`nav-button ${currentView === 'website' ? 'active' : ''}`}
              onClick={() => onViewChange('website')}
            >
              🏠 Home
            </button>
            <button
              className={`nav-button ${currentView === 'learning' ? 'active' : ''}`}
              onClick={() => onViewChange('learning')}
            >
              🌙 Learn
            </button>
            <button
              className={`nav-button ${currentView === 'progress' ? 'active' : ''}`}
              onClick={() => onViewChange('progress')}
            >
              📊 Progress
            </button>
            <button
              className={`nav-button ${currentView === 'social' ? 'active' : ''}`}
              onClick={() => onViewChange('social')}
            >
              👥 Social
            </button>
            <button
              className={`nav-button ${currentView === 'planner' ? 'active' : ''}`}
              onClick={() => onViewChange('planner')}
            >
              ✨ Planner
            </button>
            <button
              className={`nav-button ${currentView === 'wall' ? 'active' : ''}`}
              onClick={() => onViewChange('wall')}
            >
              💬 Wall
            </button>
          </nav>
        )}
        
        <div className="stats">
          <div className="stat-item" title="Day Streak">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{progress.streak}</span>
          </div>
          
          <div className="stat-item" title="Total XP">
            <span className="stat-icon">✨</span>
            <span className="stat-value">{progress.xp}</span>
          </div>
          
          <div className="stat-item" title="Hearts Remaining">
            <span className="stat-icon">💜</span>
            <span className="stat-value">{progress.hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
