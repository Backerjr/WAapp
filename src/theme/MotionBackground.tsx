import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

export default function MotionBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Memoize particles array to avoid recreating on every render
  const particles = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      initialX: Math.random() * window.innerWidth,
      initialY: Math.random() * window.innerHeight,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      yOffset: Math.random() * -200 - 100
    }));
  }, []);

  return (
    <div className="motion-background">
      {/* Aurora gradient layers */}
      <motion.div
        className="aurora-layer aurora-layer-1"
        animate={{
          x: mousePosition.x * 50,
          y: mousePosition.y * 50,
          rotate: mousePosition.x * 10
        }}
        transition={{ duration: 3, ease: "easeOut" }}
      />
      
      <motion.div
        className="aurora-layer aurora-layer-2"
        animate={{
          x: -mousePosition.x * 30,
          y: -mousePosition.y * 30,
          rotate: -mousePosition.y * 8
        }}
        transition={{ duration: 4, ease: "easeOut" }}
      />

      <motion.div
        className="aurora-layer aurora-layer-3"
        animate={{
          x: mousePosition.y * 40,
          y: -mousePosition.x * 40,
          scale: 1 + mousePosition.x * 0.1
        }}
        transition={{ duration: 5, ease: "easeOut" }}
      />

      {/* Floating particles */}
      <div className="particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            initial={{
              x: particle.initialX,
              y: particle.initialY,
              opacity: 0
            }}
            animate={{
              y: [null, particle.yOffset],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Vignette overlay */}
      <div className="vignette" />
    </div>
  );
}
