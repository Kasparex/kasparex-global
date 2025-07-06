async function generateCode() {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("https://kasparex-global.onrender.com/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userPrompt: prompt })
  });

  const result = await response.json();
  const cleanedCode = result.code.replace(/^```html|```$/g, "").trim();
  const outputFrame = document.getElementById("output-frame");
  outputFrame.srcdoc = cleanedCode;
}
