
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function fetchMedicineInfo(ocrText) {
  const cleaned = ocrText
    .toLowerCase()
    .replace(/\n/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  console.log("🔍 Cleaned OCR Text:", cleaned);

  const prompt = `
Given the scanned text from a medicine strip, extract the most probable medicine name and return the following structured information in JSON:
- name
- type (e.g., pain reliever, fever reducer)
- dosage
- instructions
- sideEffects (as an array)
- warnings (as an array)

Here is the text: """${cleaned}"""

Respond only in valid JSON format.
`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-3.5-turbo", // or you can use `gpt-3.5-turbo`, etc.
        messages: [
          { role: 'user', content: prompt }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0].message.content;

    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    const jsonStr = content.slice(jsonStart, jsonEnd + 1);
    const data = JSON.parse(jsonStr);

    return data;

  } catch (err) {
    console.error("❌ AI fetch error:", err.message);
    return null;
  }
}

