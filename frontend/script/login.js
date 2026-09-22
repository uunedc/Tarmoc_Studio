
    // === KREDENSIAL (fallback jika backend offline) ===
    const VALID_USER = 'Tarmoc@studio';
    const VALID_PASS = 'Studio@123';
    const API_BASE = 'http://localhost:5001';

    // === DOM ===
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const fieldUser = document.getElementById('fieldUser');
    const fieldPass = document.getElementById('fieldPass');
    const btnLogin = document.getElementById('btnLogin');
    const togglePass = document.getElementById('togglePass');
    const dashboard = document.getElementById('dashboardOverlay');
    const logoutBtn = document.getElementById('logoutBtn');
    const AUTH_KEY = 'tarmocAuthState';

    function saveAuth(user, adminToken) {
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        loggedIn: true,
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
        allowedMenus: user.allowedMenus || (user.role === 'main_admin' ? ['*'] : []),
        adminToken: adminToken || null,
        updatedAt: Date.now()
      }));
    }

    function clearAuth() {
      localStorage.removeItem(AUTH_KEY);
    }

    function loadAuth() {
      try {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
      } catch {
        return null;
      }
    }

    if (loadAuth()?.loggedIn) {
      const auth = loadAuth();
      if (auth.role === 'sub_admin' || (auth.role === 'main_admin' && auth.adminToken)) {
        window.location.replace('./index.html');
      } else {
        clearAuth();
      }
    }

    // === TOGGLE PASSWORD VISIBILITY ===
    togglePass.addEventListener('click', () => {
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
      togglePass.querySelector('i').className = isPass
        ? 'fa-regular fa-eye-slash'
        : 'fa-regular fa-eye';
    });

    // === HAPUS ERROR SAAT MENGETIK ===
    usernameInput.addEventListener('input', () => fieldUser.classList.remove('error'));
    passwordInput.addEventListener('input', () => fieldPass.classList.remove('error'));

    // === TOAST ===
    function showToast(message, type = 'success') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
      toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${message}`;
      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('out');
        toast.addEventListener('animationend', () => toast.remove());
      }, 3000);
    }

    async function authenticate(user, pass) {
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user, password: pass })
        });
        const data = await res.json();
        if (!res.ok) {
          return { ok: false, error: data.error || 'Login gagal.', disabled: Boolean(data.disabled) };
        }
        return { ok: true, user: data.user, adminToken: data.adminToken || null };
      } catch {
        return { ok: false, error: 'Tidak dapat terhubung ke server. Pastikan backend berjalan.' };
      }
    }

    // === FORM SUBMIT ===
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const user = usernameInput.value.trim();
      const pass = passwordInput.value;

      // Reset error
      fieldUser.classList.remove('error');
      fieldPass.classList.remove('error');

      // Cek kosong
      let hasError = false;
      if (!user) {
        fieldUser.classList.add('error');
        fieldUser.querySelector('.error-msg span').textContent = 'Username wajib diisi';
        hasError = true;
      }
      if (!pass) {
        fieldPass.classList.add('error');
        fieldPass.querySelector('.error-msg span').textContent = 'Password wajib diisi';
        hasError = true;
      }
      if (hasError) return;

      btnLogin.classList.add('loading');

      const result = await authenticate(user, pass);
      btnLogin.classList.remove('loading');

      if (!result.ok) {
        if (result.disabled) {
          showToast('Account Anda dinonaktifkan. Hubungi administrator.', 'error');
          return;
        }
        if (result.error === 'Username tidak terdaftar') {
          fieldUser.classList.add('error');
          fieldUser.querySelector('.error-msg span').textContent = 'Username tidak terdaftar';
          showToast('Username tidak dikenali', 'error');
          return;
        }
        if (result.error === 'Password salah') {
          fieldPass.classList.add('error');
          fieldPass.querySelector('.error-msg span').textContent = 'Password salah';
          showToast('Password tidak cocok', 'error');
          return;
        }
        showToast(result.error || 'Login gagal', 'error');
        return;
      }

      saveAuth(result.user, result.adminToken);
      showToast('Autentikasi berhasil!', 'success');
      setTimeout(() => {
        window.location.href = './index.html';
      }, 600);
    });

    // === LOGOUT ===
    logoutBtn.addEventListener('click', () => {
      clearAuth();
      dashboard.classList.remove('active');
      usernameInput.value = '';
      passwordInput.value = '';
    });

    // === PARTIKEL CANVAS ===
    (function initParticles() {
      const canvas = document.getElementById('bgCanvas');
      const ctx = canvas.getContext('2d');
      let w, h;
      let particles = [];
      let mouse = { x: -9999, y: -9999 };
      const PARTICLE_COUNT = 70;
      const CONNECT_DIST = 140;

      function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      // Lacak mouse
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      });
      window.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
      });

      // Buat partikel
      class Particle {
        constructor() {
          this.x = Math.random() * w;
          this.y = Math.random() * h;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() - 0.5) * 0.5;
          this.r = Math.random() * 1.8 + 0.5;
          this.baseAlpha = Math.random() * 0.4 + 0.15;
          this.alpha = this.baseAlpha;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          if (this.x < 0) this.x = w;
          if (this.x > w) this.x = 0;
          if (this.y < 0) this.y = h;
          if (this.y > h) this.y = 0;

          // Reaksi terhadap mouse
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const force = (180 - dist) / 180;
            this.alpha = this.baseAlpha + force * 0.5;
            this.x -= dx * force * 0.012;
            this.y -= dy * force * 0.012;
          } else {
            this.alpha += (this.baseAlpha - this.alpha) * 0.05;
          }
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, Math.max(0.1, this.r), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 168, 56, ${this.alpha})`;
          ctx.fill();
        }
      }

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }

      function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < CONNECT_DIST) {
              const alpha = (1 - dist / CONNECT_DIST) * 0.12;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(232, 168, 56, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
      }

      function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
      }
      animate();
    })();

    // === FOCUS INPUT PERTAMA OTOMATIS ===
    window.addEventListener('load', () => {
      setTimeout(() => usernameInput.focus(), 900);
    });