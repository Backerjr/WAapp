import { useState, useRef, useEffect } from 'react';
import './InteractiveAudio.css';

interface AudioClip {
  id: string;
  title: string;
  text: string;
  translation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const audioClips: AudioClip[] = [
  {
    id: 'greeting',
    title: 'Daily Greeting',
    text: 'Dzień dobry! Jak się masz?',
    translation: 'Good day! How are you?',
    difficulty: 'beginner'
  },
  {
    id: 'weather',
    title: 'Weather Talk',
    text: 'Dziś jest piękna pogoda, prawda?',
    translation: 'Today is beautiful weather, right?',
    difficulty: 'beginner'
  },
  {
    id: 'culture',
    title: 'Cultural Expression',
    text: 'Kultura to most łączący serca ludzi.',
    translation: 'Culture is a bridge connecting people\'s hearts.',
    difficulty: 'intermediate'
  },
  {
    id: 'philosophy',
    title: 'Deep Thought',
    text: 'Mądrost ukrywa się w prostocie codziennych chwil.',
    translation: 'Wisdom hides in the simplicity of everyday moments.',
    difficulty: 'advanced'
  }
];

const InteractiveAudio: React.FC = () => {
  const [currentClip, setCurrentClip] = useState<AudioClip>(audioClips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [audioProgress, setAudioProgress] = useState(0);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressInterval = useRef<number | ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const playAudio = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setAudioProgress(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentClip.text);
    utterance.lang = 'pl-PL';
    utterance.rate = playbackSpeed;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => {
      setIsPlaying(true);
      setAudioProgress(0);
      
      // Simulate progress animation
      progressInterval.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            if (progressInterval.current) clearInterval(progressInterval.current);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setAudioProgress(100);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setTimeout(() => setAudioProgress(0), 1000);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setAudioProgress(0);
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const nextClip = () => {
    const currentIndex = audioClips.findIndex(clip => clip.id === currentClip.id);
    const nextIndex = (currentIndex + 1) % audioClips.length;
    setCurrentClip(audioClips[nextIndex]);
    setShowTranslation(false);
    setAudioProgress(0);
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4ade80';
      case 'intermediate': return '#fbbf24';
      case 'advanced': return '#f87171';
      default: return '#8b5cf6';
    }
  };

  return (
    <div className="interactive-audio">
      <div className="audio-header">
        <h3 className="audio-title">Interactive Audio</h3>
        <div 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(currentClip.difficulty) }}
        >
          {currentClip.difficulty}
        </div>
      </div>

      <div className="audio-content">
        <div className="clip-info">
          <h4 className="clip-title">{currentClip.title}</h4>
          <div className="polish-text">{currentClip.text}</div>
          
          {showTranslation && (
            <div className="translation-text">
              {currentClip.translation}
            </div>
          )}
        </div>

        <div className="audio-controls">
          <div className="main-controls">
            <button 
              className={`play-button ${isPlaying ? 'playing' : ''}`}
              onClick={playAudio}
            >
              <span className="play-icon">
                {isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>

            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${audioProgress}%` }}
              ></div>
            </div>

            <button className="next-button" onClick={nextClip}>
              <span className="next-icon">⏭️</span>
            </button>
          </div>

          <div className="secondary-controls">
            <div className="speed-control">
              <label htmlFor="speed">Speed:</label>
              <select 
                id="speed"
                value={playbackSpeed} 
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>

            <button 
              className="translation-toggle"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              {showTranslation ? '🙈' : '👁️'} Translation
            </button>
          </div>
        </div>
      </div>

      <div className="audio-visualization">
        <div className={`sound-waves ${isPlaying ? 'active' : ''}`}>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAudio;