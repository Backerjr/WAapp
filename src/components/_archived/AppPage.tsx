import './Website.css';

interface AppPageProps {
  onNavigate?: (page: string) => void;
  onStartApp?: () => void;
}

export default function AppPage({ onNavigate, onStartApp }: AppPageProps) {
  return (
    <div className="app-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">
          ← Back to Home
        </button>
        <h1>RozmoWA App</h1>
      </header>
      
      <div className="page-content">
        <section className="app-intro">
          <p className="intro-text">
            Take your learning anywhere with the RozmoWA app. Practice on your schedule with 
            interactive exercises, audio lessons, and real-time progress tracking. 
            Your language journey, in your pocket.
          </p>
        </section>

        {/* APP FEATURES - 6 Cards */}
        <section className="app-features">
          <h2>App Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Skill Tree</h3>
              <p>
                Navigate through structured lessons organized by topics and difficulty levels. 
                Clear progression path from beginner to advanced.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎧</div>
              <h3>Listen & Practice</h3>
              <p>
                Improve pronunciation with audio exercises and speech recognition. 
                Hear native speakers and practice until perfect.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Progress</h3>
              <p>
                Monitor your XP, streaks, and achievements as you learn. 
                Stay motivated with daily goals and milestones.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Interactive Exercises</h3>
              <p>
                Multiple choice, fill-in-the-blanks, drag & drop, and more. 
                Varied exercise types keep learning engaging.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Achievements</h3>
              <p>
                Earn badges and rewards as you reach milestones. 
                Compete with yourself and track your growth.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile & Desktop</h3>
              <p>
                Learn on any device with seamless sync. 
                Your progress follows you everywhere you go.
              </p>
            </div>
          </div>
        </section>

        {/* TRY IT NOW */}
        <section className="app-demo">
          <h2>Try It Now</h2>
          <p>
            Experience the app right in your browser. No download required to get started. 
            Jump in and take your first lesson today!
          </p>
          <button onClick={onStartApp} className="demo-button">
            🚀 Launch Web App
          </button>
        </section>

        {/* DOWNLOAD THE APP */}
        <section className="app-download">
          <h2>Download the App</h2>
          <p>Get the full experience on your mobile device with offline access and push notifications.</p>
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

        {/* PREVIEW (Screenshots) */}
        <section className="app-screenshots">
          <h2>Preview</h2>
          <div className="screenshots-grid">
            <div className="screenshot-placeholder">
              <p>📚 Skill Tree View</p>
            </div>
            <div className="screenshot-placeholder">
              <p>✏️ Lesson Exercise</p>
            </div>
            <div className="screenshot-placeholder">
              <p>📈 Progress Dashboard</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
