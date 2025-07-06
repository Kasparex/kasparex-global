
async function generateCode() {
  const prompt = document.getElementById("prompt").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "⏳ Generating...";

  try {
    const res = await fetch("https://kasparex-global.onrender.com/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userPrompt: prompt })
    });

    const data = await res.json();

    let code = data.code || "";

    // Remove backtick formatting if present
    if (code.startsWith("```html")) code = code.slice(7);
    if (code.endsWith("```")) code = code.slice(0, -3);

    // Display in iframe
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    outputDiv.innerHTML = `<iframe src="\${url}"></iframe>`;
  } catch (err) {
    outputDiv.innerHTML = "❌ Error generating code.";
    console.error(err);
  }
}
    