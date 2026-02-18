import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const API_URL = 'http://localhost:3000/guestbook';

  // Function to load posts from NestJS
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSignGuestbook = async (e) => {
    e.preventDefault();
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message }),
    });
    setName('');
    setMessage('');
    fetchPosts(); // Refresh the list
  };

  return (
    <div className="App">
      <h1>My Profile & Guestbook</h1>
      
      {/* Your Form */}
      <form onSubmit={handleSignGuestbook}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <textarea 
          placeholder="Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button type="submit">Sign Guestbook</button>
      </form>

      {/* Displaying the Posts */}
      <div className="guestbook-list">
        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <strong>{post.name}</strong>: {post.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;