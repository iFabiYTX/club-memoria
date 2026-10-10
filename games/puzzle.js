// ========================================================
// JUEGO: ROMPECABEZAS — 100 NIVELES EN 4 FASES (ESTILO CANDY CRUSH)
// Desarrollado por Echomaii Corp para Club Memoria (Chio)
// ========================================================

const PuzzleGame = (() => {
  let currentLevel = 1;
  let activePhase = 1;
  let gridSize = 2;
  let tilesState = [];
  let selectedTileIndex = null;
  let isCompleted = false;
  let moveCount = 0;

  // Persistencia de progreso en localStorage
  let unlockedLevel = parseInt(localStorage.getItem('club_memoria_puzzle_unlocked') || '1', 10);
  let levelStars = JSON.parse(localStorage.getItem('club_memoria_puzzle_stars') || '{}');

  // Metadatos de las 4 Fases
  const phases = [
    {
      id: 1,
      title: 'Fase 1: El Valle de las Flores',
      icon: '🌸',
      range: [1, 25],
      desc: 'Naturaleza viva, pétalos coloridos y calma.'
    },
    {
      id: 2,
      title: 'Fase 2: El Reino Animal',
      icon: '🐶',
      range: [26, 50],
      desc: 'Mascotas fieles, aves canoras y tiernos amigos.'
    },
    {
      id: 3,
      title: 'Fase 3: Paisajes del Mundo',
      icon: '🏞️',
      range: [51, 75],
      desc: 'Montañas majestuosas, playas y pueblos con encanto.'
    },
    {
      id: 4,
      title: 'Fase 4: Maestros del Arte y Recuerdos',
      icon: '🎨',
      range: [76, 100],
      desc: 'Bodegones, objetos de época y el gran Trofeo Maestro.'
    }
  ];

  // Nombres de los 100 Niveles
  const levelNames = [
    // Fase 1: Flores (1-25)
    "Rosa Encantada", "Girasol Radiante", "Lirio de Agua", "Lavanda Silvestre", "Tulipán Holandés",
    "Flor de Cerezo", "Orquídea Púrpura", "Margarita del Prado", "Crisantemo Dorado", "Hortensia Azul",
    "Jazmín Aromático", "Amapola Roja", "Azalea Rosada", "Clavel de Sevilla", "Begonia Tropical",
    "Camelia de Nieve", "Loto Sagrado", "Dalia de Otoño", "Mariposa en Flor", "Regadera con Rosas",
    "Ramo de Primavera", "Abeja en el Panal", "Puente del Jardín", "Pérgola Florecida", "Cesta de Pétalos",

    // Fase 2: Animales (26-50)
    "Gatito Travieso", "Cachorro Fiel", "Canario Cantor", "Conejo de Algodón", "Cisne Real",
    "Delfín Saltador", "Búho Sabio", "Ardilla y Nuez", "Panda Comilón", "Koala Abrazador",
    "Potrillo Libre", "Oveja Lana Suave", "Erizo Curioso", "Tortuga Milenaria", "Pingüino Alegre",
    "Zorro Rojo", "Loro Guacamayo", "Pato Nadador", "Ciervo en el Bosque", "Foca Marina",
    "Oso Protector", "Mariposa Monarca", "Jirafa Amigable", "Dálmata Elegante", "El Gato Soñador",

    // Fase 3: Paisajes (51-75)
    "Cabaña Alpina", "Faro en la Tormenta", "Atardecer en la Playa", "Molino de Viento", "Lago de Cristal",
    "Bosque de Otoño", "Castillo Medieval", "Campo de Trigo", "Velero en el Océano", "Puente Romano",
    "Aurora Mágica", "Cascada Escondida", "Finca Colonial", "Isla Paradisiaca", "Selva Verde",
    "Oasis de Palmeras", "Monte Fuji Nevado", "Cañón al Alba", "Góndola de Venecia", "Parque de los Cerezos",
    "Puerto Pescador", "Hacienda Cafetera", "Glaciar Azul", "Templo de la Paz", "El Gran Horizonte",

    // Fase 4: Arte y Recuerdos (76-100)
    "Té de la Abuela", "Bodegón de Manzanas", "Vitrola Melódica", "Vitral de Colores", "Costurero Clásico",
    "Mosaico Antiguo", "Frutero de Plata", "Jarrón de Porcelana", "Biblioteca de Roble", "Piano Romántico",
    "Reloj de Péndulo", "Banquete Familiar", "Noche Estrellada", "Balcón con Enredaderas", "Taller de Alfarería",
    "Cafetera Tradicional", "Ventana con Vistas", "Globo Aerostático", "Estanque Impresionista", "Carreta Campesina",
    "Sombrero de Paja", "Tapiz Tejido", "Hierbas de Té", "Retrato del Alba", "La Gran Corona del Club"
  ];

  // Función auxiliar para codificar SVGs en Data URIs 100% compatibles con todos los navegadores
  function encodeSvg(svgString) {
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString.trim());
  }

  // Generador de imágenes vectoriales SVG nítidas y variadas para los 100 niveles
  function generateSvgForLevel(lvl) {
    const seed = lvl * 37;
    const hue1 = (seed * 13) % 360;
    const hue2 = (hue1 + 45) % 360;
    const hue3 = (hue1 + 140) % 360;

    let bg = `hsl(${hue1}, 70%, 92%)`;
    let primary = `hsl(${hue1}, 75%, 50%)`;
    let secondary = `hsl(${hue2}, 80%, 60%)`;
    let accent = `hsl(${hue3}, 75%, 45%)`;

    // Nivel 1 Especial: Rosa Encantada
    if (lvl === 1) {
      return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <rect width="320" height="320" fill="#FFF8E1"/>
        <!-- Tallo y Hojas -->
        <path d="M160,190 Q145,255 160,305" stroke="#2E7D32" stroke-width="12" fill="none" stroke-linecap="round"/>
        <ellipse cx="115" cy="255" rx="35" ry="18" fill="#4CAF50" transform="rotate(-30 115 255)"/>
        <ellipse cx="205" cy="235" rx="35" ry="18" fill="#4CAF50" transform="rotate(30 205 235)"/>
        <!-- Pétalos de Rosa -->
        <circle cx="160" cy="140" r="85" fill="#E53935"/>
        <circle cx="160" cy="140" r="68" fill="#D32F2F"/>
        <circle cx="140" cy="130" r="45" fill="#FF5252"/>
        <circle cx="180" cy="130" r="45" fill="#FF5252"/>
        <circle cx="160" cy="140" r="35" fill="#C62828"/>
        <circle cx="160" cy="140" r="20" fill="#B71C1C"/>
      </svg>`);
    }

    // Nivel 2 Especial: Girasol Radiante
    if (lvl === 2) {
      return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <defs>
          <linearGradient id="skySunflower" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#81D4FA"/>
            <stop offset="100%" stop-color="#E1F5FE"/>
          </linearGradient>
        </defs>
        <rect width="320" height="320" fill="url(#skySunflower)"/>
        <!-- Tallo y Hojas Grandes -->
        <path d="M160,200 Q140,260 160,315" stroke="#2E7D32" stroke-width="14" fill="none" stroke-linecap="round"/>
        <ellipse cx="105" cy="260" rx="42" ry="22" fill="#4CAF50" transform="rotate(-35 105 260)"/>
        <ellipse cx="215" cy="245" rx="42" ry="22" fill="#4CAF50" transform="rotate(35 215 245)"/>
        <!-- Corona de Pétalos Amarillos Dorados -->
        <circle cx="160" cy="145" r="95" fill="#FDD835"/>
        <circle cx="160" cy="70" r="30" fill="#FFEB3B"/>
        <circle cx="160" cy="220" r="30" fill="#FFEB3B"/>
        <circle cx="85" cy="145" r="30" fill="#FFEB3B"/>
        <circle cx="235" cy="145" r="30" fill="#FFEB3B"/>
        <circle cx="105" cy="90" r="30" fill="#FFCA28"/>
        <circle cx="215" cy="90" r="30" fill="#FFCA28"/>
        <circle cx="105" cy="200" r="30" fill="#FFCA28"/>
        <circle cx="215" cy="200" r="30" fill="#FFCA28"/>
        <!-- Centro Oscuro de Semillas del Girasol -->
        <circle cx="160" cy="145" r="54" fill="#4E342E" stroke="#FFB300" stroke-width="4"/>
        <circle cx="160" cy="145" r="44" fill="#3E2723"/>
        <circle cx="145" cy="135" r="6" fill="#D7CCC8" opacity="0.3"/>
        <circle cx="175" cy="155" r="8" fill="#D7CCC8" opacity="0.3"/>
      </svg>`);
    }

    // Fase 1: Motivos Florales (Niveles 3 a 25)
    if (lvl <= 25) {
      return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <rect width="320" height="320" fill="${bg}"/>
        <circle cx="160" cy="160" r="120" fill="#FFFFFF" opacity="0.8"/>
        <!-- Tallo y Hojas -->
        <path d="M160,180 Q${140 + (lvl % 30)},250 160,300" stroke="#388E3C" stroke-width="12" fill="none" stroke-linecap="round"/>
        <ellipse cx="120" cy="250" rx="32" ry="16" fill="#81C784" transform="rotate(-30 120 250)"/>
        <ellipse cx="200" cy="230" rx="32" ry="16" fill="#81C784" transform="rotate(30 200 230)"/>
        <!-- Pétalos -->
        <circle cx="160" cy="100" r="44" fill="${primary}"/>
        <circle cx="160" cy="220" r="44" fill="${primary}"/>
        <circle cx="100" cy="160" r="44" fill="${primary}"/>
        <circle cx="220" cy="160" r="44" fill="${primary}"/>
        <circle cx="118" cy="118" r="40" fill="${secondary}"/>
        <circle cx="202" cy="118" r="40" fill="${secondary}"/>
        <circle cx="118" cy="202" r="40" fill="${secondary}"/>
        <circle cx="202" cy="202" r="40" fill="${secondary}"/>
        <!-- Centro -->
        <circle cx="160" cy="160" r="45" fill="${accent}" stroke="#FFFFFF" stroke-width="5"/>
        <text x="160" y="172" font-size="28" text-anchor="middle" fill="#FFFFFF">🌸</text>
      </svg>`);
    }

    // Fase 2: Motivos de Animales (Niveles 26 a 50)
    if (lvl <= 50) {
      const animalEmoji = ['🐱', '🐶', '🐦', '🐰', '🦢', '🐬', '🦉', '🐿️', '🐼', '🐨', '🐴', '🐑', '🦔', '🐢', '🐧', '🦊', '🦜', '🦆', '🦌', '🦭', '🐻', '🦋', '🦒', '🐕', '😻'][lvl - 26] || '🐾';
      return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <rect width="320" height="320" fill="${bg}"/>
        <circle cx="160" cy="160" r="130" fill="#FFFFFF" opacity="0.85"/>
        <circle cx="160" cy="160" r="110" fill="${secondary}" opacity="0.25"/>
        <circle cx="160" cy="165" r="85" fill="${secondary}" stroke="${primary}" stroke-width="5"/>
        <polygon points="95,115 75,55 135,90" fill="${primary}"/>
        <polygon points="225,115 245,55 185,90" fill="${primary}"/>
        <ellipse cx="130" cy="150" rx="12" ry="16" fill="#212121"/>
        <ellipse cx="190" cy="150" rx="12" ry="16" fill="#212121"/>
        <circle cx="134" cy="146" r="4" fill="#FFFFFF"/>
        <circle cx="194" cy="146" r="4" fill="#FFFFFF"/>
        <polygon points="160,175 152,165 168,165" fill="#E91E63"/>
        <path d="M152,180 Q160,190 160,175 Q160,190 168,180" stroke="#3E2723" stroke-width="4" fill="none"/>
        <text x="160" y="275" font-size="44" text-anchor="middle">${animalEmoji}</text>
      </svg>`);
    }

    // Fase 3: Paisajes del Mundo (Niveles 51 a 75)
    if (lvl <= 75) {
      return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
        <rect width="320" height="200" fill="${primary}"/>
        <circle cx="${240 - (lvl % 50)}" cy="60" r="38" fill="#FFD54F" stroke="#FFA000" stroke-width="4"/>
        <polygon points="0,210 100,80 200,210" fill="${secondary}"/>
        <polygon points="120,210 220,95 320,210" fill="${accent}"/>
        <rect y="190" width="320" height="130" fill="#4CAF50"/>
        <rect x="135" y="205" width="60" height="50" fill="#FFF8E1" stroke="#5D4037" stroke-width="3"/>
        <polygon points="125,205 165,165 205,205" fill="#D32F2F"/>
        <rect x="155" y="225" width="20" height="30" fill="#5D4037"/>
        <text x="160" y="295" font-size="34" text-anchor="middle">🏞️</text>
      </svg>`);
    }

    // Fase 4: Maestros del Arte y Tradición (Niveles 76 a 100)
    return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <defs>
        <radialGradient id="artBg${lvl}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF9C4"/>
          <stop offset="100%" stop-color="${primary}"/>
        </radialGradient>
      </defs>
      <rect width="320" height="320" fill="url(#artBg${lvl})"/>
      <rect x="15" y="15" width="290" height="290" fill="none" stroke="#FFA000" stroke-width="12" rx="16"/>
      <rect x="25" y="25" width="270" height="270" fill="none" stroke="#FFFFFF" stroke-width="3" rx="12"/>
      <circle cx="160" cy="160" r="85" fill="#FFFFFF" opacity="0.9" stroke="${secondary}" stroke-width="4"/>
      <text x="160" y="180" font-size="65" text-anchor="middle">${lvl === 100 ? '👑' : '🎨'}</text>
      <text x="160" y="235" font-size="16" text-anchor="middle" fill="#5D4037" font-weight="bold">Nivel ${lvl}</text>
    </svg>`);
  }

  // Generar la lista completa de los 100 niveles
  const allLevels = [];
  for (let i = 1; i <= 100; i++) {
    // Determinar cuadrícula:
    // Niveles 1 a 10: 2x2 (4 piezas, fácil para comenzar)
    // Niveles 11 a 75: 3x3 (9 piezas, tamaño ideal para celular)
    // Niveles 76 a 100: 4x4 (16 piezas, reto maestro)
    let gSize = 3;
    if (i <= 10) gSize = 2;
    else if (i >= 76) gSize = 4;

    allLevels.push({
      level: i,
      title: levelNames[i - 1] || `Desafío ${i}`,
      phase: i <= 25 ? 1 : i <= 50 ? 2 : i <= 75 ? 3 : 4,
      grid: gSize,
      maxMovesFor3Stars: gSize === 2 ? 8 : gSize === 3 ? 24 : 45,
      img: generateSvgForLevel(i)
    });
  }

  function init() {
    setupEventListeners();
    renderLevelsMap();
  }

  function setupEventListeners() {
    // Pestañas de fases
    document.querySelectorAll('.btn-phase-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-phase-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activePhase = parseInt(btn.dataset.phase, 10);
        window.SoundManager?.playClick();
        renderLevelsMap();
      });
    });

    // Volver al mapa desde el juego
    document.getElementById('btn-puzzle-back-to-map').addEventListener('click', () => {
      window.SoundManager?.playClick();
      showMapView();
    });

    // Reiniciar nivel actual
    document.getElementById('btn-puzzle-restart').addEventListener('click', () => {
      window.SoundManager?.playClick();
      startLevel(currentLevel);
    });

    // Ver foto completa
    document.getElementById('btn-puzzle-hint').addEventListener('click', () => {
      window.SoundManager?.playClick();
      showPreviewModal();
    });

    document.getElementById('btn-close-preview').addEventListener('click', () => {
      document.getElementById('modal-image-preview').classList.remove('active');
    });
  }

  // Renderizar el camino de niveles Candy Crush según la fase seleccionada
  function renderLevelsMap() {
    const pathContainer = document.getElementById('puzzle-levels-path');
    pathContainer.innerHTML = '';

    const phaseMeta = phases.find(p => p.id === activePhase) || phases[0];
    const [startLvl, endLvl] = phaseMeta.range;

    // Banner de la Fase
    const banner = document.createElement('div');
    banner.className = 'phase-milestone-banner';
    banner.innerHTML = `
      <div class="phase-milestone-title">${phaseMeta.icon} ${phaseMeta.title}</div>
      <div class="phase-milestone-sub">${phaseMeta.desc} • Niveles ${startLvl} al ${endLvl}</div>
    `;
    pathContainer.appendChild(banner);

    // Posiciones serpenteantes para el efecto Candy Crush
    const positions = ['pos-center', 'pos-center-right', 'pos-right', 'pos-center-right', 'pos-center', 'pos-center-left', 'pos-left', 'pos-center-left'];

    // Renderizar niveles de la fase
    for (let lvlNum = startLvl; lvlNum <= endLvl; lvlNum++) {
      const lvlConfig = allLevels[lvlNum - 1];
      const posClass = positions[(lvlNum - startLvl) % positions.length];

      const row = document.createElement('div');
      row.className = `level-step-row ${posClass}`;

      const btn = document.createElement('button');
      btn.className = 'level-node-btn';

      const isLocked = lvlNum > unlockedLevel;
      const isCurrent = lvlNum === unlockedLevel;
      const stars = levelStars[lvlNum] || 0;

      if (isLocked) {
        btn.classList.add('locked');
        btn.innerHTML = `<span>🔒</span><span style="font-size:11px;">${lvlNum}</span>`;
      } else {
        if (isCurrent) {
          btn.classList.add('current');
          btn.innerHTML = `<div class="player-marker-pin">📍 Aquí</div>`;
        }

        let starsText = '';
        if (stars === 3) starsText = '⭐⭐⭐';
        else if (stars === 2) starsText = '⭐⭐⚪';
        else if (stars === 1) starsText = '⭐⚪⚪';
        else starsText = '⚪⚪⚪';

        btn.innerHTML += `
          <span>${lvlNum}</span>
          <span class="level-stars-badge">${starsText}</span>
        `;

        btn.addEventListener('click', () => {
          window.SoundManager?.playClick();
          startLevel(lvlNum);
        });
      }

      row.appendChild(btn);
      pathContainer.appendChild(row);

      // Adoquines decorativos entre niveles
      if (lvlNum < endLvl) {
        const trail = document.createElement('div');
        trail.className = 'stepping-stones-trail';
        trail.innerHTML = `
          <div class="stepping-stone"></div>
          <div class="stepping-stone"></div>
          <div class="stepping-stone"></div>
        `;
        pathContainer.appendChild(trail);
      }
    }

    // Scroll automático hacia el nivel actual si está en la fase activa
    setTimeout(() => {
      const currentEl = pathContainer.querySelector('.level-node-btn.current');
      if (currentEl) {
        currentEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  function showMapView() {
    document.getElementById('puzzle-levels-map-view').style.display = 'flex';
    document.getElementById('puzzle-board-view').style.display = 'none';
    document.getElementById('btn-puzzle-back-to-map').style.display = 'none';
    document.getElementById('btn-puzzle-hint').style.display = 'none';
    document.getElementById('puzzle-progress-text').innerText = 'Selecciona un nivel del camino';
    renderLevelsMap();
  }

  function startLevel(lvlNum) {
    currentLevel = lvlNum;
    const lvlConfig = allLevels[lvlNum - 1] || allLevels[0];
    gridSize = lvlConfig.grid;
    moveCount = 0;
    isCompleted = false;
    selectedTileIndex = null;

    document.getElementById('puzzle-levels-map-view').style.display = 'none';
    const boardView = document.getElementById('puzzle-board-view');
    boardView.style.display = 'flex';
    document.getElementById('btn-puzzle-back-to-map').style.display = 'flex';
    document.getElementById('btn-puzzle-hint').style.display = 'flex';

    document.getElementById('puzzle-level-indicator').innerText = `Nivel ${lvlConfig.level}: ${lvlConfig.title}`;
    document.getElementById('puzzle-moves-counter').innerText = `Movimientos: 0`;
    document.getElementById('puzzle-progress-text').innerText = `Toca una pieza y luego otra para cambiarlas`;

    setupTiles(lvlConfig);
  }

  function setupTiles(lvlConfig) {
    const totalTiles = gridSize * gridSize;
    tilesState = [];
    for (let i = 0; i < totalTiles; i++) {
      tilesState.push(i);
    }

    // Barajar asegurando que no quede ordenado al inicio
    do {
      for (let i = tilesState.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tilesState[i], tilesState[j]] = [tilesState[j], tilesState[i]];
      }
    } while (checkIfSolved() && totalTiles > 1);

    renderBoard(lvlConfig);
  }

  function renderBoard(lvlConfig) {
    const board = document.getElementById('puzzle-board');
    board.className = `puzzle-board grid-${gridSize}x${gridSize}`;
    board.innerHTML = '';

    const tileSize = 320 / gridSize;

    tilesState.forEach((originalIndex, currentIndex) => {
      const tile = document.createElement('div');
      tile.className = 'puzzle-tile';
      if (selectedTileIndex === currentIndex) {
        tile.classList.add('selected');
      }

      const origRow = Math.floor(originalIndex / gridSize);
      const origCol = originalIndex % gridSize;
      const posX = -(origCol * tileSize);
      const posY = -(origRow * tileSize);

      tile.style.backgroundImage = `url("${lvlConfig.img}")`;
      tile.style.backgroundPosition = `${posX}px ${posY}px`;
      tile.style.backgroundSize = `320px 320px`;
      tile.innerHTML = `<span class="tile-num-badge">${originalIndex + 1}</span>`;

      tile.addEventListener('click', () => handleTileClick(currentIndex, lvlConfig));
      board.appendChild(tile);
    });
  }

  function handleTileClick(index, lvlConfig) {
    if (isCompleted) return;

    if (selectedTileIndex === null) {
      selectedTileIndex = index;
      window.SoundManager?.playPop();
      renderBoard(lvlConfig);
    } else if (selectedTileIndex === index) {
      selectedTileIndex = null;
      renderBoard(lvlConfig);
    } else {
      [tilesState[selectedTileIndex], tilesState[index]] = [tilesState[index], tilesState[selectedTileIndex]];
      selectedTileIndex = null;
      moveCount++;
      document.getElementById('puzzle-moves-counter').innerText = `Movimientos: ${moveCount}`;

      window.SoundManager?.playPop();
      renderBoard(lvlConfig);

      if (checkIfSolved()) {
        isCompleted = true;
        handleLevelComplete(lvlConfig);
      }
    }
  }

  function checkIfSolved() {
    for (let i = 0; i < tilesState.length; i++) {
      if (tilesState[i] !== i) return false;
    }
    return true;
  }

  function handleLevelComplete(lvlConfig) {
    let stars = 3;
    if (moveCount > lvlConfig.maxMovesFor3Stars * 1.5) stars = 1;
    else if (moveCount > lvlConfig.maxMovesFor3Stars) stars = 2;

    levelStars[lvlConfig.level] = Math.max(levelStars[lvlConfig.level] || 0, stars);
    localStorage.setItem('club_memoria_puzzle_stars', JSON.stringify(levelStars));

    // Desbloquear siguiente nivel (hasta 100)
    if (currentLevel === unlockedLevel && unlockedLevel < 100) {
      unlockedLevel++;
      localStorage.setItem('club_memoria_puzzle_unlocked', unlockedLevel);
    }

    setTimeout(() => {
      window.SoundManager?.playWin();
      window.App?.onActivityCompleted(`Rompecabezas Nivel ${lvlConfig.level}: ${lvlConfig.title} (${stars} ⭐)`);
    }, 400);
  }

  function showPreviewModal() {
    const lvlConfig = allLevels[currentLevel - 1] || allLevels[0];
    const container = document.getElementById('preview-image-container');
    container.innerHTML = `<img src="${lvlConfig.img}" alt="${lvlConfig.title}" style="width: 100%; height: 100%; object-fit: contain; display: block; border-radius: 8px;">`;
    document.getElementById('modal-image-preview').classList.add('active');
  }

  return {
    init,
    resetGame: showMapView,
    getUnlockedLevel: () => unlockedLevel,
    getTotalStars: () => Object.values(levelStars).reduce((a, b) => a + b, 0)
  };
})();

window.PuzzleGame = PuzzleGame;
