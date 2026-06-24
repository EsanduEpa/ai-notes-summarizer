import { useState, useEffect } from 'react';
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
  // Stores the history of summaries generated during the session.
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("summaryHistory");

    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  // Stores the text typed into the history search field.
  const [historySearch, setHistorySearch] = useState("");
  // Stores the active search term after the user clicks search.
  const [activeHistorySearch, setActiveHistorySearch] = useState("");

useEffect(() => {
  localStorage.setItem("summaryHistory", JSON.stringify(history));
}, [history]);

const filteredHistory = history.filter((item) => {
  const searchTerm = activeHistorySearch.trim().toLowerCase();

  if (searchTerm === "") {
    return true;
  }

  return (
    item.notes.toLowerCase().includes(searchTerm) ||
    item.summary.toLowerCase().includes(searchTerm)
  );
});

  const handleCopy = async () => {
  await navigator.clipboard.writeText(summary);
  alert("Summary copied!");
};

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

      setHistory(prevHistory => [
        ...prevHistory,
        { id: Date.now(), notes, summary: data.summary }
      ]);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleClearHistory = () => {
  setHistory([]);
  setHistorySearch("");
  setActiveHistorySearch("");
  localStorage.removeItem("summaryHistory");
};

const handleSearchHistory = () => {
  setActiveHistorySearch(historySearch);
};

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

            {summary && !error && (
              <button className="copy-button" onClick={handleCopy}>
                Copy Summary
              </button>
            )}
          </div>

            <div className="history-box">
              <h2>History</h2>
              {history.length === 0 ? (
                <p>No summary history available.</p>
              ) : (
                <>
                  <div className="history-search">
                    <input
                      type="search"
                      className="history-search-input"
                      placeholder="Search history..."
                      value={historySearch}
                      onChange={(e) => setHistorySearch(e.target.value)}
                    />

                    <button className="history-search-button" onClick={handleSearchHistory}>
                      Search History
                    </button>
                  </div>

                  {filteredHistory.length === 0 ? (
                    <p>No matching history found.</p>
                  ) : (
                    <ul>
                      {filteredHistory.map((item) => (
                        <li key={item.id} className="history-item">
                          <p><strong>Notes:</strong> {item.notes}</p>
                          <p><strong>Summary:</strong> {item.summary}</p>
                        </li>
                      ))}
                    </ul>
                  )}

                  {history.length > 0 && (
                      <button className="clear-history-button" onClick={handleClearHistory}>
                          Clear History
                      </button>
                  )}

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default App;
