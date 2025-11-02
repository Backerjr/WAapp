import { useState, useEffect } from 'react';
import './QuoteOfTheDay.css';

interface Quote {
  text: string;
  author: string;
  language: 'en' | 'pl';
}

const quotes: Quote[] = [
  {
    text: "Grenzen meiner Sprache bedeuten die Grenzen meiner Welt.",
    author: "Ludwig Wittgenstein",
    language: "en"
  },
  {
    text: "Język to mapa kultury. Mówi ci, skąd pochodzą ludzie i dokąd zmierzają.",
    author: "Rita Mae Brown",
    language: "pl"
  },
  {
    text: "Learning another language is not only learning different words for the same things, but learning another way to think about things.",
    author: "Flora Lewis",
    language: "en"
  },
  {
    text: "Każdy nowy język to nowe okno na świat.",
    author: "Polish Proverb",
    language: "pl"
  },
  {
    text: "The limits of my language mean the limits of my world.",
    author: "Ludwig Wittgenstein",
    language: "en"
  },
  {
    text: "Kto nie zna języków obcych, nic nie wie o swoim własnym.",
    author: "Johann Wolfgang von Goethe",
    language: "pl"
  },
  {
    text: "Nauka języka to podróż, nie cel.",
    author: "Polish Wisdom",
    language: "pl"
  },
  {
    text: "Słowa mają magiczną moc - mogą przynieść największe szczęście lub najgłębszy rozpacz.",
    author: "Sigmund Freud",
    language: "pl"
  },
  {
    text: "Nie ma nic piękniejszego niż język, który śpiewa w sercu.",
    author: "Polish Poetry",
    language: "pl"
  },
  {
    text: "Każde słowo niesie w sobie cały świat znaczeń.",
    author: "Polish Philosophy",
    language: "pl"
  },
  {
    text: "Language is the dress of thought.",
    author: "Samuel Johnson",
    language: "en"
  },
  {
    text: "Piękno języka polskiego leży w jego melodii i głębi.",
    author: "Polish Literature",
    language: "pl"
  }
];

const QuoteOfTheDay: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Get quote based on day of year for consistency
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const quoteIndex = dayOfYear % quotes.length;
    setCurrentQuote(quotes[quoteIndex]);
  }, []);

  const refreshQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  if (!currentQuote) return null;

  return (
    <div className="quote-of-the-day">
      <div className="quote-header">
        <h3 className="quote-title">Quote of the Day</h3>
        <button className="refresh-quote" onClick={refreshQuote}>
          <span className="refresh-icon">✨</span>
        </button>
      </div>
      
      <div className={`quote-content ${isAnimating ? 'animating' : ''}`}>
        <blockquote className="quote-text">
          "{currentQuote.text}"
        </blockquote>
        <cite className="quote-author">— {currentQuote.author}</cite>
      </div>

      <div className="quote-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-diamond">💎</div>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;