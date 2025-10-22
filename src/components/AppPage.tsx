import './SubPages.css';

interface AppPageProps {
  onNavigate?: (page: string) => void;
  onStartApp?: () => void;
}

export default function AppPage({ onNavigate, onStartApp }: AppPageProps) {
  return (
    <div className="app-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">← Back to Home</button>
        <h1>RozmoWA App</h1>
      </header>
      
      <div className="page-content">
        <section className="app-intro">
          <p className="intro-text">
            Take your learning anywhere with the RozmoWA app. Practice on your schedule with 
            interactive exercises, audio lessons, and real-time progress tracking.
          </p>
        </section>

        <section className="app-features">
          <h2>App Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Skill Tree</h3>
              <p>Navigate through structured lessons organized by topics and difficulty levels.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>Listen & Practice</h3>
              <p>Improve pronunciation with audio exercises and speech recognition.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor your XP, streaks, and achievements as you learn.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Interactive Exercises</h3>
              <p>Multiple choice, fill-in-the-blanks, drag & drop, and more.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Achievements</h3>
              <p>Earn badges and rewards as you reach milestones.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile & Desktop</h3>
              <p>Learn on any device, sync your progress across platforms.</p>
            </div>
          </div>
        </section>

        <section className="app-demo">
          <h2>Try It Now</h2>
          <p>Experience the app right in your browser. No download required to get started.</p>
          <button onClick={onStartApp} className="demo-button">
            Launch Web App
          </button>
        </section>

        <section className="app-download">
          <h2>Download the App</h2>
          <p>Get the full experience on your mobile device.</p>
          <div className="download-buttons">
            <button className="download-btn ios">
              <span className="download-icon">🍎</span>
              <div className="download-text">
                <small>Download on the</small>
                <strong>App Store</strong>
              </div>
            </button>
            <button className="download-btn android">
              <span className="download-icon">🤖</span>
              <div className="download-text">
                <small>Get it on</small>
                <strong>Google Play</strong>
              </div>
            </button>
          </div>
        </section>

        <section className="app-screenshots">
          <h2>Preview</h2>
          <div className="screenshots-grid">
            <div className="screenshot-placeholder">
              <p>Skill Tree View</p>
            </div>
            <div className="screenshot-placeholder">
              <p>Lesson Exercise</p>
            </div>
            <div className="screenshot-placeholder">
              <p>Progress Dashboard</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
