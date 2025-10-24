import './AboutPage.css';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="about-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">← Back to Home</button>
        <h1>About RozmoWA</h1>
      </header>
      
      <div className="page-content">
        <section className="about-story">
          <h2>Our Story</h2>
          <p>
            RozmoWA was founded on the belief that language learning should be more than memorizing vocabulary and grammar rules. 
            We believe language is a living, breathing tool for connection, expression, and exploration.
          </p>
          <p>
            Our journey began with a simple question: How can we make language learning feel natural, engaging, and deeply human?
          </p>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            We redefine language learning by blending authentic communication with cultural understanding. 
            Our approach focuses on practical skills that empower you to express yourself confidently in real-world situations.
          </p>
        </section>

        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Wiktoria</h3>
              <p className="member-role">Founder & Lead Teacher</p>
              <p className="member-bio">
                Passionate about creating authentic learning experiences that bridge cultures and build confidence.
              </p>
            </div>
            {/* Add more team members as needed */}
          </div>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Authentic Communication</h3>
              <p>Real conversations, real confidence.</p>
            </div>
            <div className="value-card">
              <h3>Cultural Understanding</h3>
              <p>Language is more than words—it's culture.</p>
            </div>
            <div className="value-card">
              <h3>Practical Learning</h3>
              <p>Skills you can use from day one.</p>
            </div>
            <div className="value-card">
              <h3>Human Connection</h3>
              <p>Learning together, growing together.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
