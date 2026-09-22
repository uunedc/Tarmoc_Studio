/* ============================================
       STATE
       ============================================ */
    const S={
      currentPage:'dashboard',currentProject:null,currentPromptCategory:null,
      videoGenState:'empty',videoGenProgress:0,videoGenStage:'',
      refImages:[null,null,null,null],editingImage:null,editingOriginal:null,editPrompt:'',editLoading:false,activeTool:null,
      searchQuery:'',historyFilter:'all',
      wfStep:1,wfLoading:false,wfSent:false,
      wfData:{productImage:null,userPrompt:'',analysis:null,storyboard:'',masterPrompt:'',provider:'',workflow:'storyboard',generatedImage:null,imageError:null,loadingStage:''},
      apData:{importMethod:'upload',importUrl:'',productImage:null,productInfo:null,userPrompt:'',analysis:null,selectedStyles:[],generatedImages:[],marketingAssets:null,loading:false,loadingStage:''},
      afData:{productImage:null,modelImage:null,ratio:'1:1',gender:'wanita',interaction:'',marketplaces:['shopee'],count:4,provider:'gemini',imagePrompt:'',loading:false,generatedImages:[]},
      settings:{googleVeoKey:'',geminiKey:'',openaiKey:'',runwayKey:'',klingKey:'',pikaKey:'',hailuoKey:'',falKey:'',pixazoKey:'',json2videoKey:'',darkMode:false,language:'en'},
      runtimeProviders:{},
      credits:2450,
      characters:[
        {id:1,name:'Sarah Chen',role:'Host & Presenter',avatar:'https://picsum.photos/seed/sarah01/200/200'},
        {id:2,name:'Mike Johnson',role:'Product Reviewer',avatar:'https://picsum.photos/seed/mike02/200/200'},
        {id:3,name:'Lisa Park',role:'Brand Ambassador',avatar:'https://picsum.photos/seed/lisa03/200/200'},
        {id:4,name:'David Kim',role:'Voice-over Artist',avatar:'https://picsum.photos/seed/david04/200/200'},
        {id:5,name:'Emma Wilson',role:'Social Media Star',avatar:'https://picsum.photos/seed/emma05/200/200'},
        {id:6,name:'Alex Tanaka',role:'Tech Reviewer',avatar:'https://picsum.photos/seed/alex06/200/200'}
      ],
      products:[
        {id:1,name:'Wireless Earbuds Pro X',category:'Electronics',thumbnail:'https://picsum.photos/seed/earbuds11/400/300'},
        {id:2,name:'Organic Face Serum',category:'Beauty',thumbnail:'https://picsum.photos/seed/serum22/400/300'},
        {id:3,name:'Smart Fitness Watch',category:'Wearables',thumbnail:'https://picsum.photos/seed/watch33/400/300'},
        {id:4,name:'Premium Coffee Beans',category:'Food & Drink',thumbnail:'https://picsum.photos/seed/coffee44/400/300'},
        {id:5,name:'Minimalist Backpack',category:'Fashion',thumbnail:'https://picsum.photos/seed/bag55/400/300'},
        {id:6,name:'LED Desk Lamp',category:'Home Office',thumbnail:'https://picsum.photos/seed/lamp66/400/300'}
      ],
      prompts:[
        {id:1,category:'commercial',title:'Cinematic Product Reveal',prompt:'A cinematic slow-motion product reveal video. The camera orbits around the product placed on a sleek dark surface with dramatic rim lighting.',count:24},
        {id:2,category:'tiktok',title:'Viral Hook Opener',prompt:'Fast-paced TikTok-style video opening with quick zoom transitions and dynamic text overlays.',count:18},
        {id:3,category:'education',title:'Explainer Animation',prompt:'Clean and professional explainer video with smooth motion graphics and icons.',count:15},
        {id:4,category:'luxury',title:'Luxury Brand Film',prompt:'High-end luxury brand video with golden hour lighting and elegant transitions.',count:12},
        {id:5,category:'podcast',title:'Podcast Studio Intro',prompt:'Professional podcast intro animation with microphone and sound waves.',count:9},
        {id:6,category:'review',title:'Detailed Product Review',prompt:'Product review video showing multiple angles and close-up details.',count:21},
        {id:7,category:'unboxing',title:'ASMR Unboxing Experience',prompt:'Satisfying unboxing video with close-up shots of packaging being opened.',count:16},
        {id:8,category:'studio',title:'Studio Product Photography',prompt:'Studio-quality product video with perfect lighting setup.',count:14}
      ],
      history:[
        {id:1,type:'video',date:'2025-01-15 14:23',provider:'Google Veo',prompt:'Cinematic product reveal of wireless earbuds',thumbnail:'https://picsum.photos/seed/hv01/400/225',project:'TARMOC Product'},
        {id:2,type:'image',date:'2025-01-15 12:05',provider:'Gemini',prompt:'Luxury skincare product on marble surface',thumbnail:'https://picsum.photos/seed/hv02/400/225',project:'TARMOC Product'},
        {id:3,type:'video',date:'2025-01-14 18:47',provider:'Runway',prompt:'TikTok style fast-paced product showcase',thumbnail:'https://picsum.photos/seed/hv03/400/225',project:'TikTok'},
        {id:4,type:'image',date:'2025-01-14 10:30',provider:'OpenAI',prompt:'Minimalist product photography of fitness watch',thumbnail:'https://picsum.photos/seed/hv04/400/225',project:'TARMOC Product'},
        {id:5,type:'video',date:'2025-01-13 21:15',provider:'Kling',prompt:'Podcast intro animation with neon accents',thumbnail:'https://picsum.photos/seed/hv05/400/225',project:'Podcast'},
        {id:6,type:'image',date:'2025-01-13 16:42',provider:'Gemini',prompt:'Coffee beans premium packaging flat lay',thumbnail:'https://picsum.photos/seed/hv06/400/225',project:'Shopee'}
      ],
      notifications:[
        {id:1,type:'success',title:'Video Generated',text:'Your <strong>Cinematic Product Reveal</strong> video is ready.',time:'5 min ago'},
        {id:2,type:'info',title:'Credits Refilled',text:'Current balance: <strong>2,450 credits</strong>.',time:'1 hour ago'},
        {id:3,type:'warning',title:'API Key Expiring',text:'<strong>Runway API Key</strong> expires in 3 days.',time:'3 hours ago'}
      ],
      flow:{
        nodes:[],connections:[],selectedId:null,selectedConnId:null,
        zoom:1,pan:{x:0,y:0},nextId:1,running:false,search:'',
        history:[],historyIdx:-1,snapGrid:true,saved:[],_tempConn:null
      },
      subAccounts:[],
      promptTemplates:[],
      sidebarAiImageExpanded:false,
      academyData:{masterId:'tarmoc-presenter',title:'',material:'',targetAudience:'Pemula',durationSec:60,sceneCount:6,episode:null,loading:false,loadingSceneId:null,error:null},
      storyboardData:{title:'',subject:'',concept:'',duration:'30s',aspectRatio:'16:9',scenes:4,visualStyle:'Cinematic',loading:false,error:null,result:null,masterPrompt:''},
      podcastData:{title:'',topic:'',host:'',guest:'',duration:'10 min',tone:'Conversational',language:'Indonesian',audience:'',brief:'',loading:false,error:null,result:null,masterPrompt:''},
      characterData:{name:'',gender:'',age:'',appearance:'',hair:'',outfit:'',personality:'',pose:'',artStyle:'',background:'',extra:'',loading:false,error:null,result:null,previewUrl:null},
      nextId:100
    };

    const AI_IMAGE_CHILDREN=[
      {id:'ai-product',label:'AI Product',icon:'package',desc:'Import, analisis, dan generate gambar produk'},
      {id:'ai-affiliate',label:'AI Affiliate',icon:'shopping-cart',desc:'Foto afiliasi produk + model'},
      {id:'ai-academy',label:'AI Academy',icon:'graduation-cap',desc:'Konten edukasi dan script academy'},
      {id:'storyboard',label:'Storyboard',icon:'layout-grid',desc:'Storyboard visual scene-by-scene'},
      {id:'ai-podcast',label:'AI Podcast',icon:'mic',desc:'Script podcast profesional'},
      {id:'ai-character',label:'AI Character',icon:'user-round',desc:'Karakter AI reusable untuk video'}
    ];
    const AI_IMAGE_PAGES=AI_IMAGE_CHILDREN.map(c=>c.id);
    const MENU=[
      {id:'dashboard',label:'Dashboard',icon:'layout-dashboard'},
      {id:'ai-video',label:'AI Video',icon:'video'},
      {id:'workflow',label:'Workflow',icon:'git-branch'},
      {id:'ai-image',label:'AI Image',icon:'image',children:AI_IMAGE_CHILDREN},
      {id:'image-editing',label:'Image Editing',icon:'wand-2'},
      {id:'character-library',label:'Character Library',icon:'user'},
      {id:'product-library',label:'Product Library',icon:'package'},
      {id:'prompt-library',label:'Prompt Library',icon:'book-open'},
      {id:'history',label:'History',icon:'clock'},
      {id:'settings',label:'Settings',icon:'settings'}
    ];
    const PROMPT_CATEGORIES=[{id:'ai-video',label:'AI Video'},{id:'ai-image',label:'AI Image'},{id:'ai-product',label:'AI Product'},{id:'ai-affiliate',label:'AI Affiliate'}];
    const PROMPT_CAT_LABEL=Object.fromEntries(PROMPT_CATEGORIES.map(c=>[c.id,c.label]));
    const WORKSPACES=[{id:'tarmoc-product',name:'TARMOC Product',color:'#F59E0B'},{id:'fiber-academy',name:'Fiber Academy',color:'#3B82F6'},{id:'tiktok',name:'TikTok',color:'#EF4444'},{id:'podcast',name:'Podcast',color:'#8B5CF6'},{id:'shopee',name:'Shopee',color:'#F97316'}];
    const VPROVIDERS=['Google Veo','OpenAI','Gemini','Runway','Kling','Pika','Hailuo','9Router'];
    const CAMSTYLES=['Cinematic','Documentary','Commercial','Drone Shot','Handheld','Static','Dolly Zoom','Crane Shot'];
    const VSTAGES=['Uploading','Analyzing','Connecting AI','Generating','Rendering','Finished'];

    /* Workflow steps & providers */
    const WFS=[{n:1,title:'Upload Product',desc:'Add your product image',icon:'package'},{n:2,title:'Describe Your Video',desc:'Write your vision',icon:'pencil'},{n:3,title:'AI Product Analysis',desc:'Product intelligence',icon:'brain'},{n:4,title:'Generate Storyboard',desc:'Scene planning',icon:'layout-grid'},{n:5,title:'Generate Master Video Prompt',desc:'Final prompt generation',icon:'sparkles'},{n:6,title:'Send to Video AI',desc:'Choose provider & send',icon:'send'}];
    const WFP=[{id:'google-veo',name:'Google Veo',desc:'High quality cinematic',color:'#4285F4',letter:'G'},{id:'kling',name:'Kling',desc:'Fast generation',color:'#8B5CF6',letter:'K'},{id:'runway',name:'Runway',desc:'Creative & artistic',color:'#22C55E',letter:'R'},{id:'pika',name:'Pika',desc:'Short-form optimized',color:'#F59E0B',letter:'P'},{id:'luma',name:'Luma',desc:'Realistic motion',color:'#EC4899',letter:'L'}];

    const FLOW_CATEGORIES=[
  {name:'Input',color:'#3B82F6',nodes:[
    {type:'upload-image',title:'Upload Image',icon:'image',desc:'Upload a source image',inputs:[],outputs:['image']},
    {type:'upload-video',title:'Upload Video',icon:'video',desc:'Upload a source video',inputs:[],outputs:['video']},
    {type:'product',title:'Product',icon:'package',desc:'Pick from Product Library',inputs:[],outputs:['image']},
    {type:'folder',title:'Folder',icon:'folder',desc:'Batch input from a folder',inputs:[],outputs:['batch']},
    {type:'url',title:'URL',icon:'link',desc:'Import from a URL',inputs:[],outputs:['data']}
  ]},
  {name:'AI',color:'#8B5CF6',nodes:[
    {type:'prompt-generator',title:'Prompt Generator',icon:'sparkles',desc:'Generate a prompt from input',inputs:['image'],outputs:['prompt']},
    {type:'prompt-enhancer',title:'Prompt Enhancer',icon:'wand-2',desc:'Enhance an existing prompt',inputs:['prompt'],outputs:['prompt']},
    {type:'image-analysis',title:'Image Analysis',icon:'scan-eye',desc:'Analyze image attributes',inputs:['image'],outputs:['data']},
    {type:'storyboard',title:'Storyboard',icon:'layout-grid',desc:'Generate a scene storyboard',inputs:['prompt'],outputs:['storyboard']},
    {type:'scene-splitter',title:'Scene Splitter',icon:'scissors',desc:'Split into individual scenes',inputs:['storyboard'],outputs:['scenes']},
    {type:'caption-generator',title:'Caption Generator',icon:'captions',desc:'Generate captions',inputs:['data'],outputs:['text']}
  ]},
  {name:'Video',color:'#EF4444',nodes:[
    {type:'google-veo',title:'Google Veo',icon:'clapperboard',desc:'Generate video with Google Veo',inputs:['image','prompt'],outputs:['video']},
    {type:'kling',title:'Kling',icon:'clapperboard',desc:'Generate video with Kling',inputs:['image','prompt'],outputs:['video']},
    {type:'runway',title:'Runway',icon:'clapperboard',desc:'Generate video with Runway',inputs:['image','prompt'],outputs:['video']},
    {type:'pika',title:'Pika',icon:'clapperboard',desc:'Generate video with Pika',inputs:['image','prompt'],outputs:['video']},
    {type:'luma',title:'Luma',icon:'clapperboard',desc:'Generate video with Luma',inputs:['image','prompt'],outputs:['video']},
    {type:'openai-video',title:'OpenAI Video',icon:'clapperboard',desc:'Generate video with OpenAI',inputs:['image','prompt'],outputs:['video']}
  ]},
  {name:'Image',color:'#F59E0B',nodes:[
    {type:'openai-images',title:'OpenAI Images',icon:'image-plus',desc:'Generate image with OpenAI',inputs:['prompt'],outputs:['image']},
    {type:'flux',title:'Flux',icon:'image-plus',desc:'Generate image with Flux',inputs:['prompt'],outputs:['image']},
    {type:'stable-diffusion',title:'Stable Diffusion',icon:'image-plus',desc:'Generate image with SD',inputs:['prompt'],outputs:['image']}
  ]},
  {name:'Output',color:'#22C55E',nodes:[
    {type:'save-asset',title:'Save Asset',icon:'save',desc:'Save output to library',inputs:['any'],outputs:[]},
    {type:'download',title:'Download',icon:'download',desc:'Download the result',inputs:['any'],outputs:[]},
    {type:'publish',title:'Publish',icon:'send',desc:'Publish to a channel',inputs:['any'],outputs:[]},
    {type:'export',title:'Export',icon:'external-link',desc:'Export workflow output',inputs:['any'],outputs:[]}
  ]},
  {name:'Logic',color:'#EC4899',nodes:[
    {type:'delay',title:'Delay',icon:'timer',desc:'Wait before continuing',inputs:['any'],outputs:['any']},
    {type:'if',title:'If',icon:'git-fork',desc:'Conditional branch',inputs:['any'],outputs:['true','false']},
    {type:'loop',title:'Loop',icon:'repeat',desc:'Repeat a branch',inputs:['any'],outputs:['any']},
    {type:'merge',title:'Merge',icon:'merge',desc:'Merge multiple inputs',inputs:['a','b'],outputs:['any']},
    {type:'split',title:'Split',icon:'split',desc:'Split into branches',inputs:['any'],outputs:['a','b']}
  ]}
];

const FLOW_TEMPLATES=[
  {id:'product-showcase',name:'Product Showcase',chain:['upload-image','image-analysis','prompt-generator','prompt-enhancer','storyboard','google-veo','save-asset','publish']},
  {id:'tiktok-ads',name:'TikTok Ads',chain:['product','image-analysis','prompt-generator','caption-generator','kling','save-asset','publish']},
  {id:'instagram-reels',name:'Instagram Reels',chain:['upload-image','prompt-generator','prompt-enhancer','runway','save-asset','publish']},
  {id:'youtube-shorts',name:'YouTube Shorts',chain:['upload-video','scene-splitter','caption-generator','pika','save-asset','export']},
  {id:'carousel-content',name:'Carousel Content',chain:['folder','image-analysis','prompt-generator','openai-images','save-asset','export']},
  {id:'poster-ai',name:'Poster AI',chain:['product','prompt-generator','flux','save-asset','download']},
  {id:'batch-video-generator',name:'Batch Video Generator',chain:['folder','prompt-generator','luma','save-asset','publish']}
];

const FLOW_PROVIDER_OPTIONS={
  'AI':['Gemini (Google AI Studio)','OpenAI GPT-4','Claude','DeepSeek','Custom'],
  'Video':['Fal.ai (LTX Video)','Google Veo','Kling','Runway','Pika','Luma','OpenAI Video'],
  'Image':['Gemini (Google AI Studio)','Pixazo','OpenAI Images','Flux','Stable Diffusion','Imagen 4'],
  'Output':['JSON2Video','TARMOC Storage','Google Drive','Local Download'],
  'Logic':['—']
};
const PROVIDER_KEY_MAP={
  'Google Veo':'googleVeoKey','Google AI Studio':'geminiKey','google-ai-studio':'geminiKey','Gemini':'geminiKey','Gemini (Google AI Studio)':'geminiKey','Fal.ai':'falKey','fal-ai':'falKey','Fal.ai (LTX Video)':'falKey','9Router':'ninerouterKey','ChatGPT':'openaiKey','OpenAI':'openaiKey','OpenAI GPT-4':'openaiKey','OpenAI Images':'openaiKey','OpenAI Video':'openaiKey','Runway':'runwayKey','Kling':'klingKey','Pika':'pikaKey','Hailuo':'hailuoKey','Pixazo':'pixazoKey','pixazo':'pixazoKey','JSON2Video':'json2videoKey','Flux':'huggingfaceKey','Stable Diffusion':'huggingfaceKey','Imagen 4':'geminiKey','nano-banana-2':'geminiKey','nano-banana-2-lite':'geminiKey','nano-banana-pro':'geminiKey','imagen-4':'geminiKey','imagen-4-ultra':'geminiKey','imagen-4-fast':'geminiKey','gemini':'geminiKey','9router':'ninerouterKey','chatgpt':'openaiKey','huggingface-flux':'huggingfaceKey','huggingface-sd':'huggingfaceKey'
};
function providerKey(name){return PROVIDER_KEY_MAP[name]||PROVIDER_KEY_MAP[String(name||'').trim()]||'';}
function isProviderConfigured(name){const key=providerKey(name);return !key||Boolean(S.runtimeProviders?.[key]);}
function providerOptionHTML(value,label=value,selectedValue=''){
  const enabled=isProviderConfigured(value)||isProviderConfigured(label);
  const suffix=enabled?'':' — not configured';
  return `<option value="${esc(value)}" ${selectedValue===value?'selected':''} ${enabled?'':'disabled'}>${esc(label+suffix)}</option>`;
}
function flowProviderOptions(n){
  const all=FLOW_PROVIDER_OPTIONS[n.category]||['Gemini','OpenAI','Custom'];
  const available=all.filter(isProviderConfigured);
  return available.length?available:all;
}

    /* AI Academy — master templates (production rules, not repeated video prompts) */
    const ACADEMY_MASTERS=[
      {id:'tarmoc-presenter',name:'Tarmoc Academy Presenter',rules:{format:'Vertical 9:16',totalDurationSec:60,sceneDurationSec:10,sceneCount:6,language:'Bahasa Indonesia',contentStyle:'Edukasi teknis',presenter:'TARMOC Academy Presenter',clothing:'Black TARMOC uniform',environment:'TARMOC Studio',visualStyle:'Professional, Cinematic, Educational',voiceStyle:'Natural, Clear, Professional'}},
      {id:'tarmoc-explainer',name:'Tarmoc Explainer (Landscape)',rules:{format:'Horizontal 16:9',totalDurationSec:90,sceneDurationSec:15,sceneCount:6,language:'Bahasa Indonesia',contentStyle:'Edukasi ringkas',presenter:'TARMOC Academy Presenter',clothing:'Smart casual with TARMOC badge',environment:'Modern classroom studio with soft lighting',visualStyle:'Clean, Bright, Educational',voiceStyle:'Friendly, Clear, Engaging'}}
    ];
    function acGetMaster(id){return ACADEMY_MASTERS.find(m=>m.id===id)||ACADEMY_MASTERS[0];}
    function acParseGeminiJson(text){
      const raw=String(text||'').trim();
      const fenced=raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
      const candidate=fenced?fenced[1].trim():raw;
      try{return JSON.parse(candidate);}catch{
        const start=candidate.indexOf('{'),end=candidate.lastIndexOf('}');
        if(start>-1&&end>start)return JSON.parse(candidate.slice(start,end+1));
        throw new Error('Gemini tidak mengembalikan JSON episode yang valid.');
      }
    }
    function acNormalizeEpisode(data,expectedScenes){
      const scenes=Array.isArray(data?.scenes)?data.scenes:[];
      if(!scenes.length)throw new Error('Episode tidak memiliki scene.');
      return {
        episodeNumber:String(data.episodeNumber||'001'),
        title:String(data.title||S.academyData.title||'Untitled Episode'),
        scenes:scenes.map((s,i)=>{
          const videoPrompt=String(s.videoPrompt||s.prompt||'').trim();
          if(!videoPrompt)throw new Error(`Scene ${i+1} tidak memiliki video prompt. Coba generate ulang.`);
          return {
            id:parseInt(s.id,10)||i+1,
            title:String(s.title||`Scene ${i+1}`),
            duration:parseInt(s.duration,10)||Math.round((S.academyData.durationSec||60)/expectedScenes),
            narration:String(s.narration||s.dialogue||''),
            visualDirection:String(s.visualDirection||s.visual||''),
            cameraDirection:String(s.cameraDirection||s.camera||''),
            videoPrompt
          };
        })
      };
    }
    function acBuildEpisodePrompt(master,form){
      const r=master.rules;
      return `You are an educational video production AI. Create a complete academy episode plan.

PRODUCTION RULES (Master: ${master.name}):
- Format: ${r.format}
- Total duration: ${form.durationSec} seconds
- Scene count: ${form.sceneCount}
- Approx seconds per scene: ${Math.round(form.durationSec/form.sceneCount)}
- Language: ${r.language}
- Content style: ${r.contentStyle}
- Presenter: ${r.presenter}
- Presenter clothing: ${r.clothing}
- Environment: ${r.environment}
- Visual style: ${r.visualStyle}
- Voice style: ${r.voiceStyle}

EPISODE INPUT FROM ADMIN:
- Episode title: ${form.title}
- Target audience: ${form.targetAudience}
- Learning material (read carefully and base ALL scenes on this):
"""
${form.material}
"""

CRITICAL REQUIREMENTS:
1. Deeply understand the learning material. Every scene must teach specific points FROM the material above.
2. Create exactly ${form.sceneCount} scenes with progressive structure (hook → explanation → examples → comparison/summary as material requires).
3. Each scene MUST have its own UNIQUE, complete videoPrompt — a full standalone cinematic prompt for that scene only. Do NOT reuse the same prompt with minor edits. Do NOT append only scene numbers.
4. Each videoPrompt must include visual consistency elements from the master (presenter identity, environment, aspect ratio ${r.format}, visual style) while describing the UNIQUE action/visuals of THAT scene.
5. Narration must be in ${r.language}.
6. Do not invent unrelated topics. Do not use generic filler unrelated to the material.

Return ONLY valid JSON (no markdown prose outside JSON) in this exact shape:
{
  "episodeNumber": "001",
  "title": "episode title",
  "scenes": [
    {
      "id": 1,
      "title": "scene title",
      "duration": 10,
      "narration": "dialog or voice-over text",
      "visualDirection": "what appears on screen",
      "cameraDirection": "camera shot and movement",
      "videoPrompt": "unique full video generation prompt for this scene only"
    }
  ]
}`;
    }
    function acBuildRegenerateScenePrompt(master,form,episode,scene){
      const r=master.rules;
      const otherScenes=episode.scenes.filter(s=>s.id!==scene.id).map(s=>`Scene ${s.id}: ${s.title}`).join('\n');
      return `Regenerate ONLY one scene for an existing academy episode. Keep episode context but create a NEW unique videoPrompt for this scene.

PRODUCTION RULES (Master: ${master.name}):
Format: ${r.format} | Presenter: ${r.presenter} | Clothing: ${r.clothing} | Environment: ${r.environment} | Visual: ${r.visualStyle}

EPISODE: ${episode.title} (${episode.episodeNumber})
MATERIAL:
"""
${form.material}
"""

OTHER SCENES (do not copy their prompts):
${otherScenes}

REGENERATE SCENE ${scene.id}: "${scene.title}"
Current narration: ${scene.narration}

Return ONLY valid JSON for this single scene:
{"id":${scene.id},"title":"...","duration":${scene.duration},"narration":"...","visualDirection":"...","cameraDirection":"...","videoPrompt":"unique full prompt for this scene only"}`;
    }
    function acSyncFormFromDOM(){
      const d=S.academyData;
      d.masterId=document.getElementById('acMaster')?.value||d.masterId;
      d.title=document.getElementById('acTitle')?.value.trim()||'';
      d.material=document.getElementById('acMaterial')?.value.trim()||'';
      d.targetAudience=document.getElementById('acAudience')?.value||d.targetAudience;
      d.durationSec=parseInt(document.getElementById('acDuration')?.value,10)||d.durationSec;
      d.sceneCount=parseInt(document.getElementById('acSceneCount')?.value,10)||d.sceneCount;
      return d;
    }
    function acValidateForm(d){
      if(!d.masterId||!acGetMaster(d.masterId))return 'Master Template wajib dipilih.';
      if(!d.title)return 'Judul episode wajib diisi.';
      if(!d.material)return 'Materi pembelajaran wajib diisi.';
      if(!d.sceneCount||d.sceneCount<2||d.sceneCount>12)return 'Jumlah scene harus antara 2–12.';
      if(!d.durationSec||d.durationSec<10)return 'Durasi episode tidak valid.';
      return null;
    }
    function acEpisodeExportText(ep){
      if(!ep)return '';
      let t=`EPISODE ${ep.episodeNumber}\n${ep.title}\n\n`;
      ep.scenes.forEach(s=>{
        t+=`────────────────────────────────────\nSCENE ${String(s.id).padStart(2,'0')}\n${s.title}\n\nDurasi: ${s.duration} detik\n\nNarasi/Dialog:\n${s.narration}\n\nVisual Direction:\n${s.visualDirection}\n\nCamera Direction:\n${s.cameraDirection}\n\n🎬 VIDEO PROMPT:\n${s.videoPrompt}\n\n`;
      });
      return t;
    }
    function acRenderSceneCard(s){
      const pid=`ac-scene-prompt-${s.id}`;
      return `<div class="ac-scene-card animate-fade-in-up">
        <div class="ac-scene-header"><span class="ac-scene-num">SCENE ${String(s.id).padStart(2,'0')}</span><span class="ac-scene-title">${esc(s.title)}</span><span class="ac-scene-dur">${s.duration}s</span></div>
        <div class="ac-scene-body">
          <div class="ac-scene-field"><div class="ac-scene-label">Narasi/Dialog</div><div class="ac-scene-text">${esc(s.narration)}</div></div>
          <div class="ac-scene-field"><div class="ac-scene-label">Visual Direction</div><div class="ac-scene-text">${esc(s.visualDirection)}</div></div>
          <div class="ac-scene-field"><div class="ac-scene-label">Camera Direction</div><div class="ac-scene-text">${esc(s.cameraDirection)}</div></div>
          <div class="ac-scene-field"><div class="ac-scene-label">🎬 Video Prompt</div>
            <textarea class="form-textarea ac-scene-prompt" id="${pid}" rows="6" readonly>${esc(s.videoPrompt)}</textarea>
          </div>
          <div class="wf-output-actions">
            <button class="btn-wf-small" data-action="ac-edit-scene" data-scene-id="${s.id}"><i data-lucide="pencil"></i> Edit Prompt</button>
            <button class="btn-wf-small gold" data-action="ai-copy" data-target="${pid}"><i data-lucide="copy"></i> Copy</button>
            <button class="btn-wf-small" data-action="ai-download" data-target="${pid}" data-filename="academy-scene-${String(s.id).padStart(2,'0')}.txt"><i data-lucide="download"></i> Download</button>
            <button class="btn-wf-small" data-action="ac-save-scene-prompt" data-scene-id="${s.id}"><i data-lucide="save"></i> Save Prompt</button>
            <button class="btn-wf-small" data-action="ac-regenerate-scene" data-scene-id="${s.id}"><i data-lucide="refresh-cw"></i> Regenerate Scene</button>
            <button class="btn-wf-small" data-action="ac-send-scene-video" data-scene-id="${s.id}"><i data-lucide="send"></i> Send to AI Video</button>
          </div>
        </div>
      </div>`;
    }
    function acRenderEpisodeOutput(ep){
      if(!ep)return '';
      return `<div class="ac-episode-output">
        <div class="ac-episode-header"><div class="ac-episode-badge">EPISODE ${esc(ep.episodeNumber)}</div><h2 class="ac-episode-title">${esc(ep.title)}</h2></div>
        ${ep.scenes.map(acRenderSceneCard).join('')}
        <div class="wf-output-actions" style="margin-top:16px">
          <button class="btn-wf-small gold" data-action="ac-copy-episode"><i data-lucide="copy"></i> Copy Episode</button>
          <button class="btn-wf-small" data-action="ac-download-episode"><i data-lucide="download"></i> Download Episode</button>
        </div>
        <textarea id="acEpisodeExport" style="display:none">${esc(acEpisodeExportText(ep))}</textarea>
      </div>`;
    }

    const AP_STYLES=[
      {id:'studio',name:'Studio Clean',desc:'Latar putih bersih dengan pencahayaan studio profesional',icon:'camera'},
      {id:'lifestyle',name:'Lifestyle',desc:'Produk dalam konteks penggunaan sehari-hari',icon:'home'},
      {id:'flatlay',name:'Flat Lay',desc:'Tampilan dari atas dengan properti pendukung',icon:'layout-grid'},
      {id:'luxury',name:'Luxury',desc:'Nuansa mewah dengan pencahayaan dramatis',icon:'gem'},
      {id:'minimalist',name:'Minimalist',desc:'Desain simpel, bersih, dan modern',icon:'square'},
      {id:'outdoor',name:'Outdoor',desc:'Suasana alam terbuka dan natural',icon:'sun'}
    ];

    /* ============================================
       UTILITIES
       ============================================ */
    const genId=()=>++S.nextId;
    const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML};
    const fmtN=n=>n.toLocaleString();
    const fmtD=ds=>new Date(ds).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
    const AUTH_KEY='tarmocAuthState';
    const getAuthState=()=>{try{return JSON.parse(localStorage.getItem(AUTH_KEY))}catch{return null}};
    const clearAuthState=()=>localStorage.removeItem(AUTH_KEY);
    const requireAuth=()=>{
      const auth=getAuthState();
      if(!auth?.loggedIn){window.location.replace('./login.html');return false;}
      if(!auth.role||auth.role==='main_admin'&&!auth.adminToken){
        clearAuthState();
        window.location.replace('./login.html');
        return false;
      }
      return true;
    };
    const isMainAdmin=()=>getAuthState()?.role==='main_admin';
    const getAdminAuthHeaders=()=>{
      const token=getAuthState()?.adminToken||'';
      if(!token)return{};
      return{'X-Admin-Token':token,'Authorization':`Bearer ${token}`};
    };
    const ensureMainAdminSession=()=>{
      if(!isMainAdmin())return{ok:false,error:'Akses ditolak.'};
      if(!getAuthState()?.adminToken)return{ok:false,error:'Session admin tidak valid. Silakan login ulang.'};
      return{ok:true};
    };
    const getAllowedMenus=()=>{
      const auth=getAuthState();
      if(!auth?.loggedIn)return[];
      if(auth.role==='main_admin')return['*'];
      return Array.isArray(auth.allowedMenus)?auth.allowedMenus:[];
    };
    const isAIImageChild=(pageId)=>AI_IMAGE_PAGES.includes(pageId);
    const canAccessMenu=(pageId)=>{
      const allowed=getAllowedMenus();
      if(allowed.includes('*'))return true;
      if(pageId==='ai-image')return AI_IMAGE_PAGES.some(id=>allowed.includes(id)||allowed.includes('ai-image'));
      if(isAIImageChild(pageId))return allowed.includes(pageId)||allowed.includes('ai-image');
      return allowed.includes(pageId);
    };
    const getDefaultPage=()=>{
      const allowed=getAllowedMenus();
      if(allowed.includes('*')||allowed.includes('dashboard'))return'dashboard';
      return allowed[0]||'dashboard';
    };
    const denyAccess=(pageId)=>{
      showToast('Akses Ditolak','Anda tidak memiliki akses ke menu ini.','error');
      S.currentPage=getDefaultPage();
      renderSidebar();
      renderPage();
    };
    async function loadSubAccounts(){
      if(!isMainAdmin())return;
      const session=ensureMainAdminSession();
      if(!session.ok)return;
      try{
        const res=await fetch(`${FLOW_API_BASE}/api/accounts`,{headers:getAdminAuthHeaders()});
        if(res.ok){
          const data=await res.json();
          S.subAccounts=data.accounts||[];
        }
      }catch(err){
        console.warn('Failed to load sub accounts:',err.message);
      }
    }
    async function apiAccountRequest(method,path,body){
      const session=ensureMainAdminSession();
      if(!session.ok)throw new Error(session.error);
      const res=await fetch(`${FLOW_API_BASE}${path}`,{
        method,
        headers:{'Content-Type':'application/json',...getAdminAuthHeaders()},
        body:body?JSON.stringify(body):undefined
      });
      const data=await res.json().catch(()=>({}));
      if(res.status===401||(res.status===403&&data.error==='Unauthorized')){
        throw new Error('Session admin tidak valid. Silakan login ulang.');
      }
      if(res.status===403)throw new Error(data.error||'Akses ditolak.');
      if(!res.ok)throw new Error(data.error||'Request failed');
      return data;
    }
    function getSelectedMenuPermissions(prefix){
      return Array.from(document.querySelectorAll(`input[name="${prefix}"]:checked`)).map(el=>el.value);
    }
    function renderMenuPermissions(selected=[],prefix='perm'){
      const sel=Array.isArray(selected)?selected:[];
      const topMenus=MENU.filter(m=>m.id!=='ai-image');
      const aiChecks=AI_IMAGE_CHILDREN.map(c=>`<label class="perm-check perm-check-sub"><input type="checkbox" name="${prefix}" value="${c.id}" ${sel.includes(c.id)||sel.includes('ai-image')?'checked':''}><span>${c.label}</span></label>`).join('');
      return `<div class="perm-grid"><div class="perm-actions"><button type="button" class="btn-action ripple-container" data-action="perm-select-all">Select All</button><button type="button" class="btn-action ripple-container" data-action="perm-clear-all">Clear All</button></div>${topMenus.map(m=>`<label class="perm-check"><input type="checkbox" name="${prefix}" value="${m.id}" ${sel.includes(m.id)?'checked':''}><span>${m.label}</span></label>`).join('')}<div class="perm-group-label">AI Image</div>${aiChecks}</div>`;
    }
    function showCreateSubAccountModal(){
      showModal('Create Sub Account',`<div class="settings-field"><label>Full Name</label><input type="text" id="saName" placeholder="Admin Marketing"></div><div class="settings-field"><label>Username / Email</label><input type="text" id="saUser" placeholder="marketing"></div><div class="settings-field"><label>Password</label><input type="password" id="saPass" placeholder="Password"></div><div class="settings-field"><label>Confirm Password</label><input type="password" id="saPass2" placeholder="Confirm password"></div><div class="settings-field"><label>Menu Permissions</label>${renderMenuPermissions([],'saPerm')}</div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-create-sub">Create Account</button>`);
    }
    function showEditSubAccountModal(account){
      showModal('Edit Sub Account',`<div class="settings-field"><label>Full Name</label><input type="text" id="saName" value="${esc(account.name)}"></div><div class="settings-field"><label>Username</label><input type="text" id="saUser" value="${esc(account.username)}"></div><div class="settings-field"><label>Password <span style="font-weight:400;color:var(--text-muted)">(optional)</span></label><input type="password" id="saPass" placeholder="Leave blank to keep current"></div><div class="settings-field"><label>Menu Permissions</label>${renderMenuPermissions(account.allowedMenus||[],'saPerm')}</div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-edit-sub" data-id="${account.id}">Save Changes</button>`);
    }
    function renderSubAccountSection(){
      if(!isMainAdmin())return'';
      const accounts=S.subAccounts||[];
      const rows=accounts.length?accounts.map(a=>`<tr><td data-label="Name">${esc(a.name)}</td><td data-label="Username">${esc(a.username)}</td><td data-label="Role">Sub Admin</td><td data-label="Status"><span class="sub-status ${a.status==='active'?'active':'disabled'}">${a.status==='active'?'Active':'Disabled'}</span></td><td data-label="Permissions">${(a.allowedMenus||[]).length} menus</td><td data-label="Action" class="sub-actions"><button class="card-action-btn" data-action="edit-sub-account" data-id="${a.id}">Edit</button><button class="card-action-btn" data-action="toggle-sub-account" data-id="${a.id}">${a.status==='active'?'Disable':'Enable'}</button><button class="card-action-btn danger" data-action="delete-sub-account" data-id="${a.id}">Delete</button></td></tr>`).join(''):'<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px">No sub accounts yet.</td></tr>';
      return `<div class="settings-section animate-fade-in-up delay-4"><div class="settings-section-title">Sub Account Management</div><div class="settings-section-desc">Create and manage sub admin accounts with menu permissions.</div><div class="library-header" style="margin-bottom:16px"><button class="btn-add ripple-container" data-action="create-sub-account"><i data-lucide="plus"></i> Create Sub Account</button></div><div class="sub-account-table-wrap"><table class="sub-account-table"><thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Status</th><th>Permissions</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
    }

    function getPromptsForCategory(category,{includeDisabled=false}={}){
      return (S.promptTemplates||[]).filter(p=>{
        if(p.category!==category)return false;
        if(!includeDisabled&&p.status!=='active')return false;
        return true;
      });
    }
    function renderPromptSelector(category,selectId,textareaId,indicatorId){
      const prompts=getPromptsForCategory(category,{includeDisabled:isMainAdmin()&&S.currentPage==='settings'});
      const options=['<option value="">Custom Prompt</option>',...prompts.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`)].join('');
      return `<div class="form-group prompt-template-group"><label class="form-label">Prompt Template</label><select class="form-select prompt-template-select" id="${selectId}" data-category="${category}" data-target="${textareaId}" data-indicator="${indicatorId}">${options}</select><div class="prompt-template-indicator hidden" id="${indicatorId}"></div></div>`;
    }
    async function loadPromptTemplates(){
      try{
        const res=await fetch(`${FLOW_API_BASE}/api/prompts`,{headers:isMainAdmin()?getAdminAuthHeaders():{}});
        if(res.ok){
          const data=await res.json();
          S.promptTemplates=data.prompts||[];
        }
      }catch(err){
        console.warn('Failed to load prompt templates:',err.message);
      }
    }
    async function apiPromptRequest(method,path,body){
      const session=ensureMainAdminSession();
      if(!session.ok)throw new Error(session.error);
      const res=await fetch(`${FLOW_API_BASE}${path}`,{
        method,
        headers:{'Content-Type':'application/json',...getAdminAuthHeaders()},
        body:body?JSON.stringify(body):undefined
      });
      const data=await res.json().catch(()=>({}));
      if(res.status===401||(res.status===403&&data.error==='Unauthorized')){
        throw new Error('Session admin tidak valid. Silakan login ulang.');
      }
      if(res.status===403)throw new Error(data.error||'Akses ditolak.');
      if(!res.ok)throw new Error(data.error||'Request failed');
      return data;
    }
    function syncPromptTextareaState(textareaId,value){
      if(textareaId==='videoPrompt')S.videoPrompt=value;
      else if(textareaId==='wfUserPrompt')S.wfData.userPrompt=value;
      else if(textareaId==='apUserPrompt')S.apData.userPrompt=value;
      else if(textareaId==='afImagePrompt')S.afData.imagePrompt=value;
    }
    function applyPromptTemplate(selectEl){
      if(!selectEl)return;
      const id=selectEl.value;
      const targetId=selectEl.dataset.target;
      const indicatorId=selectEl.dataset.indicator;
      const ta=document.getElementById(targetId);
      const ind=document.getElementById(indicatorId);
      if(!id){
        if(ta)ta.value='';
        if(ind){ind.classList.add('hidden');ind.innerHTML='';}
        syncPromptTextareaState(targetId,'');
        return;
      }
      const prompt=(S.promptTemplates||[]).find(p=>p.id===id);
      if(!prompt||!ta)return;
      ta.value=prompt.prompt;
      if(ind){
        ind.classList.remove('hidden');
        ind.innerHTML=`<span class="prompt-template-badge">Template: ${esc(prompt.name)}</span>`;
      }
      syncPromptTextareaState(targetId,prompt.prompt);
    }
    function bindPromptSelectors(){
      document.querySelectorAll('.prompt-template-select').forEach(sel=>{
        sel.onchange=()=>applyPromptTemplate(sel);
      });
      document.querySelectorAll('[data-prompt-textarea]').forEach(ta=>{
        ta.oninput=e=>syncPromptTextareaState(ta.id,e.target.value);
      });
    }
    function renderPromptCategoryOptions(selected=''){
      return PROMPT_CATEGORIES.map(c=>`<option value="${c.id}" ${selected===c.id?'selected':''}>${c.label}</option>`).join('');
    }
    function showCreatePromptModal(){
      showModal('Add Prompt',`<div class="settings-field"><label>Prompt Name</label><input type="text" id="pmName" placeholder="Cinematic Product Commercial"></div><div class="settings-field"><label>Prompt Category</label><select id="pmCategory">${renderPromptCategoryOptions()}</select></div><div class="settings-field"><label>Prompt Description</label><input type="text" id="pmDesc" placeholder="Short description"></div><div class="settings-field"><label>Prompt Content</label><textarea id="pmContent" rows="8" placeholder="Enter prompt template..."></textarea></div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-create-prompt">Add Prompt</button>`);
    }
    function showEditPromptModal(prompt){
      showModal('Edit Prompt',`<div class="settings-field"><label>Prompt Name</label><input type="text" id="pmName" value="${esc(prompt.name)}"></div><div class="settings-field"><label>Prompt Category</label><select id="pmCategory">${renderPromptCategoryOptions(prompt.category)}</select></div><div class="settings-field"><label>Prompt Description</label><input type="text" id="pmDesc" value="${esc(prompt.description||'')}"></div><div class="settings-field"><label>Prompt Content</label><textarea id="pmContent" rows="8">${esc(prompt.prompt)}</textarea></div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-edit-prompt" data-id="${prompt.id}">Save Changes</button>`);
    }
    function renderPromptManagementSection(){
      if(!isMainAdmin())return'';
      const prompts=S.promptTemplates||[];
      const rows=prompts.length?prompts.map(p=>`<tr><td data-label="Name">${esc(p.name)}</td><td data-label="Category">${esc(PROMPT_CAT_LABEL[p.category]||p.category)}</td><td data-label="Status"><span class="sub-status ${p.status==='active'?'active':'disabled'}">${p.status==='active'?'Active':'Disabled'}</span></td><td data-label="Action" class="sub-actions"><button class="card-action-btn" data-action="edit-prompt" data-id="${p.id}">Edit</button><button class="card-action-btn" data-action="toggle-prompt" data-id="${p.id}">${p.status==='active'?'Disable':'Enable'}</button><button class="card-action-btn danger" data-action="delete-prompt" data-id="${p.id}">Delete</button></td></tr>`).join(''):'<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px">No prompt templates yet.</td></tr>';
      return `<div class="settings-section animate-fade-in-up delay-4"><div class="settings-section-title">Prompt Management</div><div class="settings-section-desc">Create and manage reusable prompt templates for AI menus.</div><div class="library-header" style="margin-bottom:16px"><button class="btn-add ripple-container" data-action="create-prompt"><i data-lucide="plus"></i> Add Prompt</button></div><div class="sub-account-table-wrap"><table class="sub-account-table"><thead><tr><th>Name</th><th>Category</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
    }

    /* ============================================
       TOAST
       ============================================ */
    function showToast(t,m,tp='success'){const c=document.getElementById('toastContainer');const ic={success:'check-circle',warning:'alert-triangle',error:'x-circle',info:'info'};const el=document.createElement('div');el.className=`toast ${tp}`;el.innerHTML=`<div class="toast-icon"><i data-lucide="${ic[tp]||'info'}"></i></div><div class="toast-content"><div class="toast-title">${esc(t)}</div><div class="toast-message">${esc(m)}</div></div><button class="toast-close" data-action="toast-close"><i data-lucide="x"></i></button>`;c.appendChild(el);lucide.createIcons({nodes:[el]});el._timer=setTimeout(()=>rmToast(el),4000)}
    function rmToast(t){if(!t||t._r)return;t._r=true;clearTimeout(t._timer);t.classList.add('removing');setTimeout(()=>t.remove(),300)}

    /* ============================================
       MODAL
       ============================================ */
    function showModal(t,b,f){const c=document.getElementById('modalContainer');c.innerHTML=`<div class="modal-overlay"><div class="modal-box"><div class="modal-header"><h3 class="modal-title">${esc(t)}</h3><button class="modal-close" id="modalCloseBtn"><i data-lucide="x"></i></button></div><div class="modal-body">${b}</div>${f?`<div class="modal-footer">${f}</div>`:''}</div></div>`;lucide.createIcons({nodes:[c]})}
    function closeModal(){const c=document.getElementById('modalContainer');const o=c.querySelector('.modal-overlay');if(o){o.style.animation='overlayIn 0.2s ease reverse forwards';setTimeout(()=>{c.innerHTML=''},200)}}

    /* ============================================
       RIPPLE
       ============================================ */
    function mkRipple(e){const el=e.currentTarget;if(!el.classList.contains('ripple-container'))return;const r=el.getBoundingClientRect();const sz=Math.max(r.width,r.height);const rp=document.createElement('span');rp.className='ripple-span';rp.style.width=rp.style.height=sz+'px';rp.style.left=(e.clientX-r.left-sz/2)+'px';rp.style.top=(e.clientY-r.top-sz/2)+'px';el.appendChild(rp);setTimeout(()=>rp.remove(),600)}

    /* ============================================
       SIDEBAR
       ============================================ */
    const SIDEBAR_COLLAPSED_KEY='tarmocSidebarCollapsed';
    function isMobileNav(){return window.matchMedia('(max-width: 1023px)').matches;}
    function applySidebarState(){
      const sidebar=document.getElementById('sidebar');
      const layout=document.querySelector('.app-layout');
      if(!sidebar||!layout)return;
      if(!isMobileNav())closeSidebar();
      const collapsed=!isMobileNav()&&localStorage.getItem(SIDEBAR_COLLAPSED_KEY)==='true';
      sidebar.classList.toggle('collapsed',collapsed);
      layout.classList.toggle('sidebar-collapsed',collapsed);
      const btn=document.getElementById('sidebarCollapseBtn');
      if(btn){
        btn.innerHTML=`<i data-lucide="${collapsed?'panel-left-open':'panel-left-close'}"></i>`;
        btn.setAttribute('aria-label',collapsed?'Expand sidebar':'Collapse sidebar');
        lucide.createIcons({nodes:[btn]});
      }
    }
    let sidebarPrevPage=null;
    function renderSidebar(){
      const nav=document.getElementById('sidebarNav');
      let h='<div class="sidebar-section-label">Main Menu</div>';
      const onAiChild=isAIImageChild(S.currentPage);
      const onAiGroup=S.currentPage==='ai-image'||onAiChild;
      if(sidebarPrevPage!==S.currentPage){
        if(onAiGroup)S.sidebarAiImageExpanded=true;
        else S.sidebarAiImageExpanded=false;
      }
      sidebarPrevPage=S.currentPage;
      MENU.forEach(i=>{
        if(i.id==='ai-image'){
          if(!canAccessMenu('ai-image'))return;
          const open=!!S.sidebarAiImageExpanded;
          const parentActive=S.currentPage==='ai-image'||onAiChild;
          const subs=AI_IMAGE_CHILDREN.filter(c=>canAccessMenu(c.id));
          h+=`<div class="sidebar-group ${open?'open':''}">`;
          h+=`<div class="sidebar-item sidebar-parent ${parentActive?'active':''}" data-action="toggle-ai-image" data-page="ai-image" data-tooltip="${esc(i.label)}" title="${esc(i.label)}"><span class="item-icon"><i data-lucide="${i.icon}"></i></span><span class="item-label">${i.label}</span><span class="sidebar-chevron"><i data-lucide="chevron-down"></i></span></div>`;
          h+=`<div class="sidebar-submenu">${subs.map(c=>`<div class="sidebar-item sidebar-sub ${S.currentPage===c.id?'active':''}" data-action="navigate" data-page="${c.id}" data-tooltip="${esc(c.label)}" title="${esc(c.label)}"><span class="item-icon"><i data-lucide="${c.icon}"></i></span><span class="item-label">${c.label}</span></div>`).join('')}</div></div>`;
          return;
        }
        if(!canAccessMenu(i.id))return;
        h+=`<div class="sidebar-item ${S.currentPage===i.id?'active':''}" data-action="navigate" data-page="${i.id}" data-tooltip="${esc(i.label)}" title="${esc(i.label)}"><span class="item-icon"><i data-lucide="${i.icon}"></i></span><span class="item-label">${i.label}</span></div>`;
      });
      nav.innerHTML=h;
      lucide.createIcons({nodes:[nav]});
      applySidebarState();
    }

    /* ============================================
       NOTIFICATIONS
       ============================================ */
    function renderNotifs(){
      const dd=document.getElementById('notifDropdown');const ic={success:'rgba(245,158,11,0.15)',info:'rgba(59,130,246,0.15)',warning:'rgba(245,158,11,0.15)'};const in2={success:'check-circle',info:'info',warning:'alert-triangle'};const itc={success:'#F59E0B',info:'#3B82F6',warning:'#FBBF24'};
      let h=`<div class="notif-dropdown-header"><h4>Notifications</h4><span data-action="clear-notifs">Mark all read</span></div>`;
      if(!S.notifications.length)h+=`<div class="empty-state" style="padding:30px"><p style="font-size:13px;color:var(--text-muted)">No notifications</p></div>`;
      else S.notifications.forEach(n=>{h+=`<div class="notif-item"><div class="notif-icon" style="background:${ic[n.type]};color:${itc[n.type]}"><i data-lucide="${in2[n.type]}"></i></div><div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div></div>`});
      dd.innerHTML=h;lucide.createIcons({nodes:[dd]});const b=document.getElementById('notifBadge');b.textContent=S.notifications.length;b.style.display=S.notifications.length>0?'flex':'none';
    }

    /* ============================================
       NAVIGATION
       ============================================ */
    function navTo(p,ex){
      if(!canAccessMenu(p)){denyAccess(p);return;}
      S.currentPage=p;if(ex)Object.assign(S,ex);renderSidebar();renderPage();closeSidebar();
    }
    function renderPage(){
      if(!canAccessMenu(S.currentPage)){S.currentPage=getDefaultPage();}
      const m=document.getElementById('mainContent');const pg={'dashboard':pgDashboard,'ai-video':pgAIVideo,'workflow':pgWorkflow,'ai-image':pgAIImage,'ai-product':pgAIProduct,'ai-affiliate':pgAffiliate,'ai-academy':pgAIAcademy,'storyboard':pgStoryboard,'ai-podcast':pgAIPodcast,'ai-character':pgAICharacter,'image-editing':pgImgEdit,'character-library':pgCharLib,'product-library':pgProdLib,'prompt-library':pgPromptLib,history:pgHistory,settings:pgSettings};m.innerHTML=(pg[S.currentPage]||pgDashboard)();lucide.createIcons({nodes:[m]});bindPageEvents();
    }

    /* ============================================
       DASHBOARD
       ============================================ */
    function pgDashboard(){
      const tv=S.history.filter(h=>h.type==='video').length,ti=S.history.filter(h=>h.type==='image').length;
      return `<div class="animate-fade-in"><h1 class="page-title">Dashboard</h1><p class="page-subtitle">Welcome back! Here's an overview of your TARMOC Studio activity.</p>
        <div class="stats-grid">
          <div class="stat-card animate-fade-in-up delay-1"><div class="stat-icon" style="background:rgba(59,130,246,0.1);color:#60A5FA"><i data-lucide="video"></i></div><div class="stat-value">${tv}</div><div class="stat-label">Total Videos</div><span class="stat-change up">+12%</span></div>
          <div class="stat-card animate-fade-in-up delay-2"><div class="stat-icon" style="background:rgba(245,158,11,0.1);color:#FBBF24"><i data-lucide="image"></i></div><div class="stat-value">${ti}</div><div class="stat-label">Total Images</div><span class="stat-change up">+8%</span></div>
          <div class="stat-card animate-fade-in-up delay-3"><div class="stat-icon" style="background:rgba(245,158,11,0.1);color:#FBBF24"><i data-lucide="zap"></i></div><div class="stat-value">${fmtN(S.credits)}</div><div class="stat-label">Credits</div><span class="stat-change down">-3%</span></div>
          <div class="stat-card animate-fade-in-up delay-4"><div class="stat-icon" style="background:rgba(139,92,246,0.1);color:#A78BFA"><i data-lucide="hard-drive"></i></div><div class="stat-value">2.4 GB</div><div class="stat-label">Storage Used</div><span class="stat-change up">+15%</span></div>
        </div>
        <div class="section-grid">
          <div class="section-card animate-fade-in-up delay-5"><div class="section-card-header"><span class="section-card-title">Recent Projects</span><span class="section-card-action" data-action="navigate" data-page="history">View All</span></div><div class="section-card-body">${S.history.slice(0,4).map(h=>`<div class="activity-item"><span class="activity-dot" style="background:${h.type==='video'?'#3B82F6':'#F59E0B'}"></span><span class="activity-text"><strong>${h.type==='video'?'Video':'Image'}</strong> — ${esc(h.prompt.length>50?h.prompt.substring(0,50)+'...':h.prompt)}</span><span class="activity-time">${fmtD(h.date)}</span></div>`).join('')}</div></div>
          <div class="section-card animate-fade-in-up delay-6"><div class="section-card-header"><span class="section-card-title">Recent Activity</span></div><div class="section-card-body">
            <div class="activity-item"><span class="activity-dot" style="background:#F59E0B"></span><span class="activity-text"><strong>Video generated</strong> using Google Veo</span><span class="activity-time">5m ago</span></div>
            <div class="activity-item"><span class="activity-dot" style="background:#3B82F6"></span><span class="activity-text"><strong>3 images</strong> generated with Gemini</span><span class="activity-time">1h ago</span></div>
            <div class="activity-item"><span class="activity-dot" style="background:#FBBF24"></span><span class="activity-text"><strong>API Key</strong> for Runway updated</span><span class="activity-time">3h ago</span></div>
            <div class="activity-item"><span class="activity-dot" style="background:#8B5CF6"></span><span class="activity-text"><strong>Character</strong> "Emma Wilson" added</span><span class="activity-time">1d ago</span></div>
          </div></div>
        </div>
        <div class="animate-fade-in-up delay-7"><h2 style="font-size:16px;font-weight:700;margin-bottom:16px">Quick Actions</h2><div class="quick-actions-grid">
          <div class="quick-action-card" data-action="navigate" data-page="ai-video"><div class="qa-icon" style="background:rgba(59,130,246,0.1);color:#60A5FA"><i data-lucide="video"></i></div><div class="qa-title">Generate Video</div><div class="qa-desc">AI-powered videos</div></div>
          <div class="quick-action-card" data-action="navigate" data-page="ai-image"><div class="qa-icon" style="background:rgba(245,158,11,0.1);color:#FBBF24"><i data-lucide="image"></i></div><div class="qa-title">AI Image Hub</div><div class="qa-desc">Product, Affiliate & more</div></div>
          <div class="quick-action-card" data-action="navigate" data-page="image-editing"><div class="qa-icon" style="background:rgba(139,92,246,0.1);color:#A78BFA"><i data-lucide="wand-2"></i></div><div class="qa-title">Edit Image</div><div class="qa-desc">Enhance & transform</div></div>
          <div class="quick-action-card" data-action="navigate" data-page="prompt-library"><div class="qa-icon" style="background:rgba(245,158,11,0.1);color:#FBBF24"><i data-lucide="book-open"></i></div><div class="qa-title">Browse Prompts</div><div class="qa-desc">Ready-made templates</div></div>
        </div></div></div>`;
    }

    /* ============================================
   WORKFLOW BUILDER
   ============================================ */
function pgWorkflow(){
  return `<div class="animate-fade-in flow-page">
    <div class="flow-toolbar">
      <div class="flow-toolbar-left"><span class="flow-toolbar-title"><i data-lucide="git-branch"></i> Workflow Builder</span></div>
      <div class="flow-toolbar-actions">
        <button class="flow-tb-btn" data-action="flow-new"><i data-lucide="file-plus"></i> New</button>
        <button class="flow-tb-btn" data-action="flow-open"><i data-lucide="folder-open"></i> Open</button>
        <button class="flow-tb-btn" data-action="flow-duplicate"><i data-lucide="copy"></i> Duplicate</button>
        <button class="flow-tb-btn" data-action="flow-save"><i data-lucide="save"></i> Save</button>
        <button class="flow-tb-btn" data-action="flow-save-template"><i data-lucide="layout-template"></i> Save as Template</button>
        <span class="flow-tb-sep"></span>
        <button class="flow-tb-btn primary" id="flowRunBtn" data-action="flow-run"><i data-lucide="play"></i> Run Workflow</button>
        <button class="flow-tb-btn danger" id="flowStopBtn" data-action="flow-stop" style="display:none"><i data-lucide="square"></i> Stop</button>
        <span class="flow-tb-sep"></span>
        <button class="flow-tb-btn" data-action="flow-history"><i data-lucide="history"></i> History</button>
      </div>
    </div>
    <div class="flow-body">
      ${flowRenderSidebar()}
      <div class="flow-canvas-wrap">
        <div class="flow-canvas-toolbar">
          <button class="flow-icon-btn" data-action="flow-zoom-in" title="Zoom in"><i data-lucide="zoom-in"></i></button>
          <button class="flow-icon-btn" data-action="flow-zoom-out" title="Zoom out"><i data-lucide="zoom-out"></i></button>
          <button class="flow-icon-btn" data-action="flow-zoom-reset" title="Reset view"><i data-lucide="maximize"></i></button>
          <span class="flow-zoom-value">${Math.round(S.flow.zoom*100)}%</span>
          <span class="flow-tb-sep"></span>
          <button class="flow-icon-btn" data-action="flow-undo" title="Undo"><i data-lucide="undo-2"></i></button>
          <button class="flow-icon-btn" data-action="flow-redo" title="Redo"><i data-lucide="redo-2"></i></button>
          <span class="flow-tb-sep"></span>
          <button class="flow-icon-btn ${S.flow.snapGrid?'active':''}" data-action="flow-toggle-snap" title="Snap to grid"><i data-lucide="grid-3x3"></i></button>
        </div>
        <div class="flow-canvas" id="flowCanvas">
          <svg class="flow-svg" id="flowSvg"></svg>
          <div class="flow-viewport" id="flowViewport" style="transform:translate(${S.flow.pan.x}px,${S.flow.pan.y}px) scale(${S.flow.zoom})">
            <div class="flow-nodes-layer" id="flowNodesLayer"></div>
          </div>
          ${S.flow.nodes.length===0?`<div class="flow-empty-hint"><i data-lucide="mouse-pointer-2"></i><div>Klik node di panel kiri untuk menambahkannya ke canvas</div></div>`:''}
        </div>
        <div class="flow-minimap" id="flowMinimap"></div>
      </div>
      ${flowRenderProps()}
    </div>
  </div>`;
}

function flowRenderSidebar(){
  const q=(S.flow.search||'').toLowerCase();
  return `<div class="flow-sidebar">
    <div class="flow-sidebar-search"><i data-lucide="search"></i><input type="text" id="flowSearchInput" placeholder="Search nodes..." value="${esc(S.flow.search||'')}"></div>
    <div class="flow-sidebar-list">
    ${FLOW_CATEGORIES.map(cat=>{
      const nodes=cat.nodes.filter(n=>!q||n.title.toLowerCase().includes(q));
      if(!nodes.length)return '';
      return `<div class="flow-cat-group"><div class="flow-cat-label" style="--flow-accent:${cat.color}">${esc(cat.name)}</div>${nodes.map(n=>`<div class="flow-node-chip" data-action="flow-add-node-click" data-node-type="${n.type}" title="Klik untuk menambahkan: ${esc(n.desc)}"><span class="flow-chip-icon" style="--flow-accent:${cat.color}"><i data-lucide="${n.icon}"></i></span><div><div class="flow-chip-title">${esc(n.title)}</div><div class="flow-chip-desc">${esc(n.desc)}</div></div></div>`).join('')}</div>`;
    }).join('')}
    </div>
    <div class="flow-sidebar-templates">
      <div class="flow-cat-label">Templates</div>
      ${FLOW_TEMPLATES.map(t=>`<div class="flow-template-chip" data-action="flow-load-template" data-id="${t.id}"><i data-lucide="layout-template"></i> ${esc(t.name)}</div>`).join('')}
    </div>
  </div>`;
}

function flowGetDef(type){for(const c of FLOW_CATEGORIES){const d=c.nodes.find(n=>n.type===type);if(d)return d;}return{icon:'box',title:type,desc:'',inputs:[],outputs:[]};}
function flowCatOf(type){return(FLOW_CATEGORIES.find(c=>c.nodes.some(n=>n.type===type))||{});}
function flowDefaultSettings(){return{provider:'',prompt:'',negativePrompt:'',resolution:'1080p',duration:5,aspectRatio:'16:9',temperature:0.7,seed:''};}
function flowSnap(v){return S.flow.snapGrid?Math.round(v/20)*20:v;}

function flowDefaultData(type){
  if(type==='upload-image')return{image:null};
  if(type==='upload-video')return{video:null};
  if(type==='product')return{productId:null};
  if(type==='folder')return{files:[]};
  if(type==='url')return{url:''};
  return{};
}
function flowNodeInputPreview(n){
  if(n.type==='upload-image'&&n.data?.image)return `<img src="${n.data.image}" style="width:100%;border-radius:8px;margin-top:8px;max-height:70px;object-fit:cover">`;
  if(n.type==='upload-video'&&n.data?.video)return `<div style="font-size:10.5px;color:var(--primary);margin-top:6px">✓ Video attached</div>`;
  if(n.type==='product'&&n.data?.productId){const p=S.products.find(x=>x.id===n.data.productId);return p?`<div style="display:flex;align-items:center;gap:8px;margin-top:8px"><img src="${p.thumbnail}" style="width:26px;height:26px;border-radius:6px;object-fit:cover"><span style="font-size:11px;color:var(--text-primary)">${esc(p.name)}</span></div>`:'';}
  if(n.type==='url'&&n.data?.url)return `<div style="font-size:10.5px;color:var(--primary);margin-top:6px;word-break:break-all">${esc(n.data.url)}</div>`;
  if(n.type==='folder'&&n.data?.files?.length)return `<div style="font-size:10.5px;color:var(--primary);margin-top:6px">✓ ${n.data.files.length} file(s)</div>`;
  return '';
}

function flowNodeHTML(n){
  const def=flowGetDef(n.type);const cat=flowCatOf(n.type);const color=cat.color||'#F59E0B';
  return `<div class="flow-node ${S.flow.selectedId===n.id?'selected':''} status-${n.status||'idle'}" data-node-id="${n.id}" style="left:${n.x}px;top:${n.y}px;--flow-accent:${color}">
    <div class="flow-node-header"><span class="flow-node-icon"><i data-lucide="${def.icon}"></i></span><span class="flow-node-title">${esc(n.title)}</span><span class="flow-node-status-dot"></span></div>
    <div class="flow-node-body"><div class="flow-node-desc">${esc(n.desc||def.desc)}</div>${flowNodeInputPreview(n)}${flowNodeResultPreview(n)}</div>
    <div class="flow-node-actions">
      <button class="flow-node-mini-btn" data-action="flow-node-duplicate" data-id="${n.id}" title="Duplicate"><i data-lucide="copy"></i></button>
      <button class="flow-node-mini-btn danger" data-action="flow-node-delete" data-id="${n.id}" title="Delete"><i data-lucide="trash-2"></i></button>
    </div>
    <div class="flow-ports flow-ports-in">${(n.inputs||[]).map(p=>`<div class="flow-port flow-port-in" data-port-dir="in" data-port="${p}" data-node-id="${n.id}" title="${p}"></div>`).join('')}</div>
    <div class="flow-ports flow-ports-out">${(n.outputs||[]).map(p=>`<div class="flow-port flow-port-out" data-port-dir="out" data-port="${p}" data-node-id="${n.id}" title="${p}"></div>`).join('')}</div>
  </div>`;
}

function flowRenderCanvas(){
  const layer=document.getElementById('flowNodesLayer');if(!layer)return;
  layer.innerHTML=S.flow.nodes.map(flowNodeHTML).join('');
  lucide.createIcons({nodes:[layer]});
  const hint=document.querySelector('.flow-empty-hint');if(hint)hint.style.display=S.flow.nodes.length?'none':'flex';
  requestAnimationFrame(()=>{flowRedrawConnections();flowRenderMinimap();});
}

function flowGetPortPos(nodeId,dir,portName){
  const el=document.querySelector(`.flow-port[data-node-id="${nodeId}"][data-port-dir="${dir}"][data-port="${portName}"]`);
  const canvas=document.getElementById('flowCanvas');
  if(!el||!canvas)return null;
  const er=el.getBoundingClientRect(),cr=canvas.getBoundingClientRect();
  return{x:er.left+er.width/2-cr.left,y:er.top+er.height/2-cr.top};
}
function flowConnPath(p1,p2){const dx=Math.max(60,Math.abs(p2.x-p1.x)*0.5);return`M ${p1.x} ${p1.y} C ${p1.x+dx} ${p1.y}, ${p2.x-dx} ${p2.y}, ${p2.x} ${p2.y}`;}
function flowRedrawConnections(){
  const svg=document.getElementById('flowSvg');if(!svg)return;
  const canvas=document.getElementById('flowCanvas');
  if(canvas){svg.setAttribute('width',canvas.clientWidth);svg.setAttribute('height',canvas.clientHeight);}
  let html='<defs><marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor" style="color:var(--primary)"/></marker></defs>';
  S.flow.connections.forEach(c=>{
    const p1=flowGetPortPos(c.fromNode,'out',c.fromPort),p2=flowGetPortPos(c.toNode,'in',c.toPort);
    if(!p1||!p2)return;
    html+=`<path class="flow-conn ${S.flow.selectedConnId===c.id?'selected':''}" data-conn-id="${c.id}" d="${flowConnPath(p1,p2)}" marker-end="url(#flowArrow)"></path>`;
  });
  if(S.flow._tempConn)html+=`<path class="flow-conn temp" d="${flowConnPath(S.flow._tempConn.from,S.flow._tempConn.to)}"></path>`;
  svg.innerHTML=html;
}
function flowRenderMinimap(){
  const mm=document.getElementById('flowMinimap');if(!mm)return;
  if(!S.flow.nodes.length){mm.innerHTML='';return;}
  const xs=S.flow.nodes.map(n=>n.x),ys=S.flow.nodes.map(n=>n.y);
  const minX=Math.min(...xs)-40,maxX=Math.max(...xs)+220,minY=Math.min(...ys)-40,maxY=Math.max(...ys)+140;
  const w=Math.max(1,maxX-minX),h=Math.max(1,maxY-minY),scale=Math.min(140/w,90/h);
  mm.innerHTML=`<svg width="150" height="100" viewBox="0 0 150 100"><rect width="150" height="100" fill="rgba(255,255,255,0.02)"/>${S.flow.nodes.map(n=>`<rect x="${(n.x-minX)*scale}" y="${(n.y-minY)*scale}" width="${180*scale}" height="${70*scale}" rx="2" fill="var(--primary)" opacity="0.55"/>`).join('')}</svg>`;
}

function flowAddNode(type,x,y){
  const def=flowGetDef(type),cat=flowCatOf(type);
  const id='n'+(S.flow.nextId++);
  const node={id,type,category:cat.name||'',title:def.title,desc:def.desc,x:flowSnap(x),y:flowSnap(y),inputs:def.inputs||[],outputs:def.outputs||[],settings:flowDefaultSettings(),data:flowDefaultData(type),status:'idle'};
  S.flow.nodes.push(node);
  S.flow.selectedId=id;
  S.flow.selectedConnId=null;
  flowPushHistory();
  flowRenderCanvas();
  flowRenderPropsInto();
  return node;
}

function flowStartNodeDrag(e,nodeId){
  const node=S.flow.nodes.find(n=>n.id===nodeId);if(!node)return;
  S.flow.selectedId=nodeId;S.flow.selectedConnId=null;
  document.querySelectorAll('.flow-node').forEach(el=>el.classList.remove('selected'));
  const nEl=document.querySelector(`.flow-node[data-node-id="${nodeId}"]`);if(nEl)nEl.classList.add('selected');
  flowRenderPropsInto();
  const startX=e.clientX,startY=e.clientY,ox=node.x,oy=node.y;let moved=false;
  const onMove=ev=>{
    node.x=flowSnap(ox+(ev.clientX-startX)/S.flow.zoom);node.y=flowSnap(oy+(ev.clientY-startY)/S.flow.zoom);moved=true;
    if(nEl){nEl.style.left=node.x+'px';nEl.style.top=node.y+'px';}
    flowRedrawConnections();
  };
  const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);if(moved){flowPushHistory();flowRenderMinimap();}};
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
}

function flowStartConnDrag(e,nodeId,port){
  const startPos=flowGetPortPos(nodeId,'out',port);if(!startPos)return;
  const canvas=document.getElementById('flowCanvas'),cr=canvas.getBoundingClientRect();
  S.flow._tempConn={from:startPos,to:{x:e.clientX-cr.left,y:e.clientY-cr.top}};flowRedrawConnections();
  const onMove=ev=>{S.flow._tempConn.to={x:ev.clientX-cr.left,y:ev.clientY-cr.top};flowRedrawConnections();};
  const onUp=ev=>{
    document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);
    const target=document.elementFromPoint(ev.clientX,ev.clientY);
    const portEl=target&&target.closest?target.closest('.flow-port-in'):null;
    S.flow._tempConn=null;
    if(portEl){
      const toNode=portEl.dataset.nodeId,toPort=portEl.dataset.port;
      if(toNode!==nodeId){
        if(S.flow.connections.some(c=>c.toNode===toNode&&c.toPort===toPort)){showToast('Port Occupied','This input already has a connection.','warning');}
        else{S.flow.connections.push({id:'c'+(S.flow.nextId++),fromNode:nodeId,fromPort:port,toNode,toPort});flowPushHistory();}
      }
    }
    flowRedrawConnections();
  };
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
}

function flowStartPan(e){
  S.flow.selectedId=null;S.flow.selectedConnId=null;
  document.querySelectorAll('.flow-node.selected').forEach(el=>el.classList.remove('selected'));
  flowRenderPropsInto();flowRedrawConnections();
  const startX=e.clientX,startY=e.clientY,ox=S.flow.pan.x,oy=S.flow.pan.y;
  const onMove=ev=>{
    S.flow.pan.x=ox+(ev.clientX-startX);S.flow.pan.y=oy+(ev.clientY-startY);
    const vp=document.getElementById('flowViewport');if(vp)vp.style.transform=`translate(${S.flow.pan.x}px,${S.flow.pan.y}px) scale(${S.flow.zoom})`;
    flowRedrawConnections();
  };
  const onUp=()=>{document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseup',onUp);flowRenderMinimap();};
  document.addEventListener('mousemove',onMove);document.addEventListener('mouseup',onUp);
}

function flowSetZoom(z){
  S.flow.zoom=Math.min(2,Math.max(0.3,z));
  const vp=document.getElementById('flowViewport');if(vp)vp.style.transform=`translate(${S.flow.pan.x}px,${S.flow.pan.y}px) scale(${S.flow.zoom})`;
  const zv=document.querySelector('.flow-zoom-value');if(zv)zv.textContent=Math.round(S.flow.zoom*100)+'%';
  flowRedrawConnections();
}
function flowHandleWheel(e){e.preventDefault();flowSetZoom(S.flow.zoom+(e.deltaY>0?-0.08:0.08));}

function flowRenderProps(){
  const n=S.flow.nodes.find(x=>x.id===S.flow.selectedId);
  if(!n)return`<div class="flow-props" id="flowProps"><div class="flow-props-empty"><i data-lucide="mouse-pointer-click"></i><div>Select a node to edit its properties</div></div></div>`;
  const header=`<div class="flow-props-header"><span>${esc(n.title)}</span><span class="flow-props-badge">${esc(n.category)}</span></div>
    <div class="form-group"><label class="form-label">Node Name</label><input type="text" class="form-input" id="fpName" value="${esc(n.title)}"></div>
    <div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="fpDesc" rows="2">${esc(n.desc||'')}</textarea></div>`;
  if(n.category==='Input'){
    return`<div class="flow-props" id="flowProps">${header}${flowRenderInputFields(n)}<button class="btn-wf next ripple-container" style="width:100%;justify-content:center;margin-top:8px" data-action="flow-save-node" data-id="${n.id}"><i data-lucide="check"></i> Save</button></div>`;
  }
  const s=n.settings||{};
  return`<div class="flow-props" id="flowProps">${header}
    <div class="form-group"><label class="form-label">Provider</label><select class="form-select" id="fpProvider">${flowProviderOptions(n).map(p=>`<option value="${esc(p)}" ${s.provider===p?'selected':''}>${esc(p)}</option>`).join('')}</select></div>
    <div class="form-group"><label class="form-label">Prompt</label><textarea class="form-textarea" id="fpPrompt" rows="3">${esc(s.prompt||'')}</textarea></div>
    <div class="form-group"><label class="form-label">Negative Prompt</label><textarea class="form-textarea" id="fpNegPrompt" rows="2">${esc(s.negativePrompt||'')}</textarea></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      <div class="form-group"><label class="form-label">Resolution</label><select class="form-select" id="fpResolution"><option ${s.resolution==='720p'?'selected':''}>720p</option><option ${s.resolution==='1080p'?'selected':''}>1080p</option><option ${s.resolution==='4k'?'selected':''}>4K</option></select></div>
      <div class="form-group"><label class="form-label">Aspect Ratio</label><select class="form-select" id="fpAspect"><option ${s.aspectRatio==='16:9'?'selected':''}>16:9</option><option ${s.aspectRatio==='9:16'?'selected':''}>9:16</option><option ${s.aspectRatio==='1:1'?'selected':''}>1:1</option></select></div>
      <div class="form-group"><label class="form-label">Duration (s)</label><input type="number" class="form-input" id="fpDuration" value="${s.duration||5}" min="1"></div>
      <div class="form-group"><label class="form-label">Temperature</label><input type="number" step="0.1" class="form-input" id="fpTemp" value="${s.temperature??0.7}" min="0" max="2"></div>
    </div>
    <div class="form-group"><label class="form-label">Seed</label><input type="number" class="form-input" id="fpSeed" placeholder="Random" value="${esc(s.seed||'')}"></div>
    <button class="btn-wf next ripple-container" style="width:100%;justify-content:center" data-action="flow-save-node" data-id="${n.id}"><i data-lucide="check"></i> Save</button>
  </div>`;
}

function flowRenderInputFields(n){
  if(n.type==='upload-image'){
    return `<div class="form-group"><label class="form-label">Image</label>
      ${n.data?.image?`<img src="${n.data.image}" style="width:100%;border-radius:12px;margin-bottom:10px;max-height:180px;object-fit:cover">`:''}
      <input type="file" accept="image/*" id="flowNodeFileInput" data-node-id="${n.id}" data-field="image" style="display:none">
      <button type="button" class="btn-wf-small" style="width:100%;justify-content:center" data-action="flow-trigger-file"><i data-lucide="upload"></i> ${n.data?.image?'Replace Image':'Upload Image'}</button>
    </div>`;
  }
  if(n.type==='upload-video'){
    return `<div class="form-group"><label class="form-label">Video</label>
      ${n.data?.video?`<video src="${n.data.video}" controls style="width:100%;border-radius:12px;margin-bottom:10px;max-height:180px"></video>`:''}
      <input type="file" accept="video/*" id="flowNodeFileInput" data-node-id="${n.id}" data-field="video" style="display:none">
      <button type="button" class="btn-wf-small" style="width:100%;justify-content:center" data-action="flow-trigger-file"><i data-lucide="upload"></i> ${n.data?.video?'Replace Video':'Upload Video'}</button>
    </div>`;
  }
  if(n.type==='product'){
    return `<div class="form-group"><label class="form-label">Product</label>
      <select class="form-select" id="fpProductSelect"><option value="">— Select a product —</option>${S.products.map(p=>`<option value="${p.id}" ${n.data?.productId===p.id?'selected':''}>${esc(p.name)}</option>`).join('')}</select>
    </div>`;
  }
  if(n.type==='folder'){
    return `<div class="form-group"><label class="form-label">Folder Files</label>
      ${n.data?.files?.length?`<div style="font-size:12px;color:var(--text-secondary);margin-bottom:10px">${n.data.files.length} file(s) selected</div>`:''}
      <input type="file" accept="image/*,video/*" multiple id="flowNodeFileInput" data-node-id="${n.id}" data-field="files" style="display:none">
      <button type="button" class="btn-wf-small" style="width:100%;justify-content:center" data-action="flow-trigger-file"><i data-lucide="folder-open"></i> Select Files</button>
    </div>`;
  }
  if(n.type==='url'){
    return `<div class="form-group"><label class="form-label">URL</label><input type="text" class="form-input" id="fpUrlInput" placeholder="https://..." value="${esc(n.data?.url||'')}"></div>`;
  }
  return '';
}

function flowRenderPropsInto(){
  const container=document.querySelector('.flow-body');
  if(!container)return;
  const old=document.getElementById('flowProps');
  if(old)old.outerHTML=flowRenderProps();
  lucide.createIcons({nodes:[container]});
  flowBindPropsEvents();
}

function flowBindPropsEvents(){
  const fi=document.getElementById('flowNodeFileInput');
  if(fi)fi.addEventListener('change',e=>{
    const nodeId=fi.dataset.nodeId,field=fi.dataset.field;
    const n=S.flow.nodes.find(x=>x.id===nodeId);if(!n)return;
    if(field==='files'){
      const files=Array.from(e.target.files);
      n.data=n.data||{};n.data.files=files.map(f=>f.name);n.status='done';
      flowPushHistory();flowRenderCanvas();flowRenderPropsInto();return;
    }
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=re=>{n.data=n.data||{};n.data[field]=re.target.result;n.status='done';flowPushHistory();flowRenderCanvas();flowRenderPropsInto();};
    r.readAsDataURL(f);
  });
  const ps=document.getElementById('fpProductSelect');
  if(ps)ps.addEventListener('change',e=>{
    const n=S.flow.nodes.find(x=>x.id===S.flow.selectedId);if(!n)return;
    n.data=n.data||{};n.data.productId=e.target.value?parseInt(e.target.value):null;
    n.status=n.data.productId?'done':'idle';flowPushHistory();flowRenderCanvas();flowRenderPropsInto();
  });
  const us=document.getElementById('fpUrlInput');
  if(us)us.addEventListener('change',e=>{
    const n=S.flow.nodes.find(x=>x.id===S.flow.selectedId);if(!n)return;
    n.data=n.data||{};n.data.url=e.target.value;
    n.status=n.data.url?'done':'idle';flowPushHistory();flowRenderCanvas();flowRenderPropsInto();
  });
}

function flowSnapshot(){return JSON.stringify({nodes:S.flow.nodes,connections:S.flow.connections});}
function flowPushHistory(){
  const snap=flowSnapshot();
  S.flow.history=S.flow.history.slice(0,S.flow.historyIdx+1);
  S.flow.history.push(snap);if(S.flow.history.length>50)S.flow.history.shift();
  S.flow.historyIdx=S.flow.history.length-1;
  try{localStorage.setItem('tarmocFlowAutosave',JSON.stringify({nodes:S.flow.nodes,connections:S.flow.connections,savedAt:Date.now()}));}catch{}
}
function flowApplySnapshot(snap){const d=JSON.parse(snap);S.flow.nodes=d.nodes;S.flow.connections=d.connections;S.flow.selectedId=null;S.flow.selectedConnId=null;flowRenderCanvas();flowRenderPropsInto();}
function flowUndo(){if(S.flow.historyIdx>0){S.flow.historyIdx--;flowApplySnapshot(S.flow.history[S.flow.historyIdx]);}}
function flowRedo(){if(S.flow.historyIdx<S.flow.history.length-1){S.flow.historyIdx++;flowApplySnapshot(S.flow.history[S.flow.historyIdx]);}}

function flowTopoOrder(){
  const nodes=S.flow.nodes,conns=S.flow.connections;const indeg={};nodes.forEach(n=>indeg[n.id]=0);
  conns.forEach(c=>{if(indeg[c.toNode]!==undefined)indeg[c.toNode]++;});
  let queue=nodes.filter(n=>indeg[n.id]===0).map(n=>n.id);const order=[];const indegCopy={...indeg};
  while(queue.length){const id=queue.shift();order.push(id);conns.filter(c=>c.fromNode===id).forEach(c=>{indegCopy[c.toNode]--;if(indegCopy[c.toNode]===0)queue.push(c.toNode);});}
  nodes.forEach(n=>{if(!order.includes(n.id))order.push(n.id);});
  return order;
}
let flowRunTimer=null;
async function flowRunWorkflow(){
  if(!S.flow.nodes.length){showToast('Empty Workflow','Add some nodes first.','warning');return;}
  const order=flowTopoOrder();S.flow.nodes.forEach(n=>n.status='idle');flowRenderCanvas();
  S.flow.running=true;
  const rb=document.getElementById('flowRunBtn'),sb=document.getElementById('flowStopBtn');
  if(rb)rb.style.display='none';if(sb)sb.style.display='inline-flex';

  for(let i=0;i<order.length;i++){
    if(!S.flow.running)break;
    const cur=S.flow.nodes.find(n=>n.id===order[i]);if(!cur)continue;
    cur.status='running';flowRenderCanvas();

    let ok=true;
    if(cur.category==='Input'){
      ok=flowExecuteInputNode(cur);
    }else if(['AI','Video','Image','Output'].includes(cur.category)){
      ok=await flowExecuteNode(cur);
    }else{
      await new Promise(r=>setTimeout(r,400));
    }
    cur.status=ok?'done':'error';
    flowRenderCanvas();
    if(!ok){
      showToast('Node Gagal',`"${cur.title}": ${cur.data?.result?.error||'Terjadi kesalahan'}`,'error');
      break;
    }
  }
  flowFinishRun();
}
function flowFinishRun(){
  S.flow.running=false;clearTimeout(flowRunTimer);
  const rb=document.getElementById('flowRunBtn'),sb=document.getElementById('flowStopBtn');
  if(rb)rb.style.display='inline-flex';if(sb)sb.style.display='none';
  flowRenderCanvas();
  const failed=S.flow.nodes.some(n=>n.status==='error');
  showToast(failed?'Workflow Selesai dengan Error':'Workflow Complete',failed?'Satu atau lebih node gagal.':'All nodes executed successfully.',failed?'error':'success');
}
function flowStopWorkflow(){
  S.flow.running=false;clearTimeout(flowRunTimer);
  S.flow.nodes.forEach(n=>{if(n.status==='running')n.status='idle';});
  const rb=document.getElementById('flowRunBtn'),sb=document.getElementById('flowStopBtn');
  if(rb)rb.style.display='inline-flex';if(sb)sb.style.display='none';
  flowRenderCanvas();showToast('Stopped','Workflow execution stopped.','info');
}

function flowLoadTemplate(id){
  const t=FLOW_TEMPLATES.find(x=>x.id===id);if(!t)return;
  S.flow.nodes=[];S.flow.connections=[];S.flow.selectedId=null;S.flow.selectedConnId=null;
  let x=60,y=140;const created=[];
  t.chain.forEach(type=>{
    const def=flowGetDef(type),cat=flowCatOf(type),id2='n'+(S.flow.nextId++);
    created.push({id:id2,def});
    S.flow.nodes.push({id:id2,type,category:cat.name||'',title:def.title,desc:def.desc,x,y,inputs:def.inputs||[],outputs:def.outputs||[],settings:flowDefaultSettings(),data:flowDefaultData(type),status:'idle'});
    x+=240;
  });
  for(let i=0;i<created.length-1;i++){
    const a=created[i],b=created[i+1],outPort=a.def.outputs&&a.def.outputs[0],inPort=b.def.inputs&&b.def.inputs[0];
    if(outPort&&inPort)S.flow.connections.push({id:'c'+(S.flow.nextId++),fromNode:a.id,fromPort:outPort,toNode:b.id,toPort:inPort});
  }
  S.flow.pan={x:40,y:40};S.flow.zoom=0.85;flowPushHistory();renderPage();
  showToast('Template Loaded',`"${t.name}" workflow loaded.`,'success');
}

const FLOW_API_BASE='http://localhost:5001';
async function geminiGenerate(prompt){
  const res=await fetch(`${FLOW_API_BASE}/api/workflow/gemini`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
  const data=await res.json().catch(()=>({}));
  if(!res.ok)throw new Error(data.error||`Gemini HTTP ${res.status}`);
  if(!data.text?.trim())throw new Error('Gemini returned no text.');
  return data.text;
}
function sendToAIVideo({prompt,masterPrompt,imageUrl,aspectRatio}){
  const p=(masterPrompt||prompt||'').trim();
  if(!p){showToast('Prompt Required','Tidak ada prompt video untuk dikirim.','warning');return;}
  S.videoPrompt=p;
  S.refImages=imageUrl?[resolveMediaUrl(imageUrl),null,null,null]:[null,null,null,null];
  S.videoGenState='empty';
  navTo('ai-video');
  showToast('Sent to AI Video','Prompt dimuat ke AI Video.','info');
}
function aiFormOutput(text,id,filename,sendAction,saveAction){
  return `<div class="wf-output-area"><textarea class="form-textarea" id="${id}" rows="14" readonly style="font-size:12.5px;line-height:1.8">${esc(text||'')}</textarea><div class="wf-output-actions"><button class="btn-wf-small gold" data-action="ai-copy" data-target="${id}"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="ai-download" data-target="${id}" data-filename="${esc(filename)}"><i data-lucide="download"></i> Download</button>${saveAction?`<button class="btn-wf-small" data-action="${saveAction}"><i data-lucide="save"></i> Save Prompt</button>`:''}${sendAction?`<button class="btn-wf-small" data-action="${sendAction}"><i data-lucide="send"></i> Send to AI Video</button>`:''}</div></div>`;
}
function savePromptToLibrary(title,text){
  const body=(text||'').trim();
  if(!body){showToast('Nothing to Save','Prompt kosong.','warning');return;}
  S.prompts.unshift({id:genId(),category:'commercial',title,prompt:body,count:0});
  showToast('Saved to Library',`"${title}" added to Prompt Library.`,'success');
}
function resolveMediaUrl(url){
  if(!url)return'';
  if(url.startsWith('data:')||url.startsWith('http://')||url.startsWith('https://'))return url;
  if(url.startsWith('/'))return `${FLOW_API_BASE}${url}`;
  return url;
}

function hasProvider(key){return Boolean(S.runtimeProviders?.[key]);}
function preferredProvider(menu){
  const choices={
    video:[['falKey','Fal.ai'],['googleVeoKey','Google Veo'],['ninerouterKey','9Router'],['klingKey','Kling'],['runwayKey','Runway'],['pikaKey','Pika'],['hailuoKey','Hailuo'],['openaiKey','OpenAI']],
    image:[['geminiKey','gemini'],['ninerouterKey','9router'],['huggingfaceKey','huggingface-flux'],['openaiKey','chatgpt']],
    affiliate:[['geminiKey','gemini'],['ninerouterKey','9router'],['huggingfaceKey','huggingface-flux'],['openaiKey','chatgpt'],['falKey','fal-ai'],['pixazoKey','pixazo']],
    workflow:[['geminiKey','Gemini (Google AI Studio)'],['falKey','Fal.ai (LTX Video)'],['pixazoKey','Pixazo'],['json2videoKey','JSON2Video']]
  };
  return (choices[menu]||[]).find(([key])=>hasProvider(key))?.[1]||'';
}
function applyProviderDefaults(){
  const video=preferredProvider('video');
  const image=preferredProvider('image');
  if(video&&!isProviderConfigured(S.videoProvider))S.videoProvider=video;
  if(image){
    if(!S.afData.provider||!isProviderConfigured(S.afData.provider))S.afData.provider=image;
    if(!S.wfData.provider||!isProviderConfigured(S.wfData.provider))S.wfData.provider=image;
  }
}

function flowGetNodeApiKey(n){
  const provider=(n.settings?.provider||'').toLowerCase();
  if(provider.includes('gemini'))return S.settings.geminiKey;
  if(provider.includes('fal.ai'))return S.settings.falKey;
  if(provider.includes('pixazo'))return S.settings.pixazoKey;
  if(provider.includes('json2video'))return S.settings.json2videoKey;
  return '';
}
function flowGetProviderConfigKey(provider){
  return providerKey(provider);
}
function flowBuildInputResult(n){
  if(!n?.data)return null;
  if(n.type==='upload-image'&&n.data.image)return{type:'image',imageUrl:n.data.image};
  if(n.type==='upload-video'&&n.data.video)return{type:'video',videoUrl:n.data.video};
  if(n.type==='product'&&n.data.productId){
    const p=S.products.find(x=>x.id===n.data.productId);
    if(p)return{type:'image',imageUrl:p.thumbnail};
  }
  if(n.type==='url'&&n.data.url)return{type:'text',text:n.data.url};
  if(n.type==='folder'&&n.data.files?.length)return{type:'batch',files:n.data.files};
  return null;
}
function flowNodeOutput(node){
  if(!node?.data)return null;
  const r=node.data.result;
  if(r&&!r.error)return r;
  return flowBuildInputResult(node)||r||null;
}
function flowUpstreamResult(nodeId,toPort){
  const conn=toPort
    ?S.flow.connections.find(c=>c.toNode===nodeId&&c.toPort===toPort)
    :S.flow.connections.find(c=>c.toNode===nodeId);
  if(!conn)return null;
  const fromNode=S.flow.nodes.find(n=>n.id===conn.fromNode);
  return fromNode?flowNodeOutput(fromNode):null;
}
function flowPickUpstream(nodeId){
  const any=flowUpstreamResult(nodeId);
  const image=flowUpstreamResult(nodeId,'image')||(any?.type==='image'?any:null);
  const prompt=flowUpstreamResult(nodeId,'prompt')||flowUpstreamResult(nodeId,'storyboard')||(any?.type==='text'?any:null);
  return{any,image,prompt,text:(prompt?.text||any?.text||'')};
}
function flowExecuteInputNode(n){
  n.data=n.data||{};
  const built=flowBuildInputResult(n);
  if(!built){n.data.result={error:'Input belum diisi.'};return false;}
  n.data.result=built;
  return true;
}
async function flowPollVideoJob(jobId){
  while(S.flow.running){
    await new Promise(r=>setTimeout(r,1500));
    const st=await fetch(`${FLOW_API_BASE}/api/status/${jobId}`);
    const sd=await st.json().catch(()=>({}));
    if(!st.ok)throw new Error(sd.error||`Status HTTP ${st.status}`);
    if(sd.status==='completed')return `${FLOW_API_BASE}/api/video/${jobId}`;
    if(sd.status==='failed')throw new Error(sd.error||'Video generation failed');
  }
  throw new Error('Workflow dihentikan.');
}
async function flowGenerateVideo(prompt,images,aspectRatio){
  const res=await fetch(`${FLOW_API_BASE}/api/generate`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({prompt,aspect_ratio:aspectRatio||'16:9',playbook:'flat-motion-graphics',images:(images||[]).filter(Boolean)})
  });
  const data=await res.json().catch(()=>({}));
  if(!res.ok)throw new Error(data.error||'Gagal memulai generate video.');
  return flowPollVideoJob(data.job_id);
}
function flowGeminiPromptForNode(n,upstream){
  const base=n.settings?.prompt?.trim();
  if(base)return base;
  const ctx=upstream.text||'';
  if(n.type==='prompt-generator')return `Generate a concise, production-ready video prompt based on this context:\n${ctx||'product image'}`;
  if(n.type==='prompt-enhancer')return `Enhance this video prompt with cinematic detail:\n${ctx}`;
  if(n.type==='image-analysis')return `Analyze this product/scene for video production. Return product type, mood, lighting, and camera suggestions.\n${ctx}`;
  if(n.type==='storyboard')return `Create a shot-by-shot storyboard for:\n${ctx||'product video'}`;
  if(n.type==='caption-generator')return `Write short social captions for:\n${ctx}`;
  return ctx||n.desc||'Process this workflow input.';
}
function flowNodeResultPreview(n){
  const r=n.data?.result;if(!r)return'';
  if(r.error)return `<div style="font-size:10.5px;color:#f87171;margin-top:8px">⚠ ${esc(r.error)}</div>`;
  if(r.type==='text')return `<div style="font-size:10.5px;color:var(--text-secondary);margin-top:8px;max-height:60px;overflow:hidden">${esc((r.text||'').slice(0,140))}${(r.text||'').length>140?'…':''}</div>`;
  if(r.type==='image'&&r.imageUrl)return `<img src="${esc(r.imageUrl)}" style="width:100%;border-radius:8px;margin-top:8px;max-height:80px;object-fit:cover">`;
  if(r.type==='video'&&r.videoUrl)return `<div style="font-size:10.5px;color:var(--primary);margin-top:8px;word-break:break-all">🎬 ${esc(r.videoUrl)}</div>`;
  if(r.type==='json')return `<div style="font-size:10.5px;color:var(--primary);margin-top:8px">✓ Job terkirim ke JSON2Video</div>`;
  if(r.type==='simulated')return `<div style="font-size:10.5px;color:var(--text-muted);margin-top:8px">Simulasi (provider ini belum terhubung ke API nyata)</div>`;
  return'';
}

async function flowExecuteNode(n){
  const provider=(n.settings?.provider||'').toLowerCase();
  const upstream=flowPickUpstream(n.id);
  n.data=n.data||{};

  if(n.category==='Output'){
    const up=upstream.any||upstream.image||upstream.prompt;
    if(!up||up.error){n.data.result={error:'Tidak ada input dari node sebelumnya.'};return false;}
    if(provider.includes('json2video')){
      if(!isProviderConfigured(n.settings?.provider)){n.data.result={error:'JSON2Video belum aktif di backend.'};return false;}
      try{
        const scenes=[{elements:[
          ...(upstream.image?.imageUrl?[{type:'image',url:resolveMediaUrl(upstream.image.imageUrl)}]:[]),
          {type:'text',text:n.settings?.prompt||upstream.text||'Selamat Datang!'}
        ]}];
        const res=await fetch(`${FLOW_API_BASE}/api/workflow/json2video`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scenes})});
        const data=await res.json();
        if(!data.success)throw new Error(data.error||'JSON2Video gagal');
        n.data.result={type:'json',raw:data.raw};return true;
      }catch(err){n.data.result={error:err.message};return false;}
    }
    n.data.result={...up};
    return true;
  }

  if(n.category==='Video'){
    const pr=(n.settings?.prompt||upstream.text||'').trim();
    if(!pr){n.data.result={error:'Prompt diperlukan untuk generate video.'};return false;}
    if(provider.includes('fal.ai')){n.data.result={error:'Fal.ai video belum tersedia di Workflow Builder. Gunakan node Video dengan OpenMontage (kosongkan provider) atau node Image + Fal.ai.'};return false;}
    try{
      const images=upstream.image?.imageUrl?[upstream.image.imageUrl]:[];
      const aspect=n.settings?.aspectRatio||'16:9';
      const videoUrl=await flowGenerateVideo(pr,images,aspect);
      n.data.result={type:'video',videoUrl,...upstream.image?.imageUrl?{imageUrl:upstream.image.imageUrl}:{}};
      return true;
    }catch(err){n.data.result={error:err.message};return false;}
  }

  if(n.category==='Image'){
    const pr=(n.settings?.prompt||upstream.text||n.desc||'').trim();
    if(!pr){n.data.result={error:'Prompt diperlukan untuk generate image.'};return false;}
    if(provider.includes('fal.ai')||(!provider&&hasProvider('falKey'))){
      if(!isProviderConfigured('Fal.ai')){n.data.result={error:'Fal.ai belum aktif di backend.'};return false;}
      try{
        const res=await fetch(`${FLOW_API_BASE}/api/workflow/fal-image`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:pr})});
        const data=await res.json();
        if(!data.success)throw new Error(data.error||'Fal.ai gagal');
        n.data.result={type:'image',imageUrl:data.imageUrl,text:pr};return true;
      }catch(err){n.data.result={error:err.message};return false;}
    }
    if(provider.includes('pixazo')||(!provider&&hasProvider('pixazoKey'))){
      if(!isProviderConfigured('Pixazo')){n.data.result={error:'Pixazo belum aktif di backend.'};return false;}
      try{
        const res=await fetch(`${FLOW_API_BASE}/api/workflow/pixazo-image`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:pr})});
        const text=await res.text();
        let data={};try{data=text?JSON.parse(text):{}}catch{data={success:false,error:`Pixazo endpoint returned non-JSON response: ${text.slice(0,300)}`}}
        if(!res.ok||!data.success)throw new Error(data.error||`Pixazo HTTP ${res.status}`);
        n.data.result={type:'image',imageUrl:data.imageUrl,text:pr};return true;
      }catch(err){n.data.result={error:err.message};return false;}
    }
    n.data.result={error:`Provider image ${n.settings?.provider||'ini'} belum didukung di workflow.`};return false;
  }

  if(n.category==='AI'){
    if(!isProviderConfigured('Gemini (Google AI Studio)')){n.data.result={error:'Gemini belum aktif di backend.'};return false;}
    const prompt=flowGeminiPromptForNode(n,upstream);
    if(!prompt.trim()){n.data.result={error:'Prompt diperlukan.'};return false;}
    try{
      const res=await fetch(`${FLOW_API_BASE}/api/workflow/gemini`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
      const data=await res.json();
      if(!data.success)throw new Error(data.error||'Gemini gagal');
      n.data.result={type:'text',text:data.text,...upstream.image?.imageUrl?{imageUrl:upstream.image.imageUrl}:{}};
      return true;
    }catch(err){n.data.result={error:err.message};return false;}
  }

  if(provider.includes('gemini')){
    if(!isProviderConfigured(n.settings?.provider)){n.data.result={error:`Provider ${n.settings?.provider||'ini'} belum aktif di backend.`};return false;}
    const prompt=(n.settings?.prompt||upstream.text||n.desc||'').trim();
    if(!prompt){n.data.result={error:'Prompt diperlukan.'};return false;}
    try{
      const res=await fetch(`${FLOW_API_BASE}/api/workflow/gemini`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
      const data=await res.json();
      if(!data.success)throw new Error(data.error||'Gemini gagal');
      n.data.result={type:'text',text:data.text,...upstream.image?.imageUrl?{imageUrl:upstream.image.imageUrl}:{}};
      return true;
    }catch(err){n.data.result={error:err.message};return false;}
  }
  if(provider.includes('fal.ai')){
    n.data.result={error:'Fal.ai video (/api/workflow/fal-video) tidak tersedia. Gunakan node Image + /api/workflow/fal-image.'};
    return false;
  }
  if(provider.includes('pixazo')){
    if(!isProviderConfigured(n.settings?.provider)){n.data.result={error:`Provider ${n.settings?.provider} belum aktif di backend.`};return false;}
    const pr=(n.settings?.prompt||upstream.text||'').trim();
    if(!pr){n.data.result={error:'Prompt diperlukan.'};return false;}
    try{
      const res=await fetch(`${FLOW_API_BASE}/api/workflow/pixazo-image`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:pr})});
      const text=await res.text();
      let data={};try{data=text?JSON.parse(text):{}}catch{data={success:false,error:`Pixazo endpoint returned non-JSON response: ${text.slice(0,300)}`}}
      if(!res.ok||!data.success)throw new Error(data.error||`Pixazo HTTP ${res.status}`);
      n.data.result={type:'image',imageUrl:data.imageUrl,text:pr};return true;
    }catch(err){n.data.result={error:err.message};return false;}
  }
  if(provider.includes('json2video')){
    if(!isProviderConfigured(n.settings?.provider)){n.data.result={error:`Provider ${n.settings?.provider} belum aktif di backend.`};return false;}
    try{
      const scenes=[{elements:[
        ...(upstream.image?.imageUrl?[{type:'image',url:resolveMediaUrl(upstream.image.imageUrl)}]:[]),
        {type:'text',text:n.settings?.prompt||upstream.text||'Selamat Datang!'}
      ]}];
      const res=await fetch(`${FLOW_API_BASE}/api/workflow/json2video`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({scenes})});
      const data=await res.json();
      if(!data.success)throw new Error(data.error||'JSON2Video gagal');
      n.data.result={type:'json',raw:data.raw};return true;
    }catch(err){n.data.result={error:err.message};return false;}
  }

  n.data.result={error:`Node "${n.title}" tidak memiliki provider atau kategori yang didukung.`};
  return false;
}

function bindFlowEvents(){
  document.removeEventListener('keydown',flowKeyHandler);
  const search=document.getElementById('flowSearchInput');
  if(search)search.addEventListener('input',e=>{
    S.flow.search=e.target.value;const sb=document.querySelector('.flow-sidebar');
    if(sb){sb.outerHTML=flowRenderSidebar();const body=document.querySelector('.flow-body');if(body)lucide.createIcons({nodes:[body]});}
  });
  const canvas=document.getElementById('flowCanvas');
  if(canvas){
    canvas.addEventListener('mousedown',e=>{
      const portOut=e.target.closest('.flow-port-out'),header=e.target.closest('.flow-node-header'),connEl=e.target.closest('.flow-conn'),nodeEl=e.target.closest('.flow-node');
      if(portOut)flowStartConnDrag(e,portOut.dataset.nodeId,portOut.dataset.port);
      else if(header)flowStartNodeDrag(e,nodeEl.dataset.nodeId);
      else if(connEl){S.flow.selectedConnId=connEl.dataset.connId;S.flow.selectedId=null;flowRedrawConnections();flowRenderPropsInto();}
      else if(nodeEl){S.flow.selectedId=nodeEl.dataset.nodeId;S.flow.selectedConnId=null;document.querySelectorAll('.flow-node').forEach(el=>el.classList.remove('selected'));nodeEl.classList.add('selected');flowRenderPropsInto();}
      else flowStartPan(e);
    });
    canvas.addEventListener('wheel',flowHandleWheel,{passive:false});
  }
  document.addEventListener('keydown',flowKeyHandler);
  flowRenderCanvas();
  flowBindPropsEvents();
}
function flowKeyHandler(e){
  if(S.currentPage!=='workflow')return;
  const tag=(e.target.tagName||'').toLowerCase();if(tag==='input'||tag==='textarea')return;
  if(e.key==='Delete'||e.key==='Backspace'){
    if(S.flow.selectedId){S.flow.nodes=S.flow.nodes.filter(n=>n.id!==S.flow.selectedId);S.flow.connections=S.flow.connections.filter(c=>c.fromNode!==S.flow.selectedId&&c.toNode!==S.flow.selectedId);S.flow.selectedId=null;flowPushHistory();flowRenderCanvas();flowRenderPropsInto();}
    else if(S.flow.selectedConnId){S.flow.connections=S.flow.connections.filter(c=>c.id!==S.flow.selectedConnId);S.flow.selectedConnId=null;flowPushHistory();flowRedrawConnections();}
  }
  if(e.ctrlKey&&e.key.toLowerCase()==='z'){e.preventDefault();flowUndo();}
  if(e.ctrlKey&&e.key.toLowerCase()==='y'){e.preventDefault();flowRedo();}
}
    /* ============================================
       AI VIDEO
       ============================================ */
    function pgAIVideo(){return `<div class="animate-fade-in"><h1 class="page-title">AI Video</h1><p class="page-subtitle">Generate professional videos using multiple AI providers.</p>
      <div class="video-layout"><div class="video-panel-left">
        <div class="form-group"><label class="form-label">Reference Images</label><div class="ref-images-grid" id="refImagesGrid">${[0,1,2,3].map(i=>S.refImages[i]?`<div class="ref-image-slot has-image" data-slot="${i}"><img src="${S.refImages[i]}"><button class="remove-img" data-action="remove-ref" data-slot="${i}"><i data-lucide="x"></i></button></div>`:`<div class="ref-image-slot" data-slot="${i}" data-action="browse-ref"><div class="slot-placeholder"><i data-lucide="plus"></i><span>Add Image</span></div></div>`).join('')}</div><input type="file" id="refFileInput" accept="image/*" multiple style="display:none"></div>
        <div class="form-group"><label class="form-label">Provider</label><select class="form-select" id="videoProvider">${VPROVIDERS.map(p=>providerOptionHTML(p,p,S.videoProvider||'')).join('')}</select></div>
        ${renderPromptSelector('ai-video','videoPromptTemplate','videoPrompt','videoPromptIndicator')}
        <div class="form-group"><label class="form-label">Prompt</label><textarea class="form-textarea" id="videoPrompt" rows="4" data-prompt-textarea placeholder="Describe the video...">${S.videoPrompt||''}</textarea></div>
        <div class="form-group"><label class="form-label">Negative Prompt</label><textarea class="form-textarea" id="videoNegPrompt" rows="2" placeholder="What to avoid..."></textarea></div>
        <div class="form-group"><label class="form-label">Aspect Ratio</label><div class="btn-group" id="aspectGroup"><button class="btn-group-item active" data-value="16:9">16:9</button><button class="btn-group-item" data-value="9:16">9:16</button><button class="btn-group-item" data-value="1:1">1:1</button></div></div>
        <div class="form-group"><label class="form-label">Resolution</label><div class="btn-group" id="resolutionGroup"><button class="btn-group-item" data-value="720p">720P</button><button class="btn-group-item active" data-value="1080p">1080P</button><button class="btn-group-item" data-value="4k">4K</button></div></div>
        <div class="form-group"><label class="form-label">Duration</label><div class="btn-group" id="durationGroup"><button class="btn-group-item active" data-value="5">5s</button><button class="btn-group-item" data-value="8">8s</button><button class="btn-group-item" data-value="10">10s</button></div></div>
        <div class="form-group"><label class="form-label">Motion Strength</label><div class="slider-container"><input type="range" min="0" max="100" value="65" id="motionSlider"><span class="slider-value" id="motionValue">65</span></div></div>
        <div class="form-group"><label class="form-label">Camera Style</label><select class="form-select" id="cameraStyle">${CAMSTYLES.map(s=>`<option>${s}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Creativity</label><div class="slider-container"><input type="range" min="0" max="100" value="70" id="creativitySlider"><span class="slider-value" id="creativityValue">70</span></div></div>
        <div class="form-group"><label class="form-label">Seed</label><input type="number" class="form-input" id="videoSeed" placeholder="Random" min="0"></div>
        <button class="btn-generate ripple-container ${S.videoGenState==='generating'?'generating':''}" id="generateVideoBtn">${S.videoGenState==='generating'?'<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(0,0,0,0.2);border-top-color:#000;border-radius:50%;animation:spin 0.8s linear infinite"></span> Generating...':'<i data-lucide="sparkles"></i> Generate Video'}</button>
      </div><div class="video-panel-right"><div class="video-preview-area" id="videoPreviewArea">${rVP()}</div></div></div></div>`}
    function rVP(){if(S.videoGenState==='empty')return `<div class="video-preview-empty"><div class="empty-icon">&#127916;</div><div class="empty-title">No Preview Yet</div><div class="empty-desc">Configure settings and click Generate</div></div>`;if(S.videoGenState==='generating')return `<div class="video-progress-container animate-fade-in-scale"><div class="video-progress-spinner"></div><div class="video-progress-status">${S.videoGenStage}</div><div class="video-progress-sub">Please wait...</div><div class="video-progress-bar-track"><div class="video-progress-bar-fill" style="width:${S.videoGenProgress}%"></div></div><div class="video-progress-percent">${S.videoGenProgress}%</div></div>`;if(S.videoGenState==='finished')return `<div class="video-finished-container animate-fade-in-scale"><div class="video-finished-preview" style="background:#000;display:flex;align-items:center;justify-content:center"><video src="${S.videoUrl}" controls style="max-width:100%;max-height:100%;border-radius:8px;"></video></div><h3 style="font-size:18px;font-weight:700;margin-bottom:6px;margin-top:12px;">Video Finished</h3><p style="font-size:13px;color:var(--text-muted);margin-bottom:20px">Generated successfully</p><div class="video-finished-actions"><a href="${S.videoUrl}" download class="btn-action primary ripple-container" style="text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px"><i data-lucide="download"></i> Download</a><button class="btn-action ripple-container" data-action="regenerate-video"><i data-lucide="refresh-cw"></i> Regenerate</button></div></div>`;return ''}

    let vgI=null;
    async function startVG(){
      const pr=document.getElementById('videoPrompt')?.value?.trim();
      const provider=document.getElementById('videoProvider')?.value;
      const aspectBtn=document.querySelector('#aspectGroup .btn-group-item.active');
      const aspect_ratio=aspectBtn?aspectBtn.getAttribute('data-value'):'16:9';
      const finalRatio=(aspect_ratio==='9:16')?'9:16':'16:9';
      const playbook='flat-motion-graphics'; // default playbook
      const images=S.refImages.filter(x=>x!==null); // Collect non-null reference images

      S.videoGenState='generating';
      S.videoGenProgress=0;
      S.videoGenStage='Connecting to API...';

      const pa=document.getElementById('videoPreviewArea');
      const gb=document.getElementById('generateVideoBtn');

      if(pa)pa.innerHTML=rVP();
      if(gb){
        gb.classList.add('generating');
        gb.innerHTML='<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(0,0,0,0.2);border-top-color:#000;border-radius:50%;animation:spin 0.8s linear infinite"></span> Generating...';
      }
      lucide.createIcons({nodes:[pa]});

      try {
        const response = await fetch('http://localhost:5001/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: pr, aspect_ratio: finalRatio, playbook, images })
        });
        const data = await response.json();
        if (response.ok) {
          S.videoGenStage = 'Rendering frames...';
          pollVGStatus(data.job_id);
        } else {
          throw new Error(data.error || 'Failed to start generation');
        }
      } catch (error) {
        showToast('Error', error.message, 'error');
        S.videoGenState='empty';
        if(pa)pa.innerHTML=rVP();
        if(gb){
          gb.classList.remove('generating');
          gb.innerHTML='<i data-lucide="sparkles"></i> Generate Video';
          lucide.createIcons({nodes:[gb]});
        }
      }
    }

    function pollVGStatus(jobId) {
      clearInterval(vgI);
      vgI = setInterval(async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/status/${jobId}`);
          if (!response.ok) throw new Error('Failed to fetch status');
          const data = await response.json();

          const pa=document.getElementById('videoPreviewArea');

          if (data.status === 'running') {
            S.videoGenProgress = data.progress;
            let displayStage = `Rendering frames (${data.progress}% complete)`;
            if (data.stage === 'bundling') {
              displayStage = `Bundling assets (${data.progress}%)`;
            } else if (data.stage === 'rendering') {
              displayStage = `Rendering frames (${data.progress}% complete)`;
            } else if (data.stage === 'encoding') {
              displayStage = `Encoding video (${data.progress}%)`;
            } else if (data.stage) {
              displayStage = `${data.stage.charAt(0).toUpperCase() + data.stage.slice(1)} (${data.progress}%)`;
            }
            S.videoGenStage = displayStage;
            const s=pa?.querySelector('.video-progress-status');
            const f=pa?.querySelector('.video-progress-bar-fill');
            const pc=pa?.querySelector('.video-progress-percent');
            if(s)s.textContent=S.videoGenStage;
            if(f)f.style.width=S.videoGenProgress+'%';
            if(pc)pc.textContent=Math.round(S.videoGenProgress)+'%';
          } else if (data.status === 'completed') {
            clearInterval(vgI);
            S.videoGenProgress = 100;
            S.videoUrl = `http://localhost:5001/api/video/${jobId}`;
            finishVG();
          } else if (data.status === 'failed') {
            clearInterval(vgI);
            showToast('Generation Failed', data.error || 'Unknown error', 'error');
            S.videoGenState='empty';
            if(pa)pa.innerHTML=rVP();
            const gb=document.getElementById('generateVideoBtn');
            if(gb){
              gb.classList.remove('generating');
              gb.innerHTML='<i data-lucide="sparkles"></i> Generate Video';
              lucide.createIcons({nodes:[gb]});
            }
          }
        } catch (error) {
          console.error('Error polling video status:', error);
        }
      }, 1500);
    }

    function finishVG(){S.videoGenState='finished';S.credits-=50;document.getElementById('creditsCount').textContent=fmtN(S.credits);const pr=document.getElementById('videoPrompt')?.value||'Generated video';S.history.unshift({id:genId(),type:'video',date:new Date().toISOString().slice(0,16).replace('T',' '),provider:document.getElementById('videoProvider')?.value||'OpenMontage',prompt:pr,thumbnail:`https://picsum.photos/seed/vid${Date.now()}/400/225`,project:WORKSPACES.find(p=>p.id===S.currentProject)?.name||'TARMOC Product'});const pa=document.getElementById('videoPreviewArea'),gb=document.getElementById('generateVideoBtn');if(pa){pa.innerHTML=rVP();lucide.createIcons({nodes:[pa]});}if(gb){gb.classList.remove('generating');gb.innerHTML='<i data-lucide="sparkles"></i> Generate Video';lucide.createIcons({nodes:[gb]});}showToast('Video Generated','Your video is ready.','success')}

    /* ============================================
       AI IMAGE — PARENT HUB
       ============================================ */
    function pgAIImage(){
      const items=AI_IMAGE_CHILDREN.filter(c=>canAccessMenu(c.id));
      return `<div class="animate-fade-in"><h1 class="page-title">AI Image</h1><p class="page-subtitle">Pusat alat visual dan konten — pilih submenu di bawah atau dari sidebar.</p>
        <div class="ai-image-hub-grid">${items.map((c,i)=>`<div class="ai-hub-card animate-fade-in-up delay-${Math.min(i+1,8)}" data-action="navigate" data-page="${c.id}"><div class="ai-hub-icon"><i data-lucide="${c.icon}"></i></div><div class="ai-hub-title">${esc(c.label)}</div><div class="ai-hub-desc">${esc(c.desc)}</div><div class="ai-hub-arrow"><i data-lucide="arrow-right"></i></div></div>`).join('')}</div></div>`;
    }

    function pgAIAcademy(){
      const d=S.academyData;
      const master=acGetMaster(d.masterId);
      const masterOpts=ACADEMY_MASTERS.map(m=>`<option value="${m.id}" ${d.masterId===m.id?'selected':''}>${esc(m.name)}</option>`).join('');
      const audienceOpts=['Pemula','Menengah','Advanced','Profesional'].map(a=>`<option ${d.targetAudience===a?'selected':''}>${a}</option>`).join('');
      const durationOpts=[30,45,60,90,120].map(sec=>`<option value="${sec}" ${d.durationSec===sec?'selected':''}>${sec} detik</option>`).join('');
      const sceneOpts=[4,5,6,7,8,9,10].map(n=>`<option value="${n}" ${d.sceneCount===n?'selected':''}>${n}</option>`).join('');
      if(d.loading)return `<div class="animate-fade-in"><h1 class="page-title">AI Academy</h1><p class="page-subtitle">Dynamic episode & scene generator — unique video prompt per scene.</p><div class="workflow-container"><div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">${d.loadingSceneId?`Regenerating Scene ${String(d.loadingSceneId).padStart(2,'0')}...`:'Generating academy episode & scenes...'}</div></div></div></div></div>`;
      return `<div class="animate-fade-in"><h1 class="page-title">AI Academy</h1><p class="page-subtitle">Dynamic episode & scene generator — unique video prompt per scene.</p>
        <div class="workflow-container">
          <div class="wf-step-card">
            <div class="form-group"><label class="form-label">Master Template</label><select class="form-select" id="acMaster">${masterOpts}</select><div class="ac-master-hint">${esc(master.rules.format)} · ${esc(master.rules.presenter)} · ${esc(master.rules.environment)}</div></div>
            <div class="form-group"><label class="form-label">Judul Episode</label><input type="text" class="form-input" id="acTitle" value="${esc(d.title)}" placeholder="SC/APC vs SC/UPC"></div>
            <div class="form-group"><label class="form-label">Materi Pembelajaran</label><textarea class="form-textarea" id="acMaterial" rows="8" placeholder="Masukkan materi pembelajaran di sini...">${esc(d.material)}</textarea></div>
            <div class="ac-form-row">
              <div class="form-group"><label class="form-label">Target Audience</label><select class="form-select" id="acAudience">${audienceOpts}</select></div>
              <div class="form-group"><label class="form-label">Durasi</label><select class="form-select" id="acDuration">${durationOpts}</select></div>
              <div class="form-group"><label class="form-label">Jumlah Scene</label><select class="form-select" id="acSceneCount">${sceneOpts}</select></div>
            </div>
            <button class="btn-wf next ripple-container" data-action="ac-generate" style="width:100%;justify-content:center;margin-top:8px"><i data-lucide="sparkles"></i> Generate Academy</button>
            ${d.error?`<div class="ac-error-banner">${esc(d.error)}</div>`:''}
          </div>
          ${d.episode?acRenderEpisodeOutput(d.episode):''}
        </div></div>`;
    }

    function pgStoryboard(){
      const d=S.storyboardData;
      if(d.loading)return `<div class="animate-fade-in"><h1 class="page-title">Storyboard</h1><p class="page-subtitle">Buat storyboard visual scene-by-scene.</p><div class="workflow-container"><div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">Generating storyboard...</div></div></div></div></div>`;
      return `<div class="animate-fade-in"><h1 class="page-title">Storyboard</h1><p class="page-subtitle">Buat storyboard visual scene-by-scene.</p>
        <div class="workflow-container"><div class="wf-step-card">
          <div class="wf-main-grid"><div class="wf-column">
            <div class="form-group"><label class="form-label">Project Title</label><input type="text" class="form-input" id="sbTitle" value="${esc(d.title)}"></div>
            <div class="form-group"><label class="form-label">Product / Subject</label><input type="text" class="form-input" id="sbSubject" value="${esc(d.subject)}"></div>
            <div class="form-group"><label class="form-label">Concept</label><textarea class="form-textarea" id="sbConcept" rows="3">${esc(d.concept)}</textarea></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div class="form-group"><label class="form-label">Duration</label><input type="text" class="form-input" id="sbDuration" value="${esc(d.duration)}"></div>
              <div class="form-group"><label class="form-label">Aspect Ratio</label><select class="form-select" id="sbAspect"><option ${d.aspectRatio==='16:9'?'selected':''}>16:9</option><option ${d.aspectRatio==='9:16'?'selected':''}>9:16</option><option ${d.aspectRatio==='1:1'?'selected':''}>1:1</option></select></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div class="form-group"><label class="form-label">Number of Scenes</label><input type="number" class="form-input" id="sbScenes" min="2" max="12" value="${d.scenes}"></div>
              <div class="form-group"><label class="form-label">Visual Style</label><input type="text" class="form-input" id="sbStyle" value="${esc(d.visualStyle)}"></div>
            </div>
            <button class="btn-wf next ripple-container" data-action="sb-generate"><i data-lucide="sparkles"></i> Generate Storyboard</button>
            ${d.error?`<div style="margin-top:12px;padding:12px;border-radius:var(--radius-xs);background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#dc2626;font-size:13px">${esc(d.error)}</div>`:''}
          </div>
          <div class="wf-column">${d.result?aiFormOutput(d.result,'sbOutput','storyboard.txt','sb-send-video','sb-save-prompt'):'<div class="empty-state"><p style="color:var(--text-muted)">Storyboard akan muncul setelah generate.</p></div>'}</div>
          </div>
        </div></div></div>`;
    }

    function pgAIPodcast(){
      const d=S.podcastData;
      if(d.loading)return `<div class="animate-fade-in"><h1 class="page-title">AI Podcast</h1><p class="page-subtitle">Buat script podcast profesional dengan AI.</p><div class="workflow-container"><div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">Generating podcast script...</div></div></div></div></div>`;
      return `<div class="animate-fade-in"><h1 class="page-title">AI Podcast</h1><p class="page-subtitle">Buat script podcast profesional dengan AI.</p>
        <div class="workflow-container"><div class="wf-step-card">
          <div class="wf-main-grid"><div class="wf-column">
            <div class="form-group"><label class="form-label">Podcast Title</label><input type="text" class="form-input" id="pcTitle" value="${esc(d.title)}"></div>
            <div class="form-group"><label class="form-label">Topic</label><input type="text" class="form-input" id="pcTopic" value="${esc(d.topic)}"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div class="form-group"><label class="form-label">Host</label><input type="text" class="form-input" id="pcHost" value="${esc(d.host)}"></div>
              <div class="form-group"><label class="form-label">Guest</label><input type="text" class="form-input" id="pcGuest" value="${esc(d.guest)}"></div>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div class="form-group"><label class="form-label">Duration</label><input type="text" class="form-input" id="pcDuration" value="${esc(d.duration)}"></div>
              <div class="form-group"><label class="form-label">Tone</label><input type="text" class="form-input" id="pcTone" value="${esc(d.tone)}"></div>
            </div>
            <div class="form-group"><label class="form-label">Language</label><input type="text" class="form-input" id="pcLanguage" value="${esc(d.language)}"></div>
            <div class="form-group"><label class="form-label">Target Audience</label><input type="text" class="form-input" id="pcAudience" value="${esc(d.audience)}"></div>
            <div class="form-group"><label class="form-label">Brief</label><textarea class="form-textarea" id="pcBrief" rows="3">${esc(d.brief)}</textarea></div>
            <button class="btn-wf next ripple-container" data-action="pc-generate"><i data-lucide="sparkles"></i> Generate Podcast</button>
            ${d.error?`<div style="margin-top:12px;padding:12px;border-radius:var(--radius-xs);background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#dc2626;font-size:13px">${esc(d.error)}</div>`:''}
          </div>
          <div class="wf-column">${d.result?aiFormOutput(d.result,'pcOutput','ai-podcast.txt','pc-send-video','pc-save-prompt'):'<div class="empty-state"><p style="color:var(--text-muted)">Script podcast akan muncul setelah generate.</p></div>'}</div>
          </div>
        </div></div></div>`;
    }

    function pgAICharacter(){
      const d=S.characterData;
      if(d.loading)return `<div class="animate-fade-in"><h1 class="page-title">AI Character</h1><p class="page-subtitle">Buat karakter AI reusable untuk image & video.</p><div class="workflow-container"><div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">Generating character...</div></div></div></div></div>`;
      const preview=d.previewUrl?`<img src="${resolveMediaUrl(d.previewUrl)}" class="wf-preview-img" alt="Character preview">`:'';
      const attrs=d.result?`<div class="wf-analysis-grid" style="margin-top:12px">${Object.entries(d.result.attributes||{}).map(([k,v])=>`<div class="wf-analysis-item"><div class="a-label">${esc(k)}</div><div class="a-value">${esc(String(v))}</div></div>`).join('')}</div>`:'';
      return `<div class="animate-fade-in"><h1 class="page-title">AI Character</h1><p class="page-subtitle">Buat karakter AI reusable untuk image & video.</p>
        <div class="workflow-container"><div class="wf-step-card">
          <div class="wf-main-grid"><div class="wf-column">
            <div class="form-group"><label class="form-label">Character Name</label><input type="text" class="form-input" id="chName" value="${esc(d.name)}"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              <div class="form-group"><label class="form-label">Gender</label><input type="text" class="form-input" id="chGender" value="${esc(d.gender)}"></div>
              <div class="form-group"><label class="form-label">Age</label><input type="text" class="form-input" id="chAge" value="${esc(d.age)}"></div>
            </div>
            <div class="form-group"><label class="form-label">Appearance</label><textarea class="form-textarea" id="chAppearance" rows="2">${esc(d.appearance)}</textarea></div>
            <div class="form-group"><label class="form-label">Hair</label><input type="text" class="form-input" id="chHair" value="${esc(d.hair)}"></div>
            <div class="form-group"><label class="form-label">Outfit</label><input type="text" class="form-input" id="chOutfit" value="${esc(d.outfit)}"></div>
            <div class="form-group"><label class="form-label">Personality</label><input type="text" class="form-input" id="chPersonality" value="${esc(d.personality)}"></div>
            <div class="form-group"><label class="form-label">Pose</label><input type="text" class="form-input" id="chPose" value="${esc(d.pose)}"></div>
            <div class="form-group"><label class="form-label">Art Style</label><input type="text" class="form-input" id="chArtStyle" value="${esc(d.artStyle)}"></div>
            <div class="form-group"><label class="form-label">Background</label><input type="text" class="form-input" id="chBackground" value="${esc(d.background)}"></div>
            <div class="form-group"><label class="form-label">Additional Description</label><textarea class="form-textarea" id="chExtra" rows="2">${esc(d.extra)}</textarea></div>
            <div class="wf-nav" style="margin-top:0;padding-top:0;border-top:none">
              <button class="btn-wf next ripple-container" data-action="ch-generate"><i data-lucide="sparkles"></i> Generate Character</button>
              ${d.result?`<button class="btn-wf ripple-container" data-action="ch-regenerate"><i data-lucide="refresh-cw"></i> Regenerate</button>`:''}
            </div>
            ${d.error?`<div style="margin-top:12px;padding:12px;border-radius:var(--radius-xs);background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#dc2626;font-size:13px">${esc(d.error)}</div>`:''}
          </div>
          <div class="wf-column">
            ${preview}
            ${d.result?`<div class="form-group"><label class="form-label">Character Description</label><textarea class="form-textarea" id="chDesc" rows="4" readonly>${esc(d.result.description||'')}</textarea></div>
            <div class="form-group"><label class="form-label">Master Character Prompt</label><textarea class="form-textarea" id="chMaster" rows="5" readonly>${esc(d.result.masterPrompt||'')}</textarea></div>
            <div class="form-group"><label class="form-label">Negative Prompt</label><textarea class="form-textarea" id="chNegative" rows="2" readonly>${esc(d.result.negativePrompt||'')}</textarea></div>
            ${attrs}
            <div class="wf-output-actions">
              <button class="btn-wf-small gold" data-action="ai-copy" data-target="chMaster"><i data-lucide="copy"></i> Copy Prompt</button>
              <button class="btn-wf-small" data-action="ch-save"><i data-lucide="save"></i> Save Character</button>
              <button class="btn-wf-small" data-action="ch-send-video"><i data-lucide="send"></i> Send to AI Video</button>
            </div>`:'<div class="empty-state"><p style="color:var(--text-muted)">Preview karakter akan muncul setelah generate.</p></div>'}
          </div></div>
        </div></div></div>`;
    }

    /* Legacy AI Image workflow helpers (retained for reference; hub replaces main page) */

    function rWFS(){
      const d=S.wfData;
      if(S.wfLoading)return `<div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">${esc(d.loadingStage||'Generating your AI workflow...')}</div><div class="wf-loading-dots"><span></span><span></span><span></span></div></div></div>`;

      return `<div class="wf-step-card">
        <div class="wf-hero-grid">
          <div class="wf-hero-main">
            <div class="wf-step-badge"><i data-lucide="sparkles"></i> Premium AI Blueprint</div>
            <div class="wf-step-title">Turn any product into a polished video strategy</div>
            <div class="wf-step-desc">Upload a product, choose a workflow, and generate a cinematic storyboard plus a ready-to-send video prompt in one elegant workspace.</div>
            <div class="wf-meta-row">
              <div class="wf-meta-pill"><i data-lucide="package"></i> ${d.productImage?'Product ready':'Upload product'}</div>
              <div class="wf-meta-pill"><i data-lucide="layers"></i> ${d.workflow==='affiliate'?'Affiliate flow':'Storyboard flow'}</div>
              <div class="wf-meta-pill"><i data-lucide="brain"></i> ${d.analysis?'Analysis ready':'Awaiting analysis'}</div>
            </div>
          </div>
          <div class="wf-hero-side">
            <div class="wf-insight-card">
              <div class="wf-insight-label">Blueprint Snapshot</div>
              <div class="wf-insight-title">${d.workflow==='affiliate'?'Affiliate-ready short-form':'Commercial-grade storytelling'}</div>
              <div class="wf-insight-copy">${d.userPrompt.trim()?`Focused on: ${d.userPrompt.trim().slice(0,100)}${d.userPrompt.trim().length>100?'…':''}`:'Describe your audience, tone, and product value to unlock the blueprint.'}</div>
              <div class="wf-insight-footer"><span class="wf-dot"></span> ${d.masterPrompt?'Master prompt ready':'Generate to unlock final prompt'}</div>
            </div>
          </div>
        </div>

        <div class="wf-main-grid">
          <div class="wf-column">
            <div class="form-group">
              <label class="form-label">1. Product Image</label>
              ${d.productImage?`<img src="${d.productImage}" class="wf-preview-img" alt="Product"><button class="btn-wf-small" data-action="wf-remove-product" style="margin:0 auto 16px;display:flex"><i data-lucide="x"></i> Remove Image</button>`
              :`<div class="wf-upload-zone" id="wfUploadZone" data-action="wf-browse-product"><i data-lucide="upload-cloud"></i><div class="upload-title">Drop your product image here</div><div class="upload-desc">PNG, JPG, WebP up to 10MB</div></div><input type="file" id="wfFileInput" accept="image/*" style="display:none">`}
            </div>

            <div class="form-group">
              <label class="form-label">2. Choose AI Workflow</label>
              <div class="wf-provider-grid" style="margin-top:8px">${[{id:'storyboard',name:'Storyboard',desc:'Generate a professional cinematic storyboard for product videos.',badge:'🎬',points:['Commercial','Product Ads','Installation Demo','Product Showcase']},{id:'affiliate',name:'Affiliate Video',desc:'Generate a viral short-form affiliate video optimized for TikTok, Shopee, and social media.',badge:'💰',points:['TikTok Affiliate','Shopee Affiliate','UGC Style','Talking Product']}].map(w=>`<div class="wf-provider-card ${d.workflow===w.id?'selected':''}" data-action="wf-select-workflow" data-workflow="${w.id}"><div class="pv-icon" style="background:${d.workflow===w.id?'rgba(246,196,69,0.16)':'rgba(255,255,255,0.04)'};color:#F6C445">${w.badge}</div><div class="pv-name">${w.name}</div><div class="pv-desc">${w.desc}</div><div style="margin-top:10px;font-size:11px;color:var(--text-muted);line-height:1.6">${w.points.map(p=>`<div>• ${p}</div>`).join('')}</div></div>`).join('')}</div>
            </div>

            <div class="form-group">
              <label class="form-label">3. Describe Your Video</label>
              ${renderPromptSelector('ai-image','wfPromptTemplate','wfUserPrompt','wfPromptIndicator')}
              <textarea class="form-textarea" id="wfUserPrompt" rows="7" data-prompt-textarea placeholder="Describe the type of video you want to create...\n\nExample:\nCreate a 10-second cinematic commercial highlighting premium product quality, realistic installation, dramatic lighting, and smooth camera movement.">${esc(d.userPrompt)}</textarea>
            </div>

            <div class="wf-nav" style="margin-top:0;padding-top:0;border-top:none">
              <button class="btn-wf back" data-action="wf-reset"><i data-lucide="rotate-ccw"></i> Reset</button>
              <button class="btn-wf next ripple-container" data-action="wf-generate-one" ${!d.productImage || !d.userPrompt.trim()?'disabled':''}><i data-lucide="sparkles"></i> Generate AI Blueprint</button>
            </div>
          </div>

          <div class="wf-column">
            <div class="wf-side-card">
              <div class="wf-insight-label">Ready to launch</div>
              <div class="wf-step-title" style="font-size:18px;margin-top:8px">${d.workflow==='affiliate'?'Short-form sales story':'Premium brand film'}</div>
              <div class="wf-recap-list">
                <div class="wf-recap-item"><span>Workflow</span><strong>${d.workflow==='affiliate'?'Affiliate video':'Storyboard'}</strong></div>
                <div class="wf-recap-item"><span>Analysis</span><strong>${d.analysis?d.analysis.type:'Pending'}</strong></div>
                <div class="wf-recap-item"><span>Output</span><strong>${d.generatedImage?'Image ready':d.masterPrompt?'Prompt ready':'Waiting for generation'}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-top:24px">
          <label class="form-label">4. AI Product Analysis</label>
          ${d.analysis?`<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:14px 16px;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:var(--radius-xs)"><i data-lucide="check-circle" style="width:20px;height:20px;color:var(--primary);flex-shrink:0"></i><span style="font-size:13px;font-weight:600;color:var(--primary-light)">Analysis complete — <strong>${d.analysis.type}</strong> detected</span></div>
          <div class="wf-analysis-grid">${d.analysis.items.map((item,i)=>`<div class="wf-analysis-item" style="animation:analysisReveal 0.4s ease-out ${i*0.06}s both"><div class="a-label">${item.label}</div><div class="a-value">${item.value}</div></div>`).join('')}</div>`
          :'<div class="empty-state"><p style="color:var(--text-muted)">No analysis data yet. Generate the AI blueprint to populate this section.</p></div>'}
        </div>

        <div class="form-group">
          <label class="form-label">${d.workflow==='affiliate'?'5. Affiliate Storyboard':'5. Storyboard'}</label>
          <div class="wf-output-area"><textarea class="form-textarea" id="wfStoryboard" rows="12" style="font-size:12.5px;line-height:1.9;min-height:260px;font-family:'Inter',monospace">${esc(d.workflow==='affiliate'?d.storyboard.replace('STORYBOARD','AFFILIATE STORYBOARD'):d.storyboard)}</textarea>
            <div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="wfStoryboard"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="wf-download" data-target="wfStoryboard" data-filename="storyboard.txt"><i data-lucide="download"></i> Download</button></div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">6. Master Prompt</label>
          <div class="wf-output-area"><textarea class="form-textarea" id="wfMasterPrompt" rows="10" style="font-size:13px;line-height:1.9;min-height:220px;border-color:rgba(245,158,11,0.2)">${esc(d.masterPrompt)}</textarea>
            <div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="wfMasterPrompt"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="wf-save-prompt"><i data-lucide="save"></i> Save to Library</button></div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">7. Generate Video</label>
          <div class="wf-provider-grid">${WFP.map(p=>`<div class="wf-provider-card ${d.provider===p.id?'selected':''}" data-action="wf-select-provider" data-provider="${p.id}"><div class="pv-icon" style="background:${p.color}20;color:${p.color}">${p.letter}</div><div class="pv-name">${p.name}</div><div class="pv-desc">${p.desc}</div></div>`).join('')}</div>
          ${d.imageError?`<div style="margin-top:12px;padding:12px 14px;border-radius:var(--radius-xs);background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#f87171;font-size:13px">${esc(d.imageError)}</div>`:''}
          ${d.generatedImage?`<div style="margin-top:16px"><img src="${resolveMediaUrl(d.generatedImage)}" class="wf-preview-img" alt="Generated image"><div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-download-image" data-url="${esc(d.generatedImage)}"><i data-lucide="download"></i> Download</button><button class="btn-wf-small" data-action="wf-generate-image"><i data-lucide="refresh-cw"></i> Regenerate</button></div></div>`:''}
          <div class="wf-nav" style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border-color)">
            <button class="btn-wf ripple-container" data-action="wf-generate-image" ${!d.masterPrompt.trim()?'disabled':''}><i data-lucide="image"></i> Generate Image</button>
            <button class="btn-wf next ripple-container" data-action="wf-send" ${!d.masterPrompt.trim()?'disabled':''}><i data-lucide="send"></i> Send to AI</button>
          </div>
        </div>
      </div>`;
    }

    /* Generate analysis — returns array of {label, value} items */
    function genAnalysis(){
      const pr=S.wfData.userPrompt.toLowerCase();
      let items=[
        {label:'Product Type',value:'Consumer Product'},
        {label:'Dominant Colors',value:'<span class="a-tag">Black</span><span class="a-tag">Silver</span><span class="a-tag">White</span>'},
        {label:'Materials Detected',value:'<span class="a-tag">Plastic</span><span class="a-tag">Metal</span>'},
        {label:'Suggested Mood',value:'<span class="a-tag">Premium</span><span class="a-tag">Modern</span>'},
        {label:'Lighting Style',value:'<span class="a-tag">Studio</span><span class="a-tag">Rim Light</span>'},
        {label:'Camera Movements',value:'<span class="a-tag">Dolly</span><span class="a-tag">Close-up</span>'},
        {label:'Recommended Background',value:'Dark gradient surface with subtle texture'}
      ];
      if(pr.includes('luxury')||pr.includes('premium')||pr.includes('gold')){items[0].value='Luxury Product';items[1].value='<span class="a-tag">Gold</span><span class="a-tag">Black</span><span class="a-tag">Cream</span>';items[2].value='<span class="a-tag">Glass</span><span class="a-tag">Leather</span><span class="a-tag">Gold Plating</span>';items[3].value='<span class="a-tag">Luxury</span><span class="a-tag">Elegant</span><span class="a-tag">Sophisticated</span>';items[4].value='<span class="a-tag">Golden Hour</span><span class="a-tag">Warm Rim</span><span class="a-tag">Soft Fill</span>';items[5].value='<span class="a-tag">Slow Orbit</span><span class="a-tag">Macro Dolly</span><span class="a-tag">Crane</span>';items[6].value='Marble surface with gold accent lighting and soft bokeh';}
      if(pr.includes('tech')||pr.includes('electronic')||pr.includes('gadget')||pr.includes('earbuds')||pr.includes('watch')){items[0].value='Electronics / Tech';items[1].value='<span class="a-tag">Black</span><span class="a-tag">Dark Gray</span><span class="a-tag">Blue Accent</span>';items[2].value='<span class="a-tag">Aluminum</span><span class="a-tag">Glass</span><span class="a-tag">Silicone</span>';items[3].value='<span class="a-tag">Futuristic</span><span class="a-tag">Sleek</span><span class="a-tag">Modern</span>';items[4].value='<span class="a-tag">Neon Accent</span><span class="a-tag">Key Light</span><span class="a-tag">Rim Light</span>';items[5].value='<span class="a-tag">Macro</span><span class="a-tag">Slow Rotation</span><span class="a-tag">Dolly Zoom</span>';items[6].value='Dark reflective surface with subtle blue glow and particle effects';}
      if(pr.includes('food')||pr.includes('drink')||pr.includes('coffee')||pr.includes('beverage')){items[0].value='Food & Beverage';items[1].value='<span class="a-tag">Warm Brown</span><span class="a-tag">Cream</span><span class="a-tag">Green</span>';items[2].value='<span class="a-tag">Organic</span><span class="a-tag">Wood</span><span class="a-tag">Ceramic</span>';items[3].value='<span class="a-tag">Warm</span><span class="a-tag">Inviting</span><span class="a-tag">Cozy</span>';items[4].value='<span class="a-tag">Natural Window</span><span class="a-tag">Soft Key</span>';items[5].value='<span class="a-tag">Top-Down</span><span class="a-tag">Slow Tilt</span><span class="a-tag">Close-up Pour</span>';items[6].value='Rustic wooden table with warm ambient lighting and steam effects';}
      if(pr.includes('beauty')||pr.includes('skincare')||pr.includes('cosmetic')||pr.includes('serum')){items[0].value='Beauty & Cosmetics';items[1].value='<span class="a-tag">White</span><span class="a-tag">Pink</span><span class="a-tag">Gold</span>';items[2].value='<span class="a-tag">Glass</span><span class="a-tag">Cream</span><span class="a-tag">Rose Gold</span>';items[3].value='<span class="a-tag">Soft</span><span class="a-tag">Feminine</span><span class="a-tag">Clean</span>';items[4].value='<span class="a-tag">Soft Diffused</span><span class="a-tag">Backlight</span><span class="a-tag">Beauty Dish</span>';items[5].value='<span class="a-tag">Slow Reveal</span><span class="a-tag">Product Spin</span><span class="a-tag">Water Splash</span>';items[6].value='Clean white surface with soft bokeh and water droplet effects';}
      if(pr.includes('fashion')||pr.includes('clothing')||pr.includes('bag')||pr.includes('backpack')||pr.includes('shoe')){items[0].value='Fashion & Accessories';items[1].value='<span class="a-tag">Neutral</span><span class="a-tag">Earth Tones</span><span class="a-tag">Tan</span>';items[2].value='<span class="a-tag">Leather</span><span class="a-tag">Canvas</span><span class="a-tag">Fabric</span>';items[3].value='<span class="a-tag">Trendy</span><span class="a-tag">Lifestyle</span><span class="a-tag">Aspirational</span>';items[4].value='<span class="a-tag">Natural</span><span class="a-tag">Editorial</span><span class="a-tag">Golden Hour</span>';items[5].value='<span class="a-tag">Medium Shot</span><span class="a-tag">Pan</span><span class="a-tag">Detail Close-up</span>';items[6].value='Urban or studio minimalist environment with lifestyle context';}
      S.wfData.analysis={type:items[0].value,items};
    }

    /* Generate storyboard */
    function genStoryboard(){
      const a=S.wfData.analysis;
      const workflow=S.wfData.workflow==='affiliate'?'affiliate':'storyboard';
      const mood=a.items.find(i=>i.label.includes('Mood'))?.value.replace(/<[^>]*>/g,', ').trim()||'Premium';
      const light=a.items.find(i=>i.label.includes('Lighting'))?.value.replace(/<[^>]*>/g,', ').trim()||'Studio';
      const cam=a.items.find(i=>i.label.includes('Camera'))?.value.replace(/<[^>]*>/g,', ').trim()||'Dolly';
      const mat=a.items.find(i=>i.label.includes('Material'))?.value.replace(/<[^>]*>/g,', ').trim()||'Plastic';
      const bg=a.items.find(i=>i.label.includes('Background'))?.value||'Dark gradient surface';
      const colors=a.items.find(i=>i.label.includes('Color'))?.value.replace(/<[^>]*>/g,', ').trim()||'Black, Silver';
      if(workflow==='affiliate')return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AFFILIATE STORYBOARD — ${a.type}
  Duration: 9 seconds | 9:16 | 24fps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENE 1 — HOOK (0s — 2s)
┌─────────────────────────────────────┐
│ Camera: Fast zoom-in, UGC style    │
│ Subject: Product appears with bold  │
│         text overlay                │
│ Hook: 'Why this product is worth it'│
│ Lighting: Bright, natural, social   │
│ Mood: Energetic and trustworthy     │
└─────────────────────────────────────┘

SCENE 2 — DEMO (2s — 5s)
┌─────────────────────────────────────┐
│ Camera: Close-up + quick reveal    │
│ Subject: Product in use with crisp  │
│         motion and clear features   │
│ Lighting: ${light} with soft fill  │
│ Voiceover: Key benefit + social proof │
└─────────────────────────────────────┘

SCENE 3 — CTA (5s — 9s)
┌─────────────────────────────────────┐
│ Camera: End card with product shot  │
│ Subject: Final brand reveal + CTA   │
│ Text: 'Tap to see more' / 'Shop now'│
│ Mood: Confident, conversion-focused │
└─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  END OF AFFILIATE STORYBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
      return `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  STORYBOARD — ${a.type}
  Duration: 10 seconds | 16:9 | 24fps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENE 1 — ESTABLISHING SHOT (0s — 2s)
┌─────────────────────────────────────┐
│ Camera: Wide shot, slow push-in    │
│ Subject: Product placed center on   │
│         ${bg}          │
│ Lighting: ${light}, dramatic       │
│         atmosphere build-up         │
│ Mood: ${mood} introduction         │
│ Action: Subtle particle/fog        │
│         drift in background        │
│ Transition: Smooth fade to Scene 2 │
└─────────────────────────────────────┘

SCENE 2 — TEXTURE & MATERIAL (2s — 4s)
┌─────────────────────────────────────┐
│ Camera: Extreme close-up (${cam.split(',')[0].trim()})   │
│ Subject: ${mat} texture detail   │
│         Surface quality showcase    │
│ Lighting: Macro ring light,        │
│         highlight surface finish    │
│ Focus: Shallow DoF on key details  │
│ Color: ${colors} tones dominant   │
│ Transition: Smooth slide to Scene 3│
└─────────────────────────────────────┘

SCENE 3 — 360° PRODUCT ROTATION (4s — 6s)
┌─────────────────────────────────────┐
│ Camera: Turntable rotation          │
│ Subject: Product rotating slowly    │
│         showing all angles          │
│ Lighting: Even ${light}, no       │
│         harsh shadows              │
│ Text: Key features appear as       │
│       floating labels              │
│ Background: Clean minimal          │
│ Transition: Quick cut to Scene 4  │
└─────────────────────────────────────┘

SCENE 4 — LIFESTYLE CONTEXT (6s — 8s)
┌─────────────────────────────────────┐
│ Camera: ${cam.split(',')[1]?.trim()||'Medium shot'}       │
│         with subtle movement        │
│ Subject: Product in natural         │
│         usage context              │
│ Lighting: ${light}, ${mood.toLowerCase()} │
│         atmosphere                  │
│ Mood: Aspirational yet relatable   │
│ Transition: Speed ramp to Scene 5 │
└─────────────────────────────────────┘

SCENE 5 — HERO FINALE (8s — 10s)
┌─────────────────────────────────────┐
│ Camera: Slow pullback from         │
│         extreme close-up            │
│ Subject: Product centered,          │
│         hero composition            │
│ Lighting: Dramatic ${light}       │
│         with ${colors.split(',')[0]?.trim()||'dark'} accent   │
│ Text: Brand name / tagline         │
│       fade in elegantly            │
│ End: Hold 1s, subtle particles    │
└─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  END OF STORYBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    }

    /* Generate master prompt */
    function genMasterPrompt(){
      const a=S.wfData.analysis;
      const workflow=S.wfData.workflow==='affiliate'?'affiliate':'storyboard';
      const mood=a.items.find(i=>i.label.includes('Mood'))?.value.replace(/<[^>]*>/g,', ').trim()||'Premium';
      const light=a.items.find(i=>i.label.includes('Lighting'))?.value.replace(/<[^>]*>/g,' and ').trim()||'Studio';
      const cam=a.items.find(i=>i.label.includes('Camera'))?.value.replace(/<[^>]*>/g,', ').trim()||'Dolly';
      const mat=a.items.find(i=>i.label.includes('Material'))?.value.replace(/<[^>]*>/g,', ').trim()||'Plastic';
      const bg=a.items.find(i=>i.label.includes('Background'))?.value||'Dark gradient surface';
      const colors=a.items.find(i=>i.label.includes('Color'))?.value.replace(/<[^>]*>/g,', ').trim()||'Black, Silver';
      const pr=S.wfData.userPrompt;
      if(workflow==='affiliate')return `A short-form affiliate product video optimized for social commerce.

USER VISION:
 ${pr}

VISUAL STYLE: ${mood} aesthetic with ${light} lighting. Color palette dominated by ${colors}. Materials include ${mat}.

FLOW: Open with a strong hook, follow with a quick product demonstration and key benefit highlight, then end with a clear CTA such as 'tap to shop' or 'see more'. Keep the pacing energetic and conversion-focused.

SCENE BREAKDOWN:
— 0-2s: Hook shot with bold text and quick zoom
— 2-5s: Product reveal and usage moment with ${mat} detail
— 5-9s: Close-up feature proof + CTA overlay

TECHNICAL: 9:16 format, 24fps, bright social-first lighting, fast transitions, punchy captions, clear product focus, authentic brand feel.

DURATION: 9 seconds | ASPECT RATIO: 9:16 | STYLE: UGC affiliate social video`;
      return `A professional 10-second cinematic product video.

USER VISION:
 ${pr}

VISUAL STYLE: ${mood} aesthetic with ${light} lighting. Color palette dominated by ${colors}. Materials include ${mat}.

CAMERA WORK: Opens with a wide establishing shot — product revealed on ${bg}. Transitions to extreme close-up showcasing ${mat} texture detail. Followed by smooth 360-degree turntable rotation with sequential feature labels. Cuts to lifestyle context with ${cam} movement and natural feel. Ends with a slow pullback hero shot with brand tagline.

SCENE BREAKDOWN:
— 0-2s: Wide establishing shot, atmospheric build-up, subtle particles
— 2-4s: Extreme close-up, material texture showcase, macro lighting
— 4-6s: 360° turntable rotation, feature labels appear
— 6-8s: Lifestyle context, natural usage demonstration
— 8-10s: Hero pullback, brand tagline, hold with particles

TECHNICAL: 4K resolution, 24fps cinematic, shallow depth of field, smooth camera transitions, professional color grading with warm ${mood.toLowerCase()} tones, clean compositing, no text artifacts.

DURATION: 10 seconds | ASPECT RATIO: 16:9 | STYLE: Cinematic commercial grade`;
    }

    function wfSyncFormFields(){
      const d=S.wfData;
      const up=document.getElementById('wfUserPrompt');if(up)d.userPrompt=up.value;
      const sb=document.getElementById('wfStoryboard');if(sb)d.storyboard=sb.value;
      const mp=document.getElementById('wfMasterPrompt');if(mp)d.masterPrompt=mp.value;
    }
    function wfResetData(){
      const provider=S.wfData.provider||'';
      S.wfData={productImage:null,userPrompt:'',analysis:null,storyboard:'',masterPrompt:'',provider,workflow:'storyboard',generatedImage:null,imageError:null,loadingStage:''};
      S.wfStep=1;S.wfLoading=false;S.wfSent=false;
    }
    async function wfCopyText(text,label){
      if(!text?.trim()){showToast('Nothing to Copy',`${label||'Content'} is empty.`,'warning');return;}
      try{
        await navigator.clipboard.writeText(text);
        showToast('Copied',`${label||'Content'} copied to clipboard.`,'success');
      }catch{
        showToast('Copy Failed','Clipboard access was denied or unavailable.','error');
      }
    }
    function wfDownloadText(text,filename){
      if(!text?.trim()){showToast('Nothing to Download','Content is empty.','warning');return;}
      const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download=filename||'tarmoc-export.txt';
      a.click();
      URL.revokeObjectURL(a.href);
      showToast('Downloaded','File download started.','success');
    }
    function wfDownloadImage(url){
      const resolved=resolveMediaUrl(url);
      if(!resolved){showToast('Download Failed','No generated image available.','error');return;}
      const a=document.createElement('a');
      a.href=resolved;
      a.download=`tarmoc-ai-image-${Date.now()}.png`;
      a.click();
      showToast('Downloaded','Image download started.','success');
    }
    function wfGenerateBlueprint(){
      if(S.currentPage!=='ai-image')return;
      wfSyncFormFields();
      const d=S.wfData;
      if(!d.productImage){showToast('Upload Required','Please upload a product image.','warning');return;}
      if(!d.userPrompt.trim()){showToast('Description Required','Please describe your video.','warning');return;}
      S.wfLoading=true;
      d.loadingStage='Generating analysis, storyboard, and master prompt...';
      d.generatedImage=null;
      d.imageError=null;
      renderPage();
      S.wfStep=2;wfNext();
      S.wfStep=3;wfNext();
      S.wfStep=4;wfNext();
      S.wfLoading=false;
      d.loadingStage='';
      renderPage();
      showToast('Blueprint Ready','Analysis, storyboard, and master prompt are ready.','success');
    }
    async function wfGenerateImage(){
      if(S.currentPage!=='ai-image')return;
      wfSyncFormFields();
      const d=S.wfData;
      if(!d.masterPrompt.trim()){showToast('Master Prompt Required','Generate or enter a master prompt first.','warning');return;}
      if(!hasProvider('geminiKey')){showToast('API Key Missing','Gemini API key is not configured on the backend.','error');return;}
      S.wfLoading=true;
      d.loadingStage='Generating image with Gemini...';
      d.imageError=null;
      renderPage();
      try{
        const res=await fetch(`${FLOW_API_BASE}/api/image`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({prompt:d.masterPrompt})
        });
        const data=await res.json().catch(()=>({}));
        if(!res.ok)throw new Error(data.error||data.message||`Image API HTTP ${res.status}`);
        const url=data.url?resolveMediaUrl(data.url):'';
        if(!url)throw new Error('Backend did not return an image URL.');
        d.generatedImage=url;
        S.wfSent=true;
        S.history.unshift({
          id:genId(),type:'image',date:new Date().toISOString().slice(0,16).replace('T',' '),
          provider:'Gemini',prompt:d.masterPrompt.slice(0,120),
          thumbnail:url,project:WORKSPACES.find(p=>p.id===S.currentProject)?.name||'TARMOC Product'
        });
        showToast('Image Generated','Your AI image is ready.','success');
      }catch(err){
        d.generatedImage=null;
        d.imageError=err.message||'Image generation failed.';
        showToast('Generation Failed',d.imageError,'error');
      }finally{
        S.wfLoading=false;
        d.loadingStage='';
        renderPage();
      }
    }
    function wfSendToAI(){
      if(S.currentPage!=='ai-image')return;
      wfSyncFormFields();
      const d=S.wfData;
      if(!d.masterPrompt.trim()){showToast('Master Prompt Required','Generate or enter a master prompt first.','warning');return;}
      const ref=d.generatedImage||d.productImage;
      if(ref)S.refImages=[resolveMediaUrl(ref),null,null,null];
      else S.refImages=[null,null,null,null];
      S.videoPrompt=d.masterPrompt;
      S.videoGenState='empty';
      navTo('ai-video');
      showToast('Sent to AI Video','Master prompt and image reference loaded in AI Video.','success');
    }
    function wfSaveMasterPrompt(){
      if(S.currentPage!=='ai-image')return;
      wfSyncFormFields();
      const text=S.wfData.masterPrompt.trim();
      if(!text){showToast('Nothing to Save','Master prompt is empty.','warning');return;}
      const title=`AI Image ${new Date().toLocaleDateString()}`;
      S.prompts.unshift({id:genId(),category:'commercial',title,prompt:text,count:0});
      showToast('Saved to Library',`"${title}" added to Prompt Library.`,'success');
    }

    /* ============================================
       AI PRODUCT — IMPORT · ANALYSIS · MULTI-STYLE IMAGES · MARKETING ASSETS
       ============================================ */
    function pgAIProduct(){
      const d=S.apData;
      if(d.loading){
        return `<div class="animate-fade-in"><h1 class="page-title">AI Product</h1><p class="page-subtitle">Import produk, analisis dengan AI, dan hasilkan gambar serta aset marketing dalam satu alur kerja.</p>
          <div class="workflow-container"><div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">${esc(d.loadingStage||'Memproses...')}</div><div class="wf-loading-dots"><span></span><span></span><span></span></div></div></div></div></div>`;
      }
      return `<div class="animate-fade-in"><h1 class="page-title">AI Product</h1><p class="page-subtitle">Import produk, analisis dengan AI, dan hasilkan gambar serta aset marketing dalam satu alur kerja.</p>
        <div class="workflow-container"><div class="wf-step-card">
          ${apSectionImport(d)}
          ${apSectionPrompt(d)}
          ${apSectionAnalysis(d)}
          ${apSectionStyles(d)}
          ${apSectionAssets(d)}
        </div></div></div>`;
    }

    function apSectionImport(d){
      const importBlock=d.importMethod==='link'
        ? `<div class="ap-link-row">
             <input type="text" class="form-input" id="apImportUrl" placeholder="Tempel link produk Shopee atau TikTok Shop..." value="${esc(d.importUrl)}">
             <button class="btn-wf-small gold" data-action="ap-import-link"><i data-lucide="download-cloud"></i> Import</button>
           </div>`
        : (d.productImage
            ? `<img src="${d.productImage}" class="wf-preview-img" alt="Produk">${!d.productInfo?`<button class="btn-wf-small" data-action="ap-remove-image" style="margin:0 auto 16px;display:flex"><i data-lucide="x"></i> Hapus Gambar</button>`:''}`
            : `<div class="wf-upload-zone" id="apUploadZone" data-action="ap-browse-image"><i data-lucide="upload-cloud"></i><div class="upload-title">Drop gambar produk di sini</div><div class="upload-desc">PNG, JPG, WebP hingga 10MB</div></div><input type="file" id="apFileInput" accept="image/*" style="display:none">`);

      const summary=d.productInfo
        ? `<div class="ap-product-summary"><img src="${d.productImage}" alt=""><div><div class="ap-ps-platform">${esc(d.productInfo.platform)}</div><div class="ap-ps-name">${esc(d.productInfo.name)}</div><div class="ap-ps-meta"><span>${esc(d.productInfo.category)}</span><span>${esc(d.productInfo.price)}</span></div></div><button class="btn-wf-small" data-action="ap-remove-image"><i data-lucide="x"></i></button></div>`
        : '';

      return `<div class="form-group">
        <label class="form-label">1. Import Produk</label>
        <div class="ap-tabs">
          <button class="ap-tab ${d.importMethod==='upload'?'active':''}" data-action="ap-set-method" data-method="upload"><i data-lucide="upload-cloud"></i> Upload Gambar</button>
          <button class="ap-tab ${d.importMethod==='link'?'active':''}" data-action="ap-set-method" data-method="link"><i data-lucide="link"></i> Import via Link</button>
        </div>
        ${importBlock}
        ${summary}
      </div>`;
    }

    function apSectionPrompt(d){
      return `<div class="form-group">
        <label class="form-label">Creative Prompt (Opsional)</label>
        ${renderPromptSelector('ai-product','apPromptTemplate','apUserPrompt','apPromptIndicator')}
        <textarea class="form-textarea" id="apUserPrompt" rows="4" data-prompt-textarea placeholder="Deskripsikan arah kreatif untuk aset marketing dan video prompt...">${esc(d.userPrompt||'')}</textarea>
      </div>`;
    }

    function apSectionAnalysis(d){
      return `<div class="form-group">
        <label class="form-label">2. AI Product Analysis</label>
        ${!d.analysis
          ? `<button class="btn-wf next ripple-container" data-action="ap-analyze" ${!d.productImage?'disabled':''}><i data-lucide="brain"></i> Analisis Produk dengan AI</button>`
          : `<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;padding:14px 16px;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:var(--radius-xs)"><i data-lucide="check-circle" style="width:20px;height:20px;color:var(--primary);flex-shrink:0"></i><span style="font-size:13px;font-weight:600;color:var(--primary-light)">Analisis selesai — <strong>${esc(d.analysis.type)}</strong> terdeteksi</span></div>
            <div class="wf-analysis-grid">${d.analysis.items.map((item,i)=>`<div class="wf-analysis-item" style="animation:analysisReveal 0.4s ease-out ${i*0.06}s both"><div class="a-label">${esc(item.label)}</div><div class="a-value">${item.value}</div></div>`).join('')}</div>
            <button class="btn-wf-small" style="margin-top:14px" data-action="ap-analyze"><i data-lucide="refresh-cw"></i> Analisis Ulang</button>`
        }
      </div>`;
    }

    function apSectionStyles(d){
      return `<div class="form-group">
        <label class="form-label">3. Generate Gambar Produk (Berbagai Gaya)</label>
        <div class="wf-provider-grid">${AP_STYLES.map(s=>`<div class="wf-provider-card ${d.selectedStyles.includes(s.id)?'selected':''}" data-action="ap-toggle-style" data-style="${s.id}"><div class="pv-icon" style="background:${d.selectedStyles.includes(s.id)?'rgba(246,196,69,0.16)':'rgba(255,255,255,0.04)'};color:#F6C445"><i data-lucide="${s.icon}"></i></div><div class="pv-name">${s.name}</div><div class="pv-desc">${s.desc}</div></div>`).join('')}</div>
        <button class="btn-wf next ripple-container" style="margin-top:16px" data-action="ap-generate-images" ${!d.analysis||d.selectedStyles.length===0?'disabled':''}><i data-lucide="images"></i> Generate Gambar${d.selectedStyles.length?` (${d.selectedStyles.length*20} kredit)`:''}</button>
        ${d.generatedImages.length?`<div class="ap-gallery-grid">${d.generatedImages.map(img=>`<div class="ap-gallery-item"><img src="${img.url}" alt="${esc(img.styleName)}"><div class="ap-gallery-label">${esc(img.styleName)}</div><div class="ap-gallery-actions"><button class="gallery-action-btn" data-action="ap-download-image" data-url="${img.url}"><i data-lucide="download"></i></button></div></div>`).join('')}</div>`:''}
      </div>`;
    }

    function apSectionAssets(d){
      const ma=d.marketingAssets;
      return `<div class="form-group">
        <label class="form-label">4. Generate Aset Marketing</label>
        <button class="btn-wf next ripple-container" data-action="ap-generate-assets" ${!d.analysis?'disabled':''}><i data-lucide="sparkles"></i> Generate Aset Marketing (30 kredit)</button>
        ${ma?`
          <div style="margin-top:24px">
            <label class="form-label">Deskripsi Produk</label>
            <div class="wf-output-area"><textarea class="form-textarea" id="apDesc" rows="4">${esc(ma.description)}</textarea><div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="apDesc"><i data-lucide="copy"></i> Copy</button></div></div>

            <label class="form-label" style="margin-top:20px">Caption Media Sosial</label>
            <div class="ap-caption-grid">
              <div class="ap-caption-card"><div class="ap-caption-platform">Instagram</div><textarea class="form-textarea" id="apCaptionInstagram" rows="5">${esc(ma.captions.instagram)}</textarea><button class="btn-wf-small gold" data-action="wf-copy" data-target="apCaptionInstagram"><i data-lucide="copy"></i> Copy</button></div>
              <div class="ap-caption-card"><div class="ap-caption-platform">TikTok</div><textarea class="form-textarea" id="apCaptionTiktok" rows="5">${esc(ma.captions.tiktok)}</textarea><button class="btn-wf-small gold" data-action="wf-copy" data-target="apCaptionTiktok"><i data-lucide="copy"></i> Copy</button></div>
              <div class="ap-caption-card"><div class="ap-caption-platform">Shopee</div><textarea class="form-textarea" id="apCaptionShopee" rows="5">${esc(ma.captions.shopee)}</textarea><button class="btn-wf-small gold" data-action="wf-copy" data-target="apCaptionShopee"><i data-lucide="copy"></i> Copy</button></div>
            </div>

            <label class="form-label" style="margin-top:20px">Video Prompt</label>
            <div class="wf-output-area"><textarea class="form-textarea" id="apVideoPrompt" rows="6">${esc(ma.videoPrompt)}</textarea><div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="apVideoPrompt"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="ap-send-to-video"><i data-lucide="send"></i> Kirim ke AI Video</button></div></div>

            <label class="form-label" style="margin-top:20px">Script Affiliate</label>
            <div class="wf-output-area"><textarea class="form-textarea" id="apAffiliateScript" rows="9">${esc(ma.affiliateScript)}</textarea><div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="apAffiliateScript"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="wf-download" data-target="apAffiliateScript" data-filename="script-affiliate.txt"><i data-lucide="download"></i> Download</button></div></div>
          </div>
        `:''}
      </div>`;
    }

    function apDetectPlatform(url){
      const u=url.toLowerCase();
      if(u.includes('shopee'))return 'Shopee';
      if(u.includes('tiktok'))return 'TikTok Shop';
      return 'Marketplace';
    }
    function apParseNameFromUrl(url){
      try{
        const u=new URL(url);
        let seg=u.pathname.split('/').filter(Boolean).pop()||'';
        seg=seg.replace(/-i\.\d+.*$/,'').replace(/\.\w+$/,'').replace(/[-_]/g,' ').trim();
        if(!seg)return null;
        return seg.replace(/\b\w/g,c=>c.toUpperCase());
      }catch{return null}
    }

    /* Generate AI Product analysis based on product name/category */
    function apGenAnalysis(){
      const info=S.apData.productInfo;
      const text=((info?.name||'')+' '+(info?.category||'')).toLowerCase();
      let items=[
        {label:'Kategori Produk',value:info?.category||'Produk Konsumen'},
        {label:'Warna Dominan',value:'<span class="a-tag">Hitam</span><span class="a-tag">Putih</span>'},
        {label:'Target Audiens',value:'<span class="a-tag">Umum</span>'},
        {label:'Gaya yang Disarankan',value:'<span class="a-tag">Modern</span><span class="a-tag">Premium</span>'},
        {label:'Pencahayaan',value:'<span class="a-tag">Studio</span>'},
        {label:'Nilai Jual Utama',value:'Kualitas dan kepraktisan'}
      ];
      if(text.includes('tech')||text.includes('electronic')||text.includes('earbuds')||text.includes('watch')||text.includes('gadget')){items[1].value='<span class="a-tag">Hitam</span><span class="a-tag">Abu Gelap</span><span class="a-tag">Aksen Biru</span>';items[2].value='<span class="a-tag">Gen Z</span><span class="a-tag">Pekerja Muda</span>';items[3].value='<span class="a-tag">Futuristik</span><span class="a-tag">Sleek</span>';items[4].value='<span class="a-tag">Neon Accent</span><span class="a-tag">Rim Light</span>';items[5].value='Performa tinggi dengan desain modern';}
      else if(text.includes('beauty')||text.includes('skincare')||text.includes('serum')||text.includes('cosmetic')){items[1].value='<span class="a-tag">Putih</span><span class="a-tag">Pink</span><span class="a-tag">Emas</span>';items[2].value='<span class="a-tag">Wanita 18-35</span>';items[3].value='<span class="a-tag">Lembut</span><span class="a-tag">Clean</span>';items[4].value='<span class="a-tag">Soft Diffused</span><span class="a-tag">Backlight</span>';items[5].value='Formula alami untuk kulit sehat';}
      else if(text.includes('food')||text.includes('coffee')||text.includes('drink')){items[1].value='<span class="a-tag">Cokelat</span><span class="a-tag">Krem</span><span class="a-tag">Hijau</span>';items[2].value='<span class="a-tag">Pecinta Kopi</span><span class="a-tag">Keluarga</span>';items[3].value='<span class="a-tag">Hangat</span><span class="a-tag">Homey</span>';items[4].value='<span class="a-tag">Natural Window</span>';items[5].value='Rasa autentik dan aroma khas';}
      else if(text.includes('fashion')||text.includes('bag')||text.includes('backpack')||text.includes('shoe')){items[1].value='<span class="a-tag">Netral</span><span class="a-tag">Earth Tone</span>';items[2].value='<span class="a-tag">Remaja</span><span class="a-tag">Dewasa Muda</span>';items[3].value='<span class="a-tag">Trendy</span><span class="a-tag">Lifestyle</span>';items[4].value='<span class="a-tag">Golden Hour</span><span class="a-tag">Editorial</span>';items[5].value='Gaya kekinian dan tahan lama';}
      S.apData.analysis={type:items[0].value.replace(/<[^>]*>/g,''),items};
    }

    /* Generate marketing assets: description, captions, video prompt, affiliate script */
    function apGenMarketingAssets(){
      const info=S.apData.productInfo||{name:'Produk Anda',category:S.apData.analysis?.type||'Produk',price:'Rp 199.000',platform:'Marketplace'};
      const a=S.apData.analysis;
      const mood=a.items.find(i=>i.label.includes('Gaya'))?.value.replace(/<[^>]*>/g,', ').trim()||'Modern';
      const light=a.items.find(i=>i.label.includes('Pencahayaan'))?.value.replace(/<[^>]*>/g,', ').trim()||'Studio';
      const usp=(a.items.find(i=>i.label.includes('Nilai Jual'))?.value||'Kualitas terbaik').replace(/<[^>]*>/g,'');
      const styles=S.apData.selectedStyles.length?S.apData.selectedStyles.map(s=>AP_STYLES.find(x=>x.id===s)?.name).filter(Boolean).join(', '):'Studio Clean';

      const description=`${info.name} hadir sebagai pilihan tepat untuk kamu yang mengutamakan ${usp.toLowerCase()}. Dengan tampilan ${mood.toLowerCase()} dan kualitas premium, produk dari kategori ${info.category} ini cocok untuk kebutuhan sehari-hari maupun gaya hidup modern. Tersedia sekarang di ${info.platform} dengan harga ${info.price}.`;

      const captions={
        instagram:`✨ ${info.name} — ${usp}!\n\nTampil ${mood.toLowerCase()} setiap hari dengan ${info.name}. Yuk cek sekarang di ${info.platform}!\n\n#${info.category.replace(/\s+/g,'')} #ProdukPilihan #${info.platform.replace(/\s+/g,'')}`,
        tiktok:`POV: kamu akhirnya nemu ${info.name} yang bikin hidup lebih gampang 👀\nHarga cuma ${info.price}, buruan checkout sebelum kehabisan!`,
        shopee:`${info.name}\n✅ ${usp}\n✅ Kualitas terjamin\n✅ Pengiriman cepat\nHarga: ${info.price}\nYuk order sekarang juga!`
      };

      const videoPrompt=S.apData.userPrompt?.trim()?S.apData.userPrompt.trim():`Video produk sinematik berdurasi 10 detik menampilkan ${info.name}. Gaya visual: ${styles}, dengan mood ${mood.toLowerCase()} dan pencahayaan ${light.toLowerCase()}. Buka dengan shot lebar produk, dilanjutkan close-up detail tekstur, rotasi 360 derajat, konteks penggunaan, dan diakhiri hero shot dengan tagline brand. Kualitas 4K, transisi halus, color grading profesional.`;

      const affiliateScript=`[HOOK - 0-2 detik]\n"Kalian yang lagi cari ${info.category.toLowerCase()}, wajib stop scroll dulu deh!"\n\n[DEMO - 2-6 detik]\nTunjukkan ${info.name} dari berbagai sisi, soroti ${usp.toLowerCase()}.\n"Ini dia ${info.name}, ${usp.toLowerCase()} banget!"\n\n[SOCIAL PROOF - 6-8 detik]\n"Udah banyak yang order di ${info.platform}, rating-nya juga bagus."\n\n[CTA - 8-10 detik]\n"Buruan checkout sekarang, harganya cuma ${info.price}. Klik keranjang kuning ya!"`;

      S.apData.marketingAssets={description,captions,videoPrompt,affiliateScript};
    }
      /* ============================================
       AI AFFILIATE
       ============================================ */
    function pgAffiliate(){
      const d=S.afData;
      if(d.loading){
        return `<div class="animate-fade-in"><h1 class="page-title">AI Affiliate</h1><p class="page-subtitle">Generate foto model afiliasi dengan produk kamu.</p>
          <div class="workflow-container"><div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">Menghasilkan foto afiliasi...</div><div class="wf-loading-dots"><span></span><span></span><span></span></div></div></div></div></div>`;
      }

      const ratios=[{v:'1:1',l:'1:1'},{v:'3:4',l:'3:4'},{v:'4:3',l:'4:3'},{v:'9:16',l:'9:16'}];
      const genders=[{v:'wanita',l:'Wanita'},{v:'pria',l:'Pria'},{v:'custom',l:'Custom'}];
      const markets=[{v:'shopee',l:'Shopee'},{v:'tiktok',l:'TikTok'},{v:'instagram',l:'Instagram'},{v:'youtube',l:'Youtube'}];
      const counts=[1,4,8,16];
       const providers=[
         {v:'gemini',l:'Gemini'},
         {v:'nano-banana-2',l:'Nano Banana 2'},
         {v:'nano-banana-2-lite',l:'Nano Banana 2 Lite'},
         {v:'nano-banana-pro',l:'Nano Banana Pro'},
         {v:'imagen-4',l:'Imagen 4'},
         {v:'imagen-4-ultra',l:'Imagen 4 Ultra'},
         {v:'imagen-4-fast',l:'Imagen 4 Fast'},
         {v:'chatgpt',l:'ChatGPT'},
         {v:'9router',l:'9Router (DALL-E 3)'},
         {v:'google-ai-studio',l:'Google AI Studio'},
         {v:'fal-ai',l:'Fal.ai'},
         {v:'pixazo',l:'Pixazo'},
         {v:'json2video',l:'JSON2Video'}
       ];

      const uploadHTML=(type,title)=>`
        <div class="form-group">
          <label class="form-label">${title}</label>
          ${d[type]?`<img src="${d[type]}" class="wf-preview-img" alt="${title}"><button class="btn-wf-small" data-action="af-remove-image" data-type="${type}" style="margin:0 auto 16px;display:flex"><i data-lucide="x"></i> Hapus Gambar</button>`
          :`<div class="wf-upload-zone" id="afUpload${type}" data-action="af-browse-image" data-type="${type}" style="padding:30px 20px">
              <i data-lucide="upload-cloud"></i>
              <div class="upload-title">Drag & Drop, Klik, atau Paste (Ctrl+V)</div>
              <div class="upload-desc">Format JPG, PNG. Maks 10MB</div>
            </div>
            <input type="file" id="afFile${type}" accept="image/jpeg,image/png" style="display:none">`}
        </div>`;

      return `<div class="animate-fade-in"><h1 class="page-title">AI Affiliate</h1><p class="page-subtitle">Generate foto model afiliasi dengan produk kamu.</p>
        <div class="workflow-container"><div class="wf-step-card">
          
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-bottom:24px">
            ${uploadHTML('productImage','1. Upload Produk')}
            ${uploadHTML('modelImage','2. Model Referensi')}
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;margin-bottom:20px">
            <div class="form-group">
              <label class="form-label">Rasio Output</label>
              <div class="btn-group" id="afRatioGroup">
                ${ratios.map(r=>`<button class="btn-group-item ${d.ratio===r.v?'active':''}" data-action="af-select" data-cat="ratio" data-val="${r.v}">${r.l}</button>`).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Gender Model</label>
              <div class="btn-group" id="afGenderGroup">
                ${genders.map(g=>`<button class="btn-group-item ${d.gender===g.v?'active':''}" data-action="af-select" data-cat="gender" data-val="${g.v}">${g.l}</button>`).join('')}
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Jumlah Generate</label>
              <div class="btn-group" id="afCountGroup">
                ${counts.map(c=>`<button class="btn-group-item ${d.count===c?'active':''}" data-action="af-select" data-cat="count" data-val="${c}">${c}</button>`).join('')}
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Marketplace Target</label>
            <div class="btn-group" id="afMarketGroup" style="flex-wrap:wrap">
              ${markets.map(m=>`<button class="btn-group-item ${d.marketplaces.includes(m.v)?'active':''}" data-action="af-toggle-market" data-val="${m.v}">${m.l}</button>`).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Provider AI</label>
            <select class="form-select" id="afProviderSelect">
              ${providers.map(p=>providerOptionHTML(p.v,p.l,d.provider)).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Prompt Gambar (Deskripsi Hasil)</label>
            ${renderPromptSelector('ai-affiliate','afPromptTemplate','afImagePrompt','afPromptIndicator')}
            <textarea class="form-textarea" id="afImagePrompt" rows="3" data-prompt-textarea placeholder="Contoh: Foto produk dipegang model dengan gaya kasual, latar pantai, pencahayaan natural, warna cerah...">${esc(d.imagePrompt)}</textarea>
          </div>

          <button id="afGenerateBtnTest" class="btn-generate ripple-container" data-action="af-generate" ${(!d.productImage||!d.modelImage)?'disabled style="opacity:0.4;pointer-events:none;animation:none"':''}>
            <i data-lucide="sparkles"></i> Generate Foto
          </button>

          ${d.generatedImages.length?`
            <div style="margin-top:32px">
              <label class="form-label">Hasil Generate</label>
              <div class="ap-gallery-grid">
                ${d.generatedImages.map((img,idx)=>`<div class="ap-gallery-item"><img src="${resolveMediaUrl(img)}" alt="Result"><div class="ap-gallery-label">Affiliate</div><div class="ap-gallery-actions"><button class="gallery-action-btn" data-action="af-download" title="Download"><i data-lucide="download"></i></button><button class="gallery-action-btn" data-action="af-send-to-video" data-index="${idx}" title="Generate Video"><i data-lucide="clapperboard"></i></button></div></div>`).join('')}
              </div>
            </div>
          `:''}

        </div></div></div>`;
    }

    /* ============================================
       IMAGE EDITING
       ============================================ */
    const EDIT_TOOL_PROMPTS={
      'remove-bg':'Remove the background completely. Use a clean white professional studio background.',
      'upscale':'Upscale and enhance image quality with sharper details and clarity.',
      'inpaint':'Inpaint and refine the selected areas while keeping the rest of the image natural.',
      'outpaint':'Extend the canvas outward with content that matches the existing scene.',
      'replace':'Replace the targeted object while preserving lighting and perspective.',
      'expand':'Expand the image borders with seamless matching background and context.'
    };

    function pgImgEdit(){
      const preview=S.editLoading
        ?`<div class="wf-loading" style="padding:40px"><div class="wf-loading-spinner"></div><div class="wf-loading-text">Editing image...</div></div>`
        :S.editingImage
          ?`<img src="${resolveMediaUrl(S.editingImage)}" alt="Preview">`
          :`<div class="empty-state"><i data-lucide="upload-cloud"></i><div class="empty-title">Upload an Image</div><div class="empty-desc">Upload an image to start editing</div><button class="btn-add" data-action="browse-edit-image" style="display:inline-flex;margin-top:12px"><i data-lucide="upload"></i> Upload Image</button></div>`;
      const previewActions=S.editingImage&&!S.editLoading?`<div style="position:absolute;bottom:16px;left:16px;right:16px;display:flex;gap:8px;flex-wrap:wrap;justify-content:center">${S.editingOriginal&&S.editingImage!==S.editingOriginal?`<button class="btn-wf-small" data-action="edit-restore-original"><i data-lucide="rotate-ccw"></i> Original</button>`:''}<button class="btn-wf-small gold" data-action="edit-download"><i data-lucide="download"></i> Download</button></div>`:'';
      const canApply=S.editingImage&&!S.editLoading;
      return `<div class="animate-fade-in"><h1 class="page-title">Image Editing</h1><p class="page-subtitle">Enhance, transform, and edit your images with AI tools.</p><div class="editing-layout"><div class="editing-preview" id="editingPreview">${preview}${previewActions}<input type="file" id="editFileInput" accept="image/*" style="display:none"></div>
      <div class="editing-tools"><div class="form-group"><label class="form-label">Upload Image</label><div class="wf-upload-zone" id="editUploadZone" data-action="browse-edit-image" style="padding:20px;margin-bottom:0"><i data-lucide="upload-cloud"></i><div class="upload-title">Drop or click to upload</div><div class="upload-desc">PNG, JPG up to 10MB</div></div></div>
        <div style="margin-top:20px"><label class="form-label">Editing Tools</label>${[{t:'remove-bg',l:'Remove Background',i:'scissors'},{t:'upscale',l:'Upscale Image',i:'maximize-2'},{t:'inpaint',l:'Inpaint',i:'paintbrush'},{t:'outpaint',l:'Outpaint',i:'expand'},{t:'replace',l:'Replace Object',i:'replace'},{t:'expand',l:'Expand Image',i:'scan'}].map(t=>`<button class="tool-btn ${S.activeTool===t.t?'active':''}" data-action="select-tool" data-tool="${t.t}"><i data-lucide="${t.i}"></i> ${t.l}</button>`).join('')}</div>
        <div class="form-group" style="margin-top:20px"><label class="form-label">Edit Instruction</label><textarea class="form-textarea" id="editPromptInput" rows="4" placeholder="Contoh: ubah background menjadi studio putih profesional">${esc(S.editPrompt)}</textarea></div>
        <div style="margin-top:20px"><button class="btn-generate ripple-container" id="applyEditBtn" data-action="apply-edit" ${!canApply?'disabled style="opacity:0.4;pointer-events:none;animation:none"':''}>${S.editLoading?'<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(0,0,0,0.2);border-top-color:#000;border-radius:50%;animation:spin 0.8s linear infinite"></span> Editing...':'<i data-lucide="sparkles"></i> Apply Edit'}</button></div></div></div></div>`;
    }

    async function applyImageEdit(){
      const prompt=(document.getElementById('editPromptInput')?.value||S.editPrompt||'').trim();
      if(!S.editingImage){showToast('Gambar Diperlukan','Upload gambar terlebih dahulu.','warning');return;}
      if(!prompt){showToast('Instruksi Diperlukan','Masukkan instruksi edit.','warning');return;}
      if(S.editLoading)return;
      if(S.credits<15){showToast('Insufficient Credits','Need 15 credits.','error');return;}
      S.editPrompt=prompt;
      S.editLoading=true;
      renderPage();
      try{
        const res=await fetch(`${FLOW_API_BASE}/api/image/edit`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({image:S.editingImage,prompt})
        });
        const data=await res.json().catch(()=>({}));
        if(!res.ok||!data.success)throw new Error(data.message||'Proses editing gagal. Silakan coba lagi.');
        S.editingImage=data.url;
        S.credits-=15;
        const cc=document.getElementById('creditsCount');
        if(cc)cc.textContent=fmtN(S.credits);
        showToast('Edit Applied','Gambar berhasil diedit.','success');
      }catch(err){
        showToast('Error',err.message||'Proses editing gagal. Silakan coba lagi.','error');
      }finally{
        S.editLoading=false;
        renderPage();
      }
    }

    /* ============================================
       CHARACTER / PRODUCT / PROMPT / HISTORY / SETTINGS
       ============================================ */
    function pgCharLib(){const q=S.searchQuery.toLowerCase();const f=S.characters.filter(c=>c.name.toLowerCase().includes(q)||c.role.toLowerCase().includes(q));return `<div class="animate-fade-in"><h1 class="page-title">Character Library</h1><p class="page-subtitle">Manage your AI character profiles.</p><div class="library-header"><div class="library-search"><span class="search-icon"><i data-lucide="search"></i></span><input type="text" placeholder="Search characters..." id="charSearch" value="${esc(S.searchQuery)}"></div><button class="btn-add ripple-container" data-action="add-character"><i data-lucide="plus"></i> Add Character</button></div><div class="library-grid">${f.map((c,i)=>`<div class="library-card animate-fade-in-up delay-${Math.min(i+1,8)}"><div class="library-card-avatar"><img src="${c.avatar}" alt="${esc(c.name)}" loading="lazy"></div><div class="library-card-name">${esc(c.name)}</div><div class="library-card-role">${esc(c.role)}</div><div class="library-card-actions"><button class="card-action-btn" data-action="edit-character" data-id="${c.id}"><i data-lucide="pencil"></i> Edit</button><button class="card-action-btn danger" data-action="delete-character" data-id="${c.id}"><i data-lucide="trash-2"></i> Delete</button></div></div>`).join('')}</div></div>`}
    function pgProdLib(){const q=S.searchQuery.toLowerCase();const f=S.products.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q));return `<div class="animate-fade-in"><h1 class="page-title">Product Library</h1><p class="page-subtitle">Manage your product catalog.</p><div class="library-header"><div class="library-search"><span class="search-icon"><i data-lucide="search"></i></span><input type="text" placeholder="Search products..." id="prodSearch" value="${esc(S.searchQuery)}"></div><div style="display:flex;align-items:center;gap:8px"><select class="form-select" id="prodCatFilter" style="width:auto;height:42px;min-width:150px"><option value="">All Categories</option><option>Electronics</option><option>Beauty</option><option>Wearables</option><option>Food & Drink</option><option>Fashion</option><option>Home Office</option></select><button class="btn-add ripple-container" data-action="add-product"><i data-lucide="plus"></i> Add Product</button></div></div><div class="library-grid" id="prodGrid">${f.map((p,i)=>`<div class="library-card animate-fade-in-up delay-${Math.min(i+1,8)}" style="text-align:left"><div class="product-card-thumb"><img src="${p.thumbnail}" alt="${esc(p.name)}" loading="lazy"></div><span class="product-card-category">${esc(p.category)}</span><div class="library-card-name" style="text-align:left">${esc(p.name)}</div><div class="library-card-actions" style="justify-content:flex-start;margin-top:12px"><button class="card-action-btn" data-action="view-product" data-id="${p.id}"><i data-lucide="eye"></i> Detail</button><button class="card-action-btn" data-action="gen-product-prompt" data-id="${p.id}"><i data-lucide="sparkles"></i> Generate</button><button class="card-action-btn danger" data-action="delete-product" data-id="${p.id}"><i data-lucide="trash-2"></i></button></div></div>`).join('')}</div></div>`}
    function pgPromptLib(){const cats=['commercial','tiktok','education','luxury','podcast','review','unboxing','studio'];const ci={commercial:'tv',tiktok:'smartphone',education:'graduation-cap',luxury:'crown',podcast:'mic',review:'star',unboxing:'gift',studio:'camera'};const cl={commercial:'Commercial',tiktok:'TikTok',education:'Education',luxury:'Luxury',podcast:'Podcast',review:'Review',unboxing:'Unboxing',studio:'Studio'};
      if(S.currentPromptCategory){const cat=S.currentPromptCategory,fp=S.prompts.filter(p=>p.category===cat);return `<div class="animate-fade-in"><div style="display:flex;align-items:center;gap:12px;margin-bottom:24px"><button class="btn-action ripple-container" data-action="back-prompts" style="padding:8px 14px"><i data-lucide="arrow-left"></i> Back</button><h1 class="page-title" style="margin-bottom:0">${cl[cat]} Prompts</h1></div><p class="page-subtitle">Click a prompt to use it in AI Video.</p><div class="prompt-list">${fp.map((p,i)=>`<div class="prompt-list-item animate-fade-in-up delay-${Math.min(i+1,8)}" data-action="use-prompt" data-prompt="${esc(p.prompt)}"><div class="prompt-item-title">${esc(p.title)}</div><div class="prompt-item-text">${esc(p.prompt)}</div><div class="prompt-item-meta"><span>${cl[p.category]}</span><span>${p.count} uses</span></div></div>`).join('')}</div></div>`;}
      return `<div class="animate-fade-in"><h1 class="page-title">Prompt Library</h1><p class="page-subtitle">Browse professional prompt templates.</p><div class="prompt-categories">${cats.map((cat,i)=>{const cp=S.prompts.filter(p=>p.category===cat);const tc=cp.reduce((s,p)=>s+p.count,0);return `<div class="prompt-cat-card cat-${cat} animate-fade-in-up delay-${Math.min(i+1,8)}" data-action="open-prompt-cat" data-category="${cat}"><div class="cat-icon"><i data-lucide="${ci[cat]}"></i></div><div class="cat-name">${cl[cat]}</div><div class="cat-count">${cp.length} prompts &middot; ${tc} uses</div></div>`;}).join('')}</div></div>`}
    function pgHistory(){let f=[...S.history];if(S.currentProject){const pn=WORKSPACES.find(p=>p.id===S.currentProject)?.name;if(pn)f=f.filter(h=>h.project===pn);}if(S.historyFilter!=='all')f=f.filter(h=>h.type===S.historyFilter);if(S.searchQuery){const q=S.searchQuery.toLowerCase();f=f.filter(h=>h.prompt.toLowerCase().includes(q)||h.provider.toLowerCase().includes(q));}const pn=S.currentProject?WORKSPACES.find(p=>p.id===S.currentProject)?.name:null;
      return `<div class="animate-fade-in"><h1 class="page-title">History${pn?' — '+pn:''}</h1><p class="page-subtitle">Browse and manage your generated content.</p><div class="history-filters"><div class="library-search" style="flex:1;min-width:200px"><span class="search-icon"><i data-lucide="search"></i></span><input type="text" placeholder="Search history..." id="histSearch" value="${esc(S.searchQuery)}"></div><button class="filter-chip ${S.historyFilter==='all'?'active':''}" data-action="filter-history" data-filter="all">All</button><button class="filter-chip ${S.historyFilter==='video'?'active':''}" data-action="filter-history" data-filter="video">Videos</button><button class="filter-chip ${S.historyFilter==='image'?'active':''}" data-action="filter-history" data-filter="image">Images</button></div>
        <div class="history-grid">${f.map((h,i)=>`<div class="history-card animate-fade-in-up delay-${Math.min(i+1,8)}"><div class="history-card-thumb"><img src="${h.thumbnail}" alt="${esc(h.prompt)}" loading="lazy"><span class="type-badge ${h.type}">${h.type}</span><div class="card-overlay-actions"><button class="gallery-action-btn" data-action="download-history" data-id="${h.id}"><i data-lucide="download"></i></button><button class="gallery-action-btn danger" data-action="delete-history" data-id="${h.id}"><i data-lucide="trash-2"></i></button></div></div><div class="history-card-body"><div class="history-card-provider">${esc(h.provider)}</div><div class="history-card-prompt">${esc(h.prompt)}</div><div class="history-card-date">${fmtD(h.date)}</div></div></div>`).join('')}</div></div>`}
    function pgSettings(){const s=S.settings;return `<div class="animate-fade-in"><h1 class="page-title">Settings</h1><p class="page-subtitle">Configure API keys and preferences.</p><div class="settings-layout">
      <div class="settings-section animate-fade-in-up delay-1"><div class="settings-section-title">API Keys</div><div class="settings-section-desc">Connect your AI provider API keys.</div>${[['Google Veo','googleVeoKey'],['Gemini','geminiKey'],['OpenAI','openaiKey'],['Runway','runwayKey'],['Kling','klingKey'],['Pika','pikaKey'],['Hailuo','hailuoKey'],['Fal.ai','falKey'],['Pixazo','pixazoKey'],['JSON2Video','json2videoKey']].map(([l,k])=>`<div class="settings-field"><label>${l} API Key</label><input type="password" id="sett${k.charAt(0).toUpperCase()+k.slice(1)}" value="${esc(s[k])}" placeholder="Enter ${l} key"></div>`).join('')}</div>
      <div class="settings-section animate-fade-in-up delay-2"><div class="settings-section-title">Preferences</div><div class="settings-section-desc">Customize your workspace.</div><div class="toggle-row"><div><div class="toggle-label-text">Dark Mode</div><div class="toggle-label-desc">Use dark theme</div></div><div class="toggle-switch ${s.darkMode?'active':''}" data-action="toggle-setting" data-key="darkMode"></div></div><div class="toggle-row"><div><div class="toggle-label-text">Notifications</div><div class="toggle-label-desc">Receive generation notifications</div></div><div class="toggle-switch active" data-action="toggle-setting" data-key="notifications"></div></div><div class="settings-field" style="margin-top:16px"><label>Language</label><select id="settLang"><option value="en" ${s.language==='en'?'selected':''}>English</option><option value="id" ${s.language==='id'?'selected':''}>Bahasa Indonesia</option></select></div></div>
      <div class="settings-section animate-fade-in-up delay-3"><div class="settings-section-title">Storage</div><div class="settings-section-desc">Manage local storage.</div><div class="storage-bar-track"><div class="storage-bar-fill" style="width:24%"></div></div><div class="storage-text"><span>2.4 GB used</span><span>10 GB total</span></div></div>
      ${renderSubAccountSection()}
      ${renderPromptManagementSection()}
      <div class="animate-fade-in-up delay-5"><button class="btn-save-settings ripple-container" data-action="save-settings">Save Settings</button></div></div></div>`}

    (function flowHydrate(){try{const raw=localStorage.getItem('tarmocFlowAutosave');if(raw){const d=JSON.parse(raw);S.flow.nodes=d.nodes||[];S.flow.connections=d.connections||[];}}catch{}})();

    /* ============================================
       GLOBAL EVENTS
       ============================================ */
    function bindGlobalEvents(){
      document.getElementById('hamburgerBtn').addEventListener('click',toggleSidebar);
      const collapseBtn=document.getElementById('sidebarCollapseBtn');
      if(collapseBtn)collapseBtn.addEventListener('click',toggleSidebarCollapse);
      document.getElementById('sidebarOverlay').addEventListener('click',closeSidebar);
      document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSidebar();});
      window.addEventListener('resize',applySidebarState);
      document.getElementById('notifBtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('notifDropdown').classList.toggle('show')});
      document.addEventListener('click',e=>{const dd=document.getElementById('notifDropdown');if(dd&&!dd.contains(e.target)&&e.target!==document.getElementById('notifBtn'))dd.classList.remove('show')});
      document.getElementById('creditsBtn').addEventListener('click',()=>showToast('Credits',`You have ${fmtN(S.credits)} credits.`,'info'));
      document.getElementById('themeToggleBtn').addEventListener('click',()=>{S.settings.darkMode=!S.settings.darkMode;applyTheme();});
      document.getElementById('avatarBtn').addEventListener('click',()=>{
        const auth=getAuthState();
        const userName=auth?.name||auth?.username||'John Doe';
        const roleLabel=auth?.role==='main_admin'?'Main Admin':'Sub Admin';
        showModal('Profile',`<div style="text-align:center"><div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--primary-dark),var(--primary));display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#000;margin:0 auto 16px">${userName.charAt(0).toUpperCase()}</div><div style="font-size:18px;font-weight:700">${esc(userName)}</div><div style="font-size:13px;color:var(--text-muted)">${esc(auth?.username||userName)} · ${roleLabel}</div></div>`,`<button class="btn-modal cancel" data-action="close-modal">Close</button><button class="btn-modal danger" data-action="logout-app">Logout</button>`);
      });
      document.getElementById('globalSearch').addEventListener('input',e=>{const q=e.target.value.trim();if(q.length>0){if(!canAccessMenu('history')){showToast('Akses Ditolak','Anda tidak memiliki akses ke menu ini.','error');return;}S.searchQuery=q;if(S.currentPage!=='history')navTo('history');else renderPage();}});
      document.addEventListener('click',handleClick);
    }

    /* ============================================
       GLOBAL CLICK HANDLER
       ============================================ */
    function handleClick(e){
      const t=e.target.closest('[data-action]');if(!t)return;const a=t.dataset.action;
      switch(a){
        case 'toggle-ai-image':{
          const sidebar=document.getElementById('sidebar');
          const iconOnly=sidebar?.classList.contains('collapsed')&&!isMobileNav();
          if(iconOnly){
            S.sidebarAiImageExpanded=true;
            navTo('ai-image');
            break;
          }
          S.sidebarAiImageExpanded=!S.sidebarAiImageExpanded;
          renderSidebar();
          break;
        }
        case 'ai-copy':{const el=document.getElementById(t.dataset.target);wfCopyText(el?.value||el?.textContent||'',t.dataset.target);break;}
        case 'ai-download':{const el=document.getElementById(t.dataset.target);wfDownloadText(el?.value||'',t.dataset.filename||'tarmoc-export.txt');break;}
        case 'ac-generate':void (async()=>{
          const d=acSyncFormFromDOM();
          const err=acValidateForm(d);
          if(err){showToast('Validation',err,'warning');return;}
          if(!hasProvider('geminiKey')){d.error='Gemini API belum dikonfigurasi. Silakan periksa GEMINI_API_KEY pada backend.';renderPage();return;}
          d.loading=true;d.loadingSceneId=null;d.error=null;renderPage();
          try{
            const master=acGetMaster(d.masterId);
            const text=await geminiGenerate(acBuildEpisodePrompt(master,d));
            d.episode=acNormalizeEpisode(acParseGeminiJson(text),d.sceneCount);
            showToast('Episode Ready',`${d.episode.scenes.length} scene dengan prompt unik siap digunakan.`,'success');
          }catch(e){d.error=e.message||'Generate episode gagal.';}
          finally{d.loading=false;d.loadingSceneId=null;renderPage();}
        })();break;
        case 'ac-regenerate-scene':void (async()=>{
          const d=S.academyData;
          if(!d.episode){showToast('Error','Generate episode terlebih dahulu.','warning');return;}
          const sceneId=parseInt(t.dataset.sceneId,10);
          const scene=d.episode.scenes.find(s=>s.id===sceneId);
          if(!scene)return;
          acSyncFormFromDOM();
          if(!hasProvider('geminiKey')){d.error='Gemini API belum dikonfigurasi. Silakan periksa GEMINI_API_KEY pada backend.';renderPage();return;}
          d.loading=true;d.loadingSceneId=sceneId;d.error=null;renderPage();
          try{
            const master=acGetMaster(d.masterId);
            const text=await geminiGenerate(acBuildRegenerateScenePrompt(master,d,d.episode,scene));
            const parsed=acParseGeminiJson(text);
            const updated=Array.isArray(parsed.scenes)?parsed.scenes[0]:parsed;
            scene.title=String(updated.title||scene.title);
            scene.duration=parseInt(updated.duration,10)||scene.duration;
            scene.narration=String(updated.narration||updated.dialogue||scene.narration);
            scene.visualDirection=String(updated.visualDirection||scene.visualDirection);
            scene.cameraDirection=String(updated.cameraDirection||scene.cameraDirection);
            scene.videoPrompt=String(updated.videoPrompt||updated.prompt||'').trim()||scene.videoPrompt;
            showToast('Scene Regenerated',`Scene ${String(sceneId).padStart(2,'0')} diperbarui.`,'success');
          }catch(e){d.error=e.message||'Regenerate scene gagal.';}
          finally{d.loading=false;d.loadingSceneId=null;renderPage();}
        })();break;
        case 'ac-edit-scene':{
          const d=S.academyData;
          const sceneId=parseInt(t.dataset.sceneId,10);
          const scene=d.episode?.scenes.find(s=>s.id===sceneId);
          if(!scene)break;
          showModal(`Edit Prompt — Scene ${String(sceneId).padStart(2,'0')}`,`<div class="settings-field"><label>Video Prompt</label><textarea id="acEditPrompt" rows="10">${esc(scene.videoPrompt)}</textarea></div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="ac-confirm-edit-scene" data-scene-id="${sceneId}">Save Prompt</button>`);
          break;
        }
        case 'ac-confirm-edit-scene':{
          const d=S.academyData;
          const sceneId=parseInt(t.dataset.sceneId,10);
          const scene=d.episode?.scenes.find(s=>s.id===sceneId);
          const val=document.getElementById('acEditPrompt')?.value.trim();
          if(scene&&val){scene.videoPrompt=val;closeModal();renderPage();showToast('Prompt Updated',`Scene ${String(sceneId).padStart(2,'0')} prompt disimpan.`,'success');}
          break;
        }
        case 'ac-send-scene-video':{
          const d=S.academyData;
          const sceneId=parseInt(t.dataset.sceneId,10);
          const ta=document.getElementById(`ac-scene-prompt-${sceneId}`);
          const scene=d.episode?.scenes.find(s=>s.id===sceneId);
          const prompt=(ta?.value||scene?.videoPrompt||'').trim();
          if(!prompt){showToast('Prompt Required','Prompt scene kosong.','warning');return;}
          if(scene)scene.videoPrompt=prompt;
          sendToAIVideo({masterPrompt:prompt});
          break;
        }
        case 'ac-save-scene-prompt':{
          const d=S.academyData;
          const sceneId=parseInt(t.dataset.sceneId,10);
          const scene=d.episode?.scenes.find(s=>s.id===sceneId);
          if(!scene)break;
          savePromptToLibrary(`Academy ${d.title||'Episode'} — Scene ${String(sceneId).padStart(2,'0')}`,scene.videoPrompt);
          break;
        }
        case 'ac-copy-episode':{const el=document.getElementById('acEpisodeExport');wfCopyText(el?.value||'','Episode');break;}
        case 'ac-download-episode':{const el=document.getElementById('acEpisodeExport');wfDownloadText(el?.value||'',`academy-${S.academyData.episode?.episodeNumber||'episode'}.txt`);break;}
        case 'sb-save-prompt':savePromptToLibrary(`Storyboard ${S.storyboardData.title||''}`.trim(),S.storyboardData.masterPrompt||S.storyboardData.result);break;
        case 'pc-save-prompt':savePromptToLibrary(`Podcast ${S.podcastData.title||S.podcastData.topic||''}`.trim(),S.podcastData.masterPrompt||S.podcastData.result);break;
        case 'sb-generate':void (async()=>{
          const d=S.storyboardData;
          d.title=document.getElementById('sbTitle')?.value.trim()||'';
          d.subject=document.getElementById('sbSubject')?.value.trim()||'';
          d.concept=document.getElementById('sbConcept')?.value.trim()||'';
          d.duration=document.getElementById('sbDuration')?.value.trim()||'';
          d.aspectRatio=document.getElementById('sbAspect')?.value||'16:9';
          d.scenes=parseInt(document.getElementById('sbScenes')?.value)||4;
          d.visualStyle=document.getElementById('sbStyle')?.value.trim()||'Cinematic';
          if(!d.title&&!d.subject){showToast('Validation','Project title atau subject wajib diisi.','warning');return;}
          if(!hasProvider('geminiKey')){showToast('API Key Missing','Gemini belum dikonfigurasi di backend.','error');return;}
          d.loading=true;d.error=null;d.result=null;renderPage();
          try{
            const prompt=`Create a visual storyboard with ${d.scenes} scenes.\nProject: ${d.title}\nSubject: ${d.subject}\nConcept: ${d.concept}\nDuration: ${d.duration}\nAspect Ratio: ${d.aspectRatio}\nVisual Style: ${d.visualStyle}\n\nFor EACH scene include: Scene number, Scene description, Camera shot, Camera movement, Subject/action, Environment, Lighting, Dialogue/Voice-over, Image prompt, Video prompt.\n\nEnd with section MASTER VIDEO PROMPT combining all scenes into one cinematic video prompt.`;
            d.result=await geminiGenerate(prompt);
            const mp=d.result.match(/MASTER VIDEO PROMPT[^\n]*\n([\s\S]*?)$/i);
            d.masterPrompt=mp?mp[1].trim():d.result.slice(-800);
          }catch(err){d.error=err.message;d.result=null;}
          finally{d.loading=false;renderPage();}
        })();break;
        case 'sb-send-video':sendToAIVideo({masterPrompt:S.storyboardData.masterPrompt||S.storyboardData.result,aspectRatio:S.storyboardData.aspectRatio});break;
        case 'pc-generate':void (async()=>{
          const d=S.podcastData;
          d.title=document.getElementById('pcTitle')?.value.trim()||'';
          d.topic=document.getElementById('pcTopic')?.value.trim()||'';
          d.host=document.getElementById('pcHost')?.value.trim()||'';
          d.guest=document.getElementById('pcGuest')?.value.trim()||'';
          d.duration=document.getElementById('pcDuration')?.value.trim()||'';
          d.tone=document.getElementById('pcTone')?.value.trim()||'';
          d.language=document.getElementById('pcLanguage')?.value.trim()||'';
          d.audience=document.getElementById('pcAudience')?.value.trim()||'';
          d.brief=document.getElementById('pcBrief')?.value.trim()||'';
          if(!d.topic&&!d.title){showToast('Validation','Topic atau title wajib diisi.','warning');return;}
          if(!hasProvider('geminiKey')){showToast('API Key Missing','Gemini belum dikonfigurasi di backend.','error');return;}
          d.loading=true;d.error=null;d.result=null;renderPage();
          try{
            const prompt=`Create a podcast script in ${d.language}.\nPodcast Title: ${d.title}\nTopic: ${d.topic}\nHost: ${d.host||'Host'}\nGuest: ${d.guest||'Guest'}\nDuration: ${d.duration}\nTone: ${d.tone}\nTarget Audience: ${d.audience}\nBrief: ${d.brief}\n\nInclude: Episode title, Hook, Introduction, Host script, Guest script, Conversation, Key points, Closing, CTA.\nEnd with MASTER VIDEO PROMPT to turn this podcast into a promotional video.`;
            d.result=await geminiGenerate(prompt);
            const mp=d.result.match(/MASTER VIDEO PROMPT[^\n]*\n([\s\S]*?)$/i);
            d.masterPrompt=mp?mp[1].trim():d.result.slice(-800);
          }catch(err){d.error=err.message;d.result=null;}
          finally{d.loading=false;renderPage();}
        })();break;
        case 'pc-send-video':sendToAIVideo({masterPrompt:S.podcastData.masterPrompt||S.podcastData.result});break;
        case 'ch-generate':
        case 'ch-regenerate':void (async()=>{
          const d=S.characterData;
          d.name=document.getElementById('chName')?.value.trim()||'';
          d.gender=document.getElementById('chGender')?.value.trim()||'';
          d.age=document.getElementById('chAge')?.value.trim()||'';
          d.appearance=document.getElementById('chAppearance')?.value.trim()||'';
          d.hair=document.getElementById('chHair')?.value.trim()||'';
          d.outfit=document.getElementById('chOutfit')?.value.trim()||'';
          d.personality=document.getElementById('chPersonality')?.value.trim()||'';
          d.pose=document.getElementById('chPose')?.value.trim()||'';
          d.artStyle=document.getElementById('chArtStyle')?.value.trim()||'';
          d.background=document.getElementById('chBackground')?.value.trim()||'';
          d.extra=document.getElementById('chExtra')?.value.trim()||'';
          if(!d.name){showToast('Validation','Character name wajib diisi.','warning');return;}
          if(!hasProvider('geminiKey')){showToast('API Key Missing','Gemini belum dikonfigurasi di backend.','error');return;}
          d.loading=true;d.error=null;renderPage();
          try{
            const specPrompt=`Design an AI character profile.\nName: ${d.name}\nGender: ${d.gender}\nAge: ${d.age}\nAppearance: ${d.appearance}\nHair: ${d.hair}\nOutfit: ${d.outfit}\nPersonality: ${d.personality}\nPose: ${d.pose}\nArt Style: ${d.artStyle}\nBackground: ${d.background}\nExtra: ${d.extra}\n\nReturn sections:\nDESCRIPTION\nMASTER PROMPT (detailed image generation prompt)\nNEGATIVE PROMPT\nATTRIBUTES (Gender, Age, Style as bullet list)\nVIDEO PROMPT (for AI video featuring this character)`;
            const text=await geminiGenerate(specPrompt);
            const desc=text.match(/DESCRIPTION[^\n]*\n([\s\S]*?)(?=MASTER PROMPT|$)/i)?.[1]?.trim()||'';
            const master=text.match(/MASTER PROMPT[^\n]*\n([\s\S]*?)(?=NEGATIVE PROMPT|$)/i)?.[1]?.trim()||'';
            const negative=text.match(/NEGATIVE PROMPT[^\n]*\n([\s\S]*?)(?=ATTRIBUTES|VIDEO PROMPT|$)/i)?.[1]?.trim()||'';
            const video=text.match(/VIDEO PROMPT[^\n]*\n([\s\S]*?)$/i)?.[1]?.trim()||master;
            d.result={description:desc,masterPrompt:master,negativePrompt:negative,videoPrompt:video,attributes:{Gender:d.gender||'-',Age:d.age||'-',Style:d.artStyle||'-'}};
            d.previewUrl=null;
            if(master&&hasProvider('geminiKey')){
              const res=await fetch(`${FLOW_API_BASE}/api/image`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:master})});
              const data=await res.json().catch(()=>({}));
              if(res.ok&&data.url)d.previewUrl=resolveMediaUrl(data.url);
            }
          }catch(err){d.error=err.message;d.result=null;d.previewUrl=null;}
          finally{d.loading=false;renderPage();}
        })();break;
        case 'ch-save':{
          const d=S.characterData;
          if(!d.result?.masterPrompt){showToast('Nothing to Save','Generate character terlebih dahulu.','warning');break;}
          S.characters.push({id:genId(),name:d.name||'AI Character',role:d.result.description?.slice(0,80)||d.result.masterPrompt.slice(0,80),avatar:d.previewUrl||`https://picsum.photos/seed/char${Date.now()}/200/200`});
          showToast('Saved',`"${d.name}" ditambahkan ke Character Library.`,'success');
          break;
        }
        case 'ch-send-video':sendToAIVideo({masterPrompt:S.characterData.result?.videoPrompt||S.characterData.result?.masterPrompt,imageUrl:S.characterData.previewUrl});break;
        case 'navigate':S.searchQuery='';S.currentPromptCategory=null;navTo(t.dataset.page);break;
        case 'select-project':S.currentProject=t.dataset.project;renderSidebar();navTo('history');break;
        case 'toast-close':rmToast(t.closest('.toast'));break;
        case 'clear-notifs':S.notifications=[];renderNotifs();showToast('Notifications','All marked as read.','info');break;
        case 'close-modal':closeModal();break;
        case 'logout-app':clearAuthState();closeModal();window.location.href='./login.html';break;
        case 'browse-ref':{const s=parseInt(t.closest('.ref-image-slot').dataset.slot);const i=document.getElementById('refFileInput');i.onchange=ev=>{Array.from(ev.target.files).forEach((f,idx)=>{const ts=s+idx;if(ts<4){const r=new FileReader();r.onload=re=>{S.refImages[ts]=re.target.result;renderPage()};r.readAsDataURL(f);}});ev.target.value='';};i.click();break;}
        case 'remove-ref':{e.stopPropagation();S.refImages[parseInt(t.dataset.slot)]=null;renderPage();break;}
        case 'download-history':showToast('Download','File download started.','success');break;
        case 'delete-history':{const id=parseInt(t.dataset.id);showModal('Delete Item','<p style="font-size:14px;color:var(--text-secondary)">Are you sure? This cannot be undone.</p>',`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="confirm-del" data-id="${id}">Delete</button>`);break;}
        case 'confirm-del':{S.history=S.history.filter(h=>h.id!==parseInt(t.dataset.id));closeModal();renderPage();showToast('Deleted','Item deleted.','success');break;}
        case 'browse-edit-image':{const i=document.getElementById('editFileInput');if(!i)break;i.onchange=ev=>{const f=ev.target.files[0];if(f){const r=new FileReader();r.onload=re=>{S.editingOriginal=re.target.result;S.editingImage=re.target.result;S.editPrompt='';renderPage()};r.readAsDataURL(f);}ev.target.value='';};i.click();break;}
        case 'select-tool':{S.activeTool=t.dataset.tool;if(EDIT_TOOL_PROMPTS[t.dataset.tool])S.editPrompt=EDIT_TOOL_PROMPTS[t.dataset.tool];renderPage();break;}
        case 'apply-edit':applyImageEdit();break;
        case 'edit-download':{if(!S.editingImage){showToast('Error','Tidak ada gambar untuk diunduh.','error');return;}const a=document.createElement('a');a.href=resolveMediaUrl(S.editingImage);a.download=`tarmoc-edit-${Date.now()}.png`;a.click();showToast('Download','Gambar diunduh.','success');break;}
        case 'edit-restore-original':{if(!S.editingOriginal){showToast('Error','Gambar original tidak tersedia.','error');return;}S.editingImage=S.editingOriginal;renderPage();showToast('Original','Kembali ke gambar original.','info');break;}
        case 'add-character':showModal('Add Character',`<div class="settings-field"><label>Name</label><input type="text" id="ncName" placeholder="Character name"></div><div class="settings-field"><label>Role</label><input type="text" id="ncRole" placeholder="e.g. Host, Reviewer"></div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-add-char">Add</button>`);break;
        case 'confirm-add-char':{const n=document.getElementById('ncName').value.trim(),r=document.getElementById('ncRole').value.trim();if(!n||!r){showToast('Validation','Fill all fields.','warning');return;}S.characters.push({id:genId(),name:n,role:r,avatar:`https://picsum.photos/seed/char${Date.now()}/200/200`});closeModal();renderPage();showToast('Added',`"${n}" added.`,'success');break;}
        case 'edit-character':{const c=S.characters.find(c=>c.id===parseInt(t.dataset.id));if(!c)break;showModal('Edit Character',`<div class="settings-field"><label>Name</label><input type="text" id="ecName" value="${esc(c.name)}"></div><div class="settings-field"><label>Role</label><input type="text" id="ecRole" value="${esc(c.role)}"></div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-edit-char" data-id="${c.id}">Save</button>`);break;}
        case 'confirm-edit-char':{const c=S.characters.find(c=>c.id===parseInt(t.dataset.id));if(!c)break;c.name=document.getElementById('ecName').value.trim();c.role=document.getElementById('ecRole').value.trim();closeModal();renderPage();showToast('Updated',`"${c.name}" updated.`,'success');break;}
        case 'delete-character':{const c=S.characters.find(c=>c.id===parseInt(t.dataset.id));if(!c)break;showModal('Delete Character',`<p style="font-size:14px;color:var(--text-secondary)">Delete <strong>${esc(c.name)}</strong>?</p>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="confirm-del-char" data-id="${c.id}">Delete</button>`);break;}
        case 'confirm-del-char':{const c=S.characters.find(c=>c.id===parseInt(t.dataset.id));S.characters=S.characters.filter(c=>c.id!==parseInt(t.dataset.id));closeModal();renderPage();showToast('Deleted','Character deleted.','success');break;}
        case 'add-product':showModal('Add Product',`<div class="settings-field"><label>Name</label><input type="text" id="npName" placeholder="Product name"></div><div class="settings-field"><label>Category</label><select id="npCat"><option>Electronics</option><option>Beauty</option><option>Wearables</option><option>Food & Drink</option><option>Fashion</option><option>Home Office</option></select></div>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="confirm-add-prod">Add</button>`);break;
        case 'confirm-add-prod':{const n=document.getElementById('npName').value.trim();if(!n){showToast('Validation','Enter a name.','warning');return;}S.products.push({id:genId(),name:n,category:document.getElementById('npCat').value,thumbnail:`https://picsum.photos/seed/prod${Date.now()}/400/300`});closeModal();renderPage();showToast('Added',`"${n}" added.`,'success');break;}
        case 'view-product':{const p=S.products.find(p=>p.id===parseInt(t.dataset.id));if(!p)break;showModal('Product Detail',`<div style="text-align:center"><img src="${p.thumbnail}" alt="${esc(p.name)}" style="width:100%;max-width:320px;border-radius:var(--radius-sm);margin-bottom:16px"><div style="font-size:18px;font-weight:700;margin-bottom:6px">${esc(p.name)}</div><span class="product-card-category">${esc(p.category)}</span></div>`,`<button class="btn-modal cancel" data-action="close-modal">Close</button>`);break;}
        case 'gen-product-prompt':{const p=S.products.find(p=>p.id===parseInt(t.dataset.id));if(!p)break;S.videoPrompt=`A professional product video showcasing ${p.name}. Cinematic lighting, smooth camera movement, clean background. Commercial quality, 4K.`;navTo('ai-video');showToast('Prompt Ready','Loaded into AI Video.','info');break;}
        case 'delete-product':{const p=S.products.find(p=>p.id===parseInt(t.dataset.id));if(!p)break;showModal('Delete Product',`<p style="font-size:14px;color:var(--text-secondary)">Delete <strong>${esc(p.name)}</strong>?</p>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="confirm-del-prod" data-id="${p.id}">Delete</button>`);break;}
        case 'confirm-del-prod':{const p=S.products.find(p=>p.id===parseInt(t.dataset.id));S.products=S.products.filter(p=>p.id!==parseInt(t.dataset.id));closeModal();renderPage();showToast('Deleted','Product deleted.','success');break;}
        case 'open-prompt-cat':S.currentPromptCategory=t.dataset.category;renderPage();break;
        case 'back-prompts':S.currentPromptCategory=null;renderPage();break;
        case 'use-prompt':S.videoPrompt=t.dataset.prompt;navTo('ai-video');showToast('Prompt Loaded','Loaded into AI Video.','success');break;
        case 'filter-history':S.historyFilter=t.dataset.filter;renderPage();break;
        case 'play-video':showToast('Playing','Video playback started.','info');break;
        case 'download-video':showToast('Download','Video download started.','success');break;
        case 'regenerate-video':startVG();break;
        case 'toggle-setting':{if(t.dataset.key==='darkMode'){S.settings.darkMode=!S.settings.darkMode;applyTheme();}t.classList.toggle('active');break;}
        case 'save-settings':{showModal('Settings Saved',`<div style="text-align:center;padding:10px 0"><div style="width:56px;height:56px;border-radius:50%;background:rgba(245,158,11,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--primary)"><i data-lucide="check-circle" style="width:28px;height:28px"></i></div><div style="font-size:16px;font-weight:700;margin-bottom:6px">All Settings Saved</div></div>`,`<button class="btn-modal confirm" data-action="close-modal">Done</button>`);lucide.createIcons({nodes:[document.getElementById('modalContainer')]});break;}
        case 'create-sub-account':showCreateSubAccountModal();break;
        case 'perm-select-all':document.querySelectorAll('input[name="saPerm"]').forEach(el=>{el.checked=true});break;
        case 'perm-clear-all':document.querySelectorAll('input[name="saPerm"]').forEach(el=>{el.checked=false});break;
        case 'confirm-create-sub':{(async()=>{
          const name=document.getElementById('saName')?.value.trim();
          const username=document.getElementById('saUser')?.value.trim();
          const pass=document.getElementById('saPass')?.value||'';
          const pass2=document.getElementById('saPass2')?.value||'';
          const allowedMenus=getSelectedMenuPermissions('saPerm');
          if(!name||!username||!pass){showToast('Validation','Fill all required fields.','warning');return;}
          if(pass!==pass2){showToast('Validation','Password confirmation does not match.','warning');return;}
          try{
            await apiAccountRequest('POST','/api/accounts',{name,username,password:pass,allowedMenus});
            closeModal();await loadSubAccounts();renderPage();showToast('Created','Sub account created.','success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'edit-sub-account':{const account=S.subAccounts.find(a=>a.id===t.dataset.id);if(account)showEditSubAccountModal(account);break;}
        case 'confirm-edit-sub':{(async()=>{
          const id=t.dataset.id;
          const name=document.getElementById('saName')?.value.trim();
          const username=document.getElementById('saUser')?.value.trim();
          const pass=document.getElementById('saPass')?.value||'';
          const allowedMenus=getSelectedMenuPermissions('saPerm');
          if(!name||!username){showToast('Validation','Name and username are required.','warning');return;}
          const body={name,username,allowedMenus};
          if(pass)body.password=pass;
          try{
            await apiAccountRequest('PUT',`/api/accounts/${id}`,body);
            closeModal();await loadSubAccounts();renderPage();showToast('Updated','Sub account updated.','success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'toggle-sub-account':{(async()=>{
          const account=S.subAccounts.find(a=>a.id===t.dataset.id);if(!account)return;
          const status=account.status==='active'?'disabled':'active';
          try{
            await apiAccountRequest('PUT',`/api/accounts/${account.id}`,{status});
            await loadSubAccounts();renderPage();showToast('Updated',`Account ${status==='active'?'enabled':'disabled'}.`,'success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'delete-sub-account':{const account=S.subAccounts.find(a=>a.id===t.dataset.id);if(!account)break;showModal('Delete Sub Account',`<p style="font-size:14px;color:var(--text-secondary)">Delete <strong>${esc(account.name)}</strong>? This cannot be undone.</p>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="confirm-delete-sub" data-id="${account.id}">Delete</button>`);break;}
        case 'confirm-delete-sub':{(async()=>{
          try{
            await apiAccountRequest('DELETE',`/api/accounts/${t.dataset.id}`);
            closeModal();await loadSubAccounts();renderPage();showToast('Deleted','Sub account deleted.','success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'create-prompt':showCreatePromptModal();break;
        case 'confirm-create-prompt':{(async()=>{
          const name=document.getElementById('pmName')?.value.trim();
          const category=document.getElementById('pmCategory')?.value;
          const description=document.getElementById('pmDesc')?.value.trim();
          const prompt=document.getElementById('pmContent')?.value.trim();
          if(!name||!category||!prompt){showToast('Validation','Name, category, and prompt content are required.','warning');return;}
          try{
            await apiPromptRequest('POST','/api/prompts',{name,category,description,prompt});
            closeModal();await loadPromptTemplates();renderPage();showToast('Created','Prompt template created.','success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'edit-prompt':{const prompt=(S.promptTemplates||[]).find(p=>p.id===t.dataset.id);if(prompt)showEditPromptModal(prompt);break;}
        case 'confirm-edit-prompt':{(async()=>{
          const id=t.dataset.id;
          const name=document.getElementById('pmName')?.value.trim();
          const category=document.getElementById('pmCategory')?.value;
          const description=document.getElementById('pmDesc')?.value.trim();
          const prompt=document.getElementById('pmContent')?.value.trim();
          if(!name||!category||!prompt){showToast('Validation','Name, category, and prompt content are required.','warning');return;}
          try{
            await apiPromptRequest('PUT',`/api/prompts/${id}`,{name,category,description,prompt});
            closeModal();await loadPromptTemplates();renderPage();showToast('Updated','Prompt template updated.','success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'toggle-prompt':{(async()=>{
          const prompt=(S.promptTemplates||[]).find(p=>p.id===t.dataset.id);if(!prompt)return;
          const status=prompt.status==='active'?'disabled':'active';
          try{
            await apiPromptRequest('PUT',`/api/prompts/${prompt.id}`,{status});
            await loadPromptTemplates();renderPage();showToast('Updated',`Prompt ${status==='active'?'enabled':'disabled'}.`,'success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'delete-prompt':{const prompt=(S.promptTemplates||[]).find(p=>p.id===t.dataset.id);if(!prompt)break;showModal('Delete Prompt',`<p style="font-size:14px;color:var(--text-secondary)">Delete <strong>${esc(prompt.name)}</strong>? This cannot be undone.</p>`,`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="confirm-delete-prompt" data-id="${prompt.id}">Delete</button>`);break;}
        case 'confirm-delete-prompt':{(async()=>{
          try{
            await apiPromptRequest('DELETE',`/api/prompts/${t.dataset.id}`);
            closeModal();await loadPromptTemplates();renderPage();showToast('Deleted','Prompt template deleted.','success');
          }catch(err){showToast('Error',err.message,'error');}
        })();break;}
        case 'clear-cache':showToast('Cache Cleared','Temporary files cleared.','success');break;

        /* ======= WORKFLOW (AI IMAGE) ======= */
        case 'wf-generate-one':wfGenerateBlueprint();break;
        case 'wf-reset':if(S.currentPage==='ai-image'){wfResetData();renderPage();showToast('Reset','AI Image workflow cleared.','info');}break;
        case 'wf-copy':{
          const el=document.getElementById(t.dataset.target);
          const text=el?.value??el?.textContent??'';
          const label=t.dataset.target==='wfMasterPrompt'?'Master prompt':t.dataset.target==='wfStoryboard'?'Storyboard':'Content';
          wfCopyText(text,label);
          break;
        }
        case 'wf-download':{
          const el=document.getElementById(t.dataset.target);
          wfDownloadText(el?.value||'',t.dataset.filename||'tarmoc-export.txt');
          break;
        }
        case 'wf-download-image':wfDownloadImage(t.dataset.url||S.wfData.generatedImage);break;
        case 'wf-save-prompt':wfSaveMasterPrompt();break;
        case 'wf-generate-image':wfGenerateImage();break;
        case 'wf-send':wfSendToAI();break;
        case 'wf-select-workflow':if(S.currentPage==='ai-image'){S.wfData.workflow=t.dataset.workflow;renderPage();}break;
        case 'wf-select-provider':if(S.currentPage==='ai-image'){S.wfData.provider=t.dataset.provider;renderPage();}break;
        case 'wf-remove-product':if(S.currentPage==='ai-image'){S.wfData.productImage=null;S.wfData.generatedImage=null;S.wfData.imageError=null;renderPage();}break;
        case 'wf-browse-product':{const i=document.getElementById('wfFileInput');if(i)i.click();break;}

                /* ======= AI AFFILIATE ======= */
        case 'af-browse-image':{
          const type=t.dataset.type;
          const i=document.getElementById(`afFile${type}`);
          if(!i)return;
          i.onchange=ev=>{
            const f=ev.target.files[0];
            if(f){
              const r=new FileReader();
              r.onload=re=>{S.afData[type]=re.target.result;S.afData.generatedImages=[];renderPage();};
              r.readAsDataURL(f);
            }
          };
          i.click();break;
        }
        case 'af-remove-image':S.afData[t.dataset.type]=null;renderPage();break;
        case 'af-select':{
          const cat=t.dataset.cat,val=t.dataset.val;
          if(cat==='count')S.afData.count=parseInt(val);
          else S.afData[cat]=val;
          renderPage();break;
        }
        case 'af-toggle-market':{
          const val=t.dataset.val;
          const idx=S.afData.marketplaces.indexOf(val);
          if(idx>-1)S.afData.marketplaces.splice(idx,1);
          else S.afData.marketplaces.push(val);
          renderPage();break;
        }
        case 'af-download':showToast('Download','Mengunduh gambar...','success');break;
        case 'af-send-to-video':{
          const idx=parseInt(t.dataset.index,10);
          const raw=S.afData.generatedImages[idx];
          const resolved=resolveMediaUrl(raw);
          if(!raw||!resolved){
            showToast('Error','Gagal membawa gambar ke AI Video. Silakan coba lagi.','error');
            return;
          }
          S.refImages=[resolved,null,null,null];
          S.videoGenState='empty';
          if(S.afData.imagePrompt?.trim())S.videoPrompt=S.afData.imagePrompt.trim();
          navTo('ai-video');
          showToast('Gambar Dimuat','Gambar affiliate siap di AI Video. Atur prompt lalu generate.','info');
          break;
        }
        case 'af-generate': {
          console.log("🔥 Tombol Generate Diklik!"); // CEK APA TOMBOLNYA NYAMBUNG

          if (!S.afData.productImage || !S.afData.modelImage) {
            showToast('Gambar Kurang', 'Upload produk dan model dulu.', 'warning');
            return;
          }
          
          const cost = S.afData.count * 10;
          if (S.credits < cost) {
            showToast('Kredit Tidak Cukup', `Butuh ${cost} kredit.`, 'error');
            return;
          }

          S.afData.loading = true;
          S.afData.generatedImages = [];
          renderPage();

          const payload = {
            productImage: S.afData.productImage,
            modelImage: S.afData.modelImage,
            ratio: S.afData.ratio,
            gender: S.afData.gender,
            interaction: S.afData.interaction,
            marketplaces: S.afData.marketplaces,
            count: S.afData.count,
            provider: S.afData.provider,
            imagePrompt: S.afData.imagePrompt
          };

          const API_URL = 'http://localhost:5001/api/affiliate/generate';

          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          .then(async res => {
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || data.error || 'Server error: ' + res.status);
            return data;
          })
          .then(data => {
            if (data.success && data.images.length > 0) {
              S.afData.generatedImages = data.images;
              S.credits -= cost;
              document.getElementById('creditsCount').textContent = fmtN(S.credits);
              showToast('Berhasil', 'Foto afiliasi siap digunakan!', 'success');
            } else {
              throw new Error(data.message || 'Gagal generate gambar di backend.');
            }
          })
          .catch(err => {
            console.error('Affiliate API Error:', err);
            showToast('Error', err.message || 'Terjadi kesalahan saat generate.', 'error');
          })
          .finally(() => {
            S.afData.loading = false;
            renderPage();
          });
          break;
        }
        
        /* ======= WORKFLOW BUILDER ======= */
        case 'flow-new':showModal('New Workflow','<p style="font-size:14px;color:var(--text-secondary)">This clears the current canvas. Continue?</p>',`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="flow-confirm-new">Clear</button>`);break;
        case 'flow-confirm-new':{S.flow.nodes=[];S.flow.connections=[];S.flow.selectedId=null;S.flow.selectedConnId=null;S.flow.history=[];S.flow.historyIdx=-1;closeModal();renderPage();showToast('New Workflow','Canvas cleared.','success');break;}
        case 'flow-open':{
          const savedHtml=(S.flow.saved||[]).length?S.flow.saved.map(w=>`<div class="prompt-list-item" data-action="flow-load-saved" data-id="${w.id}"><div class="prompt-item-title">${esc(w.name)}</div><div class="prompt-item-meta"><span>${w.nodes.length} nodes</span><span>${new Date(w.savedAt).toLocaleString()}</span></div></div>`).join(''):'<p style="font-size:13px;color:var(--text-muted)">No saved workflows yet.</p>';
          showModal('Open Workflow',`<div style="margin-bottom:16px"><div class="form-label">Templates</div><div class="wf-provider-grid">${FLOW_TEMPLATES.map(tp=>`<div class="wf-provider-card" data-action="flow-load-template" data-id="${tp.id}"><div class="pv-icon" style="background:rgba(245,158,11,0.1);color:var(--primary)"><i data-lucide="layout-template"></i></div><div class="pv-name">${esc(tp.name)}</div></div>`).join('')}</div></div><div class="form-label">Saved Workflows</div>${savedHtml}`,`<button class="btn-modal cancel" data-action="close-modal">Close</button>`);
          lucide.createIcons({nodes:[document.getElementById('modalContainer')]});
          break;
        }
        case 'flow-load-template':closeModal();flowLoadTemplate(t.dataset.id);break;
        case 'flow-load-saved':{const w=(S.flow.saved||[]).find(x=>x.id===t.dataset.id);if(w){S.flow.nodes=JSON.parse(JSON.stringify(w.nodes));S.flow.connections=JSON.parse(JSON.stringify(w.connections));S.flow.selectedId=null;S.flow.selectedConnId=null;flowPushHistory();closeModal();renderPage();showToast('Workflow Loaded',`"${w.name}" loaded.`,'success');}break;}
        case 'flow-duplicate':{
          if(!S.flow.nodes.length){showToast('Nothing to Duplicate','Canvas is empty.','warning');return;}
          const idMap={};
          const newNodes=S.flow.nodes.map(n=>{const nid='n'+(S.flow.nextId++);idMap[n.id]=nid;return{...n,id:nid,x:n.x+40,y:n.y+40};});
          const newConns=S.flow.connections.map(c=>({id:'c'+(S.flow.nextId++),fromNode:idMap[c.fromNode],fromPort:c.fromPort,toNode:idMap[c.toNode],toPort:c.toPort}));
          S.flow.nodes=S.flow.nodes.concat(newNodes);S.flow.connections=S.flow.connections.concat(newConns);
          flowPushHistory();flowRenderCanvas();showToast('Duplicated','Workflow nodes duplicated.','success');break;
        }
        case 'flow-save':{
          if(!S.flow.nodes.length){showToast('Nothing to Save','Add nodes to the canvas first.','warning');return;}
          showModal('Save Workflow','<div class="settings-field"><label>Workflow Name</label><input type="text" id="flowSaveName" placeholder="My Workflow"></div>',`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal confirm" data-action="flow-confirm-save">Save</button>`);
          break;
        }
        case 'flow-confirm-save':{
          const name=document.getElementById('flowSaveName')?.value.trim()||'Untitled Workflow';
          S.flow.saved=S.flow.saved||[];
          S.flow.saved.unshift({id:'w'+Date.now(),name,nodes:JSON.parse(JSON.stringify(S.flow.nodes)),connections:JSON.parse(JSON.stringify(S.flow.connections)),savedAt:Date.now()});
          closeModal();showToast('Saved',`"${name}" saved.`,'success');break;
        }
        case 'flow-save-template':showToast('Saved as Template','Your workflow layout has been saved as a reusable template.','success');break;
        case 'flow-run':flowRunWorkflow();break;
        case 'flow-stop':flowStopWorkflow();break;
        case 'flow-history':{
          const items=S.flow.saved&&S.flow.saved.length?S.flow.saved.map(w=>`<div class="activity-item"><span class="activity-dot" style="background:var(--primary)"></span><span class="activity-text"><strong>${esc(w.name)}</strong> — ${w.nodes.length} nodes</span><span class="activity-time">${new Date(w.savedAt).toLocaleDateString()}</span></div>`).join(''):'<p style="font-size:13px;color:var(--text-muted);padding:10px 0">No history yet. Save a workflow to see it here.</p>';
          showModal('Workflow History',`<div>${items}</div>`,`<button class="btn-modal cancel" data-action="close-modal">Close</button>`);break;
        }
        case 'flow-zoom-in':flowSetZoom(S.flow.zoom+0.1);break;
        case 'flow-zoom-out':flowSetZoom(S.flow.zoom-0.1);break;
        case 'flow-zoom-reset':S.flow.pan={x:0,y:0};flowSetZoom(1);break;
        case 'flow-undo':flowUndo();break;
        case 'flow-redo':flowRedo();break;
        case 'flow-toggle-snap':S.flow.snapGrid=!S.flow.snapGrid;t.classList.toggle('active');break;
        case 'flow-add-node-click':{
          const type=t.dataset.nodeType;
          const canvas=document.getElementById('flowCanvas');
          let x=80,y=80;
          if(canvas){
            const cr=canvas.getBoundingClientRect();
            x=(cr.width/2-S.flow.pan.x)/S.flow.zoom-90;
            y=(cr.height/2-S.flow.pan.y)/S.flow.zoom-30;
          }
          const offset=(S.flow.nodes.length%6)*24;
          flowAddNode(type,x+offset,y+offset);
          showToast('Node Ditambahkan',`"${flowGetDef(type).title}" ditambahkan ke canvas.`,'success');
          break;
        }
        case 'flow-node-duplicate':{const n=S.flow.nodes.find(n=>n.id===t.dataset.id);if(!n)return;const nid='n'+(S.flow.nextId++);S.flow.nodes.push({...n,id:nid,x:n.x+40,y:n.y+40});flowPushHistory();flowRenderCanvas();break;}
        case 'flow-node-delete':{S.flow.nodes=S.flow.nodes.filter(n=>n.id!==t.dataset.id);S.flow.connections=S.flow.connections.filter(c=>c.fromNode!==t.dataset.id&&c.toNode!==t.dataset.id);if(S.flow.selectedId===t.dataset.id)S.flow.selectedId=null;flowPushHistory();flowRenderCanvas();flowRenderPropsInto();break;}
        case 'flow-trigger-file':{const fi=document.getElementById('flowNodeFileInput');if(fi)fi.click();break;}
        case 'flow-save-node':{
          const n=S.flow.nodes.find(n=>n.id===t.dataset.id);if(!n)return;
          n.title=document.getElementById('fpName')?.value.trim()||n.title;
          n.desc=document.getElementById('fpDesc')?.value||n.desc;
          n.settings={
            provider:document.getElementById('fpProvider')?.value||'',
            prompt:document.getElementById('fpPrompt')?.value||'',
            negativePrompt:document.getElementById('fpNegPrompt')?.value||'',
            resolution:document.getElementById('fpResolution')?.value||'1080p',
            aspectRatio:document.getElementById('fpAspect')?.value||'16:9',
            duration:parseInt(document.getElementById('fpDuration')?.value)||5,
            temperature:parseFloat(document.getElementById('fpTemp')?.value)||0.7,
            seed:document.getElementById('fpSeed')?.value||''
          };
          flowPushHistory();flowRenderCanvas();showToast('Node Updated',`"${n.title}" settings saved.`,'success');break;
        }

        /* ======= AI PRODUCT ======= */
        case 'ap-set-method':S.apData.importMethod=t.dataset.method;renderPage();break;
        case 'ap-import-link':{
          const url=document.getElementById('apImportUrl')?.value.trim();
          if(!url){showToast('Link Diperlukan','Masukkan link produk terlebih dahulu.','warning');return;}
          if(!/^https?:\/\//i.test(url)){showToast('Link Tidak Valid','Gunakan link lengkap (dimulai dengan http/https).','warning');return;}
          S.apData.loading=true;S.apData.loadingStage='Mengambil data produk...';renderPage();
          setTimeout(()=>{
            const platform=apDetectPlatform(url);
            const name=apParseNameFromUrl(url)||`Produk Impor ${platform}`;
            const cats=['Electronics','Beauty','Wearables','Food & Drink','Fashion','Home Office'];
            const cat=cats[Math.floor(Math.random()*cats.length)];
            const price='Rp '+(Math.floor(Math.random()*400+50)*1000).toLocaleString('id-ID');
            S.apData.importUrl=url;
            S.apData.productInfo={name,category:cat,price,platform};
            S.apData.productImage=`https://picsum.photos/seed/apimport${Date.now()}/500/500`;
            S.apData.analysis=null;S.apData.generatedImages=[];S.apData.marketingAssets=null;S.apData.selectedStyles=[];
            S.apData.loading=false;renderPage();
            showToast('Produk Diimpor',`Berhasil mengimpor "${name}" dari ${platform}.`,'success');
          },1600);
          break;
        }
        case 'ap-browse-image':{
          const i=document.getElementById('apFileInput');if(!i)return;
          i.onchange=ev=>{const f=ev.target.files[0];if(f){const r=new FileReader();r.onload=re=>{S.apData.productImage=re.target.result;S.apData.productInfo=null;S.apData.analysis=null;S.apData.generatedImages=[];S.apData.marketingAssets=null;S.apData.selectedStyles=[];renderPage();};r.readAsDataURL(f);}};
          i.click();break;
        }
        case 'ap-remove-image':S.apData.productImage=null;S.apData.productInfo=null;S.apData.analysis=null;S.apData.generatedImages=[];S.apData.marketingAssets=null;S.apData.selectedStyles=[];S.apData.importUrl='';renderPage();break;
        case 'ap-analyze':{
          if(!S.apData.productImage){showToast('Gambar Diperlukan','Upload atau import gambar produk terlebih dahulu.','warning');return;}
          S.apData.loading=true;S.apData.loadingStage='Menganalisis produk dengan AI...';renderPage();
          setTimeout(()=>{apGenAnalysis();S.apData.loading=false;renderPage();showToast('Analisis Selesai','Analisis produk berhasil dibuat.','success');},1600);
          break;
        }
        case 'ap-toggle-style':{const sid=t.dataset.style;const idx=S.apData.selectedStyles.indexOf(sid);if(idx>-1)S.apData.selectedStyles.splice(idx,1);else S.apData.selectedStyles.push(sid);renderPage();break;}
        case 'ap-generate-images':{
          if(!S.apData.analysis){showToast('Analisis Diperlukan','Lakukan analisis produk terlebih dahulu.','warning');return;}
          if(S.apData.selectedStyles.length===0){showToast('Pilih Gaya','Pilih minimal satu gaya gambar.','warning');return;}
          const cost=S.apData.selectedStyles.length*20;
          if(S.credits<cost){showToast('Kredit Tidak Cukup',`Butuh ${cost} kredit.`,'error');return;}
          S.apData.loading=true;S.apData.loadingStage='Menghasilkan gambar produk...';renderPage();
          setTimeout(()=>{
            S.apData.generatedImages=S.apData.selectedStyles.map(sid=>{const st=AP_STYLES.find(s=>s.id===sid);return{id:genId(),style:sid,styleName:st?.name||sid,url:`https://picsum.photos/seed/ap${sid}${Date.now()}${Math.floor(Math.random()*999)}/400/400`};});
            S.credits-=cost;document.getElementById('creditsCount').textContent=fmtN(S.credits);
            S.apData.loading=false;renderPage();
            showToast('Gambar Dibuat',`${S.apData.generatedImages.length} gambar berhasil dihasilkan.`,'success');
          },1800);
          break;
        }
        case 'ap-download-image':showToast('Download','Gambar diunduh.','success');break;
        case 'ap-generate-assets':{
          if(!S.apData.analysis){showToast('Analisis Diperlukan','Lakukan analisis produk terlebih dahulu.','warning');return;}
          if(S.credits<30){showToast('Kredit Tidak Cukup','Butuh 30 kredit.','error');return;}
          S.apData.loading=true;S.apData.loadingStage='Menghasilkan aset marketing...';renderPage();
          setTimeout(()=>{
            apGenMarketingAssets();
            S.credits-=30;document.getElementById('creditsCount').textContent=fmtN(S.credits);
            S.apData.loading=false;renderPage();
            showToast('Aset Dibuat','Aset marketing berhasil dihasilkan.','success');
          },2000);
          break;
        }
        case 'ap-send-to-video':{if(!S.apData.marketingAssets)return;S.videoPrompt=S.apData.marketingAssets.videoPrompt;navTo('ai-video');showToast('Prompt Dikirim','Video prompt dimuat ke AI Video.','success');break;}
      }
      if(t.classList.contains('ripple-container'))mkRipple(e);
    }

    /* ============================================
       WORKFLOW NEXT LOGIC
       ============================================ */
    function wfNext(){
      if(S.currentPage!=='ai-image')return;
      const s=S.wfStep,d=S.wfData;
      wfSyncFormFields();
      if(s===1&&!d.productImage){showToast('Upload Required','Please upload a product image.','warning');return;}
      if(s===2&&!d.userPrompt.trim()){showToast('Description Required','Please describe your video.','warning');return;}
      if(s===6&&!d.provider){showToast('Provider Required','Select an AI provider.','warning');return;}
      if(s===2){genAnalysis();S.wfStep=3;return;}
      if(s===3){d.storyboard=genStoryboard();S.wfStep=4;return;}
      if(s===4){d.masterPrompt=genMasterPrompt();S.wfStep=5;return;}
      if(s<6){S.wfStep=s+1;S.wfSent=false;}
    }

    /* ============================================
       PER-PAGE EVENT BINDING
       ============================================ */
    function bindPageEvents(){
      const p=S.currentPage;
      if(p==='workflow')bindFlowEvents();
      if(p==='ai-video')bindVidEvents();
      if(p==='ai-product')bindAPEvents();
      if(p==='ai-academy')bindAcademyEvents();
      if(p==='ai-affiliate'){
        // Handle Upload via Drag & Drop dan Paste (Copy)
        ['productImage','modelImage'].forEach(type=>{
          const uz=document.getElementById(`afUpload${type}`);
          const fi=document.getElementById(`afFile${type}`);
          if(uz&&fi){
            uz.addEventListener('click',()=>fi.click());
            setupDD(uz,files=>{
              const f=files[0];
              if(f){
                const r=new FileReader();
                r.onload=re=>{S.afData[type]=re.target.result;S.afData.generatedImages=[];renderPage();};
                r.readAsDataURL(f);
              }
            });
            // Fitur Paste (Copy gambar dari clipboard)
            uz.addEventListener('paste',e=>{
              const items=e.clipboardData.items;
              for(let i in items){
                if(items[i].type.indexOf('image')!==-1){
                  const file=items[i].getAsFile();
                  const r=new FileReader();
                  r.onload=re=>{S.afData[type]=re.target.result;S.afData.generatedImages=[];renderPage();};
                  r.readAsDataURL(file);
                  break;
                }
              }
            });
          }
        });

        // Handle saat user mengetik di Textarea
        const ta=document.getElementById('afInteraction');
        if(ta)ta.addEventListener('input',e=>S.afData.interaction=e.target.value);

        // Handle dropdown Provider AI
        const provSel=document.getElementById('afProviderSelect');
        if(provSel)provSel.addEventListener('change',e=>{S.afData.provider=e.target.value;});

        // Handle textarea Prompt Gambar
        const imgTa=document.getElementById('afImagePrompt');
        if(imgTa)imgTa.addEventListener('input',e=>S.afData.imagePrompt=e.target.value);
      }
      if(p==='image-editing'){
        const ep=document.getElementById('editPromptInput');
        if(ep)ep.addEventListener('input',e=>{S.editPrompt=e.target.value});
        const uz=document.getElementById('editUploadZone'),fi=document.getElementById('editFileInput');
        if(uz&&fi){
          setupDD(uz,files=>{
            const f=files[0];
            if(f){
              const r=new FileReader();
              r.onload=re=>{S.editingOriginal=re.target.result;S.editingImage=re.target.result;S.editPrompt='';renderPage();};
              r.readAsDataURL(f);
            }
          });
        }
      }
      if(p==='character-library'){const i=document.getElementById('charSearch');if(i)i.addEventListener('input',e=>{S.searchQuery=e.target.value;renderPage();})}
      if(p==='product-library'){const i=document.getElementById('prodSearch'),f=document.getElementById('prodCatFilter');const apply=()=>{const q=(i?.value||'').toLowerCase(),cat=f?.value||'';const g=document.getElementById('prodGrid');if(!g)return;const fl=S.products.filter(p=>{return(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))&&(!cat||p.category===cat)});g.innerHTML=fl.length===0?'<div class="empty-state" style="grid-column:1/-1"><i data-lucide="package"></i><div class="empty-title">No Products Found</div></div>':fl.map((p,idx)=>`<div class="library-card animate-fade-in-up delay-${Math.min(idx+1,8)}" style="text-align:left"><div class="product-card-thumb"><img src="${p.thumbnail}" alt="${esc(p.name)}" loading="lazy"></div><span class="product-card-category">${esc(p.category)}</span><div class="library-card-name" style="text-align:left">${esc(p.name)}</div><div class="library-card-actions" style="justify-content:flex-start;margin-top:12px"><button class="card-action-btn" data-action="view-product" data-id="${p.id}"><i data-lucide="eye"></i> Detail</button><button class="card-action-btn" data-action="gen-product-prompt" data-id="${p.id}"><i data-lucide="sparkles"></i> Generate</button><button class="card-action-btn danger" data-action="delete-product" data-id="${p.id}"><i data-lucide="trash-2"></i></button></div></div>`).join('');lucide.createIcons({nodes:[g]});};if(i)i.addEventListener('input',apply);if(f)f.addEventListener('change',apply);}
      if(p==='history'){const i=document.getElementById('histSearch');if(i)i.addEventListener('input',e=>{S.searchQuery=e.target.value;renderPage();});}
      bindPromptSelectors();
    }

    function bindVidEvents(){
      const gb=document.getElementById('generateVideoBtn');
      if(gb)gb.addEventListener('click',()=>{const pr=document.getElementById('videoPrompt')?.value?.trim();if(!pr){showToast('Prompt Required','Enter a prompt.','warning');return;}if(S.credits<50){showToast('Insufficient Credits','Need 50 credits.','error');return;}startVG();});
      ['aspectGroup','resolutionGroup','durationGroup'].forEach(gid=>{const g=document.getElementById(gid);if(g)g.querySelectorAll('.btn-group-item').forEach(b=>b.addEventListener('click',()=>{g.querySelectorAll('.btn-group-item').forEach(x=>x.classList.remove('active'));b.classList.add('active');}));});
      const ms=document.getElementById('motionSlider'),mv=document.getElementById('motionValue');if(ms&&mv)ms.addEventListener('input',()=>{mv.textContent=ms.value});
      const cs=document.getElementById('creativitySlider'),cv=document.getElementById('creativityValue');if(cs&&cv)cs.addEventListener('input',()=>{cv.textContent=cs.value});
      const rg=document.getElementById('refImagesGrid');if(rg)setupDD(rg,files=>{const empty=[];for(let i=0;i<4;i++)if(!S.refImages[i])empty.push(i);Array.from(files).forEach((file,idx)=>{if(idx<empty.length){const r=new FileReader();r.onload=e=>{S.refImages[empty[idx]]=e.target.result;renderPage()};r.readAsDataURL(file);}});});
    }

    function bindWFEvents(){
      const uz=document.getElementById('wfUploadZone'),fi=document.getElementById('wfFileInput');
      const loadProduct=file=>{
        if(!file)return;
        const r=new FileReader();
        r.onload=re=>{S.wfData.productImage=re.target.result;S.wfData.generatedImage=null;S.wfData.imageError=null;renderPage();};
        r.readAsDataURL(file);
      };
      if(fi)fi.onchange=ev=>{loadProduct(ev.target.files[0]);ev.target.value='';};
      if(uz&&fi){uz.addEventListener('click',()=>fi.click());setupDD(uz,files=>loadProduct(files[0]));}
      const p2=document.getElementById('wfUserPrompt'),b2=document.getElementById('wfS2N');
      if(p2&&b2)p2.addEventListener('input',()=>{b2.disabled=!p2.value.trim();});
    }

    function bindAcademyEvents(){
      const ms=document.getElementById('acMaster');
      if(ms)ms.addEventListener('change',e=>{
        const m=acGetMaster(e.target.value);
        S.academyData.masterId=m.id;
        S.academyData.durationSec=m.rules.totalDurationSec;
        S.academyData.sceneCount=m.rules.sceneCount;
        renderPage();
      });
    }

    function bindAPEvents(){
      const uz=document.getElementById('apUploadZone'),fi=document.getElementById('apFileInput');
      if(uz&&fi){
        uz.addEventListener('click',()=>fi.click());
        setupDD(uz,files=>{
          const f=files[0];
          if(f){
            const r=new FileReader();
            r.onload=re=>{S.apData.productImage=re.target.result;S.apData.productInfo=null;S.apData.analysis=null;S.apData.generatedImages=[];S.apData.marketingAssets=null;S.apData.selectedStyles=[];renderPage();};
            r.readAsDataURL(f);
          }
        });
      }
    }

    /* ============================================
       DRAG & DROP
       ============================================ */
    function setupDD(el,onFiles){
      el.addEventListener('dragenter',e=>{e.preventDefault();e.stopPropagation();el.classList.add('drag-over')});
      el.addEventListener('dragover',e=>{e.preventDefault();e.stopPropagation()});
      el.addEventListener('dragleave',e=>{e.preventDefault();e.stopPropagation();if(!el.contains(e.relatedTarget))el.classList.remove('drag-over')});
      el.addEventListener('drop',e=>{e.preventDefault();e.stopPropagation();el.classList.remove('drag-over');if(e.dataTransfer.files.length>0)onFiles(e.dataTransfer.files)});
    }

    function toggleSidebarCollapse(){
      if(isMobileNav())return;
      const next=localStorage.getItem(SIDEBAR_COLLAPSED_KEY)!=='true';
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY,next?'true':'false');
      applySidebarState();
    }
    function toggleSidebar(){
      if(!isMobileNav())return;
      document.getElementById('sidebar').classList.toggle('open');
      document.getElementById('sidebarOverlay').classList.toggle('show');
    }
    function closeSidebar(){
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('sidebarOverlay').classList.remove('show');
    }

function applyTheme(){
  document.documentElement.setAttribute('data-theme', S.settings.darkMode ? 'dark' : 'light');
  localStorage.setItem('tarmocTheme', S.settings.darkMode ? 'dark' : 'light');
  const btn=document.getElementById('themeToggleBtn');
  if(btn){
    btn.innerHTML=`<i data-lucide="${S.settings.darkMode?'moon':'sun'}"></i>`;
    lucide.createIcons({nodes:[btn]});
  }
  document.querySelectorAll('.toggle-switch[data-key="darkMode"]').forEach(sw=>sw.classList.toggle('active',S.settings.darkMode));
}

async function loadRuntimeConfig(){
  try{
    const res=await fetch('/api/config',{cache:'no-store'});
    if(!res.ok)throw new Error(`Config HTTP ${res.status}`);
    const cfg=await res.json();
    if(cfg?.providers){
      S.runtimeProviders=cfg.providers||{};
      // Terapkan default yang disarankan backend
      if(cfg.defaultVideoProvider) S.videoProvider = cfg.defaultVideoProvider;
      if(cfg.defaultImageProvider) {
        if(!S.afData.provider) S.afData.provider = cfg.defaultImageProvider;
        if(!S.wfData.provider) S.wfData.provider = cfg.defaultImageProvider;
      }
      // Kita juga terapkan preferensi lokal workflow (hanya jika kosong)
      applyProviderDefaults();
      if(!S.videoProvider || !isProviderConfigured(S.videoProvider)) S.videoProvider = preferredProvider('video') || S.videoProvider;
      if(S.afData.provider && !isProviderConfigured(S.afData.provider)) S.afData.provider = preferredProvider('affiliate') || S.afData.provider;
      if(S.wfData.provider && !isProviderConfigured(S.wfData.provider)) S.wfData.provider = preferredProvider('image') || S.wfData.provider;
      console.log('Provider config loaded from .env', cfg.providers);
    }
  }catch(err){
    console.warn('Failed to load provider config from backend .env:',err.message);
  }
}
    /* ============================================
       INIT
       ============================================ */
    document.addEventListener('DOMContentLoaded',async()=>{
  if(!requireAuth())return;
  if(!canAccessMenu(S.currentPage))S.currentPage=getDefaultPage();
  const savedTheme=localStorage.getItem('tarmocTheme');
  if(savedTheme)S.settings.darkMode=savedTheme==='dark';
  await loadRuntimeConfig();
  await loadPromptTemplates();
  if(isMainAdmin())await loadSubAccounts();
  applyTheme();
  renderSidebar();renderNotifs();renderPage();bindGlobalEvents()
});