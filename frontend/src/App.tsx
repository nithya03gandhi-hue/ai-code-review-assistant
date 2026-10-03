import { useState } from 'react';
const API_URL = 'http://localhost:5000/api/review';



function App() {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError('Please paste some code first.');
      return;
    }

    setLoading(true);
    setError('');
    setReview('');

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error('Server error');

      const data = await res.json();
      setReview(data.feedback);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>AI Code Review Assistant</h1>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        rows={12}
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: 14,
          padding: 12,
          boxSizing: 'border-box',
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: 12,
          padding: '10px 20px',
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Reviewing...' : 'Review Code'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {review && (
        <div style={{ marginTop: 24 }}>
          <h2>Review</h2>
          <pre
            style={{
              whiteSpace: 'pre-wrap',
              background: '#f5f5f5',
              color: '#222',
              padding: 16,
              borderRadius: 8,
              textAlign: 'left',
            }}
          >
            {review}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;