import './LandingPage.css';
interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="landing-page">
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
    </div>
  );
}
