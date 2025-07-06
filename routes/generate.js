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

  // --- THE NEW, HIGHLY DETAILED SYSTEM PROMPT ---
  // We are now providing a mandatory CSS template for the AI to use.
  const systemContext = `You are an expert Kaspa dApp generator. Your task is to generate a complete, self-contained, and functional HTML file based on the user's prompt.

  **CRITICAL INSTRUCTIONS:**

  1.  **Single File Output:** The entire output MUST be a single HTML file starting with \`<!DOCTYPE html>\`.
  2.  **MANDATORY STYLE TEMPLATE:** You MUST include the following CSS block inside the \`<head>\` of the HTML you generate. Do not change the variables or base styles.

      \`\`\`html
      <style>
        :root {
          --primary-color: #0097b2;
          --primary-hover-color: #007a91;
          --background-color: #ffffff;
          --text-color: #333;
          --border-color: #e2e8f0;
          --font-family: 'Inter', -apple-system, sans-serif;
        }
        * {
          box-sizing: border-box;
        }
        body {
          font-family: var(--font-family);
          background-color: var(--background-color);
          color: var(--text-color);
          margin: 0;
          padding: 1.5rem;
          font-size: 16px;
        }
        .dapp-container {
          width: 100%;
          max-width: 600px;
          margin: auto;
        }
        input[type="text"], input[type="number"] {
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          font-size: 1rem;
          margin-bottom: 1rem;
        }
        button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          width: 100%;
          transition: background-color 0.2s;
        }
        button:hover {
          background: var(--primary-hover-color);
        }
        #results {
          margin-top: 1.5rem;
          padding: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: #f8fafc;
          word-wrap: break-word;
        }
      </style>
      \`\`\`

  3.  **Structure:** Wrap the main content of your dApp inside a \`<div class="dapp-container">\`. Use an element with \`id="results"\` to display output.
  4.  **No Markdown:** Do NOT wrap the final, full HTML code in markdown fences like \`\`\`html or \`\`\`.
  5.  **Functionality:** For Kaspa API calls, return hardcoded, realistic mock data for demonstration.
  6.  **No Explanations:** Return ONLY the HTML code.
  `;

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

    const messageContent = openaiRes?.data?.choices?.[0]?.message?.content;

    if (!messageContent) {
      console.error("Invalid response structure from OpenAI:", JSON.stringify(openaiRes.data));
      throw new Error("The AI service returned an invalid or empty response.");
    }

    const cleanedCode = messageContent.replace(/^```html\s*|```\s*$/g, "").trim();

    res.json({ code: cleanedCode });

  } catch (err) {
    const apiErrorDetails = err.response ? JSON.stringify(err.response.data) : err.message;
    console.error("API error:", apiErrorDetails);
    res.status(500).json({ error: "Failed to generate code from the AI service.", details: apiErrorDetails });
  }
});

export default router;
