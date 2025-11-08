import { Progress } from '../types';

interface HeaderProps {
  progress?: Progress;
}

function Header({ progress }: HeaderProps) {
  const progressPercentage = progress ? (progress.dailyXP / progress.dailyGoal) * 100 : 0;

  return (
    <header className="header" role="complementary">
      <div className="header-content">
        <div className="header-left">
          <h1>rozmoWA</h1>
          <nav>
            <a href="/" role="link">Dashboard</a>
            <a href="/learn" role="link">Learn</a>
            <a href="/review" role="link">Review</a>
            <a href="/resources" role="link">Resources</a>
          </nav>
        </div>
        
        {progress && (
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
        )}
      </div>
      {progress && progress.dailyGoal > 0 && (
          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              role="progressbar" 
              aria-valuenow={progress.dailyXP} 
              aria-valuemin={0} 
              aria-valuemax={progress.dailyGoal}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
    </header>
  );
}

export default Header;
