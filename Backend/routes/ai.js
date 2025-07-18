import express from 'express';
import fetch from 'node-fetch';
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Load API key from .env
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// console.log("OPENROUTER_API_KEY:", OPENROUTER_API_KEY);


// Route: POST /api/ai/symptom-checker
router.post('/symptom-checker', async (req, res) => {
  const { symptomText } = req.body;

  if (!symptomText) {
    return res.status(400).json({ success: false, message: 'Symptom text is required' });
  }

  try {
    // You can change the model to any available on OpenRouter (e.g., openai/gpt-3.5-turbo, openai/gpt-4o, etc.)
    const agent = new https.Agent({ family: 4 });
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      agent: agent,
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        max_tokens: 512, // or another model you prefer
        messages: [
          {
            role: 'system',
            content: `
You are a polite and empathetic AI medical assistant.

When the user describes symptoms:
- Start with a compassionate opening like: "I'm sorry to hear you're feeling unwell."
- Provide advice in 4–5 **numbered steps**, with each step as a **separate paragraph**, not in a single block.
- Use plain text only. **Do NOT use any asterisks (*), bold, italics, or markdown**.
- End the message with a gentle reminder like: "Please consult a doctor if symptoms persist or become severe."
- Avoid any diagnosis. You are giving helpful suggestions only.
`
          },
          {
            role: 'user',
            content: symptomText
          }
        ]
      })
    });

    const data = await response.json();
    console.log("OpenRouter API response:", data);

    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      const rawReply = data.choices[0].message.content;
      const cleanedReply = rawReply.replace(/\*+/g, '').trim(); // Remove *, **, etc.
      res.json({ success: true, aiReply: cleanedReply });
    } else {
      res.status(500).json({ success: false, message: 'AI service failed', data });
    }
  } catch (err) {
    console.error("OpenRouter API error:", err.message);
    res.status(500).json({ success: false, message: "AI service failed" });
  }
});

export default router;