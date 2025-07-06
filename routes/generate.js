import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { userPrompt } = req.body;

  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const systemContext = `You are an expert Kaspa dApp generator. Your task is to generate a complete, self-contained, and functional HTML file based on the user's prompt.

  **CRITICAL INSTRUCTIONS:**
  1.  **Single File Output:** The entire output must be a single HTML file. It must start with \`<!DOCTYPE html>\` and end with \`</html>\`.
  2.  **No Markdown:** Do NOT wrap the final code in markdown fences like \`\`\`html or \`\`\`. The output must be raw HTML code.
  3.  **Self-Contained:** All CSS and JavaScript must be included directly within the HTML file in \`<style>\` and \`<script>\` tags.
  4.  **Styling:** Use a clean, modern, and user-friendly design.
  5.  **Functionality:** For Kaspa API calls, return hardcoded, realistic mock data for demonstration purposes.
  6.  **No Explanations:** Return ONLY the HTML code. Do not add any conversational text.`;

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2,
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // --- ROBUSTNESS FIX ---
    // Check if the AI response has the data we expect before trying to access it.
    const messageContent = openaiRes?.data?.choices?.[0]?.message?.content;

    if (!messageContent) {
      // If the response is not what we expect, log it for debugging and throw an error.
      console.error("Invalid response structure from OpenAI:", JSON.stringify(openaiRes.data));
      throw new Error("The AI service returned an invalid or empty response.");
    }

    // Clean the code by removing markdown fences, just in case the AI still adds them.
    const cleanedCode = messageContent.replace(/^```html\s*|```\s*$/g, "").trim();

    res.json({ code: cleanedCode });

  } catch (err) {
    // This block now catches errors from Axios AND our own thrown errors.
    const apiErrorDetails = err.response ? JSON.stringify(err.response.data) : err.message;
    console.error("API error:", apiErrorDetails);
    
    // Send a structured error back to the front-end.
    res.status(500).json({ error: "Failed to generate code from the AI service.", details: apiErrorDetails });
  }
});

export default router;
