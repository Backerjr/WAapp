import { useState } from 'react';
import './Website.css';

interface ContactPageProps {
  onNavigate?: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (integrate with backend or email service)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="contact-page">
      <header className="page-header">
        <button onClick={() => onNavigate?.('home')} className="back-btn">
          ← Back to Home
        </button>
        <h1>Contact Us</h1>
      </header>
      
      <div className="page-content">
        <section className="contact-intro">
          <p className="intro-text">
            Have questions? Want to start your learning journey? We'd love to hear from you.
            Reach out using the form below or connect with us on social media.
          </p>
        </section>

        {/* TWO-COLUMN LAYOUT */}
        <div className="contact-container">
          {/* LEFT: SEND MESSAGE */}
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell us about your learning goals, availability, or any questions you have..."
                />
              </div>
              
              <button type="submit" className="submit-btn">
                {submitted ? '✓ Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* RIGHT: CONNECT WITH US */}
          <div className="contact-info-section">
            <h2>Connect With Us</h2>
            
            <div className="social-links">
              <a href="mailto:hello@rozmowa.com" className="social-link">
                <span className="social-icon">📧</span>
                <span>hello@rozmowa.com</span>
              </a>
              
              <a href="https://instagram.com/rozmowa" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">📱</span>
                <span>@rozmowa on Instagram</span>
              </a>
              
              <a href="https://linkedin.com/company/rozmowa" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">💼</span>
                <span>RozmoWA on LinkedIn</span>
              </a>
              
              <a href="https://twitter.com/rozmowa" target="_blank" rel="noopener noreferrer" className="social-link">
                <span className="social-icon">🐦</span>
                <span>@rozmowa on Twitter</span>
              </a>
            </div>

            <div className="contact-hours">
              <h3>Response Time</h3>
              <p>
                We typically respond within 24 hours during business days 
                (Monday-Friday, 9 AM - 6 PM CET).
              </p>
              <p style={{ marginTop: '1rem' }}>
                For urgent inquiries, please mention "URGENT" in your subject line 
                or message and we'll prioritize your request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
