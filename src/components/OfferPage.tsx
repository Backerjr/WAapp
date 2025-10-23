import './Website.css';

interface OfferPageProps {
  onNavigate?: (page: string) => void;
}

export default function OfferPage({ onNavigate }: OfferPageProps) {
  return (
    <div className="offer-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">
          ← Back to Home
        </button>
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

        {/* CLASS TYPES */}
        <section className="offer-classes">
          <h2>Class Types</h2>
          <div className="classes-grid">
            {/* GROUP CLASSES */}
            <div className="class-card">
              <div className="class-icon">👥</div>
              <h3>Group Classes</h3>
              <p className="class-description">
                Learn in a collaborative environment with fellow students. 
                Practice real conversations and build confidence together in our 
                small, supportive groups.
              </p>
              <ul className="class-features">
                <li>4-8 students per group</li>
                <li>Interactive activities</li>
                <li>Cultural immersion sessions</li>
                <li>Affordable pricing</li>
                <li>Weekly sessions</li>
              </ul>
              <p className="class-price">From $20/session</p>
            </div>

            {/* PRIVATE LESSONS - POPULAR */}
            <div className="class-card featured">
              <div className="featured-badge">Popular</div>
              <div className="class-icon">👤</div>
              <h3>Private Lessons</h3>
              <p className="class-description">
                One-on-one attention tailored to your specific needs and goals. 
                Maximum flexibility and personalized curriculum designed just for you.
              </p>
              <ul className="class-features">
                <li>Individual focus</li>
                <li>Custom schedule</li>
                <li>Personalized content</li>
                <li>Flexible pacing</li>
                <li>Rapid progress</li>
              </ul>
              <p className="class-price">From $45/session</p>
            </div>

            {/* ONLINE LEARNING */}
            <div className="class-card">
              <div className="class-icon">📱</div>
              <h3>Online Learning</h3>
              <p className="class-description">
                Access lessons from anywhere with our interactive app. 
                Self-paced learning with exercises, audio lessons, and progress tracking.
              </p>
              <ul className="class-features">
                <li>Learn at your pace</li>
                <li>Mobile & desktop compatible</li>
                <li>Interactive exercises</li>
                <li>Audio pronunciation guides</li>
                <li>Progress dashboard</li>
              </ul>
              <p className="class-price">Free to start</p>
            </div>
          </div>
        </section>

        {/* ALL LEVELS WELCOME */}
        <section className="offer-levels">
          <h2>All Levels Welcome</h2>
          <div className="levels-list">
            <div className="level-item">
              <h4>Beginner (A1-A2)</h4>
              <p>
                Start your journey with basic vocabulary, everyday phrases, and foundational 
                grammar. Perfect for complete beginners or those refreshing their skills.
              </p>
            </div>
            
            <div className="level-item">
              <h4>Intermediate (B1-B2)</h4>
              <p>
                Develop fluency and handle more complex conversations. Build confidence 
                in professional and social settings with advanced vocabulary and grammar.
              </p>
            </div>
            
            <div className="level-item">
              <h4>Advanced (C1-C2)</h4>
              <p>
                Perfect your skills with nuanced expression and cultural depth. Master 
                idioms, regional variations, and sophisticated communication strategies.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="offer-cta">
          <h2>Ready to Start?</h2>
          <p>
            Contact us to discuss your learning goals and find the perfect class for you. 
            First consultation is always free!
          </p>
          <button onClick={() => onNavigate?.('contact')} className="cta-button">
            Get in Touch
          </button>
        </section>
      </div>
    </div>
  );
}
