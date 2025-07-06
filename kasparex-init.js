// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

  // --- DOM Element References ---
  const promptInput = document.getElementById('prompt-input');
  const generateBtn = document.getElementById('generate-btn');
  const outputFrame = document.getElementById('output-frame');
  const loader = document.getElementById('loader');
  const embedCodeInput = document.getElementById('embed-code-input');
  const copyEmbedBtn = document.getElementById('copy-embed-btn');

  // --- State Variables ---
  const API_URL = "https://kasparex-global.onrender.com/api/generate";

  /**
   * Toggles the UI into a loading state.
   * @param {boolean} isLoading - True to show loader, false to hide.
   */
  const setLoadingState = (isLoading) => {
    generateBtn.disabled = isLoading;
    loader.style.display = isLoading ? 'flex' : 'none';
    if (isLoading) {
      // Hide the iframe to show the loader inside the wrapper
      outputFrame.style.display = 'none';
    } else {
      // Show the iframe again
      outputFrame.style.display = 'block';
    }
  };
  
  /**
   * Fetches the dApp code from the API based on the user's prompt.
   */
  const generateCode = async () => {
    const userPrompt = promptInput.value.trim();
    if (!userPrompt) {
      alert("Please enter a dApp idea in the prompt box.");
      return;
    }

    setLoadingState(true);
    embedCodeInput.value = 'Generating...';

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt }),
      });

      // IMPROVED ERROR HANDLING
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const cleanCode = data.code;

      const blob = new Blob([cleanCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      outputFrame.src = url;

      const embedCode = `<iframe src="${url}" width="100%" height="400" sandbox="allow-scripts allow-same-origin" style="border:1px solid #e2e8f0;border-radius:12px;"></iframe>`;
      embedCodeInput.value = embedCode;

    } catch (error) {
      console.error("Failed to generate dApp:", error);
      
      const errorHTML = `
        <html>
          <body style="font-family: 'Inter', sans-serif; color: #c53030; text-align: center; padding: 2rem; background-color: #fff5f5;">
            <h2 style="margin-bottom: 0.5rem;">Generation Failed</h2>
            <p style="font-size: 0.9rem; max-width: 90%; margin: auto;">${error.message}</p>
          </body>
        </html>`;
      outputFrame.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(errorHTML);
      embedCodeInput.value = 'Generation failed. Please check the error above and try again.';
    } finally {
      setLoadingState(false);
    }
  };
  
  /**
   * Copies the embed code to the user's clipboard and provides visual feedback.
   */
  const copyEmbedCode = () => {
    const codeToCopy = embedCodeInput.value;

    if (!codeToCopy || codeToCopy.includes('...')) {
        return;
    }
    
    navigator.clipboard.writeText(codeToCopy).then(() => {
      const originalText = copyEmbedBtn.dataset.originalText;
      copyEmbedBtn.textContent = 'Copied!';
      copyEmbedBtn.classList.add('copied');

      setTimeout(() => {
        copyEmbedBtn.textContent = originalText;
        copyEmbedBtn.classList.remove('copied');
      }, 2000);

    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert("Could not copy the code. Please select it manually.");
    });
  };

  // --- Event Listeners ---
  generateBtn.addEventListener('click', generateCode);
  copyEmbedBtn.addEventListener('click', copyEmbedCode);
});
