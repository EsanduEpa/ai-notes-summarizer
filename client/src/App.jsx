import { useState } from 'react';

function App() {
  // Stores the full notes typed by the user.
  const [notes, setNotes] = useState('');
  // Stores the short summary shown on the screen.
  const [summary, setSummary] = useState('');
  // Tracks whether the app is currently summarizing.
  const [loading, setLoading] = useState(false);

  const handleSummarize = () => {
    // Stop if the user did not type anything useful.
    if (notes.trim() === '') {
      alert('Please enter some notes to summarize.');
      return;
    }

    // Show loading state while the summary is being prepared.
    setLoading(true);

    setTimeout(() => {
      // Take the first 100 characters as a simple fake summary.
      const shortSummary = notes.slice(0, 100);
      // Save the summary so it can be displayed below.
      setSummary(shortSummary + '...');
      // Turn off loading after the summary is ready.
      setLoading(false);
    }, 1500);
  };

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
