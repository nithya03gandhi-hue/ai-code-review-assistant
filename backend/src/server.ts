import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json({ limit: '100kb' }));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/review', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert code reviewer. Review the code for bugs, security issues, performance, and style. Give clear, concise, actionable feedback with suggested fixes.',
        },
        { role: 'user', content: code },
      ],
    });

    const feedback = completion.choices[0]?.message?.content ?? 'No feedback returned.';
    res.json({ feedback });
  } catch (err) {
    console.error('Review error:', err);
    res.status(500).json({ error: 'Failed to generate review' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});