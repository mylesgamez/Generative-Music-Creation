import { useState } from 'react';
import styles from './page.module.css';

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [musicData, setMusicData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateMusic = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generateMusic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setMusicData(data.musicData);
    } catch (error) {
      console.error("Error generating music:", error);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Music Generator</h1>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your music instruction..."
        className={styles.input}
      />
      <button onClick={handleGenerateMusic} disabled={loading} className={styles.button}>
        Generate Music
      </button>

      {musicData && (
        <>
          <audio className={styles.audioPlayer} controls src={musicData} />
          <a className={styles.link} href={musicData} download>Download Music</a>
        </>
      )}
    </div>
  );
}