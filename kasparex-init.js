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
    const cleanCode = data.code
      .replace(/^```html\s*/i, "")
      .replace(/```$/, "");

    const output = document.getElementById("output");
    output.innerHTML = \`<iframe sandbox="allow-same-origin allow-scripts" srcdoc="\${cleanCode.replace(/"/g, '&quot;')}"></iframe>\`;
  })
  .catch(err => {
    document.getElementById("output").innerHTML = "Error: " + err.message;
  });
}
