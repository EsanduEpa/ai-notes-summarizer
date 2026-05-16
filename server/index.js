const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/summarize", (req, res) => {
    const notes = req.body.notes;
    console.log("Received notes:", notes);
    const shortSummary = notes.slice(0, 100);

    res.json({
        summary: shortSummary + "..."
    });
    })

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});