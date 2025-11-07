
// SM-2 Algorithm Implementation

export interface SM2Result {
  interval: number;
  repetitions: number;
  easeFactor: number;
}

export function sm2(quality: number, repetitions: number, easeFactor: number, interval: number): SM2Result {
  if (quality < 0 || quality > 5) {
    throw new Error('Quality must be between 0 and 5');
  }

  if (quality < 3) {
    // If the quality of the response was poor, start over.
    repetitions = 0;
    interval = 1;
  } else {
    // If the quality of the response was good, update the ease factor.
    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (easeFactor < 1.3) {
      easeFactor = 1.3;
    }

    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  }

  return { interval, repetitions, easeFactor };
}
