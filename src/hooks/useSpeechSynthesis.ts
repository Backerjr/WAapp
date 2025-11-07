import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechSynthesisOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useSpeechSynthesis = (options: UseSpeechSynthesisOptions = {}) => {
  const {
    lang = 'en-US',
    rate = 1,
    pitch = 1,
    volume = 1
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Check for browser support once on initial render
  const [isSupported] = useState(() => 
    typeof window !== 'undefined' && !!window.speechSynthesis
  );

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (isSupported) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices(); // Initial load
      window.speechSynthesis.onvoiceschanged = loadVoices; // Subscribe to changes

      // Cleanup subscription
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, [isSupported]);

  const speak = useCallback((text: string, customOptions?: Partial<UseSpeechSynthesisOptions>) => {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel(); // Stop any previous speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = customOptions?.lang || lang;
    utterance.rate = customOptions?.rate || rate;
    utterance.pitch = customOptions?.pitch || pitch;
    utterance.volume = customOptions?.volume || volume;

    // Find a matching voice
    const voice = voices.find(v => v.lang === utterance.lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      console.error("Speech synthesis error");
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, lang, rate, pitch, volume, voices]);

  const cancel = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && !isSpeaking) {
      window.speechSynthesis.resume();
    }
  }, [isSupported, isSpeaking]);

  return {
    speak,
    cancel,
    pause,
    resume,
    isSpeaking,
    isSupported,
    voices
  };
};
