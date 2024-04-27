const express = require('express');
const app = express();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyABUmpgsYwDGsqeqsw0vG8UXDj5RCWyq3Y');

  app.use(express.json());

  app.post('/takeInput', async (req, res) => {
      try {
          const prompt = req.body.prompt;
          const response = await generateResponse(prompt);
          res.json({response});
      } catch (error) {
          console.log('Error:', error);
      }
  });

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});