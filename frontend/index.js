const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyABUmpgsYwDGsqeqsw0vG8UXDj5RCWyq3Y');
const cors = require('cors');
app.use(cors());

  app.use(express.json());

  async function generateResponse(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

  app.post('/takeInput', async (req, res) => {
      try {
          const prompt = req.body.prompt;
          const response = await generateResponse(prompt);
          res.json(response);
      } catch (error) {
          console.log('Error:', error);
      }
  });


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});