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
      
      const reader = response.body.getReader(); // Get response body reader
  
      let text = ''; // Initialize text variable to store response text
  
      while (true) {
          const { done, value } = await reader.read(); // Read response body
  
          if (done) {
              break; // Exit loop when done reading
          }
  
          const chunk = new TextDecoder().decode(value); // Decode chunk as text
          console.log('Chunk:', chunk); // Log chunk to console
          text += chunk; // Append chunk to text
          document.getElementById('output').innerText = text; // Update output with current text
      }
  } catch (error) {
      console.log('Error:', error);
  }
  });
  