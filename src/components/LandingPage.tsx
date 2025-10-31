import './LandingPage.css';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="landing-page">
      {/* NAVIGATION BAR */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <h1 onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
              RozmoWA
            </h1>
          </div>
          <div className="nav-links">
            <button onClick={() => onNavigate('about')} className="nav-link">
              About
            </button>
            <button onClick={() => onNavigate('offer')} className="nav-link">
              Classes
            </button>
            <button onClick={() => onNavigate('app')} className="nav-link">
              App
            </button>
            <button onClick={() => onNavigate('contact')} className="nav-link">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content" style={{
          textAlign: 'center',
          padding: '6rem 2rem',
          background: 'linear-gradient(135deg, #3b0066 0%, #ffcc70 100%)',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 0 40px rgba(0,0,0,0.2)',
          transition: 'all 0.5s ease'
        }}>
          <h2 className="hero-headline" style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: 700,
            letterSpacing: '1px',
            background: 'linear-gradient(90deg, #fff, #ffe6b3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Speak beautifully.<br />Learn fearlessly.
          </h2>

          <p className="hero-subtext" style={{
            fontSize: '1.25rem',
            maxWidth: '700px',
            margin: '0 auto 2rem',
            opacity: 0.9
          }}>
            Step into a world where language feels natural, emotional, and alive.
            <br />
            RozmoWA blends human connection with elegant technology — designed by teachers, powered by passion.
          </p>

          <div className="hero-buttons" style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            <button onClick={() => onNavigate('offer')} className="btn-primary" style={{
              backgroundColor: '#fff',
              color: '#3b0066',
              padding: '0.9rem 2rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              Explore Courses
            </button>

            <button onClick={() => onNavigate('app')} className="btn-secondary" style={{
              backgroundColor: 'transparent',
              border: '2px solid #fff',
              color: '#fff',
              padding: '0.9rem 2rem',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}>
              Launch App
            </button>

            <button onClick={() => onNavigate('contact')} className="btn-accent" style={{
              backgroundColor: '#ffcc70',
              color: '#3b0066',
              padding: '0.9rem 2rem',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}>
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES HIGHLIGHTS */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Discover Your Learning Journey</h2>
          <div className="features-grid">
            
            <div className="feature-card" onClick={() => onNavigate('about')}>
              <div className="feature-icon">🌟</div>
              <h3>Our Story</h3>
              <p>Learn about our mission to make language learning feel natural, emotional, and deeply human.</p>
              <button className="feature-btn">Learn More</button>
            </div>

            <div className="feature-card" onClick={() => onNavigate('offer')}>
              <div className="feature-icon">📚</div>
              <h3>Classes & Courses</h3>
              <p>From group conversations to personalized coaching, find the perfect learning style for you.</p>
              <button className="feature-btn">View Classes</button>
            </div>

            <div className="feature-card" onClick={() => onNavigate('app')}>
              <div className="feature-icon">🚀</div>
              <h3>Interactive App</h3>
              <p>Practice with our gamified learning platform featuring skill trees, achievements, and progress tracking.</p>
              <button className="feature-btn">Try the App</button>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK PREVIEW SECTION */}
      <section className="preview-section">
        <div className="container">
          <h2 className="section-title">Why Choose RozmoWA?</h2>
          <div className="preview-content">
            <div className="preview-text">
              <h3>Language Learning, Reimagined</h3>
              <ul className="preview-benefits">
                <li>✨ <strong>Poetic Approach:</strong> Every lesson blends language with culture and emotion</li>
                <li>🎯 <strong>Progressive Learning:</strong> From A0 to A1+ with structured skill trees</li>
                <li>💖 <strong>Human Connection:</strong> Designed by teachers who understand how people learn</li>
                <li>🎮 <strong>Gamified Experience:</strong> Hearts, XP, streaks, and achievements keep you motivated</li>
                <li>🌍 <strong>Cultural Immersion:</strong> Learn Polish and English through stories and real contexts</li>
              </ul>
              <div className="preview-cta">
                <button onClick={() => onNavigate('contact')} className="cta-primary">
                  Start Your Journey Today
                </button>
                <button onClick={() => onNavigate('app')} className="cta-secondary">
                  Try Free Demo
                </button>
              </div>
            </div>
            <div className="preview-visual">
              <div className="learning-preview">
                <div className="mock-lesson">
                  <h4>Sample Lesson: "Daily Life"</h4>
                  <p><em>"W codzienności kryje się piękno prostoty"</em></p>
                  <p>"In daily life hides the beauty of simplicity"</p>
                  <div className="mock-exercise">
                    <span className="exercise-type">🎧 Listen & Select</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>RozmoWA</h3>
              <p>Making language learning feel like art since 2025</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Learn</h4>
                <button onClick={() => onNavigate('offer')}>Classes</button>
                <button onClick={() => onNavigate('app')}>Interactive App</button>
              </div>
              <div className="footer-column">
                <h4>About</h4>
                <button onClick={() => onNavigate('about')}>Our Story</button>
                <button onClick={() => onNavigate('contact')}>Contact Us</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Dedicated to the one who teaches the world how to listen.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
