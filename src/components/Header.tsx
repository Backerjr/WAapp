import { Progress } from '../types';

interface HeaderProps {
  progress: Progress;
}

function Header({ progress }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">WA</h1>
        
        <div className="stats">
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{progress.streak}</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">✨</span>
            <span className="stat-value">{progress.xp} XP</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-icon">💜</span>
            <span className="stat-value">{progress.hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
