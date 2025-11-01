import { motion } from 'framer-motion';
import HeroScene from './HeroScene';
import StoryGrid from './StoryGrid';
import MotionBackground from './MotionBackground';
import FloatingNav from './FloatingNav';
import './ThemeLanding.css';

interface ThemeLandingProps {
  onNavigate: (page: string) => void;
}

export default function ThemeLanding({ onNavigate }: ThemeLandingProps) {
  return (
    <div className="theme-landing">
      <MotionBackground />
      <FloatingNav onNavigate={onNavigate} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="theme-content"
      >
        <HeroScene onNavigate={onNavigate} />
        <StoryGrid onNavigate={onNavigate} />
      </motion.div>
    </div>
  );
}
