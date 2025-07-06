
async function generateCode() {
    const prompt = document.getElementById('prompt').value;
    const response = await fetch("https://kasparex-global.onrender.com/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userPrompt: prompt })
    });

    const data = await response.json();
    let code = data.code;

    // Strip ```html if present
    code = code.replace(/^```html\n?|```$/g, '').trim();

    const blob = new Blob([code], { type: 'text/html' });
    const iframeUrl = URL.createObjectURL(blob);
    const iframe = document.getElementById("output");
    iframe.src = iframeUrl;
}
