require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const PORT = process.env.PORT || 5001;
function envKey(...names) {
  for (const name of names) {
    const value = process.env[name];
    if (value && !String(value).startsWith('isi_api_key_')) return value;
  }
  return '';
}

const OPENAI_KEY = envKey('OPENAI_API_KEY');
const GEMINI_KEY = envKey('GEMINI_API_KEY', 'GOOGLE_AI_API_KEY', 'GOOGLE_API_KEY');
const NINEROUTER_URL = process.env.link_9ROUTER || '';
const NINEROUTER_KEY = envKey('Api_9Router');
const HF_API_TOKEN = envKey('HF_API_TOKEN', 'HUGGINGFACE_KEY', 'HF_TOKEN');
const FAL_KEY = envKey('FAL_KEY', 'FAL_AI_API_KEY');
const PIXAZO_API_KEY = envKey('PIXAZO_API_KEY');
const JSON2VIDEO_API_KEY = envKey('JSON2VIDEO_API_KEY');

// Folder tempat menyimpan hasil generate static (gambar/video)
const OUTPUT_DIR = path.join(__dirname, 'outputs');
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
app.use('/outputs', express.static(OUTPUT_DIR));
app.use(express.static(FRONTEND_DIR));

// Folder tempat menyimpan projek OpenMontage
const PROJECTS_DIR = path.join(__dirname, 'projects');
if (!fs.existsSync(PROJECTS_DIR)) fs.mkdirSync(PROJECTS_DIR, { recursive: true });

// ============ SUB ACCOUNT AUTH (minimal JSON persistence) ============
const DATA_DIR = path.join(__dirname, 'data');
const SUB_ACCOUNTS_FILE = path.join(DATA_DIR, 'sub-accounts.json');
const MAIN_ADMIN_USER = process.env.MAIN_ADMIN_USER || 'Tarmoc@studio';
const MAIN_ADMIN_PASS = process.env.MAIN_ADMIN_PASS || 'Studio@123';
const AUTH_SALT = process.env.AUTH_SALT || 'tarmoc-studio-salt-v1';
const ADMIN_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function hashPassword(password) {
  return crypto.createHash('sha256').update(AUTH_SALT + String(password)).digest('hex');
}

function createAdminToken() {
  const payload = { role: 'main_admin', exp: Date.now() + ADMIN_TOKEN_TTL_MS };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = crypto.createHmac('sha256', AUTH_SALT).update(data).digest('hex');
  return `${data}.${sig}`;
}

function parseAdminToken(token) {
  if (!token || typeof token !== 'string') return null;
  const [data, sig] = token.split('.');
  if (!data || !sig) return null;
  const expected = crypto.createHmac('sha256', AUTH_SALT).update(data).digest('hex');
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    if (payload?.role !== 'main_admin') return null;
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function extractAdminToken(req) {
  const direct = req.headers['x-admin-token'];
  if (direct) return String(direct).trim();
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && /^Bearer\s+/i.test(String(authHeader))) {
    return String(authHeader).replace(/^Bearer\s+/i, '').trim();
  }
  return '';
}

function requireAdminAuth(req, res) {
  const token = extractAdminToken(req);
  if (!token) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return false;
  }
  if (!parseAdminToken(token)) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return false;
  }
  return true;
}

function loadSubAccounts() {
  try {
    if (!fs.existsSync(SUB_ACCOUNTS_FILE)) return [];
    const raw = fs.readFileSync(SUB_ACCOUNTS_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveSubAccounts(accounts) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(SUB_ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
}

function findSubAccount(username) {
  const u = String(username || '').trim().toLowerCase();
  return loadSubAccounts().find(a => String(a.username || '').trim().toLowerCase() === u);
}

function sanitizeAccount(account) {
  const { passwordHash, ...safe } = account;
  return safe;
}

app.post('/api/auth/login', (req, res) => {
  const username = String(req.body?.username || '').trim();
  const password = String(req.body?.password || '');

  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password are required.' });
  }

  if (username === MAIN_ADMIN_USER && password === MAIN_ADMIN_PASS) {
    const adminToken = createAdminToken();
    return res.json({
      success: true,
      adminToken,
      user: {
        id: 'main-admin',
        name: 'Main Admin',
        username: MAIN_ADMIN_USER,
        role: 'main_admin',
        allowedMenus: ['*']
      }
    });
  }

  const account = findSubAccount(username);
  if (!account) {
    return res.status(401).json({ success: false, error: 'Username tidak terdaftar' });
  }
  if (account.status === 'disabled') {
    return res.status(403).json({
      success: false,
      disabled: true,
      error: 'Account Anda dinonaktifkan. Hubungi administrator.'
    });
  }
  if (account.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ success: false, error: 'Password salah' });
  }

  return res.json({
    success: true,
    user: {
      id: account.id,
      name: account.name,
      username: account.username,
      role: 'sub_admin',
      allowedMenus: Array.isArray(account.allowedMenus) ? account.allowedMenus : []
    }
  });
});

app.get('/api/accounts', (req, res) => {
  if (!requireAdminAuth(req, res)) return;
  res.json({ success: true, accounts: loadSubAccounts().map(sanitizeAccount) });
});

app.post('/api/accounts', (req, res) => {
  if (!requireAdminAuth(req, res)) return;

  const { name, username, password, allowedMenus = [] } = req.body || {};
  const cleanName = String(name || '').trim();
  const cleanUser = String(username || '').trim();
  const cleanPass = String(password || '');

  if (!cleanName || !cleanUser || !cleanPass) {
    return res.status(400).json({ success: false, error: 'Name, username, and password are required.' });
  }
  if (cleanUser.toLowerCase() === MAIN_ADMIN_USER.toLowerCase()) {
    return res.status(400).json({ success: false, error: 'Username reserved for main admin.' });
  }
  if (findSubAccount(cleanUser)) {
    return res.status(409).json({ success: false, error: 'Username already exists.' });
  }

  const account = {
    id: `sub-${Date.now()}`,
    name: cleanName,
    username: cleanUser,
    passwordHash: hashPassword(cleanPass),
    role: 'sub_admin',
    status: 'active',
    allowedMenus: Array.isArray(allowedMenus) ? allowedMenus : [],
    createdAt: new Date().toISOString()
  };

  const accounts = loadSubAccounts();
  accounts.push(account);
  saveSubAccounts(accounts);
  res.status(201).json({ success: true, account: sanitizeAccount(account) });
});

app.put('/api/accounts/:id', (req, res) => {
  if (!requireAdminAuth(req, res)) return;

  const accounts = loadSubAccounts();
  const idx = accounts.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Account not found.' });
  }

  const { name, username, password, allowedMenus, status } = req.body || {};
  if (name !== undefined) accounts[idx].name = String(name).trim();
  if (username !== undefined) {
    const cleanUser = String(username).trim();
    if (cleanUser.toLowerCase() === MAIN_ADMIN_USER.toLowerCase()) {
      return res.status(400).json({ success: false, error: 'Username reserved for main admin.' });
    }
    const dup = accounts.find(a => a.id !== req.params.id && String(a.username).trim().toLowerCase() === cleanUser.toLowerCase());
    if (dup) return res.status(409).json({ success: false, error: 'Username already exists.' });
    accounts[idx].username = cleanUser;
  }
  if (password !== undefined && String(password).length > 0) {
    accounts[idx].passwordHash = hashPassword(String(password));
  }
  if (allowedMenus !== undefined) {
    accounts[idx].allowedMenus = Array.isArray(allowedMenus) ? allowedMenus : [];
  }
  if (status !== undefined && ['active', 'disabled'].includes(status)) {
    accounts[idx].status = status;
  }
  accounts[idx].updatedAt = new Date().toISOString();

  saveSubAccounts(accounts);
  res.json({ success: true, account: sanitizeAccount(accounts[idx]) });
});

app.delete('/api/accounts/:id', (req, res) => {
  if (!requireAdminAuth(req, res)) return;

  const accounts = loadSubAccounts();
  const next = accounts.filter(a => a.id !== req.params.id);
  if (next.length === accounts.length) {
    return res.status(404).json({ success: false, error: 'Account not found.' });
  }
  saveSubAccounts(next);
  res.json({ success: true });
});

// ============ PROMPT TEMPLATES (JSON persistence) ============
const PROMPTS_FILE = path.join(DATA_DIR, 'prompts.json');
const PROMPT_CATEGORIES = ['ai-video', 'ai-image', 'ai-product', 'ai-affiliate'];

function loadPrompts() {
  try {
    if (!fs.existsSync(PROMPTS_FILE)) return [];
    const raw = fs.readFileSync(PROMPTS_FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function savePrompts(prompts) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(PROMPTS_FILE, JSON.stringify(prompts, null, 2));
}

function isMainAdminRequest(req) {
  const token = extractAdminToken(req);
  return Boolean(token && parseAdminToken(token));
}

function normalizePromptCategory(value) {
  const cat = String(value || '').trim();
  return PROMPT_CATEGORIES.includes(cat) ? cat : null;
}

app.get('/api/prompts', (req, res) => {
  let prompts = loadPrompts();
  const category = String(req.query.category || '').trim();
  if (!isMainAdminRequest(req)) {
    prompts = prompts.filter(p => p.status === 'active');
  }
  if (category) {
    prompts = prompts.filter(p => p.category === category);
  }
  res.json({ success: true, prompts });
});

app.post('/api/prompts', (req, res) => {
  if (!requireAdminAuth(req, res)) return;

  const name = String(req.body?.name || '').trim();
  const category = normalizePromptCategory(req.body?.category);
  const description = String(req.body?.description || '').trim();
  const prompt = String(req.body?.prompt || '').trim();

  if (!name) {
    return res.status(400).json({ success: false, error: 'Prompt name is required.' });
  }
  if (!category) {
    return res.status(400).json({ success: false, error: 'Valid prompt category is required.' });
  }
  if (!prompt) {
    return res.status(400).json({ success: false, error: 'Prompt content is required.' });
  }

  const item = {
    id: `prompt-${Date.now()}`,
    name,
    category,
    description,
    prompt,
    createdBy: 'main_admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active'
  };

  const prompts = loadPrompts();
  prompts.push(item);
  savePrompts(prompts);
  res.status(201).json({ success: true, prompt: item });
});

app.put('/api/prompts/:id', (req, res) => {
  if (!requireAdminAuth(req, res)) return;

  const prompts = loadPrompts();
  const idx = prompts.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'Prompt not found.' });
  }

  const { name, category, description, prompt, status } = req.body || {};
  if (name !== undefined) {
    const cleanName = String(name).trim();
    if (!cleanName) {
      return res.status(400).json({ success: false, error: 'Prompt name cannot be empty.' });
    }
    prompts[idx].name = cleanName;
  }
  if (category !== undefined) {
    const cleanCategory = normalizePromptCategory(category);
    if (!cleanCategory) {
      return res.status(400).json({ success: false, error: 'Valid prompt category is required.' });
    }
    prompts[idx].category = cleanCategory;
  }
  if (description !== undefined) prompts[idx].description = String(description).trim();
  if (prompt !== undefined) {
    const cleanPrompt = String(prompt).trim();
    if (!cleanPrompt) {
      return res.status(400).json({ success: false, error: 'Prompt content cannot be empty.' });
    }
    prompts[idx].prompt = cleanPrompt;
  }
  if (status !== undefined) {
    const cleanStatus = status === 'disabled' ? 'disabled' : 'active';
    prompts[idx].status = cleanStatus;
  }
  prompts[idx].updatedAt = new Date().toISOString();

  savePrompts(prompts);
  res.json({ success: true, prompt: prompts[idx] });
});

app.delete('/api/prompts/:id', (req, res) => {
  if (!requireAdminAuth(req, res)) return;

  const prompts = loadPrompts();
  const next = prompts.filter(p => p.id !== req.params.id);
  if (next.length === prompts.length) {
    return res.status(404).json({ success: false, error: 'Prompt not found.' });
  }
  savePrompts(next);
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Tarmoc Backend is running' });
});

// Frontend runtime config — only booleans are sent, NO raw API keys exposed to browser
app.get('/api/config', (req, res) => {
  const providers = {
    geminiKey:      Boolean(GEMINI_KEY),
    googleVeoKey:   Boolean(GEMINI_KEY),
    openaiKey:      Boolean(OPENAI_KEY),
    falKey:         Boolean(FAL_KEY),
    pixazoKey:      Boolean(PIXAZO_API_KEY),
    json2videoKey:  Boolean(JSON2VIDEO_API_KEY),
    ninerouterKey:  Boolean(NINEROUTER_KEY),
    huggingfaceKey: Boolean(HF_API_TOKEN),
    runwayKey:      Boolean(envKey('RUNWAY_API_KEY')),
    klingKey:       Boolean(envKey('KLING_API_KEY')),
    pikaKey:        Boolean(envKey('PIKA_API_KEY')),
    hailuoKey:      Boolean(envKey('HAILUO_API_KEY'))
  };

  // Suggest best default providers for video and image menus
  const defaultVideoProvider = (
    providers.falKey        ? 'Fal.ai' :
    providers.geminiKey     ? 'Google Veo' :
    providers.ninerouterKey ? '9Router' :
    providers.klingKey      ? 'Kling' :
    providers.runwayKey     ? 'Runway' :
    providers.hailuoKey     ? 'Hailuo' : ''
  );
  const defaultImageProvider = (
    providers.geminiKey     ? 'gemini' :
    providers.ninerouterKey ? '9router' :
    providers.huggingfaceKey? 'huggingface-flux' :
    providers.openaiKey     ? 'chatgpt' :
    providers.falKey        ? 'fal' : ''
  );

  res.json({ ok: true, providers, defaultVideoProvider, defaultImageProvider });
});

// ============ OPENMONTAGE VIDEO PIPELINE ============
const jobs = {};

app.post('/api/generate', async (req, res) => {
  const { prompt, aspect_ratio = '9:16', playbook = 'flat-motion-graphics', images = [] } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const jobId = Date.now().toString();
  console.log(`[Job ${jobId}] Starting generation. Prompt: "${prompt}", Aspect Ratio: ${aspect_ratio}, Style: ${playbook}`);

  jobs[jobId] = {
    status: 'running',
    progress: 0,
    stage: 'bundling',
    error: null,
    prompt,
    aspect_ratio,
    playbook
  };

  const pythonPath = path.join(__dirname, '../OpenMontage/.venv/bin/python');
  const scriptPath = path.join(__dirname, '../OpenMontage/run_pipeline_api.py');
  const outputPath = path.join(PROJECTS_DIR, jobId, 'video.mp4');
  const jobDir = path.dirname(outputPath);

  fs.mkdirSync(jobDir, { recursive: true });

  const imagePaths = [];
  if (Array.isArray(images) && images.length > 0) {
    for (let idx = 0; idx < images.length; idx++) {
      const image = images[idx];
      if (!image || typeof image !== 'string') continue;
      try {
        const { base64 } = await loadImageAsBase64(image);
        const buffer = Buffer.from(base64, 'base64');
        const imagePath = path.join(jobDir, `ref_${idx}.png`);
        fs.writeFileSync(imagePath, buffer);
        imagePaths.push(imagePath);
        console.log(`[Job ${jobId}] Saved reference image ${idx}: ${imagePath} (${buffer.length} bytes)`);
      } catch (err) {
        console.error(`[Job ${jobId}] Failed to save reference image ${idx}:`, err.message);
      }
    }
  }

  const args = [
    scriptPath,
    '--job_id', jobId,
    '--prompt', prompt,
    '--aspect_ratio', aspect_ratio,
    '--playbook', playbook,
    '--output', outputPath
  ];

  if (imagePaths.length > 0) {
    args.push('--images', imagePaths.join(','));
  }

  const pipelineProcess = spawn(pythonPath, args);

  pipelineProcess.stdout.on('data', (data) => {
    const outputStr = data.toString();
    console.log(`[Job ${jobId} stdout]: ${outputStr}`);

    const bundlingMatch = outputStr.match(/Bundling\s+(\d+)%/);
    if (bundlingMatch) {
      const pct = parseInt(bundlingMatch[1]);
      jobs[jobId].stage = 'bundling';
      jobs[jobId].progress = Math.round(pct * 0.1);
    }

    const renderMatch = outputStr.match(/Rendered\s+(\d+)\/(\d+)/) ||
                        outputStr.match(/Rendering frames\s+.*\s+(\d+)\/(\d+)/) ||
                        outputStr.match(/Rendering frames\s+(\d+)\/(\d+)/);
    if (renderMatch) {
      const rendered = parseInt(renderMatch[1]);
      const total = parseInt(renderMatch[2]);
      jobs[jobId].stage = 'rendering';
      jobs[jobId].progress = 10 + Math.round((rendered / total) * 80);
    }

    const encodeMatch = outputStr.match(/Encoded\s+(\d+)\/(\d+)/);
    if (encodeMatch) {
      const encoded = parseInt(encodeMatch[1]);
      const total = parseInt(encodeMatch[2]);
      jobs[jobId].stage = 'encoding';
      jobs[jobId].progress = 90 + Math.round((encoded / total) * 10);
    }
  });

  pipelineProcess.stderr.on('data', (data) => {
    console.error(`[Job ${jobId} stderr]: ${data.toString()}`);
  });

  pipelineProcess.on('close', (code) => {
    console.log(`[Job ${jobId}] Pipeline process exited with code ${code}`);
    if (code === 0 && fs.existsSync(outputPath)) {
      jobs[jobId].status = 'completed';
      jobs[jobId].progress = 100;
    } else {
      jobs[jobId].status = 'failed';
      jobs[jobId].error = `Video rendering process failed with exit code ${code}`;
    }
  });

  res.json({
    status: 'started',
    message: 'Video generation pipeline started',
    job_id: jobId
  });
});

app.get('/api/status/:jobId', (req, res) => {
  const { jobId } = req.params;
  const job = jobs[jobId];

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json(job);
});

app.get('/api/video/:jobId', (req, res) => {
  const { jobId } = req.params;
  const videoPath = path.join(PROJECTS_DIR, jobId, 'video.mp4');

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: 'Video output not ready or not found' });
  }

  res.sendFile(videoPath);
});

// ============ CHATGPT (OpenAI) ============
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
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
    if (!GEMINI_KEY) {
      return res.status(503).json({ error: 'Gemini API key belum dikonfigurasi di server. Isi GEMINI_API_KEY di .env.' });
    }
    const prompt = String(req.body?.prompt || '').trim();
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt wajib diisi.' });
    }
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
    if (!r.ok) {
      const msg = data?.error?.message || data?.error || `Gemini HTTP ${r.status}`;
      return res.status(r.status >= 400 && r.status < 600 ? r.status : 502).json({ error: msg });
    }

    const imgPart = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imgPart) {
      const filename = `img_${Date.now()}.png`;
      fs.writeFileSync(path.join(OUTPUT_DIR, filename), Buffer.from(imgPart.inlineData.data, 'base64'));
      return res.json({ url: `/outputs/${filename}` });
    }
    const msg = data?.error?.message || 'Gemini tidak mengembalikan gambar.';
    return res.status(502).json({ error: msg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ============ IMAGE EDITING (Gemini image-to-image) ============
app.post('/api/image/edit', async (req, res) => {
  try {
    if (!GEMINI_KEY) {
      return res.status(503).json({ success: false, message: 'Gemini API key belum dikonfigurasi di server. Isi GEMINI_API_KEY di .env.' });
    }
    const promptText = String(req.body?.prompt || '').trim();
    const image = req.body?.image;
    if (!promptText) return res.status(400).json({ success: false, message: 'Prompt edit wajib diisi.' });
    if (!image) return res.status(400).json({ success: false, message: 'Gambar wajib diupload.' });

    const buffer = await editImageWithGemini(image, promptText);
    const filename = `edit_${Date.now()}.png`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), buffer);
    res.json({ success: true, url: `/outputs/${filename}` });
  } catch (err) {
    console.error('Image edit error:', err);
    res.status(500).json({ success: false, message: err.message || 'Proses editing gagal. Silakan coba lagi.' });
  }
});

// ============ VEO 3 (generate video API Direct) ============
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
    res.json(data);
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
const GEMINI_IMAGE_MODELS = {
  'gemini': 'gemini-2.5-flash-image',
  'nano-banana-2': 'gemini-3.1-flash-image-preview',
  'nano-banana-2-lite': 'gemini-3.1-flash-image-preview',
  'nano-banana-pro': 'gemini-3-pro-image-preview'
};

const IMAGEN_MODELS = {
  'imagen-4': 'imagen-4.0-generate-001',
  'imagen-4-ultra': 'imagen-4.0-ultra-generate-001',
  'imagen-4-fast': 'imagen-4.0-fast-generate-001'
};

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
  if (!imgPart) {
    const message = data?.error?.message || `${modelId} gagal generate gambar`;
    if (/quota exceeded|limit: 0|free_tier/i.test(message)) {
      throw new Error(`Google AI Studio quota habis / free tier tidak mengizinkan request image untuk model ${modelId}. Aktifkan billing atau gunakan model/provider lain. Detail: ${message}`);
    }
    throw new Error(message);
  }
  return Buffer.from(imgPart.inlineData.data, 'base64');
}

function parseDataUrlImage(image) {
  const match = String(image).match(/^data:(image\/[\w+.-]+);base64,(.+)$/s);
  if (!match) throw new Error('Format gambar tidak valid.');
  return { mimeType: match[1], base64: match[2] };
}

async function loadImageAsBase64(image) {
  if (!image) throw new Error('Gambar wajib diupload.');
  if (String(image).startsWith('data:')) return parseDataUrlImage(image);
  if (String(image).startsWith('/outputs/')) {
    const filePath = path.join(OUTPUT_DIR, path.basename(image));
    if (!fs.existsSync(filePath)) throw new Error('File gambar tidak ditemukan.');
    const buf = fs.readFileSync(filePath);
    return { mimeType: 'image/png', base64: buf.toString('base64') };
  }
  if (/^https?:\/\//i.test(String(image))) {
    try {
      const url = new URL(image);
      if (url.pathname.startsWith('/outputs/')) {
        const filePath = path.join(OUTPUT_DIR, path.basename(url.pathname));
        if (fs.existsSync(filePath)) {
          const buf = fs.readFileSync(filePath);
          return { mimeType: 'image/png', base64: buf.toString('base64') };
        }
      }
    } catch (_) { /* fall through to fetch */ }
    const resp = await fetch(image);
    if (!resp.ok) throw new Error('Gagal memuat gambar dari URL.');
    const buf = Buffer.from(await resp.arrayBuffer());
    const mimeType = resp.headers.get('content-type')?.split(';')[0] || 'image/png';
    return { mimeType, base64: buf.toString('base64') };
  }
  throw new Error('Format gambar tidak didukung.');
}

async function editImageWithGemini(image, promptText) {
  const { mimeType, base64 } = await loadImageAsBase64(image);
  const modelId = GEMINI_IMAGE_MODELS.gemini;
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': GEMINI_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [
          { inlineData: { mimeType, data: base64 } },
          { text: promptText }
        ] }],
        generationConfig: { responseModalities: ['image', 'text'] }
      })
    }
  );
  const data = await r.json();
  const imgPart = data?.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!imgPart) {
    const message = data?.error?.message || 'Gagal edit gambar';
    if (/quota exceeded|limit: 0|free_tier/i.test(message)) {
      throw new Error(`Google AI Studio quota habis untuk image editing. Aktifkan billing atau coba lagi nanti. Detail: ${message}`);
    }
    throw new Error(message);
  }
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

  throw new Error(data?.error?.message || '9Router failed to generate image.');
}

async function generateWithFal(promptText) {
  const r = await fetch('https://fal.run/fal-ai/flux/dev', {
    method: 'POST',
    headers: { Authorization: `Key ${FAL_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: promptText, image_size: 'square_hd', num_images: 1 })
  });
  const data = await r.json();
  if (!r.ok) throw new Error(data?.detail || data?.message || `Fal.ai HTTP ${r.status}`);
  const imageUrl = data?.images?.[0]?.url || data?.image?.url || data?.url;
  if (!imageUrl) throw new Error('Fal.ai returned no image URL.');
  const image = await fetch(imageUrl);
  if (!image.ok) throw new Error(`Failed to download Fal.ai image: ${image.statusText}`);
  return Buffer.from(await image.arrayBuffer());
}

async function readProviderResponse(response) {
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch {
    data = { rawText: text.slice(0, 500) };
  }
  return { data, text };
}

async function generateWithPixazo(promptText) {
  const endpoint = process.env.PIXAZO_IMAGE_ENDPOINT || 'https://api.pixazo.ai/v1/generate';
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${PIXAZO_API_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ prompt: promptText, model: 'flux-schnell' })
  });
  const { data } = await readProviderResponse(r);
  if (!r.ok) {
    const detail = data?.error?.message || data?.message || data?.rawText || 'No response body';
    throw new Error(`Pixazo HTTP ${r.status}: ${detail}`);
  }
  const imageUrl = data?.url || data?.image_url || data?.images?.[0]?.url;
  if (!imageUrl) throw new Error('Pixazo returned no image URL. Check PIXAZO_IMAGE_ENDPOINT and API documentation.');
  const image = await fetch(imageUrl);
  if (!image.ok) throw new Error(`Failed to download Pixazo image: ${image.statusText}`);
  return Buffer.from(await image.arrayBuffer());
}

async function generateImageByProvider(provider, promptText) {
  if (provider === 'google-ai-studio') return generateWithGeminiFamily(promptText, GEMINI_IMAGE_MODELS.gemini);
  if (provider === 'fal-ai') return generateWithFal(promptText);
  if (provider === 'pixazo') return generateWithPixazo(promptText);
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
    const errors = [];

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
        errors.push(fetchErr.message);
      }
    }

    if (generatedUrls.length === 0) {
      return res.status(500).json({ success: false, message: `Gagal generate gambar via ${provider}. Detail error: ${errors.join(', ')}` });
    }

    res.json({ success: true, images: generatedUrls });
  } catch (err) {
    console.error("Error Affiliate Generate:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ============ 9ROUTER ============
app.get('/api/9router/test', async (req, res) => {
  try {
    console.log('🧪 Testing 9Router connection...');
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

// Clean up temporary server.original.js if left over
// Workflow proxies use server-side environment keys. The browser sends prompts only.
async function workflowJson(r) {
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error?.message || data.message || `Provider HTTP ${r.status}`);
  return data;
}

app.post('/api/workflow/gemini', async (req, res) => {
  if (!GEMINI_KEY) return res.status(503).json({ success: false, error: 'Gemini is not configured on the server.' });
  const prompt = String(req.body?.prompt || '').trim();
  if (!prompt) return res.status(400).json({ success: false, error: 'Prompt is required.' });
  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': GEMINI_KEY },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await workflowJson(response);
    const text = data.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('') || '';
    if (!text) throw new Error('Gemini returned no text.');
    res.json({ success: true, text });
  } catch (error) { res.status(502).json({ success: false, error: error.message }); }
});

app.post('/api/workflow/fal-image', async (req, res) => {
  if (!FAL_KEY) return res.status(503).json({ success: false, error: 'Fal.ai is not configured on the server.' });
  const prompt = String(req.body?.prompt || '').trim();
  if (!prompt) return res.status(400).json({ success: false, error: 'Prompt is required.' });
  try {
    const response = await fetch('https://fal.run/fal-ai/flux/dev', {
      method: 'POST',
      headers: { Authorization: `Key ${FAL_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, image_size: 'square_hd', num_images: 1 })
    });
    const data = await workflowJson(response);
    const imageUrl = data?.images?.[0]?.url || data?.image?.url || data?.url;
    if (!imageUrl) throw new Error('Fal.ai returned no image URL.');
    res.json({ success: true, imageUrl, raw: data });
  } catch (error) { res.status(502).json({ success: false, error: error.message }); }
});

app.post('/api/workflow/pixazo-image', async (req, res) => {
  if (!PIXAZO_API_KEY) return res.status(503).json({ success: false, error: 'Pixazo is not configured on the server.' });
  const prompt = String(req.body?.prompt || '').trim();
  if (!prompt) return res.status(400).json({ success: false, error: 'Prompt is required.' });
  try {
    const endpoint = process.env.PIXAZO_IMAGE_ENDPOINT || 'https://api.pixazo.ai/v1/generate';
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${PIXAZO_API_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ prompt, model: 'flux-schnell' })
    });
    const { data } = await readProviderResponse(response);
    if (!response.ok) {
      const detail = data?.error?.message || data?.message || data?.rawText || 'No response body';
      throw new Error(`Pixazo HTTP ${response.status}: ${detail}`);
    }
    const imageUrl = data.url || data.image_url || data.images?.[0]?.url;
    if (!imageUrl) throw new Error('Pixazo returned no image URL. Check PIXAZO_IMAGE_ENDPOINT.');
    res.json({ success: true, imageUrl, raw: data });
  } catch (error) { res.status(502).json({ success: false, error: error.message }); }
});

app.post('/api/workflow/json2video', async (req, res) => {
  if (!JSON2VIDEO_API_KEY) return res.status(503).json({ success: false, error: 'JSON2Video is not configured on the server.' });
  const scenes = Array.isArray(req.body?.scenes) ? req.body.scenes : [];
  if (!scenes.length) return res.status(400).json({ success: false, error: 'At least one scene is required.' });
  try {
    const response = await fetch('https://api.json2video.com/v2/movies', { method: 'POST', headers: { 'x-api-key': JSON2VIDEO_API_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ resolution: '1080p', quality: 'high', scenes }) });
    res.json({ success: true, raw: await workflowJson(response) });
  } catch (error) { res.status(502).json({ success: false, error: error.message }); }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});