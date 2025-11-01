import { motion } from 'framer-motion';
import StoryButtons from './StoryButtons';

interface HeroSceneProps {
  onNavigate: (page: string) => void;
}

export default function HeroScene({ onNavigate }: HeroSceneProps) {
  return (
    <motion.section
      className="hero-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Where Words Become Stories
      </motion.h1>
      
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Welcome to WaApp — an immersive journey through language, art, and emotion.
        <br />
        Every word is a brushstroke. Every conversation, a masterpiece.
      </motion.p>
      
      <StoryButtons onNavigate={onNavigate} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          marginTop: '3rem',
          fontSize: '0.95rem',
          color: 'var(--aurora-lavender)',
          fontStyle: 'italic',
        }}
      >
        ✨ Crafted with passion. Designed for connection.
      </motion.div>
    </motion.section>
  );
}
