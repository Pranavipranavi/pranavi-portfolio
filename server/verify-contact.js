import dotenv from 'dotenv';

dotenv.config();

const endpoint = process.env.CONTACT_TEST_URL || 'http://127.0.0.1:5173/api/contact';

const payload = {
  name: 'Nexora Contact Test',
  email: 'contact-test@example.com',
  message: `Automated contact flow test from ${new Date().toISOString()}`,
};

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const result = await response.json();

if (!response.ok || !result.success) {
  console.error('Contact flow verification failed.');
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}

console.log('Contact flow verification passed.');
console.log(JSON.stringify(result, null, 2));
