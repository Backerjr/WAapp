import './Website.css';

interface PosterSectionProps {
  onNavigate?: (page: string) => void;
}

export default function PosterSection({ onNavigate }: PosterSectionProps) {
  return (
    <section className="poster-section">
      {/* TWO-COLUMN LAYOUT */}
      <div className="poster-container">
        {/* LEFT: POSTER IMAGE (600x800) */}
        <div className="poster-image-container">
          <div className="poster-image">
            <span>RozmoWA</span>
          </div>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="poster-content">
          <h2>Speak English Without Stress</h2>
          <p>
            RozmoWA teaches languages through authentic conversations and cultural immersion. 
            We don't just teach words — we teach confidence, connection, and real-world communication.
          </p>
          <p>
            Whether you're starting from scratch or refining advanced skills, our approach 
            meets you where you are and takes you where you want to go.
          </p>
          <div className="poster-buttons">
            <button onClick={() => onNavigate?.('offer')} className="btn-primary">
              View Classes
            </button>
            <button onClick={() => onNavigate?.('about')} className="btn-secondary">
              Meet Team
            </button>
          </div>
        </div>
      </div>

      {/* QUOTE BOX */}
      <div className="poster-quote-box">
        <blockquote>
          "The grass isn't greener on the other side — it's greener where you water it 
          with words, patience, and presence."
        </blockquote>
        <p className="footer-signature">— Wiktoria</p>
      </div>
    </section>
  );
}
