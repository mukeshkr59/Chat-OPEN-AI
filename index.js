require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

app.use(express.json()); // For parsing application/json

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to interact with ChatGPT
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log(userMessage)

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // or 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error communicating with OpenAI');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
