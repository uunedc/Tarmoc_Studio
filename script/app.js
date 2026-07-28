/* ============================================
       STATE
       ============================================ */
    const S={
      currentPage:'dashboard',currentProject:null,currentPromptCategory:null,
      videoGenState:'empty',videoGenProgress:0,videoGenStage:'',
      refImages:[null,null,null,null],editingImage:null,activeTool:null,
      searchQuery:'',historyFilter:'all',
      wfStep:1,wfLoading:false,wfSent:false,
      wfData:{productImage:null,userPrompt:'',analysis:null,storyboard:'',masterPrompt:'',provider:'',workflow:'storyboard'},
      apData:{importMethod:'upload',importUrl:'',productImage:null,productInfo:null,analysis:null,selectedStyles:[],generatedImages:[],marketingAssets:null,loading:false,loadingStage:''},
      afData:{productImage:null,modelImage:null,ratio:'1:1',gender:'wanita',interaction:'',marketplaces:['shopee'],count:4,provider:'gemini',imagePrompt:'',loading:false,generatedImages:[]},
      settings:{googleVeoKey:'',geminiKey:'',openaiKey:'',runwayKey:'',klingKey:'',pikaKey:'',hailuoKey:'',darkMode:true,language:'en'},
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
      nextId:100
    };

    const MENU=[{id:'dashboard',label:'Dashboard',icon:'layout-dashboard'},{id:'ai-video',label:'AI Video',icon:'video'},{id:'ai-image',label:'AI Image',icon:'image'},{id:'ai-product',label:'AI Product',icon:'package'},{id:'ai-affiliate',label:'AI Affiliate',icon:'shopping-cart'},{id:'image-editing',label:'Image Editing',icon:'wand-2'},{id:'character-library',label:'Character Library',icon:'user'},{id:'product-library',label:'Product Library',icon:'package'},{id:'prompt-library',label:'Prompt Library',icon:'book-open'},{id:'history',label:'History',icon:'clock'},{id:'settings',label:'Settings',icon:'settings'}];
    const WORKSPACES=[{id:'tarmoc-product',name:'TARMOC Product',color:'#F59E0B'},{id:'fiber-academy',name:'Fiber Academy',color:'#3B82F6'},{id:'tiktok',name:'TikTok',color:'#EF4444'},{id:'podcast',name:'Podcast',color:'#8B5CF6'},{id:'shopee',name:'Shopee',color:'#F97316'}];
    const VPROVIDERS=['Google Veo','OpenAI','Gemini','Runway','Kling','Pika','Hailuo'];
    const CAMSTYLES=['Cinematic','Documentary','Commercial','Drone Shot','Handheld','Static','Dolly Zoom','Crane Shot'];
    const VSTAGES=['Uploading','Analyzing','Connecting AI','Generating','Rendering','Finished'];

    /* Workflow steps & providers */
    const WFS=[{n:1,title:'Upload Product',desc:'Add your product image',icon:'package'},{n:2,title:'Describe Your Video',desc:'Write your vision',icon:'pencil'},{n:3,title:'AI Product Analysis',desc:'Product intelligence',icon:'brain'},{n:4,title:'Generate Storyboard',desc:'Scene planning',icon:'layout-grid'},{n:5,title:'Generate Master Video Prompt',desc:'Final prompt generation',icon:'sparkles'},{n:6,title:'Send to Video AI',desc:'Choose provider & send',icon:'send'}];
    const WFP=[{id:'google-veo',name:'Google Veo',desc:'High quality cinematic',color:'#4285F4',letter:'G'},{id:'kling',name:'Kling',desc:'Fast generation',color:'#8B5CF6',letter:'K'},{id:'runway',name:'Runway',desc:'Creative & artistic',color:'#22C55E',letter:'R'},{id:'pika',name:'Pika',desc:'Short-form optimized',color:'#F59E0B',letter:'P'},{id:'luma',name:'Luma',desc:'Realistic motion',color:'#EC4899',letter:'L'}];

    /* AI Product: available image styles */
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
    const requireAuth=()=>{const auth=getAuthState();if(!auth?.loggedIn){window.location.replace('./Login%20TARMOC%20AI%20Studio%203.html');return false;}return true};

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
    function renderSidebar(){
      const nav=document.getElementById('sidebarNav');let h='<div class="sidebar-section-label">Main Menu</div>';
      MENU.forEach(i=>{h+=`<div class="sidebar-item ${S.currentPage===i.id?'active':''}" data-action="navigate" data-page="${i.id}"><span class="item-icon"><i data-lucide="${i.icon}"></i></span><span>${i.label}</span></div>`});
      nav.innerHTML=h;
      const ws=document.getElementById('sidebarWorkspace');let wh='<div class="sidebar-section-label">Workspace</div>';
      WORKSPACES.forEach(p=>{wh+=`<div class="workspace-item ${S.currentProject===p.id?'active':''}" data-action="select-project" data-project="${p.id}"><span class="ws-dot" style="background:${p.color}"></span><span>${p.name}</span></div>`});
      ws.innerHTML=wh;lucide.createIcons({nodes:[nav,ws]});
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
    function navTo(p,ex){S.currentPage=p;if(ex)Object.assign(S,ex);renderSidebar();renderPage();closeSidebar()}
    function renderPage(){const m=document.getElementById('mainContent');const pg={'dashboard':pgDashboard,'ai-video':pgAIVideo,'ai-image':pgAIImage,'ai-product':pgAIProduct,'ai-affiliate':pgAffiliate,'image-editing':pgImgEdit,'character-library':pgCharLib,'product-library':pgProdLib,'prompt-library':pgPromptLib,history:pgHistory,settings:pgSettings};m.innerHTML=(pg[S.currentPage]||pgDashboard)();lucide.createIcons({nodes:[m]});bindPageEvents()}

    /* ============================================
       DASHBOARD
       ============================================ */
    function pgDashboard(){
      const tv=S.history.filter(h=>h.type==='video').length,ti=S.history.filter(h=>h.type==='image').length;
      return `<div class="animate-fade-in"><h1 class="page-title">Dashboard</h1><p class="page-subtitle">Welcome back! Here's an overview of your AI Studio activity.</p>
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
          <div class="quick-action-card" data-action="navigate" data-page="ai-image"><div class="qa-icon" style="background:rgba(245,158,11,0.1);color:#FBBF24"><i data-lucide="image"></i></div><div class="qa-title">Product to Video</div><div class="qa-desc">6-step workflow</div></div>
          <div class="quick-action-card" data-action="navigate" data-page="image-editing"><div class="qa-icon" style="background:rgba(139,92,246,0.1);color:#A78BFA"><i data-lucide="wand-2"></i></div><div class="qa-title">Edit Image</div><div class="qa-desc">Enhance & transform</div></div>
          <div class="quick-action-card" data-action="navigate" data-page="prompt-library"><div class="qa-icon" style="background:rgba(245,158,11,0.1);color:#FBBF24"><i data-lucide="book-open"></i></div><div class="qa-title">Browse Prompts</div><div class="qa-desc">Ready-made templates</div></div>
        </div></div></div>`;
    }

    /* ============================================
       AI VIDEO
       ============================================ */
    function pgAIVideo(){return `<div class="animate-fade-in"><h1 class="page-title">AI Video</h1><p class="page-subtitle">Generate professional videos using multiple AI providers.</p>
      <div class="video-layout"><div class="video-panel-left">
        <div class="form-group"><label class="form-label">Reference Images</label><div class="ref-images-grid" id="refImagesGrid">${[0,1,2,3].map(i=>S.refImages[i]?`<div class="ref-image-slot has-image" data-slot="${i}"><img src="${S.refImages[i]}"><button class="remove-img" data-action="remove-ref" data-slot="${i}"><i data-lucide="x"></i></button></div>`:`<div class="ref-image-slot" data-slot="${i}" data-action="browse-ref"><div class="slot-placeholder"><i data-lucide="plus"></i><span>Add Image</span></div></div>`).join('')}</div><input type="file" id="refFileInput" accept="image/*" multiple style="display:none"></div>
        <div class="form-group"><label class="form-label">Provider</label><select class="form-select" id="videoProvider">${VPROVIDERS.map(p=>`<option>${p}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Prompt</label><textarea class="form-textarea" id="videoPrompt" rows="4" placeholder="Describe the video...">${S.videoPrompt||''}</textarea></div>
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
    function rVP(){if(S.videoGenState==='empty')return `<div class="video-preview-empty"><div class="empty-icon">&#127916;</div><div class="empty-title">No Preview Yet</div><div class="empty-desc">Configure settings and click Generate</div></div>`;if(S.videoGenState==='generating')return `<div class="video-progress-container animate-fade-in-scale"><div class="video-progress-spinner"></div><div class="video-progress-status">${S.videoGenStage}</div><div class="video-progress-sub">Please wait...</div><div class="video-progress-bar-track"><div class="video-progress-bar-fill" style="width:${S.videoGenProgress}%"></div></div><div class="video-progress-percent">${S.videoGenProgress}%</div></div>`;if(S.videoGenState==='finished')return `<div class="video-finished-container animate-fade-in-scale"><div class="video-finished-preview"><div class="play-overlay" data-action="play-video"><i data-lucide="play"></i></div></div><h3 style="font-size:18px;font-weight:700;margin-bottom:6px">Video Finished</h3><p style="font-size:13px;color:var(--text-muted);margin-bottom:20px">Generated successfully</p><div class="video-finished-actions"><button class="btn-action primary ripple-container" data-action="download-video"><i data-lucide="download"></i> Download</button><button class="btn-action ripple-container" data-action="regenerate-video"><i data-lucide="refresh-cw"></i> Regenerate</button></div></div>`;return ''}

    let vgI=null;
    function startVG(){S.videoGenState='generating';S.videoGenProgress=0;S.videoGenStage=VSTAGES[0];const pa=document.getElementById('videoPreviewArea'),gb=document.getElementById('generateVideoBtn');if(pa)pa.innerHTML=rVP();if(gb){gb.classList.add('generating');gb.innerHTML='<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(0,0,0,0.2);border-top-color:#000;border-radius:50%;animation:spin 0.8s linear infinite"></span> Generating...';}lucide.createIcons({nodes:[pa]});let si=0;const st=[15,30,45,80,95,100];clearInterval(vgI);vgI=setInterval(()=>{S.videoGenProgress+=Math.random()*2+0.5;if(S.videoGenProgress>100)S.videoGenProgress=100;if(si<VSTAGES.length-1&&S.videoGenProgress>=st[si]){si++;S.videoGenStage=VSTAGES[si];}const s=pa?.querySelector('.video-progress-status'),f=pa?.querySelector('.video-progress-bar-fill'),pc=pa?.querySelector('.video-progress-percent');if(s)s.textContent=S.videoGenStage;if(f)f.style.width=S.videoGenProgress+'%';if(pc)pc.textContent=Math.round(S.videoGenProgress)+'%';if(S.videoGenProgress>=100){clearInterval(vgI);setTimeout(finishVG,500);}},120)}
    function finishVG(){S.videoGenState='finished';S.credits-=50;document.getElementById('creditsCount').textContent=fmtN(S.credits);const pr=document.getElementById('videoPrompt')?.value||'Generated video';S.history.unshift({id:genId(),type:'video',date:new Date().toISOString().slice(0,16).replace('T',' '),provider:document.getElementById('videoProvider')?.value||'Google Veo',prompt:pr,thumbnail:`https://picsum.photos/seed/vid${Date.now()}/400/225`,project:WORKSPACES.find(p=>p.id===S.currentProject)?.name||'TARMOC Product'});const pa=document.getElementById('videoPreviewArea'),gb=document.getElementById('generateVideoBtn');if(pa){pa.innerHTML=rVP();lucide.createIcons({nodes:[pa]});}if(gb){gb.classList.remove('generating');gb.innerHTML='<i data-lucide="sparkles"></i> Generate Video';lucide.createIcons({nodes:[gb]});}showToast('Video Generated','Your video is ready.','success')}

    /* ============================================
       AI IMAGE — SINGLE VIEW WORKFLOW
       ============================================ */
    function pgAIImage(){
      return `<div class="animate-fade-in"><h1 class="page-title">AI Image</h1><p class="page-subtitle">Create polished product video blueprints in one premium workspace.</p>
        <div class="workflow-container"><div class="workflow-layout" style="grid-template-columns:1fr">
          <div class="workflow-content">${rWFS()}</div>
        </div></div></div>`;
    }

    function rWFS(){
      const d=S.wfData;
      if(S.wfLoading)return `<div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">Generating your AI workflow...</div><div class="wf-loading-dots"><span></span><span></span><span></span></div></div></div>`;

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
              <textarea class="form-textarea" id="wfUserPrompt" rows="7" placeholder="Describe the type of video you want to create...\n\nExample:\nCreate a 10-second cinematic commercial highlighting premium product quality, realistic installation, dramatic lighting, and smooth camera movement.">${esc(d.userPrompt)}</textarea>
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
                <div class="wf-recap-item"><span>Output</span><strong>${d.masterPrompt?'Prompt ready':'Waiting for generation'}</strong></div>
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
          <div class="wf-nav" style="margin-top:16px;padding-top:16px;border-top:1px solid var(--border-color)">
            <div></div>
            <button class="btn-wf next ripple-container" data-action="wf-send" ${!d.provider || !d.masterPrompt.trim()?'disabled':''}><i data-lucide="send"></i> Send to AI</button>
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

      const videoPrompt=`Video produk sinematik berdurasi 10 detik menampilkan ${info.name}. Gaya visual: ${styles}, dengan mood ${mood.toLowerCase()} dan pencahayaan ${light.toLowerCase()}. Buka dengan shot lebar produk, dilanjutkan close-up detail tekstur, rotasi 360 derajat, konteks penggunaan, dan diakhiri hero shot dengan tagline brand. Kualitas 4K, transisi halus, color grading profesional.`;

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
         {v:'9router',l:'9Router (DALL-E 3)'}
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
              ${providers.map(p=>`<option value="${p.v}" ${d.provider===p.v?'selected':''}>${p.l}</option>`).join('')}
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Prompt Gambar (Deskripsi Hasil)</label>
            <textarea class="form-textarea" id="afImagePrompt" rows="3" placeholder="Contoh: Foto produk dipegang model dengan gaya kasual, latar pantai, pencahayaan natural, warna cerah...">${esc(d.imagePrompt)}</textarea>
          </div>

          <button id="afGenerateBtnTest" class="btn-generate ripple-container" data-action="af-generate" ${(!d.productImage||!d.modelImage)?'disabled style="opacity:0.4;pointer-events:none;animation:none"':''}>
            <i data-lucide="sparkles"></i> Generate Foto
          </button>

          ${d.generatedImages.length?`
            <div style="margin-top:32px">
              <label class="form-label">Hasil Generate</label>
              <div class="ap-gallery-grid">
                ${d.generatedImages.map(img=>`<div class="ap-gallery-item"><img src="${img}" alt="Result"><div class="ap-gallery-label">Affiliate</div><div class="ap-gallery-actions"><button class="gallery-action-btn" data-action="af-download"><i data-lucide="download"></i></button></div></div>`).join('')}
              </div>
            </div>
          `:''}

        </div></div></div>`;
    }

    /* ============================================
       IMAGE EDITING
       ============================================ */
    function pgImgEdit(){return `<div class="animate-fade-in"><h1 class="page-title">Image Editing</h1><p class="page-subtitle">Enhance, transform, and edit your images with AI tools.</p><div class="editing-layout"><div class="editing-preview" id="editingPreview">${S.editingImage?`<img src="${S.editingImage}" alt="Preview">`:`<div class="empty-state"><i data-lucide="upload-cloud"></i><div class="empty-title">Upload an Image</div><div class="empty-desc">Upload an image to start editing</div><button class="btn-add" data-action="browse-edit-image" style="display:inline-flex;margin-top:12px"><i data-lucide="upload"></i> Upload Image</button></div>`}<input type="file" id="editFileInput" accept="image/*" style="display:none"></div>
      <div class="editing-tools"><div class="form-group"><label class="form-label">Upload Image</label><div class="wf-upload-zone" data-action="browse-edit-image" style="padding:20px;margin-bottom:0"><i data-lucide="upload-cloud"></i><div class="upload-title">Drop or click to upload</div><div class="upload-desc">PNG, JPG up to 10MB</div></div></div>
        <div style="margin-top:20px"><label class="form-label">Editing Tools</label>${[{t:'remove-bg',l:'Remove Background',i:'scissors'},{t:'upscale',l:'Upscale Image',i:'maximize-2'},{t:'inpaint',l:'Inpaint',i:'paintbrush'},{t:'outpaint',l:'Outpaint',i:'expand'},{t:'replace',l:'Replace Object',i:'replace'},{t:'expand',l:'Expand Image',i:'scan'}].map(t=>`<button class="tool-btn ${S.activeTool===t.t?'active':''}" data-action="select-tool" data-tool="${t.t}"><i data-lucide="${t.i}"></i> ${t.l}</button>`).join('')}</div>
        <div style="margin-top:20px"><button class="btn-generate ripple-container" id="applyEditBtn" ${!S.editingImage?'disabled style="opacity:0.4;pointer-events:none;animation:none"':''}><i data-lucide="sparkles"></i> Apply Edit</button></div></div></div></div>`}

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
      <div class="settings-section animate-fade-in-up delay-1"><div class="settings-section-title">API Keys</div><div class="settings-section-desc">Connect your AI provider API keys.</div>${[['Google Veo','googleVeoKey'],['Gemini','geminiKey'],['OpenAI','openaiKey'],['Runway','runwayKey'],['Kling','klingKey'],['Pika','pikaKey'],['Hailuo','hailuoKey']].map(([l,k])=>`<div class="settings-field"><label>${l} API Key</label><input type="password" id="sett${k.charAt(0).toUpperCase()+k.slice(1)}" value="${esc(s[k])}" placeholder="Enter ${l} key"></div>`).join('')}</div>
      <div class="settings-section animate-fade-in-up delay-2"><div class="settings-section-title">Preferences</div><div class="settings-section-desc">Customize your workspace.</div><div class="toggle-row"><div><div class="toggle-label-text">Dark Mode</div><div class="toggle-label-desc">Use dark theme</div></div><div class="toggle-switch ${s.darkMode?'active':''}" data-action="toggle-setting" data-key="darkMode"></div></div><div class="toggle-row"><div><div class="toggle-label-text">Notifications</div><div class="toggle-label-desc">Receive generation notifications</div></div><div class="toggle-switch active" data-action="toggle-setting" data-key="notifications"></div></div><div class="settings-field" style="margin-top:16px"><label>Language</label><select id="settLang"><option value="en" ${s.language==='en'?'selected':''}>English</option><option value="id" ${s.language==='id'?'selected':''}>Bahasa Indonesia</option></select></div></div>
      <div class="settings-section animate-fade-in-up delay-3"><div class="settings-section-title">Storage</div><div class="settings-section-desc">Manage local storage.</div><div class="storage-bar-track"><div class="storage-bar-fill" style="width:24%"></div></div><div class="storage-text"><span>2.4 GB used</span><span>10 GB total</span></div></div>
      <div class="animate-fade-in-up delay-4"><button class="btn-save-settings ripple-container" data-action="save-settings">Save Settings</button></div></div></div>`}

    /* ============================================
       GLOBAL EVENTS
       ============================================ */
    function bindGlobalEvents(){
      document.getElementById('hamburgerBtn').addEventListener('click',toggleSidebar);
      document.getElementById('sidebarOverlay').addEventListener('click',closeSidebar);
      document.getElementById('notifBtn').addEventListener('click',e=>{e.stopPropagation();document.getElementById('notifDropdown').classList.toggle('show')});
      document.addEventListener('click',e=>{const dd=document.getElementById('notifDropdown');if(dd&&!dd.contains(e.target)&&e.target!==document.getElementById('notifBtn'))dd.classList.remove('show')});
      document.getElementById('creditsBtn').addEventListener('click',()=>showToast('Credits',`You have ${fmtN(S.credits)} credits.`,'info'));
      document.getElementById('themeToggleBtn').addEventListener('click',()=>{S.settings.darkMode=!S.settings.darkMode;applyTheme();});
      document.getElementById('avatarBtn').addEventListener('click',()=>{
        const auth=getAuthState();
        const userName=auth?.username||'John Doe';
        showModal('Profile',`<div style="text-align:center"><div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--primary-dark),var(--primary));display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#000;margin:0 auto 16px">${userName.charAt(0).toUpperCase()}</div><div style="font-size:18px;font-weight:700">${esc(userName)}</div><div style="font-size:13px;color:var(--text-muted)">${esc(userName)}@local</div></div>`,`<button class="btn-modal cancel" data-action="close-modal">Close</button><button class="btn-modal danger" data-action="logout-app">Logout</button>`);
      });
      document.getElementById('globalSearch').addEventListener('input',e=>{const q=e.target.value.trim();if(q.length>0){S.searchQuery=q;if(S.currentPage!=='history')navTo('history');else renderPage();}});
      document.addEventListener('click',handleClick);
    }

    /* ============================================
       GLOBAL CLICK HANDLER
       ============================================ */
    function handleClick(e){
      const t=e.target.closest('[data-action]');if(!t)return;const a=t.dataset.action;
      switch(a){
        case 'navigate':S.searchQuery='';S.currentPromptCategory=null;navTo(t.dataset.page);break;
        case 'select-project':S.currentProject=t.dataset.project;renderSidebar();navTo('history');break;
        case 'toast-close':rmToast(t.closest('.toast'));break;
        case 'clear-notifs':S.notifications=[];renderNotifs();showToast('Notifications','All marked as read.','info');break;
        case 'close-modal':closeModal();break;
        case 'logout-app':clearAuthState();closeModal();window.location.href='./Login%20TARMOC%20AI%20Studio%203.html';break;
        case 'browse-ref':{const s=parseInt(t.closest('.ref-image-slot').dataset.slot);const i=document.getElementById('refFileInput');i.onchange=ev=>{Array.from(ev.target.files).forEach((f,idx)=>{const ts=s+idx;if(ts<4){const r=new FileReader();r.onload=re=>{S.refImages[ts]=re.target.result;renderPage()};r.readAsDataURL(f);}});ev.target.value='';};i.click();break;}
        case 'remove-ref':{e.stopPropagation();S.refImages[parseInt(t.dataset.slot)]=null;renderPage();break;}
        case 'download-history':showToast('Download','File download started.','success');break;
        case 'delete-history':{const id=parseInt(t.dataset.id);showModal('Delete Item','<p style="font-size:14px;color:var(--text-secondary)">Are you sure? This cannot be undone.</p>',`<button class="btn-modal cancel" data-action="close-modal">Cancel</button><button class="btn-modal danger" data-action="confirm-del" data-id="${id}">Delete</button>`);break;}
        case 'confirm-del':{S.history=S.history.filter(h=>h.id!==parseInt(t.dataset.id));closeModal();renderPage();showToast('Deleted','Item deleted.','success');break;}
        case 'browse-edit-image':{const i=document.getElementById('editFileInput');i.onchange=ev=>{const f=ev.target.files[0];if(f){const r=new FileReader();r.onload=re=>{S.editingImage=re.target.result;renderPage()};r.readAsDataURL(f);}};i.click();break;}
        case 'select-tool':S.activeTool=t.dataset.tool;renderPage();break;
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
        case 'clear-cache':showToast('Cache Cleared','Temporary files cleared.','success');break;

        /* ======= WORKFLOW (AI IMAGE) ======= */

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

          const API_URL = 'http://localhost:3001/api/affiliate/generate'; 

          fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          })
          .then(res => {
            if (!res.ok) throw new Error('Server error: ' + res.status);
            return res.json();
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
      const s=S.wfStep,d=S.wfData;
      if(s===2){const ta=document.getElementById('wfUserPrompt');if(ta)d.userPrompt=ta.value;}
      if(s===4){const ta=document.getElementById('wfStoryboard');if(ta)d.storyboard=ta.value;}
      if(s===5){const ta=document.getElementById('wfMasterPrompt');if(ta)d.masterPrompt=ta.value;}
      if(s===1&&!d.productImage){showToast('Upload Required','Please upload a product image.','warning');return;}
      if(s===2&&!d.userPrompt.trim()){showToast('Description Required','Please describe your video.','warning');return;}
      if(s===6&&!d.provider){showToast('Provider Required','Select an AI provider.','warning');return;}
      if(s===2||s===3||s===4){
        S.wfStep=s+1;S.wfLoading=true;renderPage();
        setTimeout(()=>{if(s===2)genAnalysis();if(s===3)d.storyboard=genStoryboard();if(s===4)d.masterPrompt=genMasterPrompt();S.wfLoading=false;renderPage();},s===2?2000:s===3?2500:1800);
        return;
      }
      if(s<6){S.wfStep=s+1;S.wfSent=false;renderPage();}
    }

    /* ============================================
       PER-PAGE EVENT BINDING
       ============================================ */
    function bindPageEvents(){
      const p=S.currentPage;
      if(p==='ai-video')bindVidEvents();
      if(p==='ai-image')bindWFEvents();
      if(p==='ai-product')bindAPEvents();
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
      if(p==='image-editing'){const ab=document.getElementById('applyEditBtn');if(ab&&S.editingImage)ab.addEventListener('click',()=>{if(!S.activeTool){showToast('Select Tool','Select a tool first.','warning');return;}if(S.credits<15){showToast('Insufficient Credits','Need 15 credits.','error');return;}ab.innerHTML='<span style="display:inline-block;width:18px;height:18px;border:2px solid rgba(0,0,0,0.2);border-top-color:#000;border-radius:50%;animation:spin 0.8s linear infinite"></span> Processing...';ab.style.pointerEvents='none';setTimeout(()=>{S.credits-=15;document.getElementById('creditsCount').textContent=fmtN(S.credits);ab.innerHTML='<i data-lucide="sparkles"></i> Apply Edit';ab.style.pointerEvents='';lucide.createIcons({nodes:[ab]});showToast('Edit Applied','Edit completed.','success');},2500);});}
      if(p==='character-library'){const i=document.getElementById('charSearch');if(i)i.addEventListener('input',e=>{S.searchQuery=e.target.value;renderPage();})}
      if(p==='product-library'){const i=document.getElementById('prodSearch'),f=document.getElementById('prodCatFilter');const apply=()=>{const q=(i?.value||'').toLowerCase(),cat=f?.value||'';const g=document.getElementById('prodGrid');if(!g)return;const fl=S.products.filter(p=>{return(p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q))&&(!cat||p.category===cat)});g.innerHTML=fl.length===0?'<div class="empty-state" style="grid-column:1/-1"><i data-lucide="package"></i><div class="empty-title">No Products Found</div></div>':fl.map((p,idx)=>`<div class="library-card animate-fade-in-up delay-${Math.min(idx+1,8)}" style="text-align:left"><div class="product-card-thumb"><img src="${p.thumbnail}" alt="${esc(p.name)}" loading="lazy"></div><span class="product-card-category">${esc(p.category)}</span><div class="library-card-name" style="text-align:left">${esc(p.name)}</div><div class="library-card-actions" style="justify-content:flex-start;margin-top:12px"><button class="card-action-btn" data-action="view-product" data-id="${p.id}"><i data-lucide="eye"></i> Detail</button><button class="card-action-btn" data-action="gen-product-prompt" data-id="${p.id}"><i data-lucide="sparkles"></i> Generate</button><button class="card-action-btn danger" data-action="delete-product" data-id="${p.id}"><i data-lucide="trash-2"></i></button></div></div>`).join('');lucide.createIcons({nodes:[g]});};if(i)i.addEventListener('input',apply);if(f)f.addEventListener('change',apply);}
      if(p==='history'){const i=document.getElementById('histSearch');if(i)i.addEventListener('input',e=>{S.searchQuery=e.target.value;renderPage();});}
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
      if(uz&&fi){uz.addEventListener('click',()=>fi.click());setupDD(uz,files=>{const f=files[0];if(f){const r=new FileReader();r.onload=re=>{S.wfData.productImage=re.target.result;renderPage()};r.readAsDataURL(f);}});}
      const p2=document.getElementById('wfUserPrompt'),b2=document.getElementById('wfS2N');
      if(p2&&b2)p2.addEventListener('input',()=>{b2.disabled=!p2.value.trim();});
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

    function toggleSidebar(){document.getElementById('sidebar').classList.toggle('open');document.getElementById('sidebarOverlay').classList.toggle('show')}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebarOverlay').classList.remove('show')}

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
    /* ============================================
       INIT
       ============================================ */
    document.addEventListener('DOMContentLoaded',()=>{
  if(!requireAuth())return;
  const savedTheme=localStorage.getItem('tarmocTheme');
  if(savedTheme)S.settings.darkMode=savedTheme==='dark';
  applyTheme();
  renderSidebar();renderNotifs();renderPage();bindGlobalEvents()
});