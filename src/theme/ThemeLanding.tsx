import MotionBackground from './MotionBackground';
import FloatingNav from './FloatingNav';
import HeroScene from './HeroScene';
import StoryGrid from './StoryGrid';
import './theme.css';

interface ThemeLandingProps {
  onNavigate: (page: string) => void;
}

export default function ThemeLanding({ onNavigate }: ThemeLandingProps) {
  return (
    <div className="theme-landing">
      {/* Ambient animated background */}
      <MotionBackground />
      
      {/* Floating navigation */}
      <FloatingNav onNavigate={onNavigate} />
      
      {/* Hero section with cinematic introduction */}
      <HeroScene onNavigate={onNavigate} />
      
      {/* Story grid with narrative cards */}
      <StoryGrid onNavigate={onNavigate} />
      
      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        opacity: 0.7,
        fontSize: '0.95rem',
        color: 'var(--aurora-lavender)',
      }}>
        <p>
          ✨ Dedicated to the one who teaches the world how to listen.
        </p>
      </footer>
    </div>
  );
}
