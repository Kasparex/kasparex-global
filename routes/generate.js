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

  // --- CHANGED: A much more detailed and robust system prompt ---
  const systemContext = `You are an expert Kaspa dApp generator. Your task is to generate a complete, self-contained, and functional HTML file based on the user's prompt.

  **CRITICAL INSTRUCTIONS:**
  1.  **Single File Output:** The entire output must be a single HTML file. It must start with \`<!DOCTYPE html>\` and end with \`</html>\`.
  2.  **No Markdown:** Do NOT wrap the final code in markdown fences like \`\`\`html or \`\`\`. The output must be raw HTML code.
  3.  **Self-Contained:** All CSS and JavaScript must be included directly within the HTML file in \`<style>\` and \`<script>\` tags, respectively. Do not use external file links.
  4.  **Styling:** Use a clean, modern, and user-friendly design. You may use this color palette for inspiration: primary: #0097b2, background: #f0f4f8, text: #333. The dApp should look good inside a container.
  5.  **Kaspa API:** For any Kaspa-related functionality, use placeholder fetch calls to a conceptual Kaspa API (e.g., 'https://api.kaspa.org/...') but return hardcoded, realistic mock data for demonstration purposes. This makes the widget appear functional without a live API connection.
  6.  **No Explanations:** Return ONLY the HTML code. Do not add any conversational text, introductions, or explanations before or after the code.`;

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o", // gpt-4o is excellent for this
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.2, // Lower temperature for more predictable code generation
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const generatedCode = openaiRes.data.choices[0].message.content;

    // --- CHANGED: Send the raw code from the AI directly ---
    // We are no longer wrapping the code in our own HTML structure.
    // The AI is now responsible for generating the complete document.
    res.json({ code: generatedCode });

  } catch (err) {
    // Improved error logging
    const errorMessage = err.response ? JSON.stringify(err.response.data) : err.message;
    console.error("OpenAI API error:", errorMessage);
    res.status(500).json({ error: "Failed to generate code from AI.", details: errorMessage });
  }
});

export default router;
