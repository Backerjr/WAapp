export default function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <section className="hero-section">
      <h2 role="heading" aria-level={2}>Speak beautifully</h2>
      <p>Step into a world where language feels natural, emotional, and alive.</p>
      <button onClick={onStart}>Start Learning</button>
    </section>
  );
}
