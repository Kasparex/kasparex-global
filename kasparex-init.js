document.getElementById('generateBtn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value.trim();
  const status = document.getElementById('status');
  const output = document.getElementById('output');
  const embedCode = document.getElementById('embedCode');

  status.textContent = 'Loading...';
  embedCode.value = '';
  output.srcdoc = '';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer sk-fake-for-demo', // replace with real key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.5
      })
    });

    const data = await response.json();
    let code = data.choices[0].message.content || '';
    code = code.replace(/```html|```/g, '').trim(); // Remove ```html ``` wrappers
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    output.src = url;
    embedCode.value = `<iframe src="${url}" width="100%" height="400" sandbox="allow-scripts"></iframe>`;
    status.textContent = '';
  } catch (err) {
    status.textContent = 'Error: Failed to generate dApp';
    console.error(err);
  }
});

document.getElementById('copyBtn').addEventListener('click', () => {
  const embed = document.getElementById('embedCode');
  embed.select();
  document.execCommand('copy');
});
