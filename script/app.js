
    /* ============================================
       STATE
       ============================================ */
    const S={
      currentPage:'dashboard',currentProject:null,currentPromptCategory:null,
      videoGenState:'empty',videoGenProgress:0,videoGenStage:'',
      refImages:[null,null,null,null],editingImage:null,activeTool:null,
      searchQuery:'',historyFilter:'all',
      wfStep:1,wfLoading:false,wfSent:false,
      wfData:{productImage:null,userPrompt:'',analysis:null,storyboard:'',masterPrompt:'',provider:''},
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

    const MENU=[{id:'dashboard',label:'Dashboard',icon:'layout-dashboard'},{id:'ai-video',label:'AI Video',icon:'video'},{id:'ai-image',label:'AI Image',icon:'image'},{id:'image-editing',label:'Image Editing',icon:'wand-2'},{id:'character-library',label:'Character Library',icon:'user'},{id:'product-library',label:'Product Library',icon:'package'},{id:'prompt-library',label:'Prompt Library',icon:'book-open'},{id:'history',label:'History',icon:'clock'},{id:'settings',label:'Settings',icon:'settings'}];
    const WORKSPACES=[{id:'tarmoc-product',name:'TARMOC Product',color:'#F59E0B'},{id:'fiber-academy',name:'Fiber Academy',color:'#3B82F6'},{id:'tiktok',name:'TikTok',color:'#EF4444'},{id:'podcast',name:'Podcast',color:'#8B5CF6'},{id:'shopee',name:'Shopee',color:'#F97316'}];
    const VPROVIDERS=['Google Veo','OpenAI','Gemini','Runway','Kling','Pika','Hailuo'];
    const CAMSTYLES=['Cinematic','Documentary','Commercial','Drone Shot','Handheld','Static','Dolly Zoom','Crane Shot'];
    const VSTAGES=['Uploading','Analyzing','Connecting AI','Generating','Rendering','Finished'];

    /* Workflow steps & providers */
    const WFS=[{n:1,title:'Upload Product',desc:'Add your product image',icon:'package'},{n:2,title:'Describe Your Video',desc:'Write your vision',icon:'pencil'},{n:3,title:'AI Product Analysis',desc:'Product intelligence',icon:'brain'},{n:4,title:'Generate Storyboard',desc:'Scene planning',icon:'layout-grid'},{n:5,title:'Generate Master Video Prompt',desc:'Final prompt generation',icon:'sparkles'},{n:6,title:'Send to Video AI',desc:'Choose provider & send',icon:'send'}];
    const WFP=[{id:'google-veo',name:'Google Veo',desc:'High quality cinematic',color:'#4285F4',letter:'G'},{id:'kling',name:'Kling',desc:'Fast generation',color:'#8B5CF6',letter:'K'},{id:'runway',name:'Runway',desc:'Creative & artistic',color:'#22C55E',letter:'R'},{id:'pika',name:'Pika',desc:'Short-form optimized',color:'#F59E0B',letter:'P'},{id:'luma',name:'Luma',desc:'Realistic motion',color:'#EC4899',letter:'L'}];

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
    function renderPage(){const m=document.getElementById('mainContent');const pg={dashboard:pgDashboard,'ai-video':pgAIVideo,'ai-image':pgAIImage,'image-editing':pgImgEdit,'character-library':pgCharLib,'product-library':pgProdLib,'prompt-library':pgPromptLib,history:pgHistory,settings:pgSettings};m.innerHTML=(pg[S.currentPage]||pgDashboard)();lucide.createIcons({nodes:[m]});bindPageEvents()}

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
       AI IMAGE — 6-STEP WORKFLOW
       ============================================ */
    function pgAIImage(){
      return `<div class="animate-fade-in"><h1 class="page-title">AI Image</h1><p class="page-subtitle">Transform your product image into a professional video in 6 steps.</p>
        <div class="workflow-container"><div class="workflow-layout">
          <div class="workflow-stepper">${WFS.map(st=>{const done=S.wfStep>st.n,act=S.wfStep===st.n;return `<div class="ws-item ${done?'completed':''} ${act?'active':''}" data-action="wf-goto" data-step="${st.n}"><div class="ws-circle">${done?'<i data-lucide="check"></i>':`<span>${st.n}</span>`}</div><div class="ws-info"><div class="ws-title">${st.title}</div><div class="ws-desc">${st.desc}</div></div>${st.n<6?'<div class="ws-line"></div>':''}</div>`}).join('')}</div>
          <div class="workflow-content">${rWFS()}</div>
        </div></div></div>`;
    }

    function rWFS(){
      const s=S.wfStep,d=S.wfData;
      if(S.wfLoading)return `<div class="wf-step-card"><div class="wf-loading"><div class="wf-loading-spinner"></div><div class="wf-loading-text">${s===3?'Analyzing product features...':s===4?'Generating storyboard scenes...':'Crafting master video prompt...'}</div><div class="wf-loading-dots"><span></span><span></span><span></span></div></div></div>`;

      if(s===1)return `<div class="wf-step-card"><div class="wf-step-header"><div class="wf-step-badge"><i data-lucide="package"></i> Step 1</div><div class="wf-step-title">Upload Product</div><div class="wf-step-desc">Upload a clear photo of your product. AI will analyze its features, colors, materials, and style to create the perfect video.</div></div>
        ${d.productImage?`<img src="${d.productImage}" class="wf-preview-img" alt="Product"><button class="btn-wf-small" data-action="wf-remove-product" style="margin:0 auto 16px;display:flex"><i data-lucide="x"></i> Remove Image</button>`
        :`<div class="wf-upload-zone" id="wfUploadZone" data-action="wf-browse-product"><i data-lucide="upload-cloud"></i><div class="upload-title">Drop your product image here</div><div class="upload-desc">PNG, JPG, WebP up to 10MB</div></div><input type="file" id="wfFileInput" accept="image/*" style="display:none">`}
        <div class="wf-nav"><div></div><button class="btn-wf next ripple-container" data-action="wf-next" ${!d.productImage?'disabled':''}><span>Continue to Step 2</span> <i data-lucide="arrow-right"></i></button></div></div>`;

      if(s===2)return `<div class="wf-step-card"><div class="wf-step-header"><div class="wf-step-badge"><i data-lucide="pencil"></i> Step 2</div><div class="wf-step-title">Describe Your Video</div><div class="wf-step-desc">Tell us what kind of video you want. Be specific about mood, style, duration, and which product features to highlight.</div></div>
        <div class="form-group"><label class="form-label">Your Video Description (User Prompt)</label><textarea class="form-textarea" id="wfUserPrompt" rows="6" placeholder="e.g. A cinematic 10-second product video showcasing the earbuds' premium design with dramatic lighting and slow-motion close-ups of the mesh texture. Start with a wide shot revealing the product on a dark surface, then transition to detailed close-ups...">${esc(d.userPrompt)}</textarea></div>
        <div style="background:var(--bg-input);border:1px solid var(--border-color);border-radius:var(--radius-xs);padding:14px 16px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;color:var(--text-muted);margin-bottom:8px">Tips for better results</div>
          <ul style="font-size:12px;color:var(--text-secondary);line-height:1.9;padding-left:16px"><li>Specify video duration and aspect ratio preferences</li><li>Describe the mood: premium, energetic, minimal, dramatic</li><li>Mention specific product features to highlight</li><li>Include preferred camera movements and angles</li><li>Reference a style: Apple keynote, Nike ad, etc.</li></ul>
        </div>
        <div class="wf-nav"><button class="btn-wf back" data-action="wf-back"><i data-lucide="arrow-left"></i> Back</button><button class="btn-wf next ripple-container" data-action="wf-next" id="wfS2N" ${!d.userPrompt.trim()?'disabled':''}><span>Analyze Product</span> <i data-lucide="arrow-right"></i></button></div></div>`;

      if(s===3)return `<div class="wf-step-card"><div class="wf-step-header"><div class="wf-step-badge"><i data-lucide="brain"></i> Step 3</div><div class="wf-step-title">AI Product Analysis</div><div class="wf-step-desc">Our AI analyzed your product image and description. Here are the detected attributes that will shape your video.</div></div>
        ${d.analysis?`<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;padding:14px 16px;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:var(--radius-xs)"><i data-lucide="check-circle" style="width:20px;height:20px;color:var(--primary);flex-shrink:0"></i><span style="font-size:13px;font-weight:600;color:var(--primary-light)">Analysis complete — <strong>${d.analysis.type}</strong> detected</span></div>
        <div class="wf-analysis-grid">${d.analysis.items.map((item,i)=>`<div class="wf-analysis-item" style="animation:analysisReveal 0.4s ease-out ${i*0.06}s both"><div class="a-label">${item.label}</div><div class="a-value">${item.value}</div></div>`).join('')}</div>`
        :'<div class="empty-state"><p style="color:var(--text-muted)">No analysis data</p></div>'}
        <div class="wf-nav"><button class="btn-wf back" data-action="wf-back"><i data-lucide="arrow-left"></i> Back</button><button class="btn-wf next ripple-container" data-action="wf-next"><span>Generate Storyboard</span> <i data-lucide="arrow-right"></i></button></div></div>`;

      if(s===4)return `<div class="wf-step-card"><div class="wf-step-header"><div class="wf-step-badge"><i data-lucide="layout-grid"></i> Step 4</div><div class="wf-step-title">Generate Storyboard</div><div class="wf-step-desc">AI-generated scene-by-scene storyboard. You can edit any scene text before proceeding to the next step.</div></div>
        <div class="wf-output-area"><textarea class="form-textarea" id="wfStoryboard" rows="16" style="font-size:12.5px;line-height:1.9;min-height:360px;font-family:'Inter',monospace">${esc(d.storyboard)}</textarea>
          <div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="wfStoryboard"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="wf-download" data-target="wfStoryboard" data-filename="storyboard.txt"><i data-lucide="download"></i> Download</button></div>
        </div>
        <div class="wf-nav"><button class="btn-wf back" data-action="wf-back"><i data-lucide="arrow-left"></i> Back</button><button class="btn-wf next ripple-container" data-action="wf-next"><span>Generate Master Video Prompt</span> <i data-lucide="arrow-right"></i></button></div></div>`;

      if(s===5)return `<div class="wf-step-card"><div class="wf-step-header"><div class="wf-step-badge"><i data-lucide="sparkles"></i> Step 5</div><div class="wf-step-title">Generate Master Video Prompt</div><div class="wf-step-desc">The final optimized prompt ready to send to any video AI provider. Edit if needed, then proceed to send.</div></div>
        <div class="wf-output-area"><textarea class="form-textarea" id="wfMasterPrompt" rows="12" style="font-size:13px;line-height:1.9;min-height:280px;border-color:rgba(245,158,11,0.2)">${esc(d.masterPrompt)}</textarea>
          <div class="wf-output-actions"><button class="btn-wf-small gold" data-action="wf-copy" data-target="wfMasterPrompt"><i data-lucide="copy"></i> Copy</button><button class="btn-wf-small" data-action="wf-save-prompt"><i data-lucide="save"></i> Save to Library</button></div>
        </div>
        <div class="wf-nav"><button class="btn-wf back" data-action="wf-back"><i data-lucide="arrow-left"></i> Back</button><button class="btn-wf next ripple-container" data-action="wf-next"><span>Send to Video AI</span> <i data-lucide="arrow-right"></i></button></div></div>`;

      if(s===6)return `<div class="wf-step-card">${S.wfSent
        ?`<div class="wf-success"><div class="wf-success-icon"><i data-lucide="check-circle"></i></div><div class="wf-success-title">Sent to ${WFP.find(p=>p.id===d.provider)?.name||'AI'}</div><div class="wf-success-desc">Your prompt has been sent successfully. The video will appear in History.</div><div style="display:flex;justify-content:center;gap:12px;margin-top:8px"><button class="btn-wf back" data-action="wf-reset"><i data-lucide="rotate-ccw"></i> New Project</button><button class="btn-wf next ripple-container" data-action="navigate" data-page="ai-video"><i data-lucide="video"></i> Go to AI Video</button></div></div>`
        :`<div class="wf-step-header"><div class="wf-step-badge"><i data-lucide="send"></i> Step 6</div><div class="wf-step-title">Send to Video AI</div><div class="wf-step-desc">Choose your preferred AI provider and send the master prompt for video generation.</div></div>
          <div class="wf-provider-grid">${WFP.map(p=>`<div class="wf-provider-card ${d.provider===p.id?'selected':''}" data-action="wf-select-provider" data-provider="${p.id}"><div class="pv-icon" style="background:${p.color}20;color:${p.color}">${p.letter}</div><div class="pv-name">${p.name}</div><div class="pv-desc">${p.desc}</div></div>`).join('')}</div>
          <div class="wf-nav"><button class="btn-wf back" data-action="wf-back"><i data-lucide="arrow-left"></i> Back</button><button class="btn-wf next ripple-container" data-action="wf-send" ${!d.provider?'disabled':''}><i data-lucide="send"></i> Send to AI</button></div>`}</div>`;
      return '';
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
      const mood=a.items.find(i=>i.label.includes('Mood'))?.value.replace(/<[^>]*>/g,', ').trim()||'Premium';
      const light=a.items.find(i=>i.label.includes('Lighting'))?.value.replace(/<[^>]*>/g,', ').trim()||'Studio';
      const cam=a.items.find(i=>i.label.includes('Camera'))?.value.replace(/<[^>]*>/g,', ').trim()||'Dolly';
      const mat=a.items.find(i=>i.label.includes('Material'))?.value.replace(/<[^>]*>/g,', ').trim()||'Plastic';
      const bg=a.items.find(i=>i.label.includes('Background'))?.value||'Dark gradient surface';
      const colors=a.items.find(i=>i.label.includes('Color'))?.value.replace(/<[^>]*>/g,', ').trim()||'Black, Silver';
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
      const mood=a.items.find(i=>i.label.includes('Mood'))?.value.replace(/<[^>]*>/g,', ').trim()||'Premium';
      const light=a.items.find(i=>i.label.includes('Lighting'))?.value.replace(/<[^>]*>/g,' and ').trim()||'Studio';
      const cam=a.items.find(i=>i.label.includes('Camera'))?.value.replace(/<[^>]*>/g,', ').trim()||'Dolly';
      const mat=a.items.find(i=>i.label.includes('Material'))?.value.replace(/<[^>]*>/g,', ').trim()||'Plastic';
      const bg=a.items.find(i=>i.label.includes('Background'))?.value||'Dark gradient surface';
      const colors=a.items.find(i=>i.label.includes('Color'))?.value.replace(/<[^>]*>/g,', ').trim()||'Black, Silver';
      const pr=S.wfData.userPrompt;
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
        case 'toggle-setting':{if(t.dataset.key==='darkMode')S.settings.darkMode=!S.settings.darkMode;t.classList.toggle('active');break;}
        case 'save-settings':{showModal('Settings Saved',`<div style="text-align:center;padding:10px 0"><div style="width:56px;height:56px;border-radius:50%;background:rgba(245,158,11,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:var(--primary)"><i data-lucide="check-circle" style="width:28px;height:28px"></i></div><div style="font-size:16px;font-weight:700;margin-bottom:6px">All Settings Saved</div></div>`,`<button class="btn-modal confirm" data-action="close-modal">Done</button>`);lucide.createIcons({nodes:[document.getElementById('modalContainer')]});break;}
        case 'clear-cache':showToast('Cache Cleared','Temporary files cleared.','success');break;

        /* ======= WORKFLOW ======= */
        case 'wf-browse-product':{const i=document.getElementById('wfFileInput');i.onchange=ev=>{const f=ev.target.files[0];if(f){const r=new FileReader();r.onload=re=>{S.wfData.productImage=re.target.result;renderPage()};r.readAsDataURL(f);}};i.click();break;}
        case 'wf-remove-product':S.wfData.productImage=null;renderPage();break;
        case 'wf-goto':{const step=parseInt(t.dataset.step);if(step<S.wfStep){S.wfStep=step;renderPage();}break;}
        case 'wf-next':wfNext();break;
        case 'wf-back':{if(S.wfStep>1){S.wfStep--;S.wfLoading=false;S.wfSent=false;renderPage();}break;}
        case 'wf-copy':{const ta=document.getElementById(t.dataset.target);if(ta)navigator.clipboard.writeText(ta.value).then(()=>showToast('Copied','Copied to clipboard.','success')).catch(()=>showToast('Error','Failed to copy.','error'));break;}
        case 'wf-download':{const ta=document.getElementById(t.dataset.target);if(ta){const b=new Blob([ta.value],{type:'text/plain'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=t.dataset.filename||'download.txt';a.click();URL.revokeObjectURL(u);showToast('Downloaded','File downloaded.','success');}break;}
        case 'wf-save-prompt':{const ta=document.getElementById('wfMasterPrompt');if(ta&&ta.value.trim()){S.prompts.push({id:genId(),category:'commercial',title:'Custom Workflow Prompt',prompt:ta.value.trim(),count:0});showToast('Saved','Prompt saved to Library.','success');}break;}
        case 'wf-select-provider':S.wfData.provider=t.dataset.provider;renderPage();break;
        case 'wf-send':{if(!S.wfData.provider)return;S.wfSent=true;S.videoPrompt=S.wfData.masterPrompt;const pv=WFP.find(p=>p.id===S.wfData.provider);S.history.unshift({id:genId(),type:'video',date:new Date().toISOString().slice(0,16).replace('T',' '),provider:pv?.name||'AI',prompt:S.wfData.masterPrompt.substring(0,100)+'...',thumbnail:`https://picsum.photos/seed/wf${Date.now()}/400/225`,project:WORKSPACES.find(p=>p.id===S.currentProject)?.name||'TARMOC Product'});S.credits-=50;document.getElementById('creditsCount').textContent=fmtN(S.credits);renderPage();showToast('Sent',`Prompt sent to ${pv?.name}.`,'success');break;}
        case 'wf-reset':S.wfStep=1;S.wfLoading=false;S.wfSent=false;S.wfData={productImage:null,userPrompt:'',analysis:null,storyboard:'',masterPrompt:'',provider:''};renderPage();break;
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

    /* ============================================
       INIT
       ============================================ */
    document.addEventListener('DOMContentLoaded',()=>{if(!requireAuth())return;renderSidebar();renderNotifs();renderPage();bindGlobalEvents()});