require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

// Log the status of the Gemini API key to ensure it's loaded correctly
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY ? "Loaded" : "Not Loaded");

const app = express();

// create ai object to interact with Gemini API
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// get from summarize endpoint and return a short summary of the notes
app.post("/summarize", (req, res) => {
    const notes = req.body.notes;
    console.log("Received notes:", notes);
    const shortSummary = notes.slice(0, 100);

    res.json({
        summary: shortSummary + "..."
    });
    })




app.get("/test-ai", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "who is the largest fish",
    });

    res.json({
      message: response.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI test failed",
    });
  }
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});