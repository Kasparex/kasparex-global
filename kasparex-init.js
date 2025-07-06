function generateCode() {
  const prompt = document.getElementById("prompt").value;

  fetch("https://kasparex-global.onrender.com/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userPrompt: prompt })
  })
    .then(res => res.json())
    .then(data => {
      // ✂️ Remove code block formatting like ```html
      const cleanCode = data.code
        .replace(/^```html\s*/i, "")
        .replace(/```$/, "");

      // 🧼 Security tip: prevent scripts from executing
      const output = document.getElementById("output");
      output.innerHTML = `<iframe style="width:100%;height:500px;border:none;" sandbox="allow-same-origin allow-scripts" srcdoc="${cleanCode.replace(/"/g, '&quot;')}"></iframe>`;
    })
    .catch(err => {
      document.getElementById("output").innerHTML = `Error: ${err.message}`;
    });
}
