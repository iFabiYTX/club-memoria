// ========================================================
// JUEGO: SOPA DE LETRAS EXPANDIDA (FÁCIL 10x10 & DIFÍCIL 12x12)
// Con Selección Táctil Deslizando el Dedo (Swipe/Drag) y Dos Toques
// Desarrollado por Echomaii Corp para Club Memoria (Chio)
// ========================================================

const WordSearchGame = (() => {
  let difficulty = 'easy'; // 'easy' (10x10 H/V) o 'hard' (12x12 Todas direcciones)
  let gridSize = 10;
  let currentThemeKey = 'frutas';
  let gridLetters = [];
  let wordsToFind = [];
  let foundWords = [];
  let placedWordCoords = {}; // palabra -> [{r, c}]
  let selectedStart = null; // Para modo fallback de 2 toques

  // Estados del deslizamiento táctil (Swipe / Drag)
  let isDragging = false;
  let dragMoved = false;
  let dragStart = null;
  let dragCurrent = null;

  const themes = {
    frutas: {
      title: 'Frutas Saludables',
      easyWords: ['MANZANA', 'PLATANO', 'NARANJA', 'LIMON', 'PERA', 'SANDIA'],
      hardWords: ['ARANDANO', 'MANDARINA', 'MELOCOTON', 'FRAMBUESA', 'CEREZA', 'CIRUELA', 'GRANADA']
    },
    flores: {
      title: 'Flores y Jardinería',
      easyWords: ['MARGARITA', 'GIRASOL', 'LAVANDA', 'CLAVEL', 'JAZMIN', 'VIOLETA'],
      hardWords: ['ORQUIDEA', 'HORTENSIA', 'AMAPOLA', 'CRISANTEMO', 'AZUCENA', 'MAGNOLIA', 'BEGONIA']
    },
    ciudades: {
      title: 'Lugares y Ciudades',
      easyWords: ['MADRID', 'BUENOSAIRES', 'SANTIAGO', 'LIMA', 'BOGOTA', 'MEXICO'],
      hardWords: ['BARCELONA', 'MONTEVIDEO', 'CARTAGENA', 'VALPARAISO', 'CORDOBA', 'SEVILLA', 'QUITO']
    }
  };

  function init() {
    setupEventListeners();
    resetGame();
  }

  function setupEventListeners() {
    // Selector de Dificultad (Fácil 10x10 vs Difícil 12x12)
    document.querySelectorAll('.ws-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ws-diff-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        difficulty = btn.dataset.wsdiff;
        gridSize = difficulty === 'easy' ? 10 : 12;

        const indicator = document.getElementById('ws-difficulty-indicator');
        if (indicator) {
          indicator.innerText = difficulty === 'easy'
            ? 'Fácil (10x10) — Solo Horizontal y Vertical'
            : 'Difícil (12x12) — ¡Todas las Direcciones y Diagonales!';
        }

        window.SoundManager?.playClick();
        resetGame();
      });
    });

    // Selector de Temas
    document.querySelectorAll('.ws-theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ws-theme-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        currentThemeKey = btn.dataset.theme;
        window.SoundManager?.playClick();
        resetGame();
      });
    });

    // Pista
    document.getElementById('btn-ws-hint').addEventListener('click', () => {
      giveHint();
    });

    // ========================================================
    // GESTIÓN DE DESLIZAMIENTO CON EL DEDO (POINTER / TOUCH DRAG)
    // ========================================================
    const gridEl = document.getElementById('wordsearch-grid');
    if (gridEl) {
      gridEl.addEventListener('pointerdown', (e) => {
        const cell = e.target.closest('.ws-letter');
        if (!cell) return;
        
        // Prevenir scroll de la página mientras se selecciona en el tablero
        e.preventDefault();

        const r = parseInt(cell.dataset.r, 10);
        const c = parseInt(cell.dataset.c, 10);

        isDragging = true;
        dragMoved = false;
        dragStart = { r, c };
        dragCurrent = { r, c };

        updateDragHighlight(dragStart, dragCurrent);
        window.SoundManager?.playPop();
      });
    }

    // Escuchar movimiento globalmente mientras se arrastra
    window.addEventListener('pointermove', (e) => {
      if (!isDragging || !dragStart) return;
      e.preventDefault();

      // Encontrar la celda bajo el dedo o cursor
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;
      const cell = el.closest('.ws-letter');
      if (!cell) return;

      const r = parseInt(cell.dataset.r, 10);
      const c = parseInt(cell.dataset.c, 10);

      if (r === dragCurrent.r && c === dragCurrent.c) return;

      const dr = r - dragStart.r;
      const dc = c - dragStart.c;
      const absR = Math.abs(dr);
      const absC = Math.abs(dc);

      let isValidLine = false;
      if (absR === 0 && absC > 0) isValidLine = true; // Horizontal
      else if (absC === 0 && absR > 0) isValidLine = true; // Vertical
      else if (difficulty === 'hard' && absR === absC && absR > 0) isValidLine = true; // Diagonal (solo Difícil)

      if (isValidLine) {
        dragMoved = true;
        dragCurrent = { r, c };
        updateDragHighlight(dragStart, dragCurrent);
      }
    });

    // Al soltar el dedo / cursor
    window.addEventListener('pointerup', (e) => {
      if (!isDragging) return;
      isDragging = false;

      updateDragHighlight(null, null);

      if (dragMoved && dragStart && dragCurrent && (dragStart.r !== dragCurrent.r || dragStart.c !== dragCurrent.c)) {
        // Deslizamiento completado: validar palabra arrastrada
        selectedStart = null;
        checkSelection(dragStart, dragCurrent);
      } else if (dragStart) {
        // Toque simple en una sola celda (modo 2 toques para accesibilidad)
        handleCellClick(dragStart.r, dragStart.c);
      }

      dragStart = null;
      dragCurrent = null;
      dragMoved = false;
    });

    window.addEventListener('pointercancel', () => {
      if (!isDragging) return;
      isDragging = false;
      updateDragHighlight(null, null);
      dragStart = null;
      dragCurrent = null;
      dragMoved = false;
    });
  }

  function updateDragHighlight(start, end) {
    // Quitar resaltado temporal previo
    document.querySelectorAll('.ws-letter.drag-highlight').forEach(el => {
      el.classList.remove('drag-highlight');
    });

    if (!start) return;

    if (!end || (start.r === end.r && start.c === end.c)) {
      const cell = document.querySelector(`.ws-letter[data-r="${start.r}"][data-c="${start.c}"]`);
      if (cell) cell.classList.add('drag-highlight');
      return;
    }

    const dr = end.r - start.r;
    const dc = end.c - start.c;
    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    const steps = Math.max(absR, absC);
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;

    for (let i = 0; i <= steps; i++) {
      const r = Math.round(start.r + i * stepR);
      const c = Math.round(start.c + i * stepC);
      const cell = document.querySelector(`.ws-letter[data-r="${r}"][data-c="${c}"]`);
      if (cell) cell.classList.add('drag-highlight');
    }
  }

  function resetGame() {
    selectedStart = null;
    isDragging = false;
    dragMoved = false;
    foundWords = [];
    placedWordCoords = {};
    const theme = themes[currentThemeKey];
    wordsToFind = difficulty === 'easy' ? [...theme.easyWords] : [...theme.hardWords];

    gridSize = difficulty === 'easy' ? 10 : 12;

    // Inicializar cuadrícula vacía
    gridLetters = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

    // Direcciones permitidas:
    // Fácil: solo Horizontal (0, 1) y Vertical (1, 0)
    // Difícil: Horizontal (ambas), Vertical (ambas), Diagonales (las 4)
    const easyDirections = [
      { dr: 0, dc: 1 },  // Derecha
      { dr: 1, dc: 0 }   // Abajo
    ];

    const hardDirections = [
      { dr: 0, dc: 1 },   // Derecha
      { dr: 0, dc: -1 },  // Izquierda
      { dr: 1, dc: 0 },   // Abajo
      { dr: -1, dc: 0 },  // Arriba
      { dr: 1, dc: 1 },   // Diagonal Abajo-Derecha
      { dr: 1, dc: -1 },  // Diagonal Abajo-Izquierda
      { dr: -1, dc: 1 },  // Diagonal Arriba-Derecha
      { dr: -1, dc: -1 }  // Diagonal Arriba-Izquierda
    ];

    const activeDirs = difficulty === 'easy' ? easyDirections : hardDirections;

    // Colocar cada palabra
    wordsToFind.forEach(word => {
      placeWord(word, activeDirs);
    });

    // Rellenar espacios vacíos con letras aleatorias
    const alphabet = 'ABCDEFGHIJLMNOPRSTUVZ';
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (!gridLetters[r][c]) {
          gridLetters[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
      }
    }

    renderGrid();
    renderWordsList();
  }

  function placeWord(word, directions) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 250) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];

      const maxR = dir.dr === 1 ? gridSize - word.length : dir.dr === -1 ? gridSize - 1 : gridSize - 1;
      const minR = dir.dr === -1 ? word.length - 1 : 0;
      const maxC = dir.dc === 1 ? gridSize - word.length : dir.dc === -1 ? gridSize - 1 : gridSize - 1;
      const minC = dir.dc === -1 ? word.length - 1 : 0;

      if (maxR < minR || maxC < minC) continue;

      const r = Math.floor(Math.random() * (maxR - minR + 1)) + minR;
      const c = Math.floor(Math.random() * (maxC - minC + 1)) + minC;

      // Comprobar colisión
      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const currR = r + i * dir.dr;
        const currC = c + i * dir.dc;
        if (currR < 0 || currR >= gridSize || currC < 0 || currC >= gridSize) {
          canPlace = false;
          break;
        }
        if (gridLetters[currR][currC] !== '' && gridLetters[currR][currC] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        placedWordCoords[word] = [];
        for (let i = 0; i < word.length; i++) {
          const currR = r + i * dir.dr;
          const currC = c + i * dir.dc;
          gridLetters[currR][currC] = word[i];
          placedWordCoords[word].push({ r: currR, c: currC });
        }
        placed = true;
      }
    }
  }

  function renderGrid() {
    const gridEl = document.getElementById('wordsearch-grid');
    gridEl.className = `wordsearch-grid size-${gridSize}`;
    gridEl.innerHTML = '';

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cell = document.createElement('div');
        cell.className = 'ws-letter';
        cell.dataset.r = r;
        cell.dataset.c = c;
        cell.innerText = gridLetters[r][c];

        if (isCellFound(r, c)) {
          cell.classList.add('found');
        } else if (selectedStart && selectedStart.r === r && selectedStart.c === c) {
          cell.classList.add('selected');
        }

        gridEl.appendChild(cell);
      }
    }
  }

  function isCellFound(r, c) {
    for (const word of foundWords) {
      const coords = placedWordCoords[word];
      if (coords && coords.some(pt => pt.r === r && pt.c === c)) {
        return true;
      }
    }
    return false;
  }

  function renderWordsList() {
    const listEl = document.getElementById('words-list-container');
    listEl.innerHTML = '';

    wordsToFind.forEach(word => {
      const chip = document.createElement('div');
      chip.className = 'word-chip';
      if (foundWords.includes(word)) {
        chip.classList.add('found');
        chip.innerText = `✓ ${word}`;
      } else {
        chip.innerText = word;
      }
      listEl.appendChild(chip);
    });
  }

  function handleCellClick(r, c) {
    if (!selectedStart) {
      // Primer toque
      selectedStart = { r, c };
      window.SoundManager?.playPop();
      renderGrid();
    } else {
      // Segundo toque
      const start = selectedStart;
      const end = { r, c };
      selectedStart = null;

      checkSelection(start, end);
    }
  }

  function checkSelection(start, end) {
    const dr = end.r - start.r;
    const dc = end.c - start.c;

    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    // Debe ser una línea recta horizontal, vertical o diagonal a 45 grados
    const isLine = (absR === 0 && absC > 0) || (absC === 0 && absR > 0) || (absR === absC && absR > 0);

    if (!isLine) {
      window.SoundManager?.playClick();
      renderGrid();
      return;
    }

    // En modo fácil solo se permiten horizontales o verticales
    if (difficulty === 'easy' && absR !== 0 && absC !== 0) {
      window.SoundManager?.playClick();
      renderGrid();
      return;
    }

    const steps = Math.max(absR, absC);
    const stepR = dr === 0 ? 0 : dr / steps;
    const stepC = dc === 0 ? 0 : dc / steps;

    let coords = [];
    for (let i = 0; i <= steps; i++) {
      coords.push({
        r: Math.round(start.r + i * stepR),
        c: Math.round(start.c + i * stepC)
      });
    }

    const selectedWord = coords.map(pt => gridLetters[pt.r][pt.c]).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    let matchedWord = wordsToFind.find(w => !foundWords.includes(w) && (w === selectedWord || w === reversedWord));

    if (matchedWord) {
      foundWords.push(matchedWord);
      window.SoundManager?.playChime();
      renderGrid();
      renderWordsList();

      if (foundWords.length === wordsToFind.length) {
        setTimeout(() => {
          window.SoundManager?.playWin();
          window.App?.onActivityCompleted(`Sopa de Letras (${difficulty === 'easy' ? 'Fácil' : 'Difícil'})`);
        }, 400);
      }
    } else {
      window.SoundManager?.playClick();
      renderGrid();
    }
  }

  function giveHint() {
    const remaining = wordsToFind.find(w => !foundWords.includes(w));
    if (!remaining || !placedWordCoords[remaining]) return;

    const firstCoord = placedWordCoords[remaining][0];
    selectedStart = { r: firstCoord.r, c: firstCoord.c };
    window.SoundManager?.playChime();
    renderGrid();
  }

  return {
    init,
    resetGame
  };
})();

window.WordSearchGame = WordSearchGame;
