import './LandingPage.css';
<<<<<<< HEAD

=======
>>>>>>> 3bf8f18b09c61b038da4c14df8ad6d3814c31269
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
            <button onClick={() => onNavigate('offer')} className="btn-primary">
              Explore Courses
            </button>

            <button onClick={() => onNavigate('app')} className="btn-secondary">
              Launch App
            </button>

            <button onClick={() => onNavigate('contact')} className="btn-accent">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
