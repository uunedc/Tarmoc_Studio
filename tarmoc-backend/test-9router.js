require('dotenv').config();

const NINEROUTER_URL = process.env.link_9ROUTER;
const NINEROUTER_KEY = process.env.Api_9Router;

async function test() {
  console.log('Testing model: app.studio.ai');
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
        size: '1024x1024' 
      })
    });
    
    console.log('Status:', r.status);
    const data = await r.json();
    console.log('Raw Data Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error during fetch:', err);
  }
}

test();