import { useState, useEffect } from 'react';
import './RozmowaWall.css';

interface WallPost {
  id: string;
  content: string;
  author: string;
  tag: 'student-win' | 'challenge' | 'idea' | 'highlight';
  createdAt: number;
  expiresAt: number;
}

const TAG_LABELS = {
  'student-win': '🌟 Student Win',
  'challenge': '💪 Challenge',
  'idea': '💡 Idea for Next Week',
  'highlight': '✨ Class Highlight'
};

const TAG_COLORS = {
  'student-win': 'var(--color-gold)',
  'challenge': 'var(--color-lavender-dark)',
  'idea': 'var(--color-primary)',
  'highlight': 'var(--color-silver)'
};

function RozmowaWall() {
  const [posts, setPosts] = useState<WallPost[]>([]);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [newPost, setNewPost] = useState({
    content: '',
    author: '',
    tag: 'highlight' as WallPost['tag']
  });

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('rozmowaWallPosts');
    if (savedPosts) {
      const parsed = JSON.parse(savedPosts);
      // Filter out expired posts
      const now = Date.now();
      const validPosts = parsed.filter((post: WallPost) => post.expiresAt > now);
      setPosts(validPosts);
      
      // Save back filtered posts
      if (validPosts.length !== parsed.length) {
        localStorage.setItem('rozmowaWallPosts', JSON.stringify(validPosts));
      }
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('rozmowaWallPosts', JSON.stringify(posts));
    }
  }, [posts]);

  // Auto-cleanup expired posts every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setPosts(prev => prev.filter(post => post.expiresAt > now));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const addPost = () => {
    if (!newPost.content.trim() || !newPost.author.trim()) {
      alert('Please fill in both content and your name!');
      return;
    }

    const now = Date.now();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    const post: WallPost = {
      id: `post-${now}-${Math.random().toString(36).substr(2, 9)}`,
      content: newPost.content.trim(),
      author: newPost.author.trim(),
      tag: newPost.tag,
      createdAt: now,
      expiresAt: now + sevenDaysInMs
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ content: '', author: '', tag: 'highlight' });
    setIsAddingPost(false);
  };

  const deletePost = (id: string) => {
    if (confirm('Are you sure you want to remove this post?')) {
      setPosts(prev => prev.filter(post => post.id !== id));
    }
  };

  const getDaysRemaining = (expiresAt: number): string => {
    const now = Date.now();
    const msRemaining = expiresAt - now;
    const daysRemaining = Math.ceil(msRemaining / (24 * 60 * 60 * 1000));
    
    if (daysRemaining === 1) return '1 day left';
    if (daysRemaining === 0) return 'Expires today';
    return `${daysRemaining} days left`;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="rozmowa-wall">
      <div className="wall-header">
        <h2>💬 Rozmowa Wall</h2>
        <p>Team journal — share wins, challenges, and ideas. Posts fade after 7 days.</p>
      </div>

      <div className="wall-content">
        <div className="wall-actions">
          <button
            className="add-post-btn"
            onClick={() => setIsAddingPost(!isAddingPost)}
          >
            {isAddingPost ? '✕ Cancel' : '+ Add Post'}
          </button>
          <div className="posts-count">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} on the wall
          </div>
        </div>

        {isAddingPost && (
          <div className="new-post-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Your name"
                value={newPost.author}
                onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                maxLength={50}
              />
              <select
                value={newPost.tag}
                onChange={(e) => setNewPost({ ...newPost, tag: e.target.value as WallPost['tag'] })}
              >
                <option value="highlight">✨ Class Highlight</option>
                <option value="student-win">🌟 Student Win</option>
                <option value="challenge">💪 Challenge</option>
                <option value="idea">💡 Idea for Next Week</option>
              </select>
            </div>
            <textarea
              placeholder="Share your thoughts, wins, or ideas..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              maxLength={500}
              rows={4}
            />
            <div className="form-footer">
              <span className="char-count">
                {newPost.content.length}/500
              </span>
              <button className="submit-post-btn" onClick={addPost}>
                Post to Wall
              </button>
            </div>
          </div>
        )}

        {posts.length === 0 ? (
          <div className="empty-wall">
            <div className="empty-icon">📌</div>
            <p>The wall is empty. Be the first to share!</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <div
                key={post.id}
                className="wall-post"
                style={{ '--tag-color': TAG_COLORS[post.tag] } as React.CSSProperties}
              >
                <div className="post-header">
                  <span className="post-tag">{TAG_LABELS[post.tag]}</span>
                  <button
                    className="delete-post-btn"
                    onClick={() => deletePost(post.id)}
                    title="Delete post"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="post-content">
                  {post.content}
                </div>
                
                <div className="post-footer">
                  <div className="post-author">
                    <span className="author-icon">👤</span>
                    {post.author}
                  </div>
                  <div className="post-meta">
                    <span className="post-date">{formatDate(post.createdAt)}</span>
                    <span className="post-expiry">⏳ {getDaysRemaining(post.expiresAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RozmowaWall;
