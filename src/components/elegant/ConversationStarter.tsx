import { useState, useEffect } from 'react';
import './ConversationStarter.css';

interface ConversationQuestion {
  id: string;
  question_en: string;
  question_pl: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  hints: string[];
}

const conversationStarters: ConversationQuestion[] = [
  {
    id: 'family1',
    question_en: "What's your favorite family tradition?",
    question_pl: "Jaka jest twoja ulubiona tradycja rodzinna?",
    category: "Family & Relationships",
    difficulty: 'beginner',
    hints: ['tradycja', 'rodzina', 'święta', 'wspólny czas']
  },
  {
    id: 'culture1',
    question_en: "How does music influence your daily mood?",
    question_pl: "Jak muzyka wpływa na twój codzienny nastrój?",
    category: "Culture & Arts",
    difficulty: 'intermediate',
    hints: ['nastrój', 'emocje', 'rytm', 'harmonia']
  },
  {
    id: 'philosophy1',
    question_en: "What does 'home' mean to you beyond a physical place?",
    question_pl: "Co oznacza dla ciebie 'dom' poza fizycznym miejscem?",
    category: "Philosophy & Life",
    difficulty: 'advanced',
    hints: ['bezpieczeństwo', 'tożsamość', 'przynależność', 'wspomnienia']
  },
  {
    id: 'nature1',
    question_en: "Which season speaks to your soul and why?",
    question_pl: "Która pora roku przemawia do twojej duszy i dlaczego?",
    category: "Nature & Seasons",
    difficulty: 'intermediate',
    hints: ['przyroda', 'zmiana', 'energia', 'refleksja']
  },
  {
    id: 'dreams1',
    question_en: "What childhood dream still inspires you today?",
    question_pl: "Które dziecięce marzenie wciąż cię inspiruje?",
    category: "Dreams & Aspirations",
    difficulty: 'beginner',
    hints: ['inspiracja', 'pasja', 'przyszłość', 'motywacja']
  },
  {
    id: 'wisdom1',
    question_en: "What life lesson would you whisper to your younger self?",
    question_pl: "Jaką życiową lekcję szepnąłbyś swojemu młodszemu ja?",
    category: "Wisdom & Growth",
    difficulty: 'advanced',
    hints: ['doświadczenie', 'mądrość', 'refleksja', 'rozwój']
  }
];

const ConversationStarter: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<ConversationQuestion | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showPolish, setShowPolish] = useState(false);
  const [favoriteQuestions, setFavoriteQuestions] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage
    const saved = localStorage.getItem('favorite-questions');
    if (saved) {
      setFavoriteQuestions(JSON.parse(saved));
    }

    // Set initial question
    const randomIndex = Math.floor(Math.random() * conversationStarters.length);
    setCurrentQuestion(conversationStarters[randomIndex]);
  }, []);

  const getNewQuestion = () => {
    const randomIndex = Math.floor(Math.random() * conversationStarters.length);
    setCurrentQuestion(conversationStarters[randomIndex]);
    setShowHints(false);
    setShowPolish(false);
  };

  const toggleFavorite = () => {
    if (!currentQuestion) return;

    const updatedFavorites = favoriteQuestions.includes(currentQuestion.id)
      ? favoriteQuestions.filter(id => id !== currentQuestion.id)
      : [...favoriteQuestions, currentQuestion.id];

    setFavoriteQuestions(updatedFavorites);
    localStorage.setItem('favorite-questions', JSON.stringify(updatedFavorites));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4ade80';
      case 'intermediate': return '#fbbf24';
      case 'advanced': return '#f87171';
      default: return '#8b5cf6';
    }
  };

  if (!currentQuestion) return null;

  const isFavorite = favoriteQuestions.includes(currentQuestion.id);

  return (
    <div className="conversation-starter">
      <div className="starter-header">
        <h3 className="starter-title">Conversation Starter</h3>
        <div className="header-controls">
          <div 
            className="difficulty-indicator"
            style={{ color: getDifficultyColor(currentQuestion.difficulty) }}
          >
            {currentQuestion.difficulty}
          </div>
          <button 
            className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? '💜' : '🤍'}
          </button>
        </div>
      </div>

      <div className="question-content">
        <div className="category-tag">
          {currentQuestion.category}
        </div>

        <div className="question-text">
          <div className="english-question">
            {currentQuestion.question_en}
          </div>
          
          {showPolish && (
            <div className="polish-question">
              {currentQuestion.question_pl}
            </div>
          )}
        </div>

        {showHints && (
          <div className="hints-section">
            <h4 className="hints-title">Helpful Words:</h4>
            <div className="hints-grid">
              {currentQuestion.hints.map((hint, index) => (
                <span key={index} className="hint-word">
                  {hint}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="starter-controls">
        <div className="toggle-controls">
          <button 
            className={`toggle-button ${showPolish ? 'active' : ''}`}
            onClick={() => setShowPolish(!showPolish)}
          >
            🇵🇱 Polish
          </button>
          
          <button 
            className={`toggle-button ${showHints ? 'active' : ''}`}
            onClick={() => setShowHints(!showHints)}
          >
            💡 Hints
          </button>
        </div>

        <button className="new-question-button" onClick={getNewQuestion}>
          <span className="refresh-icon">🔄</span>
          New Question
        </button>
      </div>

      <div className="inspiration-footer">
        <div className="inspiration-text">
          "Great conversations start with curious questions"
        </div>
      </div>
    </div>
  );
};

export default ConversationStarter;