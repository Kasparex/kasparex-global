
async function generateCode() {
  const prompt = document.getElementById("prompt").value;

  const res = await fetch("https://kasparex-global.onrender.com/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userPrompt: prompt }),
  });

  const data = await res.json();
  const rawCode = data.code.replace(/^```html|```$/g, "").trim();

  const blob = new Blob([rawCode], { type: "text/html" });
  const iframeUrl = URL.createObjectURL(blob);

  document.getElementById("preview").innerHTML = `<iframe src="${iframeUrl}" width="100%" height="400" sandbox="allow-scripts allow-forms"></iframe>`;
  document.getElementById("embedCode").value = `<iframe src="${iframeUrl}" width="100%" height="400" sandbox="allow-scripts allow-forms"></iframe>`;
}

function copyEmbedCode() {
  const input = document.getElementById("embedCode");
  input.select();
  document.execCommand("copy");
}
