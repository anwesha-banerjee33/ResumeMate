document.getElementById('resumeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch('http://localhost:5000/api/analyze', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (data.feedback) {
      document.getElementById('result').innerHTML = `
        <h2 class="text-xl font-semibold mb-2">AI Feedback:</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto whitespace-pre-wrap">${data.feedback}</pre>
      `;
    } else {
      document.getElementById('result').innerHTML = `
        <p class="text-red-500">Something went wrong: ${data.error || 'No feedback received.'}</p>
      `;
    }

  } catch (error) {
    console.error(error);
    document.getElementById('result').innerHTML = `
      <p class="text-red-500">Error: Could not connect to the server.</p>
    `;
  }
});
