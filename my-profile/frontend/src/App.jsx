import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. State for the list of posts and form inputs
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'https://webprog-2025-2026-t2-react-nest-how.vercel.app';

  // 2. Function to GET posts from NestJS backend
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setPosts(data); // Stores Supabase data in state
    } catch (err) {
      console.error("Error loading guestbook:", err);
    }
  };

  // 3. Load posts automatically when the page opens
  useEffect(() => {
    fetchPosts();
  }, []);

  // 4. Function to POST a new entry
  const handleSignGuestbook = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (response.ok) {
        setName('');    // Clear inputs on success
        setMessage('');
        fetchPosts();   // Refresh the list to show the new post
      }
    } catch (err) {
      console.error("Error signing guestbook:", err);
    }
  };

  // 5. Updated Return Logic
  return (
    <div className="App" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>My Profile & Guestbook</h1>
      
      <form onSubmit={handleSignGuestbook} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Your Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Write a message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required 
        />
        <button type="submit">Sign Guestbook</button>
      </form>

      <hr style={{ margin: '30px 0' }} />

      <div className="guestbook-list">
        <h3>Recent Messages</h3>
        {posts.length === 0 ? (
          <p>No messages yet. Be the first to sign!</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card" style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '10px',
              textAlign: 'left',
              backgroundColor: '#f9f9f9'
            }}>
              <strong style={{ fontSize: '1.1rem' }}>{post.name}</strong>
              <p style={{ margin: '5px 0' }}>{post.message}</p>
              <small style={{ color: '#666' }}>
                {new Date(post.created_at).toLocaleDateString()} at {new Date(post.created_at).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;