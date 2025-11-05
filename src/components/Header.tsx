import { Progress } from '../types';
import StatusBeacon from './legacy/StatusBeacon';

interface HeaderProps {
  progress: Progress;
  currentView?: string;
  onViewChange?: (view: string) => void;
  isMobile?: boolean;
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
}

/*
  Accessibility changes:
  - Remove the page-level H1 from the shared header to avoid multiple H1s on pages.
  - Keep the visual logo but render as a non-heading element.
  - Hide decorative emoji from screen readers while keeping text accessible.
  - Add aria-labels on nav and individual stats for screen reader context.
  - Add hamburger menu button for mobile navigation.
*/
function Header({ progress, currentView, onViewChange, isMobile, toggleMobileMenu }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          {/* Hamburger menu button (mobile only) */}
          {isMobile && toggleMobileMenu && (
            <button
              className="hamburger-menu"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
            >
              <span className="hamburger-icon">☰</span>
            </button>
          )}
          
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
          <div className="stat-item" title="Day Streak">
            <span className="visually-hidden">Streak: {progress.streak} days</span>
            <span className="stat-icon" aria-hidden="true">🔥</span>
            <span className="stat-value" aria-hidden="true">{progress.streak}</span>
          </div>
          
          <div className="stat-item" title="Total XP">
            <span className="visually-hidden">Total XP: {progress.xp}</span>
            <span className="stat-icon" aria-hidden="true">✨</span>
            <span className="stat-value" aria-hidden="true">{progress.xp}</span>
          </div>
          
          <div className="stat-item" title="Hearts Remaining">
            <span className="visually-hidden">Hearts remaining: {progress.hearts}</span>
            <span className="stat-icon" aria-hidden="true">💜</span>
            <span className="stat-value" aria-hidden="true">{progress.hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;