async function generateCode() {
  const prompt = document.getElementById("prompt").value;
  const loading = document.getElementById("loading");
  const outputDiv = document.getElementById("output");
  const embedInput = document.getElementById("embedCode");

  outputDiv.innerHTML = "";
  loading.style.display = "block";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are a helpful assistant that generates clean HTML/JS widgets." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    const raw = data.choices[0].message.content || "";
    const clean = raw.replace(/^```html\s*/i, "").replace(/```$/g, "").trim();

    const blob = new Blob([clean], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "400";
    iframe.sandbox = "allow-scripts allow-same-origin";
    iframe.style.borderRadius = "16px";
    iframe.style.border = "1px solid #ccc";
    iframe.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    iframe.style.marginTop = "12px";
    outputDiv.appendChild(iframe);

    embedInput.value = `<iframe src="${url}" width="100%" height="400" sandbox="allow-scripts allow-same-origin"></iframe>`;
  } catch (err) {
    outputDiv.innerHTML = "<p style='color:red;'>Error: Failed to generate dApp</p>";
  } finally {
    loading.style.display = "none";
  }
}

function copyEmbedCode() {
  const input = document.getElementById("embedCode");
  input.select();
  input.setSelectionRange(0, 99999);
  document.execCommand("copy");
}