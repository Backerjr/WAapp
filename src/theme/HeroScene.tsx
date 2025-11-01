import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import StoryButtons from './StoryButtons';

interface HeroSceneProps {
  onNavigate: (page: string) => void;
}

export default function HeroScene({ onNavigate }: HeroSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <section ref={ref} className="hero-scene">
      <motion.div 
        className="hero-content"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="hero-text-container"
        >
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Where Words <span className="aurora-text">Come Alive</span>
          </motion.h1>

          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Immerse yourself in the art of language learning — a journey that feels like poetry in motion. 
            Every word, every story, every moment designed to spark connection and curiosity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <StoryButtons onNavigate={onNavigate} />
          </motion.div>
        </motion.div>

        {/* Floating Letters Animation */}
        <div className="floating-letters">
          {['H', 'E', 'L', 'L', 'O'].map((letter, index) => (
            <motion.span
              key={index}
              className="floating-letter"
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                y: [-20, -40, -20],
                x: [0, Math.sin(index) * 10, 0]
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                delay: index * 0.2
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
