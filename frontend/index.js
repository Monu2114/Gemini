const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyABUmpgsYwDGsqeqsw0vG8UXDj5RCWyq3Y');
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Function to generate response and send partial results
async function generateResponseAndSendPartial(prompt, res) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  const result = await model.generateContentStream(prompt);

  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    res.write(chunkText + ' '); // Send chunk text to the client with a space separator
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for some time before sending next chunk
  }

  res.end(); // End response when complete
}

// Endpoint to take input and generate response
app.post('/takeInput', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8'); // Set response content type
    generateResponseAndSendPartial(prompt, res); // Generate response and send partial results
  } catch (error) {
    console.log('Error:', error);
    res.status(500).send('Error generating response');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
