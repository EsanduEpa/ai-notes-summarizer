import { useState } from 'react';

function App() {
  // Stores the full notes typed by the user.
  const [notes, setNotes] = useState('');
  // Stores the short summary shown on the screen.
  const [summary, setSummary] = useState('');
  // Tracks whether the app is currently summarizing.
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (notes.trim() === '') {
      setSummary('Please enter some notes to summarize.');
      return;
    }
    setLoading(true);

    const response = await fetch('http://localhost:5001/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes : notes }),
    });

    const data = await response.json();
    setSummary(data.summary);
    setLoading(false);
  }

  return (
    <div>
      <h1>AI Notes Summarizer</h1>
      <label>Enter your notes</label>

      <br />

      <textarea
        // Shows helper text before the user types.
        placeholder="Paste your notes here..."
        // Connects the textarea to the notes state.
        value={notes}
        // Updates notes state whenever the user types.
        onChange={(e) => setNotes(e.target.value)}
      />
      <br />

      
      <button onClick={handleSummarize} disabled={loading}>
        {/* Shows different text while loading. */}
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {/* Displays the full notes entered by the user. */}
      <p>You typed: {notes}</p>
      {/* Displays the generated summary. */}
      <p>Summary: {summary}</p>
    </div>
  );
}

export default App;
