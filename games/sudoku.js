// ========================================================
// JUEGO: SUDOKU 9x9 PROFESIONAL CON 4 DIFICULTADES Y VIDAS
// Desarrollado por Echomaii Corp para Club Memoria (Chio)
// ========================================================

const SudokuGame = (() => {
  let difficulty = 'easy'; // 'easy', 'medium', 'hard', 'expert'
  let selectedCellIndex = null;
  let userBoard = Array(81).fill(0);
  let solutionBoard = Array(81).fill(0);
  let initialClues = Array(81).fill(false);
  let isCompleted = false;
  let lives = 3; // 3 vidas exclusivas del Sudoku

  const difficultyCluesCount = {
    easy: 50,    // 50 números visibles (Fácil y amable)
    medium: 38,  // 38 números visibles (Medio)
    hard: 30,    // 30 números visibles (Avanzado)
    expert: 24   // 24 números visibles (Extremo)
  };

  const baseSolvedGrid = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8]
  ];

  function init() {
    setupEventListeners();
    resetLives();
    resetGame();
  }

  function setupEventListeners() {
    // Selector de las 4 dificultades
    document.querySelectorAll('.btn-diff-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-diff-choice').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        difficulty = btn.dataset.diff;
        
        const labels = { easy: 'Fácil', medium: 'Medio', hard: 'Avanzado', expert: 'Extremo' };
        document.getElementById('sudoku-meta-sub').innerText = `Dificultad: ${labels[difficulty]}`;
        window.SoundManager?.playClick();
        resetLives();
        resetGame();
      });
    });

    // Botón Pista
    document.getElementById('btn-sudoku-hint').addEventListener('click', () => {
      giveHint();
    });

    // Teclado numérico 1-9
    setupKeypadEvents();

    // Botón de recargar vidas del modal de Game Over
    const btnRestart = document.getElementById('btn-restart-lives');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        document.getElementById('modal-game-over').classList.remove('active');
        resetLives();
        window.SoundManager?.playChime();
        renderBoard();
      });
    }
  }

  function setupKeypadEvents() {
    const keypad = document.getElementById('sudoku-keypad');
    keypad.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      if (btn.id === 'btn-sudoku-erase') {
        eraseCurrentCell();
      } else if (btn.dataset.val) {
        inputNumber(parseInt(btn.dataset.val, 10));
      }
    });

    // Soporte teclado físico (1-9 y retroceso)
    window.addEventListener('keydown', (e) => {
      if (document.getElementById('screen-game-sudoku').classList.contains('active')) {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 9) {
          inputNumber(num);
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          eraseCurrentCell();
        }
      }
    });
  }

  function resetLives() {
    lives = 3;
    updateLivesDisplay();
  }

  function updateLivesDisplay() {
    for (let i = 1; i <= 3; i++) {
      const heartEl = document.getElementById(`sudoku-heart-${i}`);
      if (heartEl) {
        if (i <= lives) {
          heartEl.innerText = '❤️';
          heartEl.classList.remove('lost');
        } else {
          heartEl.innerText = '🤍';
          heartEl.classList.add('lost');
        }
      }
    }
  }

  function loseLife() {
    if (lives > 0) {
      lives--;
      updateLivesDisplay();
      window.SoundManager?.playError();

      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      if (lives === 0) {
        setTimeout(() => {
          document.getElementById('modal-game-over').classList.add('active');
        }, 500);
      }
    }
  }

  function generateSudoku() {
    let grid = baseSolvedGrid.map(row => [...row]);

    // Permutación aleatoria de dígitos
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    const mapping = {};
    for (let i = 1; i <= 9; i++) mapping[i] = nums[i - 1];
    grid = grid.map(row => row.map(val => mapping[val]));

    // Intercambio de filas dentro de bloques de 3
    for (let block = 0; block < 3; block++) {
      const r1 = block * 3 + Math.floor(Math.random() * 3);
      const r2 = block * 3 + Math.floor(Math.random() * 3);
      [grid[r1], grid[r2]] = [grid[r2], grid[r1]];
    }

    // Intercambio de columnas dentro de bloques de 3
    for (let block = 0; block < 3; block++) {
      const c1 = block * 3 + Math.floor(Math.random() * 3);
      const c2 = block * 3 + Math.floor(Math.random() * 3);
      for (let r = 0; r < 9; r++) {
        [grid[r][c1], grid[r][c2]] = [grid[r][c2], grid[r][c1]];
      }
    }

    // Aplanar
    solutionBoard = [];
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        solutionBoard.push(grid[r][c]);
      }
    }

    // Dejar pistas
    const cluesToKeep = difficultyCluesCount[difficulty] || 48;
    const allIndices = Array.from({ length: 81 }, (_, i) => i);
    for (let i = allIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
    }

    const indicesToKeep = new Set(allIndices.slice(0, cluesToKeep));

    userBoard = Array(81).fill(0);
    initialClues = Array(81).fill(false);

    for (let i = 0; i < 81; i++) {
      if (indicesToKeep.has(i)) {
        userBoard[i] = solutionBoard[i];
        initialClues[i] = true;
      }
    }
  }

  function resetGame() {
    selectedCellIndex = null;
    isCompleted = false;
    resetLives();
    generateSudoku();
    renderBoard();
  }

  function renderBoard() {
    const boardEl = document.getElementById('sudoku-board');
    boardEl.innerHTML = '';

    const selectedRow = selectedCellIndex !== null ? Math.floor(selectedCellIndex / 9) : null;
    const selectedCol = selectedCellIndex !== null ? selectedCellIndex % 9 : null;
    const selectedBlockRow = selectedRow !== null ? Math.floor(selectedRow / 3) : null;
    const selectedBlockCol = selectedCol !== null ? Math.floor(selectedCol / 3) : null;
    const selectedVal = selectedCellIndex !== null ? userBoard[selectedCellIndex] : null;

    for (let i = 0; i < 81; i++) {
      const cell = document.createElement('div');
      cell.className = 'sudoku-cell';
      cell.dataset.index = i;

      const r = Math.floor(i / 9);
      const c = i % 9;
      const bRow = Math.floor(r / 3);
      const bCol = Math.floor(c / 3);
      const val = userBoard[i];

      if (initialClues[i]) {
        cell.classList.add('fixed');
      }

      if (selectedCellIndex === i) {
        cell.classList.add('selected');
      } else if (selectedRow !== null && (r === selectedRow || c === selectedCol || (bRow === selectedBlockRow && bCol === selectedBlockCol))) {
        cell.classList.add('highlight-line');
      }

      if (selectedVal && val === selectedVal && selectedCellIndex !== i && val !== 0) {
        cell.classList.add('highlight-same-num');
      }

      cell.innerText = val !== 0 ? val : '';

      cell.addEventListener('click', () => {
        selectedCellIndex = i;
        window.SoundManager?.playPop();
        renderBoard();
      });

      boardEl.appendChild(cell);
    }
  }

  function inputNumber(num) {
    if (selectedCellIndex === null || isCompleted) return;
    if (initialClues[selectedCellIndex]) return;

    const correctNum = solutionBoard[selectedCellIndex];

    if (num === correctNum) {
      userBoard[selectedCellIndex] = num;
      window.SoundManager?.playPop();
      renderBoard();
      checkWin();
    } else {
      // Error: pierde 1 vida del Sudoku
      userBoard[selectedCellIndex] = num;
      renderBoard();

      const cellEl = document.querySelector(`.sudoku-cell[data-index="${selectedCellIndex}"]`);
      if (cellEl) {
        cellEl.classList.add('error-cell');
      }

      loseLife();

      setTimeout(() => {
        userBoard[selectedCellIndex] = 0;
        renderBoard();
      }, 700);
    }
  }

  function eraseCurrentCell() {
    if (selectedCellIndex === null || isCompleted) return;
    if (initialClues[selectedCellIndex]) return;

    userBoard[selectedCellIndex] = 0;
    window.SoundManager?.playClick();
    renderBoard();
  }

  function giveHint() {
    if (isCompleted) return;

    if (selectedCellIndex === null || initialClues[selectedCellIndex] || userBoard[selectedCellIndex] !== 0) {
      selectedCellIndex = userBoard.findIndex((val, idx) => val === 0 && !initialClues[idx]);
    }

    if (selectedCellIndex !== -1 && selectedCellIndex !== null) {
      userBoard[selectedCellIndex] = solutionBoard[selectedCellIndex];
      window.SoundManager?.playChime();
      renderBoard();
      checkWin();
    }
  }

  function checkWin() {
    for (let i = 0; i < 81; i++) {
      if (userBoard[i] !== solutionBoard[i]) return;
    }

    isCompleted = true;
    setTimeout(() => {
      window.SoundManager?.playWin();
      window.App?.onActivityCompleted(`Sudoku 9x9 (${difficulty})`);
    }, 400);
  }

  return {
    init,
    resetGame,
    resetLives
  };
})();

window.SudokuGame = SudokuGame;
