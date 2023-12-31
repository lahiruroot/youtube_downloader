import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('');
  const [mp3Url, setMp3Url] = useState('');
  const [loading, setLoading] = useState(false);

  const convertToMp3 = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/convert', { url });
      setMp3Url(response.data.mp3Url);
    } catch (error) {
      console.error('Error converting to MP3:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube to MP3 Converter</h1>
      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={convertToMp3} disabled={loading}>
        {loading ? 'Converting...' : 'Convert to MP3'}
      </button>
      {mp3Url && (
        <div>
          <audio controls>
            <source src={mp3Url} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
          <a href={mp3Url} download>
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
