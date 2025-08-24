import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = 3000
dotenv.config();
const key = process.env.KEY;
const message = [];
// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: key
});

async function main(input) {
    message.push({ role: "user", parts: [{ text: input }] })
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
        generationConfig: { maxOutputTokens: 4000 }
    });
    return response.text;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

app.post("/api", async (req, res, next) => {
    const mes = await main(req.body.input)
    res.json({ success: true, message: mes })
})

app.post("/clear", (req, res) => {
    message.length = 0; // Clear the conversation history
    res.json({ success: true });
});

app.listen(port, () => {

});