import './Website.css';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="about-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">
          ← Back to Home
        </button>
        <h1>About RozmoWA</h1>
      </header>
      
      <div className="page-content">
        {/* OUR STORY */}
        <section className="about-story">
          <h2>Our Story</h2>
          <p>
            RozmoWA was founded on the belief that language learning should be more than 
            memorizing vocabulary and grammar rules. We believe language is a living, breathing 
            tool for connection, expression, and exploration.
          </p>
          <p>
            Our journey began with a simple question: How can we make language learning feel 
            natural, engaging, and deeply human? The answer was to create a space where students 
            don't just study a language — they live it.
          </p>
          <p>
            From our first small class in 2020 to now serving students worldwide, we've stayed 
            true to our core belief: authentic communication creates real confidence.
          </p>
        </section>

        {/* OUR MISSION */}
        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            We redefine language learning by blending authentic communication with cultural 
            understanding. Our approach focuses on practical skills that empower you to express 
            yourself confidently in real-world situations.
          </p>
          <p>
            We teach more than words. We teach the rhythms, the nuances, the cultural context 
            that makes a language come alive. Whether you're ordering coffee in Warsaw or 
            negotiating a business deal in London, we prepare you for real life.
          </p>
        </section>

        {/* MEET OUR TEAM */}
        <section className="about-team">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Wiktoria</h3>
              <p className="member-role">Founder & Lead Teacher</p>
              <p className="member-bio">
                Passionate about creating authentic learning experiences that bridge cultures 
                and build confidence. With 10+ years teaching experience across Europe.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Anna Kowalska</h3>
              <p className="member-role">Senior Language Coach</p>
              <p className="member-bio">
                Specializes in conversational fluency and cultural immersion. Believes every 
                mistake is a step toward mastery.
              </p>
            </div>
            
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Michael Stevens</h3>
              <p className="member-role">Pronunciation Specialist</p>
              <p className="member-bio">
                Helps students sound natural and confident. Expert in accent reduction and 
                phonetics for Polish and English learners.
              </p>
            </div>
          </div>
        </section>

        {/* OUR VALUES */}
        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Authentic Communication</h3>
              <p>
                Real conversations, real confidence. We practice the language you'll actually 
                use in everyday life.
              </p>
            </div>
            
            <div className="value-card">
              <h3>Cultural Understanding</h3>
              <p>
                Language is more than words — it's culture, context, and connection. We teach 
                you both.
              </p>
            </div>
            
            <div className="value-card">
              <h3>Practical Learning</h3>
              <p>
                Skills you can use from day one. Every lesson builds confidence for real-world 
                situations.
              </p>
            </div>
            
            <div className="value-card">
              <h3>Human Connection</h3>
              <p>
                Learning together, growing together. Our community supports your journey every 
                step of the way.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
