import './SubPages.css';

interface OfferPageProps {
  onNavigate?: (page: string) => void;
}

export default function OfferPage({ onNavigate }: OfferPageProps) {
  return (
    <div className="offer-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">← Back to Home</button>
        <h1>Our Offer</h1>
      </header>
      
      <div className="page-content">
        <section className="offer-intro">
          <p className="intro-text">
            Choose the learning path that fits your goals, schedule, and style. 
            Whether you prefer structured group classes or personalized one-on-one sessions, 
            we have options designed for every learner.
          </p>
        </section>

        <section className="offer-classes">
          <h2>Class Types</h2>
          <div className="classes-grid">
            <div className="class-card">
              <div className="class-icon">👥</div>
              <h3>Group Classes</h3>
              <p className="class-description">
                Learn in a collaborative environment with fellow students. 
                Practice real conversations and build confidence together.
              </p>
              <ul className="class-features">
                <li>4-8 students per group</li>
                <li>Interactive activities</li>
                <li>Cultural immersion</li>
                <li>Affordable pricing</li>
              </ul>
              <p className="class-price">From $20/session</p>
            </div>

            <div className="class-card featured">
              <div className="featured-badge">Popular</div>
              <div className="class-icon">👤</div>
              <h3>Private Lessons</h3>
              <p className="class-description">
                One-on-one attention tailored to your specific needs and goals. 
                Maximum flexibility and personalized curriculum.
              </p>
              <ul className="class-features">
                <li>Individual focus</li>
                <li>Custom schedule</li>
                <li>Personalized content</li>
                <li>Flexible pacing</li>
              </ul>
              <p className="class-price">From $45/session</p>
            </div>

            <div className="class-card">
              <div className="class-icon">📱</div>
              <h3>Online Learning</h3>
              <p className="class-description">
                Access lessons from anywhere. Use our interactive app for 
                self-paced learning with exercises, audio, and progress tracking.
              </p>
              <ul className="class-features">
                <li>Learn at your pace</li>
                <li>Mobile & desktop</li>
                <li>Interactive exercises</li>
                <li>Audio lessons</li>
              </ul>
              <p className="class-price">Free to start</p>
            </div>
          </div>
        </section>

        <section className="offer-levels">
          <h2>All Levels Welcome</h2>
          <div className="levels-list">
            <div className="level-item">
              <h4>Beginner (A1-A2)</h4>
              <p>Start your journey with basic vocabulary and everyday phrases.</p>
            </div>
            <div className="level-item">
              <h4>Intermediate (B1-B2)</h4>
              <p>Develop fluency and handle more complex conversations.</p>
            </div>
            <div className="level-item">
              <h4>Advanced (C1-C2)</h4>
              <p>Perfect your skills with nuanced expression and cultural depth.</p>
            </div>
          </div>
        </section>

        <section className="offer-cta">
          <h2>Ready to Start?</h2>
          <p>Contact us to discuss your learning goals and find the perfect class for you.</p>
          <button onClick={() => onNavigate?.('contact')} className="cta-button">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
  );
}
