require('dotenv').config();
const fs = require('fs');

const key = process.env.HUGGINGFACE_KEY;
console.log('Using Key:', key ? '✓ Found' : '✗ Not Found');

async function test() {
  try {
    const res = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: 'a cute orange cat, high quality' })
    });
    console.log('Status:', res.status);
    if (!res.ok) {
      console.log('Error text:', await res.text());
    } else {
      console.log('✅ Hugging Face Key is valid and working!');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

test();