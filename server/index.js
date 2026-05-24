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


app.post("/summarize", async (req, res) => {
    try{
        const notes = req.body.notes;

        if (!notes || notes.trim() === "") {
            return res.status(400).json({ 
                summary: "Please provide some notes to summarize." 
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Summarize the following notes in a concise manner:\n\n${notes}`,
        });

        res.json({
            summary: response.text,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            summary: "Failed to generate summary."
        });
    }

});




app.get("/test-ai", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
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