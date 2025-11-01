import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -200 - 100],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
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
