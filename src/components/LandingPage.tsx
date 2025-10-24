import './LandingPage.css';

interface LandingPageProps {
  onNavigate?: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="header-container">
          <h1 className="brand">rozmoWA-App</h1>
          <nav className="main-nav">
            <button onClick={() => handleNavigation('about')} className="nav-link">About Us</button>
            <button onClick={() => handleNavigation('offer')} className="nav-link">Offer</button>
            <button onClick={() => handleNavigation('contact')} className="nav-link">Contact</button>
          </nav>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-headline">Language is not learned — it's lived.</h2>
          <p className="hero-subtext">
            Discover RozmoWA's modern language approach — practical, inspiring, and human.
          </p>
          <div className="hero-buttons">
            <button onClick={() => handleNavigation('offer')} className="btn-primary">
              Explore Our Classes
            </button>
            <button onClick={() => handleNavigation('app')} className="btn-secondary">
              Download the App
            </button>
            <button onClick={() => handleNavigation('contact')} className="btn-accent">
              Start Learning Today
            </button>
          </div>
        </div>
      </section>

      <section className="content-sections">
        <div className="section-card">
          <h3>Our Mission</h3>
          <p>RozmoWA redefines language learning by blending authentic communication with cultural understanding.</p>
        </div>

        <div className="section-card clickable" onClick={() => handleNavigation('offer')}>
          <h3>Our Lessons</h3>
          <p>Preview structured courses and personalized sessions designed for all levels.</p>
          <span className="link-arrow">→</span>
        </div>

        <div className="section-card clickable" onClick={() => handleNavigation('app')}>
          <h3>RozmoWA App</h3>
          <p>Learn anytime, anywhere. Interactive exercises, audio lessons, and progress tracking.</p>
          <span className="link-arrow">→</span>
        </div>

        <div className="section-card">
          <h3>Testimonials</h3>
          <p>Hear from our students about their learning journeys and results.</p>
        </div>

        <div className="section-card clickable" onClick={() => handleNavigation('contact')}>
          <h3>Join Us</h3>
          <p>Ready to start? Contact our team to find your perfect learning path.</p>
          <span className="link-arrow">→</span>
        </div>
      </section>

      <footer className="landing-footer">
        <blockquote className="footer-quote">
          "The grass isn't greener on the other side — it's greener when you water it."
        </blockquote>
        <p className="footer-signature">— Wiktoria</p>
      </footer>
    </div>
  );
}
