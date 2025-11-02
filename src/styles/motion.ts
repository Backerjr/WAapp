import { Variants, Transition } from "framer-motion";

/**
 * Motion System - Framer Motion variants and timing constants
 * Use these for consistent animations throughout the app
 */

// ═══════════════════════════════════════════════════════════
// EASING CURVES
// ═══════════════════════════════════════════════════════════
export const ease = {
  standard: [0.2, 0.8, 0.2, 1] as const,
  emphasized: [0.2, 0.7, 0, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
};

// ═══════════════════════════════════════════════════════════
// DURATION CONSTANTS (in seconds)
// ═══════════════════════════════════════════════════════════
export const dur = {
  quick: 0.12,
  fast: 0.18,
  medium: 0.26,
  slow: 0.38,
};

// ═══════════════════════════════════════════════════════════
// TRANSITION PRESETS
// ═══════════════════════════════════════════════════════════
export const transitions = {
  hover: { duration: dur.fast, ease: ease.standard } as Transition,
  enter: { duration: dur.medium, ease: ease.emphasized } as Transition,
  exit: { duration: dur.fast, ease: ease.standard } as Transition,
  smooth: { duration: dur.medium, ease: ease.standard } as Transition,
};

// ═══════════════════════════════════════════════════════════
// COMMON ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════

/**
 * Fade + slide up animation
 * Usage: <motion.div variants={fadeUp} initial="initial" animate="animate" />
 */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: transitions.enter },
  exit: { opacity: 0, y: 10, transition: transitions.exit },
};

/**
 * Fade in animation (no movement)
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transitions.enter },
  exit: { opacity: 0, transition: transitions.exit },
};

/**
 * Scale animation for cards/buttons
 * Usage: <motion.button variants={scaleCard} whileHover="hover" whileTap="tap" />
 */
export const scaleCard: Variants = {
  initial: { scale: 1, boxShadow: "var(--shadow-1)" },
  hover: { 
    scale: 1.02, 
    boxShadow: "var(--shadow-2)", 
    transition: transitions.hover 
  },
  tap: { 
    scale: 0.99, 
    boxShadow: "var(--shadow-1)", 
    transition: transitions.exit 
  },
};

/**
 * Slide animation for tabs/panels
 */
export const slideTab: Variants = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: transitions.enter },
  exit: { x: -10, opacity: 0, transition: transitions.exit },
};

/**
 * Slide from left
 */
export const slideLeft: Variants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: transitions.enter },
  exit: { x: -20, opacity: 0, transition: transitions.exit },
};

/**
 * Slide from right
 */
export const slideRight: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: transitions.enter },
  exit: { x: 20, opacity: 0, transition: transitions.exit },
};

/**
 * Stagger children animation
 * Usage: <motion.div variants={staggerContainer}><motion.div variants={staggerItem} /></motion.div>
 */
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Bounce animation for notifications/alerts
 */
export const bounce: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  exit: { scale: 0.8, opacity: 0, transition: transitions.exit },
};

/**
 * Rotate animation for spinners/loading
 */
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

/**
 * Pulse animation for beacons/status indicators
 */
export const pulse: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 2,
      ease: ease.standard,
      repeat: Infinity,
    },
  },
};
