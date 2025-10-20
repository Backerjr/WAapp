import { Progress } from '../types';

interface HeaderProps {
  progress: Progress;
  currentView?: string;
  onViewChange?: (view: string) => void;
}

function Header({ progress, currentView, onViewChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">WA</h1>
        
        {onViewChange && (
          <nav className="view-nav">
            <button 
              className={`nav-button ${currentView === 'elegant' ? 'active' : ''}`}
              onClick={() => onViewChange('elegant')}
            >
              ✨ Elegant
            </button>
            <button 
              className={`nav-button ${currentView === 'learning' ? 'active' : ''}`}
              onClick={() => onViewChange('learning')}
            >
              📚 Learning
            </button>
          </nav>
        )}
        
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
