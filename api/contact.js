import { handleContactSubmission } from '../server/contactHandler.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const result = await handleContactSubmission(body);
    return response.status(result.status).json(result.body);
  } catch (error) {
    return response.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode ? error.message : 'Unable to send message right now. Please try again later.',
    });
  }
}
