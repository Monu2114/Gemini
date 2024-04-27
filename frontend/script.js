document.getElementById('Run').addEventListener('click', async () => {
  console.log('Heyy');
  try {
    const prompt = document.getElementById('chat-input').value;
    
    const response = await fetch('http://localhost:3000/takeInput', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
const responseText = await response.text();
console.log('Response text:', responseText);

    document.getElementById('output').innerText = responseText;
} catch (error) {
    console.log('Error:', error);
}
});
