# AI Notes Summarizer

An AI-powered full-stack web application that summarizes user notes using Google Gemini AI.

This project was built as a beginner-friendly learning project to understand how modern AI web applications work using React, Express, and AI APIs.

---

# Project Overview

The AI Notes Summarizer allows users to:

* Paste notes or long paragraphs
* Send the notes to a backend API
* Generate an AI-powered summary using Gemini AI
* Display the generated summary in the frontend

This project demonstrates the complete flow of a modern AI-powered web application.

---

# Technologies Used

## Frontend

* React
* Vite
* JavaScript
* CSS

## Backend

* Node.js
* Express.js
* CORS
* dotenv

## AI Integration

* Google Gemini API
* @google/genai SDK

---

# Features

* AI-generated note summaries
* React frontend with dynamic UI
* Express backend API
* Frontend-to-backend communication using fetch()
* Loading state handling
* Secure API key management using .env
* Error handling for empty inputs

---

# System Architecture

```text
User
 ↓
React Frontend
 ↓
Express Backend API
 ↓
Google Gemini AI
 ↓
Backend Response
 ↓
Frontend UI
```

---

# Learning Objectives

This project was mainly built to learn:

## React Concepts

* Components
* JSX
* useState Hook
* Event handling
* Controlled inputs
* Conditional rendering
* API calls using fetch()

## Backend Concepts

* Express server setup
* API route creation
* Handling JSON requests
* Sending JSON responses
* Async/await usage

## AI Concepts

* AI API integration
* Prompt engineering basics
* AI response handling

## Security Concepts

* Environment variables
* API key protection
* .gitignore usage

---

# Project Structure

```text
ai-notes-summarizer/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── index.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Backend Setup

## Navigate to backend folder

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Install required packages

```bash
npm install express cors dotenv @google/genai
```

## Run backend

```bash
node index.js
```

Backend runs on:

```text
http://localhost:5001
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
GEMINI_API_KEY=your_api_key_here
```

Replace:

```text
your_api_key_here
```

with your real Gemini API key.

---

# Important Security Note

Never upload:

* .env files
* API keys
* node_modules

to GitHub.

---

# .gitignore Configuration

Create a `.gitignore` file inside the server folder.

```text
node_modules/
.env
```

---

# API Endpoint

## POST /summarize

Summarizes user notes using Gemini AI.

### Request Example

```json
{
  "notes": "Artificial Intelligence is transforming healthcare..."
}
```

### Response Example

```json
{
  "summary": "AI is transforming healthcare by improving diagnostics..."
}
```

---

# How the Application Works

## Step 1

User enters notes in the React frontend.

## Step 2

React sends notes to backend using fetch().

## Step 3

Express backend receives the request.

## Step 4

Backend sends prompt to Gemini AI.

## Step 5

Gemini generates a summary.

## Step 6

Backend returns summary to frontend.

## Step 7

Frontend displays the summary.

---

# Example Flow

```text
User Input:
"Artificial Intelligence is transforming healthcare..."

↓

Gemini AI Processing

↓

Generated Summary:
"AI improves healthcare through better diagnostics and automation."
```

---

# Challenges Faced During Development

* Understanding frontend and backend communication
* Learning async/await
* Managing loading states
* Handling API errors
* Protecting API keys
* Removing sensitive files from GitHub

---

# Future Improvements

Planned future enhancements:

* Better responsive UI
* Dark mode
* Copy summary button
* Summary history
* Save summaries in database
* User authentication
* PDF upload support
* Export summaries

---

# Skills Gained

Through this project, the following practical skills were developed:

* Full-stack web development
* REST API development
* AI integration
* React state management
* Backend architecture
* Secure API handling
* Debugging and testing

---

# Author

Esandu Hansaka Epa

Undergraduate at University of Colombo School of Computing (UCSC)

Interested in:

* Full-stack development
* AI-powered web systems
* Software engineering
* Entrepreneurship

---

# License

This project was created for educational and learning purposes.
