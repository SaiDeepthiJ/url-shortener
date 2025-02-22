import React, { useState } from 'react';

<input
  type="url"
  value={longUrl}
  onChange={(e) => setLongUrl(e.target.value)}
  pattern="https?://.+"
  required
  placeholder="https://example.com"
/>

function App() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');

	const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Normalize URL format
    let normalizedUrl = longUrl;
    if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
      normalizedUrl = `https://${longUrl}`;
    }

    const response = await fetch('https://8d21ece3-9b94-43ad-b6cb-d84e55612e99-00-1mrtr4aq03196.spock.replit.dev/shorten', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      },
      body: JSON.stringify({ 
        originalUrl: normalizedUrl,  // Use normalized URL
        // OR try different key if backend expects it:
        // long_url: normalizedUrl
      })
    });
		
		// Add this debug line
		console.log('Response status:', response.status, 'Headers:', [...response.headers]);

    return (
        <div className="App">
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a long URL:
                    <input
                        type="url"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                        placeholder="https://example.com"
                    />
                </label>
                <button type="submit">Shorten</button>
            </form>
            
            {error && <div className="error">{error}</div>}
            
            {shortUrl && (
                <p>
                    Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                        {shortUrl}
                    </a>
                </p>
            )}
        </div>
    );
}

export default App;