# JARVIS Voice Assistant (Version 1)

JARVIS is a simple voice assistant web application powered by Google Gemini AI. It allows users to ask questions using speech recognition and receive AI-generated answers in real time.

## Features

- **Speech Recognition:** Ask questions using your voice.
- **AI Responses:** Get answers from Google Gemini AI.
- **Conversation History:** View all previous questions and answers.
- **Clear Conversation:** Reset the conversation history.
- **Responsive UI:** Works on desktop and mobile browsers.

## Technologies Used

- Node.js & Express (Backend)
- Google Gemini AI API
- HTML, CSS, JavaScript (Frontend)
- Web Speech API (Speech Recognition)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd JARVIS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   - Create a `.env` file in the root directory.
   - Add your Gemini API key:
     ```
     KEY=your-gemini-api-key
     ```

4. **Start the server:**
   ```bash
   node server.js
   ```

5. **Open in your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
JARVIS/
├── Frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── .env
```

## Usage

- Click **Start Listening** and ask your question.
- Click **Stop Listening** to send your question to Gemini AI.
- View the answer and conversation history.
- Click **Clear Conversation** to reset.

## Requirements

- Node.js (v18+ recommended)
- Google Chrome (for best speech recognition support)
- Gemini API Key

## Project Link

[View JARVIS Voice Assistant on GitHub](https://github.com/your-username/JARVIS)

## Live Project Link
[Try JARVIS Voice Assistant](https://jarvis-voice-assitant.onrender.com/)

## License

This project is for educational purposes.

---

**JARVIS Version 1** – Your personal AI-powered voice assitant