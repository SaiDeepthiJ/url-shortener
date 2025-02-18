import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('urlHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate URL format
      if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
        throw new Error('URL must start with http:// or https://');
      }

      const response = await fetch(
        'https://8d21ece3-9b94-43ad-b6cb-d84e55612e99-00-1mrtr4aq03196.spock.replit.dev/shorten',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          },
          body: JSON.stringify({ long_url: longUrl })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to shorten URL');
      }

      const data = await response.json();
      setShortUrl(data.short_url);
      
      // Update history
      const newHistory = [{ original: longUrl, short: data.short_url }, ...history];
      setHistory(newHistory);
      localStorage.setItem('urlHistory', JSON.stringify(newHistory));

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('Copied to clipboard!');
  };

  return (
    <div className="App">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="https://example.com"
            pattern="https?://.+"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Shortening...' : 'Shorten'}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {shortUrl && (
        <div className="result">
          <p>Short URL:</p>
          <div className="short-url-container">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="short-url"
            >
              {shortUrl}
            </a>
            <button onClick={copyToClipboard} className="copy-button">
              Copy
            </button>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history">
          <h2>History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <div className="history-item">
                  <a
                    href={item.short}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="short-url"
                  >
                    {item.short}
                  </a>
                  <span className="original-url">{item.original}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;