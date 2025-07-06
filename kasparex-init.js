
async function generateCode() {
  const prompt = document.getElementById("prompt").value;
  const res = await fetch("https://kasparex-global.onrender.com/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userPrompt: prompt }),
  });

  const data = await res.json();
  const cleanCode = data.code.replace(/```html|```/g, "").trim();

  const blob = new Blob([cleanCode], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const iframe = document.getElementById("output-frame");
  iframe.src = url;

  const embedCode = `<iframe src="${url}" width="100%" height="400" sandbox="allow-scripts allow-same-origin" style="border:none;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.15);"></iframe>`;
  document.getElementById("embed-code").value = embedCode;
}

function copyEmbed() {
  const copyText = document.getElementById("embed-code");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
