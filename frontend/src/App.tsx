import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(`Server ${res.status}: ${data.error || 'unknown error'}`);
      }

      setReview(data.feedback);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'Something went wrong.');
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
        <div className="review" style={{ marginTop: 24, textAlign: 'left' }}>
          <h2>Review</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{review}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;