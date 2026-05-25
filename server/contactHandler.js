import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const defaultContactEmail = 'saipranavi879@gmail.com';
let cachedMongoClient;

function getConfig() {
  return {
    toEmail: process.env.CONTACT_TO_EMAIL || defaultContactEmail,
    mongoUri: process.env.MONGODB_URI,
    mongoDb: process.env.MONGODB_DB || 'nexora_ai',
    mongoCollection: process.env.MONGODB_COLLECTION || 'contact_messages',
    smtpHost: process.env.SMTP_HOST,
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpSecure: process.env.SMTP_SECURE === 'true',
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpFrom: process.env.SMTP_FROM || process.env.SMTP_USER,
  };
}

function sanitize(value) {
  return String(value || '').trim();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePayload(payload) {
  const name = sanitize(payload.name);
  const email = sanitize(payload.email).toLowerCase();
  const message = sanitize(payload.message);

  if (!name || !email || !message) {
    return { error: 'Name, email, and message are required.' };
  }

  if (!isValidEmail(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (name.length > 120) {
    return { error: 'Name must be 120 characters or fewer.' };
  }

  if (message.length > 5000) {
    return { error: 'Message must be 5000 characters or fewer.' };
  }

  return { data: { name, email, message } };
}

function assertMongoConfigured(config) {
  const missing = [];

  if (!config.mongoUri) missing.push('MONGODB_URI');

  if (missing.length) {
    const error = new Error(`Contact database is missing environment variables: ${missing.join(', ')}`);
    error.statusCode = 500;
    throw error;
  }
}

function assertEmailConfigured(config) {
  const missing = [];

  if (!config.smtpHost) missing.push('SMTP_HOST');
  if (!config.smtpUser) missing.push('SMTP_USER');
  if (!config.smtpPass) missing.push('SMTP_PASS');
  if (!config.smtpFrom) missing.push('SMTP_FROM');

  if (missing.length) {
    const error = new Error(`Contact email service is missing environment variables: ${missing.join(', ')}`);
    error.statusCode = 500;
    throw error;
  }
}

async function getMongoClient(uri) {
  if (cachedMongoClient) return cachedMongoClient;
  cachedMongoClient = new MongoClient(uri);
  await cachedMongoClient.connect();
  return cachedMongoClient;
}

async function saveMessage(config, payload, status = 'received') {
  const client = await getMongoClient(config.mongoUri);
  const collection = client.db(config.mongoDb).collection(config.mongoCollection);
  const now = new Date();
  const document = {
    ...payload,
    status,
    createdAt: now,
    updatedAt: now,
    source: 'portfolio-contact-form',
  };

  const result = await collection.insertOne(document);
  return { id: result.insertedId, collection };
}

async function markEmailSent(collection, id) {
  await collection.updateOne(
    { _id: id },
    {
      $set: {
        status: 'email_sent',
        emailSentAt: new Date(),
        updatedAt: new Date(),
      },
    },
  );
}

async function markEmailFailed(collection, id, message) {
  await collection.updateOne(
    { _id: id },
    {
      $set: {
        status: 'email_failed',
        emailError: message,
        updatedAt: new Date(),
      },
    },
  );
}

async function sendEmail(config, payload) {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />');

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });

  await transporter.sendMail({
    from: config.smtpFrom,
    to: config.toEmail,
    replyTo: payload.email,
    subject: `New portfolio message from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      '',
      'Message:',
      payload.message,
    ].join('\n'),
    html: `
      <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#111827">
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
    `,
  });
}

export async function handleContactSubmission(body) {
  const validation = validatePayload(body || {});
  if (validation.error) {
    return {
      status: 400,
      body: { success: false, message: validation.error },
    };
  }

  const config = getConfig();
  assertMongoConfigured(config);

  const { id, collection } = await saveMessage(config, validation.data);

  try {
    assertEmailConfigured(config);
    await sendEmail(config, validation.data);
    await markEmailSent(collection, id);
  } catch (error) {
    await markEmailFailed(collection, id, error.message);
    throw error;
  }

  return {
    status: 200,
    body: {
      success: true,
      message: 'Message sent successfully and saved.',
      id: String(id),
    },
  };
}
