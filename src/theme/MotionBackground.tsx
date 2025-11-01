import { motion } from 'framer-motion';

export default function MotionBackground() {
  return (
    <div className="motion-background">
      {/* Aurora waves */}
      <motion.div
        className="aurora-wave"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="aurora-wave"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      <motion.div
        className="aurora-wave"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      
      {/* Floating letters symbolizing stories */}
      <motion.div
        className="floating-letters"
        style={{ top: '20%', left: '10%' }}
        animate={{
          y: [-20, 20, -20],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        W
      </motion.div>
      <motion.div
        className="floating-letters"
        style={{ top: '60%', right: '15%' }}
        animate={{
          y: [20, -20, 20],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        A
      </motion.div>
      <motion.div
        className="floating-letters"
        style={{ bottom: '30%', left: '20%' }}
        animate={{
          y: [-15, 15, -15],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        ✉
      </motion.div>
    </div>
  );
}
