require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' })); // besar dikit buat handle base64 image

const PORT = process.env.PORT || 3001;
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const NINEROUTER_URL = process.env.link_9ROUTER; // contoh: http://10.0.150.134:20128/v1
const NINEROUTER_KEY = process.env.Api_9Router;

// Folder buat nyimpen hasil generate (gambar/video) - pengganti "storage" tanpa DB
const OUTPUT_DIR = path.join(__dirname, 'outputs');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
app.use('/outputs', express.static(OUTPUT_DIR)); // biar file bisa diakses via URL

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ============ CHATGPT (OpenAI) ============
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body; // [{ role: 'user', content: '...' }]
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: 'gpt-4.1', messages })
    });
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ============ GEMINI (teks) ============
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: { 'x-goog-api-key': GEMINI_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      }
    );
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ============ NANO BANANA (generate gambar) ============
app.post('/api/image', async (req, res) => {
  try {
    const { prompt } = req.body;
    // FIX: Ganti model ke yang valid
    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent',
      {
        method: 'POST',
        headers: { 'x-goog-api-key': GEMINI_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['image', 'text'] }
        })
      }
    );
    const data = await r.json();

    // Ambil gambar dari response, simpan ke folder outputs, balikin URL lokal
    const imgPart = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imgPart) {
      const filename = `img_${Date.now()}.png`;
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(imgPart.inlineData.data, 'base64'));
      return res.json({ url: `/outputs/${filename}` });
    }
    res.json(data); // fallback kalau format beda / ada error
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ============ VEO 3 (generate video) ============
// Video generation itu ASYNC: kita mulai job, lalu polling sampai selesai.
// NOTE: cek dokumentasi terbaru di ai.google.dev sebelum pakai serius,
// endpoint/model video suka berubah.
app.post('/api/video/start', async (req, res) => {
  try {
    const { prompt } = req.body;
    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/veo-3.1:generateVideos',
      {
        method: 'POST',
        headers: { 'x-goog-api-key': GEMINI_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      }
    );
    const data = await r.json();
    res.json(data); // berisi "name" operation id buat dicek statusnya
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/video/status/:operationName(*)', async (req, res) => {
  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${req.params.operationName}`,
      { headers: { 'x-goog-api-key': GEMINI_KEY } }
    );
    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ============ AI AFFILIATE (Multi-Provider) ============
const HF_API_TOKEN = process.env.HF_API_TOKEN;

const GEMINI_IMAGE_MODELS = {
  'gemini': 'gemini-2.5-flash-image',
  'nano-banana-2': 'gemini-3.1-flash-image-preview',
  'nano-banana-2-lite': 'gemini-3.1-flash-image-preview', // belum ada varian "lite" resmi terpisah — pakai model sama dulu
  'nano-banana-pro': 'gemini-3-pro-image-preview' // BERBAYAR, tidak ada free tier
};

const IMAGEN_MODELS = {
  'imagen-4': 'imagen-4.0-generate-001',
  'imagen-4-ultra': 'imagen-4.0-ultra-generate-001',
  'imagen-4-fast': 'imagen-4.0-fast-generate-001'
}; // BERBAYAR semua, dan dijadwalkan deprecated 17 Agustus 2026

async function generateWithGeminiFamily(promptText, modelId) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': GEMINI_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
        generationConfig: { responseModalities: ['image', 'text'] }
      })
    }
  );
  const data = await r.json();
  const imgPart = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!imgPart) throw new Error(data?.error?.message || `${modelId} gagal generate gambar`);
  return Buffer.from(imgPart.inlineData.data, 'base64');
}

async function generateWithImagen(promptText, modelId) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:predict`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': GEMINI_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt: promptText }],
        parameters: { sampleCount: 1 }
      })
    }
  );
  const data = await r.json();
  const b64 = data?.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error(data?.error?.message || `${modelId} gagal generate gambar`);
  return Buffer.from(b64, 'base64');
}

async function generateWithChatGPT(promptText) {
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model: 'gpt-image-1', prompt: promptText, n: 1, size: '1024x1024' })
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error.message);
  const item = data.data?.[0];
  if (item?.b64_json) return Buffer.from(item.b64_json, 'base64');
  if (item?.url) {
    const imgFetch = await fetch(item.url);
    return Buffer.from(await imgFetch.arrayBuffer());
  }
  throw new Error('ChatGPT gagal generate gambar');
}

async function generateWithHuggingFace(promptText, model) {
  const r = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${HF_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: promptText })
  });
  if (!r.ok) throw new Error(`Hugging Face error: ${await r.text()}`);
  return Buffer.from(await r.arrayBuffer());
}

async function generateWith9Router(promptText, model = 'app.studio.ai') {
  const r = await fetch(`${NINEROUTER_URL}/images/generations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NINEROUTER_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ model, prompt: promptText, n: 1, size: '1024x1024' })
  });
  const data = await r.json();
  if (data.error) throw new Error(data.error.message || '9Router error');
  const item = data.data?.[0];
  if (item?.b64_json) return Buffer.from(item.b64_json, 'base64');

  const imgUrl = item?.url;
  if (imgUrl) {
    const imgResp = await fetch(imgUrl);
    if (!imgResp.ok) throw new Error(`Failed to download image from 9Router: ${imgResp.statusText}`);
    return Buffer.from(await imgResp.arrayBuffer());
  }

  throw new Error(data?.error?.message || '9Router failed to generate image. Response tidak berisi url atau b64_json.');
}

async function generateImageByProvider(provider, promptText) {
  if (GEMINI_IMAGE_MODELS[provider]) return generateWithGeminiFamily(promptText, GEMINI_IMAGE_MODELS[provider]);
  if (IMAGEN_MODELS[provider]) return generateWithImagen(promptText, IMAGEN_MODELS[provider]);
  if (provider === 'chatgpt') return generateWithChatGPT(promptText);
  if (provider === 'huggingface-flux') return generateWithHuggingFace(promptText, 'black-forest-labs/FLUX.1-schnell');
  if (provider === 'huggingface-sd') return generateWithHuggingFace(promptText, 'stabilityai/stable-diffusion-3.5-large');
  if (provider === '9router') return generateWith9Router(promptText);
  throw new Error(`Provider tidak dikenali: ${provider}`);
}

app.post('/api/affiliate/generate', async (req, res) => {
  try {
    const { ratio, gender, interaction, marketplaces, count, provider, imagePrompt } = req.body;

    const promptText = imagePrompt?.trim()
      ? imagePrompt.trim()
      : `High-quality affiliate marketing photo, a ${gender} model ${interaction}. Target marketplace style: ${marketplaces.join(', ')}. Professional studio lighting, realistic, 4k, e-commerce product photography.`;

    const generatedUrls = [];

    for (let i = 0; i < count; i++) {
      console.log(`Menggenerate gambar ${i+1} via ${provider}...`);
      try {
        const buffer = await generateImageByProvider(provider, promptText);
        const filename = `affiliate_${Date.now()}_${i}.png`;
        fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
        generatedUrls.push(`/outputs/${filename}`);
        console.log(`✅ Gambar ${i+1} selesai!`);
        if (i < count - 1) await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (fetchErr) {
        console.error(`❌ Error generate gambar ${i+1}:`, fetchErr.message);
      }
    }

    if (generatedUrls.length === 0) {
      return res.status(500).json({ success: false, message: `Gagal generate gambar via ${provider}. Cek terminal.` });
    }

    res.json({ success: true, images: generatedUrls });
  } catch (err) {
    console.error("Error Affiliate Generate:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ 9ROUTER (TAMBAHAN BARU) ============
app.get('/api/9router/test', async (req, res) => {
  try {
    console.log('🧪 Testing 9Router connection...');
    console.log('URL:', NINEROUTER_URL);
    console.log('Key:', NINEROUTER_KEY ? `${NINEROUTER_KEY.substring(0, 10)}...` : 'KOSONG!');
    
    const r = await fetch(`${NINEROUTER_URL}/models`, {
      headers: { 'Authorization': `Bearer ${NINEROUTER_KEY}` }
    });
    
    const data = await r.json();
    res.json({
      connected: r.ok,
      status: r.status,
      models: data.data?.map(m => m.id) || [],
      raw: data
    });
  } catch (err) {
    res.json({ connected: false, error: err.message });
  }
});

app.post('/api/9router/chat', async (req, res) => {
  try {
    const { messages, model = 'gpt-4o' } = req.body;
    
    const r = await fetch(`${NINEROUTER_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NINEROUTER_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages, max_tokens: 4096 })
    });

    const data = await r.json();
    if (data.error) return res.status(r.status).json(data);
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/9router/image', async (req, res) => {
  try {
    const { prompt, model = 'app.studio.ai' } = req.body;
    
    const r = await fetch(`${NINEROUTER_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NINEROUTER_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, prompt, n: 1, size: '1024x1024' })
    });

    const data = await r.json();
    if (data.error) return res.status(r.status).json(data);
    
    const item = data.data?.[0];

    if (item?.b64_json) {
      const filename = `9router_${Date.now()}.png`;
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(item.b64_json, 'base64'));
      return res.json({ url: `/outputs/${filename}`, original: data });
    }

    const imgUrl = item?.url;
    if (imgUrl) {
      const imgResp = await fetch(imgUrl);
      const buffer = Buffer.from(await imgResp.arrayBuffer());
      const filename = `9router_${Date.now()}.png`;
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
      return res.json({ url: `/outputs/${filename}`, original: data });
    }
    
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ============ AKHIR 9ROUTER ============

app.listen(PORT, () => {
  console.log(`✅ TARMOC backend jalan di http://localhost:${PORT}`);
  if (!OPENAI_KEY) console.warn('⚠️  OPENAI_API_KEY belum diisi di .env (perlu buat provider ChatGPT)');
  if (!GEMINI_KEY) console.warn('⚠️  GEMINI_API_KEY belum diisi di .env (perlu buat Gemini/Nano Banana/Imagen)');
  if (!HF_API_TOKEN) console.warn('⚠️  HF_API_TOKEN belum diisi di .env (perlu buat provider Hugging Face)');
  if (!NINEROUTER_URL) console.warn('⚠️  link_9ROUTER belum diisi di .env');
  if (!NINEROUTER_KEY) console.warn('⚠️  Api_9Router belum diisi di .env');
});
