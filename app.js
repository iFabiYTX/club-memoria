// ========================================================
// CLUB MEMORIA — Controlador Principal, Vidas y Salón de Honor
// Desarrollado por Echomaii Corp para Chio
// ========================================================

// Gestor de Audio Sintetizado en tiempo real (Cero dependencias)
const SoundManager = (() => {
  let audioCtx = null;
  let isMuted = localStorage.getItem('club_memoria_muted') === 'true';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('club_memoria_muted', isMuted);
    updateSoundButton();
  }

  function updateSoundButton() {
    const btn = document.getElementById('btn-sound-toggle');
    if (btn) {
      btn.innerText = isMuted ? '🔇' : '🔔';
      btn.title = isMuted ? 'Activar sonido' : 'Silenciar sonido';
    }
  }

  function playClick() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  function playPop() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  }

  function playChime() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99]; // Do, Mi, Sol
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch (e) {}
  }

  function playWin() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const arpeggio = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      arpeggio.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.16, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.5);
      });
    } catch (e) {}
  }

  // Sonido suave de pérdida de vida (tono descendente)
  function playError() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  return {
    toggleMute,
    updateSoundButton,
    playClick,
    playPop,
    playChime,
    playWin,
    playError
  };
})();

window.SoundManager = SoundManager;

// ========================================================
// CONTROLADOR PRINCIPAL DE LA APLICACIÓN
// ========================================================
const App = (() => {
  let currentScreen = 'screen-home';
  let userName = localStorage.getItem('club_memoria_user') || 'Chio';
  let starsCount = parseInt(localStorage.getItem('club_memoria_stars') || '5', 10);
  let lives = 3; // 3 vidas máximas
  let lastCompletedActivity = '';

  function init() {
    setupUserProfile();
    setupFontToggle();
    setupNavigation();
    setupAchievements();
    setupCelebrationModal();
    setupMetacognition();
    setupLeaderboard();

    SoundManager.updateSoundButton();
    document.getElementById('btn-sound-toggle').addEventListener('click', () => {
      SoundManager.toggleMute();
    });

    // Iniciar módulos de juegos
    PuzzleGame.init();
    SudokuGame.init();
    WordSearchGame.init();
    DifferencesGame.init();

    // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  // Configuración de Perfil de Usuario
  function setupUserProfile() {
    const displayEl = document.getElementById('display-user-name');
    const inputEl = document.getElementById('input-user-name');
    const greetingEl = document.getElementById('welcome-greeting');
    const badgeEl = document.getElementById('user-badge');
    const inputBox = document.getElementById('user-input-box');

    displayEl.innerText = userName;
    greetingEl.innerText = `¡Hola, ${userName}!`;

    document.getElementById('btn-edit-name').addEventListener('click', () => {
      badgeEl.style.display = 'none';
      inputBox.style.display = 'flex';
      inputEl.value = userName;
      inputEl.focus();
    });

    document.getElementById('btn-save-name').addEventListener('click', () => {
      const newName = inputEl.value.trim();
      if (newName) {
        userName = newName;
        localStorage.setItem('club_memoria_user', userName);
        displayEl.innerText = userName;
        greetingEl.innerText = `¡Hola, ${userName}!`;
        renderLeaderboard();
      }
      badgeEl.style.display = 'inline-block';
      inputBox.style.display = 'none';
      SoundManager.playClick();
    });
  }

  // Ajuste de tamaño de fuente
  function setupFontToggle() {
    const btnNormal = document.getElementById('btn-font-normal');
    const btnLarge = document.getElementById('btn-font-large');
    const headerFontBtn = document.getElementById('btn-font-toggle');

    const savedFont = localStorage.getItem('club_memoria_fontsize') || 'normal';
    if (savedFont === 'large') {
      document.body.classList.add('font-extra-large');
      btnNormal.classList.remove('selected');
      btnLarge.classList.add('selected');
    }

    function setFont(size) {
      if (size === 'large') {
        document.body.classList.add('font-extra-large');
        btnNormal.classList.remove('selected');
        btnLarge.classList.add('selected');
        localStorage.setItem('club_memoria_fontsize', 'large');
      } else {
        document.body.classList.remove('font-extra-large');
        btnLarge.classList.remove('selected');
        btnNormal.classList.add('selected');
        localStorage.setItem('club_memoria_fontsize', 'normal');
      }
      SoundManager.playClick();
    }

    btnNormal.addEventListener('click', () => setFont('normal'));
    btnLarge.addEventListener('click', () => setFont('large'));

    headerFontBtn.addEventListener('click', () => {
      const isExtra = document.body.classList.contains('font-extra-large');
      setFont(isExtra ? 'normal' : 'large');
    });
  }

  // Navegación entre pantallas
  function setupNavigation() {
    const btnBack = document.getElementById('btn-back');

    btnBack.addEventListener('click', () => {
      SoundManager.playClick();
      navigateTo('screen-home');
    });

    // Botones del catálogo de juegos
    document.querySelectorAll('.game-card-btn').forEach(card => {
      card.addEventListener('click', () => {
        const gameType = card.dataset.game;
        SoundManager.playClick();

        if (gameType === 'puzzle') {
          navigateTo('screen-game-puzzle');
          PuzzleGame.resetGame();
        } else if (gameType === 'sudoku') {
          navigateTo('screen-game-sudoku');
          SudokuGame.resetGame();
        } else if (gameType === 'wordsearch') {
          navigateTo('screen-game-wordsearch');
          WordSearchGame.resetGame();
        } else if (gameType === 'differences') {
          navigateTo('screen-game-differences');
          DifferencesGame.resetGame();
        }
      });
    });

    // Botón de Top en cabecera y en tarjeta
    document.getElementById('btn-top-ranking').addEventListener('click', () => {
      SoundManager.playClick();
      renderLeaderboard();
      navigateTo('screen-leaderboard');
    });

    document.getElementById('btn-open-ranking-card').addEventListener('click', () => {
      SoundManager.playClick();
      renderLeaderboard();
      navigateTo('screen-leaderboard');
    });

    document.getElementById('btn-close-leaderboard').addEventListener('click', () => {
      SoundManager.playClick();
      navigateTo('screen-home');
    });
  }

  function navigateTo(screenId) {
    document.querySelectorAll('.view-screen').forEach(scr => scr.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      currentScreen = screenId;
    }

    const btnBack = document.getElementById('btn-back');
    if (screenId === 'screen-home') {
      btnBack.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      btnBack.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Rincón de logros
  function setupAchievements() {
    updateStarsDisplay();
    renderWeekCalendar();
  }

  function updateStarsDisplay() {
    const el = document.getElementById('stars-total-text');
    if (el) {
      el.innerText = `Estrellas ganadas: ${starsCount} ⭐`;
    }
  }

  function renderWeekCalendar() {
    const container = document.getElementById('calendar-week-display');
    container.innerHTML = '';
    const days = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    const todayIndex = (new Date().getDay() + 6) % 7;

    days.forEach((day, idx) => {
      const box = document.createElement('div');
      box.className = 'day-box';
      if (idx === todayIndex) {
        box.classList.add('active-day');
      }

      const hasStar = idx <= todayIndex;
      box.innerHTML = `
        <div class="day-name">${day}</div>
        <div class="day-status">${hasStar ? '⭐' : '⚪'}</div>
      `;
      container.appendChild(box);
    });
  }

  // Salón de Honor (Top Jugadores)
  function setupLeaderboard() {
    renderLeaderboard();
  }

  function renderLeaderboard() {
    // Lista de jugadores con puntajes amigables
    let players = [
      { name: userName, stars: starsCount, isUser: true, avatar: '🌱' },
      { name: 'Rosa M.', stars: 15, isUser: false, avatar: '🌺' },
      { name: 'Don Carlos', stars: 12, isUser: false, avatar: '🎩' },
      { name: 'Doña Elena', stars: 9, isUser: false, avatar: '🎨' },
      { name: 'Pedro G.', stars: 6, isUser: false, avatar: '📚' }
    ];

    // Ordenar de mayor a menor estrellas
    players.sort((a, b) => b.stars - a.stars);

    // Podio (1, 2, 3)
    const podiumEl = document.getElementById('podium-display');
    podiumEl.innerHTML = `
      <div class="podium-place second">
        <div class="podium-avatar">${players[1].avatar}</div>
        <div style="font-size:14px; font-weight:800; margin-bottom:4px;">${players[1].name}</div>
        <div class="podium-bar silver">
          <span>🥈 2°</span>
          <span style="font-size:13px;">${players[1].stars} ⭐</span>
        </div>
      </div>
      <div class="podium-place first">
        <div class="podium-avatar">${players[0].avatar}</div>
        <div style="font-size:15px; font-weight:800; margin-bottom:4px; color:var(--primary);">${players[0].name}</div>
        <div class="podium-bar gold">
          <span>🥇 1°</span>
          <span style="font-size:14px;">${players[0].stars} ⭐</span>
        </div>
      </div>
      <div class="podium-place third">
        <div class="podium-avatar">${players[2].avatar}</div>
        <div style="font-size:14px; font-weight:800; margin-bottom:4px;">${players[2].name}</div>
        <div class="podium-bar bronze">
          <span>🥉 3°</span>
          <span style="font-size:13px;">${players[2].stars} ⭐</span>
        </div>
      </div>
    `;

    // Resto de la lista
    const listEl = document.getElementById('ranking-list-display');
    listEl.innerHTML = '';

    players.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = `ranking-row ${p.isUser ? 'current-user-row' : ''}`;
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>#${idx + 1}</span>
          <span style="font-size: 20px;">${p.avatar}</span>
          <span>${p.name} ${p.isUser ? '(Tú)' : ''}</span>
        </div>
        <div>
          <span style="color: var(--star); font-size: 16px;">⭐</span> <strong>${p.stars}</strong>
        </div>
      `;
      listEl.appendChild(row);
    });
  }

  // Celebración al completar juego
  function setupCelebrationModal() {
    const modal = document.getElementById('modal-celebration');
    const btnContinue = document.getElementById('btn-celebration-continue');

    btnContinue.addEventListener('click', () => {
      modal.classList.remove('active');
      SoundManager.playClick();
      navigateTo('screen-metacognition');
      resetMetacognitionView();
    });
  }

  function onActivityCompleted(activityName) {
    lastCompletedActivity = activityName;
    starsCount += 2; // Sumar 2 estrellas por victoria
    localStorage.setItem('club_memoria_stars', starsCount);
    updateStarsDisplay();
    renderLeaderboard();

    const titleEl = document.getElementById('celebration-title');
    const msgEl = document.getElementById('celebration-message');

    titleEl.innerText = `¡Excelente, ${userName}!`;
    msgEl.innerText = `Completaste la actividad de ${activityName}. ¡Has ganado 2 nuevas estrellas para tu Salón de Honor!`;

    document.getElementById('modal-celebration').classList.add('active');
  }

  // Módulo de Metacognición
  let metacogTimer = null;

  function setupMetacognition() {
    const feedbackBox = document.getElementById('metacog-feedback-message');
    const btnFinish = document.getElementById('btn-metacog-finish');

    document.querySelectorAll('.btn-mood-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        if (metacogTimer) clearTimeout(metacogTimer);

        // Resaltar visualmente el botón seleccionado
        document.querySelectorAll('.btn-mood-choice').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const mood = btn.dataset.mood;
        SoundManager.playChime();

        let message = '';
        if (mood === 'energico') {
          message = `🌟 ¡Maravilloso, ${userName}! Tu mente estuvo ágil y llena de entusiasmo. Guardamos tu logro en el Salón de Honor.`;
        } else if (mood === 'tranquilo') {
          message = `😌 ¡Qué buena sensación, ${userName}! La calma y la paciencia son el secreto para disfrutar cada ejercicio.`;
        } else if (mood === 'cansado') {
          message = `☕ Hiciste un gran trabajo hoy, ${userName}. Es un momento ideal para relajarte, hidratarte y descansar los ojos con satisfacción.`;
        }

        feedbackBox.innerText = message;
        feedbackBox.style.display = 'block';
        btnFinish.style.display = 'flex';

        // Auto-avance suave tras 2.2 segundos para comodidad de los adultos mayores
        metacogTimer = setTimeout(() => {
          navigateTo('screen-home');
        }, 2200);
      });
    });

    btnFinish.addEventListener('click', () => {
      if (metacogTimer) clearTimeout(metacogTimer);
      SoundManager.playClick();
      navigateTo('screen-home');
    });
  }

  function resetMetacognitionView() {
    if (metacogTimer) clearTimeout(metacogTimer);
    document.querySelectorAll('.btn-mood-choice').forEach(b => b.classList.remove('selected'));
    document.getElementById('metacog-feedback-message').style.display = 'none';
    document.getElementById('btn-metacog-finish').style.display = 'none';
  }

  return {
    init,
    navigateTo,
    onActivityCompleted
  };
})();

window.App = App;

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
