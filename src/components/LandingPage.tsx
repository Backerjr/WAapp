import './LandingPage.css';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h2 className="hero-headline">
            Speak beautifully.<br />Learn fearlessly.
          </h2>

          <p className="hero-subtext">
            Step into a world where language feels natural, emotional, and alive.
            <br />
            RozmoWA blends human connection with elegant technology — designed by teachers, powered by passion.
          </p>

          <div className="hero-buttons">
            <button onClick={() => onNavigate('learn')} className="btn-primary">
              Start Learning Now
            </button>

            <button onClick={() => onNavigate('progress')} className="btn-secondary">
              Track Progress
            </button>

            <button onClick={() => onNavigate('about')} className="btn-accent">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
