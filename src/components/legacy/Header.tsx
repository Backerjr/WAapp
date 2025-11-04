import { Progress } from '../../types';
import StatusBeacon from './StatusBeacon';

interface HeaderProps {
  progress: Progress;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

/*
  Accessibility changes:
  - Remove the page-level H1 from the shared header to avoid multiple H1s on pages.
  - Keep the visual logo but render as a non-heading element.
  - Hide decorative emoji from screen readers while keeping text accessible.
  - Add aria-labels on nav and individual stats for screen reader context.
*/
function Header({ progress, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {/* Logo (not a page-level heading) */}
          <div className="logo">
            <span aria-hidden="true">🌙</span> Rozmowa
          </div>
          <StatusBeacon position="inline" showLabel={false} />
        </div>
        
        {onViewChange && (
          <nav className="view-nav" aria-label="Main navigation">
            <button
              className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
              onClick={() => onViewChange('home')}
            >
              🏠 Home
            </button>
            <button
              className={`nav-button ${currentView === 'learn' ? 'active' : ''}`}
              onClick={() => onViewChange('learn')}
            >
              🎓 Learn
            </button>
            <button
              className={`nav-button ${currentView === 'progress' ? 'active' : ''}`}
              onClick={() => onViewChange('progress')}
            >
              📊 Progress
            </button>
            <button
              className={`nav-button ${currentView === 'about' ? 'active' : ''}`}
              onClick={() => onViewChange('about')}
            >
              ℹ️ About
            </button>
          </nav>
        )}
        
        <div className="stats">
          <div className="stat-item" aria-label={`Day streak: ${progress.streak}`}>
            <span className="stat-icon" aria-hidden="true">🔥</span>
            <span className="stat-value">{progress.streak}</span>
          </div>
          
          <div className="stat-item" aria-label={`Total XP: ${progress.xp}`}>
            <span className="stat-icon" aria-hidden="true">✨</span>
            <span className="stat-value">{progress.xp}</span>
          </div>
          
          <div className="stat-item" aria-label={`Hearts remaining: ${progress.hearts}`}>
            <span className="stat-icon" aria-hidden="true">💜</span>
            <span className="stat-value">{progress.hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;