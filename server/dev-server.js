import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { handleContactSubmission } from './contactHandler.js';

dotenv.config();

const app = express();
const port = Number(process.env.API_PORT || 8787);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173' }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'nexora-contact-api' });
});

app.post('/api/contact', async (request, response) => {
  try {
    const result = await handleContactSubmission(request.body);
    response.status(result.status).json(result.body);
  } catch (error) {
    response.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : 'Unable to send message right now. Please try again later.',
    });
  }
});

app.listen(port, () => {
  console.log(`Contact API running on http://127.0.0.1:${port}`);
});

// Keep the local API process alive in shells that close idle Node handles aggressively.
setInterval(() => {}, 60 * 60 * 1000);
