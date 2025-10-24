import './PosterSection.css';

interface PosterSectionProps {
  onNavigate?: (page: string) => void;
}

export default function PosterSection({ onNavigate }: PosterSectionProps) {
  return (
    <section className="poster-section">
      <div className="poster-container">
        <div className="poster-image">
          <img 
            src="/assets/rozmowa-poster.png" 
            alt="RozmoWA - Speak English Without Stress" 
            className="poster-img"
          />
        </div>
        <div className="poster-text">
          <h2 className="poster-title">Speak English Without Stress</h2>
          <p className="poster-paragraph">
            RozmoWA teaches languages that help you express yourself and explore the world.
          </p>
          <p className="poster-paragraph">
            Our creative and practical approach makes learning enjoyable and natural.
          </p>
          <div className="poster-buttons">
            <button onClick={() => onNavigate?.('offer')} className="btn-poster-primary">
              View Our Classes
            </button>
            <button onClick={() => onNavigate?.('about')} className="btn-poster-secondary">
              Meet Our Teachers
            </button>
          </div>
        </div>
      </div>
      <div className="poster-footer-quote">
        <blockquote className="quote-text">
          "The grass isn't greener on the other side — it's greener when you water it."
        </blockquote>
        <p className="quote-signature">— Wiktoria</p>
      </div>
    </section>
  );
}
