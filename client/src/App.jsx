import { useState } from 'react';
import './App.css';

function App() {
  // Stores the full notes typed by the user.
  const [notes, setNotes] = useState('');
  // Stores the short summary shown on the screen.
  const [summary, setSummary] = useState('');
  // Tracks whether the app is currently summarizing.
  const [loading, setLoading] = useState(false);
  // Stores any error messages from the summarization process.  
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (notes.trim() === '') {
      setSummary('Please enter some notes to summarize.');
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:5001/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes : notes }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <div className="app-card">
        <div className="app-header">
          <p className="app-eyebrow">Simple AI productivity tool</p>
          <h1>AI Notes Summarizer</h1>
          <p className="app-description">
            Paste your notes below and generate a short, clear summary in one
            click.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="notes" className="notes-label">Enter your notes</label>

          <textarea
            id="notes"
            className="notes-textarea"
            // Shows helper text before the user types.
            placeholder="Paste your notes here..."
            // Connects the textarea to the notes state.
            value={notes}
            // Updates notes state whenever the user types.
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          className="summarize-button"
          onClick={handleSummarize}
          disabled={loading}
        >
          {/* Shows different text while loading. */}
          { loading ? ( 
            <> 
            <span className='spinner'></span>
               Summarizing...
          </>
          ) : (
            "Summarize"
          )}
        </button>

        <div className="info-grid">
          <div className="result-box">
            <h2>Your Notes</h2>
            {/* Displays the full notes entered by the user. */}
            <p>{notes || 'Your typed notes will appear here.'}</p>
          </div>

          <div className="result-box summary-box">
            <h2>Summary</h2>
            { error ? (
              <p className="error-message">{error}</p>
            ) : (
              // Displays the summary returned from the backend.
              <p>{summary || 'Your summary will appear here.'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
