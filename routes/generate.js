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

  const systemContext = \`
You are an expert Kaspa Web3 dApp generator. 
Your task is to generate simple, complete HTML/JS front-end apps that interact with Kaspa API.
If the user mentions smart contracts, include placeholders based on expected Kaspa SC syntax.
The output must be full working code inside HTML <script> or <style> blocks if needed.
Return ONLY code, no explanation.
\`;

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemContext },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.3
      },
      {
        headers: {
          "Authorization": \`Bearer \${process.env.OPENAI_API_KEY}\`,
          "Content-Type": "application/json"
        }
      }
    );

    const rawCode = openaiRes.data.choices[0].message.content;

    const wrappedCode = \`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Kasparex dApp</title>
  <link rel="stylesheet" href="https://kasparex.github.io/kasparex-global/kasparex-style.css">
  <script defer src="https://kasparex.github.io/kasparex-global/kasparex-init.js"></script>
</head>
<body>
  <div class="container">
    \${rawCode}
  </div>
</body>
</html>
\`;

    res.json({ code: wrappedCode });

  } catch (err) {
    console.error("OpenAI API error:", err?.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate code." });
  }
});

export default router;
