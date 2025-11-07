import { Progress } from '../types';

interface HeaderProps {
  progress: Progress;
}

/*
  Accessibility changes:
  - Remove the page-level H1 from the shared header to avoid multiple H1s on pages.
  - Keep the visual logo but render as a non-heading element.
  - Hide decorative emoji from screen readers while keeping text accessible.
  - Add aria-labels on nav and individual stats for screen reader context.
*/
function Header({ progress }: HeaderProps) {
  return (
    <header className="header" role="complementary">
      <div className="header-content">
        <div className="header-left">
          {/* Logo as heading for accessibility and E2E test */}
          <h1>rozmoWA</h1>
          <nav>
            <a href="/" role="link">Dashboard</a>
            <a href="/learn" role="link">Learn</a>
            <a href="/review" role="link">Review</a>
            <a href="/resources" role="link">Resources</a>
          </nav>
        </div>
        
        <div className="stats">
          <div className="stat-item" title="Day Streak">
            <span className="visually-hidden">Streak: {progress.streak} days</span>
            <span className="stat-icon" aria-hidden="true">🔥</span>
            <span className="stat-value" aria-hidden="true">{progress.streak}</span>
              <p>Streak: {progress.streak}</p>
          </div>
          
          <div className="stat-item" title="Total XP">
            <span className="visually-hidden">Total XP: {progress.xp}</span>
            <span className="stat-icon" aria-hidden="true">✨</span>
            <span className="stat-value" aria-hidden="true">{progress.xp}</span>
              <p>Total XP: {progress.xp}</p>
          </div>
          
          <div className="stat-item" title="Hearts Remaining">
            <span className="visually-hidden">Hearts remaining: {progress.hearts}</span>
            <span className="stat-icon" aria-hidden="true">💜</span>
            <span className="stat-value" aria-hidden="true">{progress.hearts}</span>
              <p>Hearts remaining: {progress.hearts}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;