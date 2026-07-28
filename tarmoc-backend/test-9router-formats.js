require('dotenv').config();

const NINEROUTER_URL = process.env.link_9ROUTER;
const NINEROUTER_KEY = process.env.Api_9Router;

async function test(format) {
  console.log(`Testing model: app.studio.ai with response_format: ${format}`);
  try {
    const r = await fetch(`${NINEROUTER_URL}/images/generations`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NINEROUTER_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        model: 'app.studio.ai', 
        prompt: 'a woman holding a product', 
        n: 1, 
        size: '1024x1024',
        response_format: format
      })
    });
    
    console.log('Status:', r.status);
    const data = await r.json();
    console.log('Response Keys:', Object.keys(data));
    if (data.data && data.data[0]) {
      console.log('Data keys:', Object.keys(data.data[0]));
      console.log('b64_json length:', data.data[0].b64_json ? data.data[0].b64_json.length : 0);
      console.log('url:', data.data[0].url);
      if (data.data[0].b64_json && data.data[0].b64_json.length > 0) {
        console.log('Preview b64_json:', data.data[0].b64_json.substring(0, 100));
      }
    } else {
      console.log('Raw Data:', data);
    }
  } catch (err) {
    console.error('Error during fetch:', err);
  }
}

async function run() {
  await test('b64_json');
  console.log('-------------------');
  await test('url');
}

run();