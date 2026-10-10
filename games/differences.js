// ========================================================
// JUEGO: BÚSQUEDA DE DIFERENCIAS ADAPTADA (10 NIVELES ILUSTRADOS)
// Desarrollado por Echomaii Corp para Club Memoria (Chio)
// ========================================================

const DifferencesGame = (() => {
  let currentLevelIndex = parseInt(localStorage.getItem('club_memoria_diff_level') || '0', 10);
  let completedLevels = [];
  try {
    completedLevels = JSON.parse(localStorage.getItem('club_memoria_diff_completed') || '[]');
  } catch (e) {
    completedLevels = [];
  }
  let foundDifferences = [];

  // ========================================================
  // 10 NIVELES CON ILUSTRACIONES TEMÁTICAS VARIADAS
  // ========================================================
  const levels = [
    // ----------------------------------------------------
    // NIVEL 1: El Jardín y la Casita
    // ----------------------------------------------------
    {
      id: 1,
      title: 'Nivel 1: El Jardín Florido',
      icon: '🏡',
      total: 3,
      diffs: [
        { id: 1, x: 260, y: 40, r: 35, desc: 'Las gafas de sol' },
        { id: 2, x: 85, y: 75, r: 35, desc: 'La mariposa amarilla' },
        { id: 3, x: 220, y: 145, r: 35, desc: 'La flor de color diferente' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <defs>
            <linearGradient id="skyJ1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#80DEEA"/><stop offset="100%" stop-color="#E0F7FA"/>
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#skyJ1)"/>
          <circle cx="260" cy="40" r="24" fill="#FFD54F" stroke="#FFA000" stroke-width="3"/>
          <ellipse cx="160" cy="220" rx="200" ry="80" fill="#81C784"/>
          <rect x="50" y="70" width="16" height="60" fill="#795548"/>
          <circle cx="58" cy="65" r="32" fill="#4CAF50"/>
          <g transform="translate(85, 75)">
            <ellipse cx="-6" cy="0" rx="8" ry="6" fill="#FFF176"/>
            <ellipse cx="6" cy="0" rx="8" ry="6" fill="#FFF176"/>
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#3E2723" stroke-width="2"/>
          </g>
          <rect x="130" y="90" width="60" height="45" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/>
          <polygon points="120,90 160,65 200,90" fill="#E57373"/>
          <rect x="150" y="105" width="18" height="30" fill="#6D4C41"/>
          <rect x="135" y="98" width="12" height="12" fill="#B3E5FC"/>
          <circle cx="100" cy="145" r="8" fill="#E91E63"/>
          <circle cx="100" cy="145" r="3" fill="#FFF"/>
          <circle cx="220" cy="145" r="10" fill="#E53935"/>
          <circle cx="220" cy="145" r="4" fill="#FFEB3B"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <defs>
            <linearGradient id="skyJ2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#80DEEA"/><stop offset="100%" stop-color="#E0F7FA"/>
            </linearGradient>
          </defs>
          <rect width="320" height="180" fill="url(#skyJ2)"/>
          <circle cx="260" cy="40" r="24" fill="#FFD54F" stroke="#FFA000" stroke-width="3"/>
          <!-- DIFERENCIA 1: Gafas de sol -->
          <rect x="248" y="34" width="10" height="8" rx="2" fill="#212121"/>
          <rect x="262" y="34" width="10" height="8" rx="2" fill="#212121"/>
          <line x1="258" y1="38" x2="262" y2="38" stroke="#212121" stroke-width="2"/>
          <ellipse cx="160" cy="220" rx="200" ry="80" fill="#81C784"/>
          <rect x="50" y="70" width="16" height="60" fill="#795548"/>
          <circle cx="58" cy="65" r="32" fill="#4CAF50"/>
          <!-- DIFERENCIA 2: Sin mariposa -->
          <rect x="130" y="90" width="60" height="45" fill="#FFE0B2" stroke="#8D6E63" stroke-width="2"/>
          <polygon points="120,90 160,65 200,90" fill="#E57373"/>
          <rect x="150" y="105" width="18" height="30" fill="#6D4C41"/>
          <rect x="135" y="98" width="12" height="12" fill="#B3E5FC"/>
          <circle cx="100" cy="145" r="8" fill="#E91E63"/>
          <circle cx="100" cy="145" r="3" fill="#FFF"/>
          <!-- DIFERENCIA 3: Flor color azul -->
          <circle cx="220" cy="145" r="10" fill="#1E88E5"/>
          <circle cx="220" cy="145" r="4" fill="#FFEB3B"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 2: Vacaciones en la Playa
    // ----------------------------------------------------
    {
      id: 2,
      title: 'Nivel 2: Día Soleado en la Playa',
      icon: '🏖️',
      total: 3,
      diffs: [
        { id: 1, x: 70, y: 35, r: 35, desc: 'La nube en el cielo' },
        { id: 2, x: 220, y: 55, r: 35, desc: 'La bandera del barco' },
        { id: 3, x: 120, y: 150, r: 35, desc: 'La estrella de mar' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="90" fill="#81D4FA"/>
          <rect y="90" width="320" height="40" fill="#4FC3F7"/>
          <rect y="130" width="320" height="50" fill="#FFE082"/>
          <!-- Nube (Diferencia 1) -->
          <ellipse cx="70" cy="35" rx="22" ry="12" fill="#FFFFFF"/>
          <circle cx="80" cy="28" r="14" fill="#FFFFFF"/>
          <!-- Barco sin bandera -->
          <polygon points="200,85 240,85 230,95 210,95" fill="#8D6E63"/>
          <polygon points="220,85 220,60 235,85" fill="#FFFFFF" stroke="#B0BEC5"/>
          <!-- Sombrilla -->
          <line x1="250" y1="120" x2="260" y2="160" stroke="#795548" stroke-width="4"/>
          <path d="M225,120 Q250,95 275,120 Z" fill="#E91E63"/>
          <!-- Estrella de mar naranja (Diferencia 3) -->
          <circle cx="120" cy="150" r="10" fill="#FF7043"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="90" fill="#81D4FA"/>
          <rect y="90" width="320" height="40" fill="#4FC3F7"/>
          <rect y="130" width="320" height="50" fill="#FFE082"/>
          <!-- Sin Nube (Diferencia 1) -->
          <!-- Barco con bandera roja (Diferencia 2) -->
          <polygon points="200,85 240,85 230,95 210,95" fill="#8D6E63"/>
          <polygon points="220,85 220,60 235,85" fill="#FFFFFF" stroke="#B0BEC5"/>
          <polygon points="220,60 220,50 232,55" fill="#E53935"/>
          <!-- Sombrilla -->
          <line x1="250" y1="120" x2="260" y2="160" stroke="#795548" stroke-width="4"/>
          <path d="M225,120 Q250,95 275,120 Z" fill="#E91E63"/>
          <!-- Conchita violeta en lugar de estrella (Diferencia 3) -->
          <path d="M112,154 Q120,142 128,154 Z" fill="#9C27B0"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 3: El Salón y el Gatito
    // ----------------------------------------------------
    {
      id: 3,
      title: 'Nivel 3: El Salón y el Gatito',
      icon: '🐱',
      total: 3,
      diffs: [
        { id: 1, x: 60, y: 40, r: 35, desc: 'La hora en el reloj' },
        { id: 2, x: 160, y: 135, r: 35, desc: 'El lazo del gatito' },
        { id: 3, x: 260, y: 45, r: 35, desc: 'El dibujo del cuadro' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="130" fill="#EDE7F6"/>
          <rect y="130" width="320" height="50" fill="#D7CCC8"/>
          <!-- Ventana central -->
          <rect x="110" y="20" width="100" height="65" fill="#B3E5FC" stroke="#8D6E63" stroke-width="4"/>
          <line x1="160" y1="20" x2="160" y2="85" stroke="#8D6E63" stroke-width="2"/>
          <line x1="110" y1="52" x2="210" y2="52" stroke="#8D6E63" stroke-width="2"/>
          <!-- Reloj a las 3:00 (Diferencia 1) -->
          <circle cx="60" cy="40" r="20" fill="#FFF" stroke="#FFB300" stroke-width="3"/>
          <line x1="60" y1="40" x2="60" y2="28" stroke="#333" stroke-width="2"/>
          <line x1="60" y1="40" x2="72" y2="40" stroke="#333" stroke-width="2"/>
          <!-- Cuadro de Montaña (Diferencia 3) -->
          <rect x="240" y="25" width="40" height="40" fill="#FFF9C4" stroke="#5D4037" stroke-width="2"/>
          <polygon points="245,60 260,40 275,60" fill="#4CAF50"/>
          <!-- Alfombra -->
          <ellipse cx="160" cy="155" rx="75" ry="22" fill="#80CBC4"/>
          <!-- Gatito dormido (Diferencia 2) -->
          <ellipse cx="160" cy="142" rx="26" ry="16" fill="#FFA726"/>
          <circle cx="140" cy="138" r="14" fill="#FFA726"/>
          <polygon points="134,126 130,132 138,132" fill="#FB8C00"/>
          <polygon points="144,126 140,132 148,132" fill="#FB8C00"/>
          <!-- Ojos durmiendo -->
          <path d="M135,140 Q138,143 141,140" stroke="#5D4037" stroke-width="1.5" fill="none"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="130" fill="#EDE7F6"/>
          <rect y="130" width="320" height="50" fill="#D7CCC8"/>
          <rect x="110" y="20" width="100" height="65" fill="#B3E5FC" stroke="#8D6E63" stroke-width="4"/>
          <line x1="160" y1="20" x2="160" y2="85" stroke="#8D6E63" stroke-width="2"/>
          <line x1="110" y1="52" x2="210" y2="52" stroke="#8D6E63" stroke-width="2"/>
          <!-- Reloj a las 6:00 (DIFERENCIA 1) -->
          <circle cx="60" cy="40" r="20" fill="#FFF" stroke="#FFB300" stroke-width="3"/>
          <line x1="60" y1="40" x2="60" y2="28" stroke="#333" stroke-width="2"/>
          <line x1="60" y1="40" x2="60" y2="52" stroke="#333" stroke-width="2"/>
          <!-- Cuadro con Corazón Rojo (DIFERENCIA 3) -->
          <rect x="240" y="25" width="40" height="40" fill="#FFF9C4" stroke="#5D4037" stroke-width="2"/>
          <circle cx="255" cy="42" r="5" fill="#E53935"/>
          <circle cx="265" cy="42" r="5" fill="#E53935"/>
          <polygon points="250,44 270,44 260,54" fill="#E53935"/>
          <ellipse cx="160" cy="155" rx="75" ry="22" fill="#80CBC4"/>
          <!-- Gatito con Lazo Rojo (DIFERENCIA 2) -->
          <ellipse cx="160" cy="142" rx="26" ry="16" fill="#FFA726"/>
          <circle cx="140" cy="138" r="14" fill="#FFA726"/>
          <polygon points="134,126 130,132 138,132" fill="#FB8C00"/>
          <polygon points="144,126 140,132 148,132" fill="#FB8C00"/>
          <!-- Lazo rojo -->
          <circle cx="136" cy="126" r="4" fill="#E53935"/>
          <polygon points="130,123 130,129 136,126" fill="#E53935"/>
          <polygon points="142,123 142,129 136,126" fill="#E53935"/>
          <path d="M135,140 Q138,143 141,140" stroke="#5D4037" stroke-width="1.5" fill="none"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 4: La Cocina Campestre
    // ----------------------------------------------------
    {
      id: 4,
      title: 'Nivel 4: La Cocina Campestre',
      icon: '🍳',
      total: 3,
      diffs: [
        { id: 1, x: 95, y: 55, r: 35, desc: 'El vapor de la tetera' },
        { id: 2, x: 240, y: 80, r: 35, desc: 'La flor del jarrón' },
        { id: 3, x: 165, y: 120, r: 35, desc: 'El color de la taza' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="120" fill="#FFF3E0"/>
          <rect y="120" width="320" height="60" fill="#BCAAA4"/>
          <rect x="20" y="120" width="280" height="40" fill="#FFCDD2"/>
          <!-- Vapor de tetera (Diferencia 1) -->
          <path d="M90,70 Q85,55 92,45" stroke="#FFFFFF" stroke-width="3" fill="none"/>
          <path d="M100,70 Q105,55 98,45" stroke="#FFFFFF" stroke-width="3" fill="none"/>
          <!-- Tetera verde -->
          <ellipse cx="95" cy="95" rx="25" ry="18" fill="#43A047"/>
          <rect x="90" y="74" width="10" height="6" fill="#FFB300"/>
          <!-- Taza Amarilla (Diferencia 3) -->
          <rect x="155" y="115" width="20" height="16" rx="4" fill="#FDD835"/>
          <ellipse cx="165" cy="131" rx="14" ry="3" fill="#FFF"/>
          <!-- Jarrón con 3 flores (Diferencia 2) -->
          <polygon points="230,120 250,120 246,85 234,85" fill="#90CAF9"/>
          <circle cx="232" cy="70" r="8" fill="#FFB300"/>
          <circle cx="240" cy="60" r="8" fill="#FFB300"/>
          <circle cx="248" cy="70" r="8" fill="#FFB300"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="120" fill="#FFF3E0"/>
          <rect y="120" width="320" height="60" fill="#BCAAA4"/>
          <rect x="20" y="120" width="280" height="40" fill="#FFCDD2"/>
          <!-- Sin Vapor (DIFERENCIA 1) -->
          <!-- Tetera verde -->
          <ellipse cx="95" cy="95" rx="25" ry="18" fill="#43A047"/>
          <rect x="90" y="74" width="10" height="6" fill="#FFB300"/>
          <!-- Taza ROJA (DIFERENCIA 3) -->
          <rect x="155" y="115" width="20" height="16" rx="4" fill="#E53935"/>
          <ellipse cx="165" cy="131" rx="14" ry="3" fill="#FFF"/>
          <!-- Jarrón con solo 2 flores (DIFERENCIA 2: falta la central) -->
          <polygon points="230,120 250,120 246,85 234,85" fill="#90CAF9"/>
          <circle cx="232" cy="70" r="8" fill="#FFB300"/>
          <circle cx="248" cy="70" r="8" fill="#FFB300"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 5: Bosque de Otoño
    // ----------------------------------------------------
    {
      id: 5,
      title: 'Nivel 5: Bosque Mágico de Otoño',
      icon: '🍂',
      total: 3,
      diffs: [
        { id: 1, x: 70, y: 140, r: 35, desc: 'La seta con lunares' },
        { id: 2, x: 160, y: 85, r: 35, desc: 'La bellota de la ardilla' },
        { id: 3, x: 255, y: 45, r: 35, desc: 'El color del pajarito' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="180" fill="#FFE0B2"/>
          <ellipse cx="80" cy="180" rx="160" ry="60" fill="#FF8A65"/>
          <ellipse cx="240" cy="180" rx="160" ry="60" fill="#D84315"/>
          <!-- Árbol central -->
          <rect x="148" y="70" width="22" height="70" fill="#5D4037"/>
          <circle cx="159" cy="55" r="45" fill="#FFA726"/>
          <!-- Seta roja con lunares (Diferencia 1) -->
          <rect x="66" y="142" width="8" height="15" fill="#FFFFFF"/>
          <path d="M52,142 Q70,118 88,142 Z" fill="#E53935"/>
          <circle cx="62" cy="132" r="3" fill="#FFF"/>
          <circle cx="72" cy="128" r="3" fill="#FFF"/>
          <circle cx="80" cy="134" r="3" fill="#FFF"/>
          <!-- Ardilla con bellota (Diferencia 2) -->
          <ellipse cx="160" cy="88" rx="14" ry="10" fill="#E65100"/>
          <circle cx="152" cy="82" r="8" fill="#E65100"/>
          <circle cx="146" cy="86" r="4" fill="#795548"/>
          <!-- Pajarito azul (Diferencia 3) -->
          <circle cx="255" cy="45" r="10" fill="#1E88E5"/>
          <polygon points="265,45 272,43 265,48" fill="#FF9800"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="180" fill="#FFE0B2"/>
          <ellipse cx="80" cy="180" rx="160" ry="60" fill="#FF8A65"/>
          <ellipse cx="240" cy="180" rx="160" ry="60" fill="#D84315"/>
          <rect x="148" y="70" width="22" height="70" fill="#5D4037"/>
          <circle cx="159" cy="55" r="45" fill="#FFA726"/>
          <!-- Seta marrón sin lunares (DIFERENCIA 1) -->
          <rect x="66" y="142" width="8" height="15" fill="#FFFFFF"/>
          <path d="M52,142 Q70,118 88,142 Z" fill="#8D6E63"/>
          <!-- Ardilla sin bellota (DIFERENCIA 2) -->
          <ellipse cx="160" cy="88" rx="14" ry="10" fill="#E65100"/>
          <circle cx="152" cy="82" r="8" fill="#E65100"/>
          <!-- Pajarito amarillo (DIFERENCIA 3) -->
          <circle cx="255" cy="45" r="10" fill="#FDD835"/>
          <polygon points="265,45 272,43 265,48" fill="#FF9800"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 6: El Faro y el Puerto
    // ----------------------------------------------------
    {
      id: 6,
      title: 'Nivel 6: El Faro y el Puerto',
      icon: '⛵',
      total: 3,
      diffs: [
        { id: 1, x: 210, y: 35, r: 35, desc: 'La luz del faro' },
        { id: 2, x: 75, y: 35, r: 35, desc: 'La gaviota adicional' },
        { id: 3, x: 130, y: 140, r: 35, desc: 'El salvavidas de color' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="100" fill="#64B5F6"/>
          <rect y="100" width="320" height="80" fill="#1976D2"/>
          <polygon points="180,180 290,180 280,90 195,90" fill="#546E7A"/>
          <!-- Faro blanco y rojo -->
          <polygon points="220,90 240,90 236,30 224,30" fill="#ECEFF1"/>
          <polygon points="222,70 238,70 236,55 224,55" fill="#E53935"/>
          <circle cx="230" cy="28" r="8" fill="#37474F"/>
          <!-- Luz encendida con haz (Diferencia 1) -->
          <polygon points="228,28 60,0 60,60" fill="rgba(255, 238, 88, 0.45)"/>
          <!-- 2 Gaviotas (Diferencia 2) -->
          <path d="M60,40 Q68,34 75,40 Q82,34 90,40" stroke="#FFF" stroke-width="2.5" fill="none"/>
          <path d="M100,50 Q106,45 112,50 Q118,45 124,50" stroke="#FFF" stroke-width="2" fill="none"/>
          <!-- Salvavidas rojo y blanco (Diferencia 3) -->
          <circle cx="130" cy="140" r="14" fill="#FFFFFF" stroke="#E53935" stroke-width="6"/>
          <circle cx="130" cy="140" r="6" fill="#1976D2"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="100" fill="#64B5F6"/>
          <rect y="100" width="320" height="80" fill="#1976D2"/>
          <polygon points="180,180 290,180 280,90 195,90" fill="#546E7A"/>
          <polygon points="220,90 240,90 236,30 224,30" fill="#ECEFF1"/>
          <polygon points="222,70 238,70 236,55 224,55" fill="#E53935"/>
          <circle cx="230" cy="28" r="8" fill="#37474F"/>
          <!-- Luz apagada (DIFERENCIA 1: sin haz amarillo) -->
          <!-- 3 Gaviotas (DIFERENCIA 2: gaviota extra) -->
          <path d="M60,40 Q68,34 75,40 Q82,34 90,40" stroke="#FFF" stroke-width="2.5" fill="none"/>
          <path d="M100,50 Q106,45 112,50 Q118,45 124,50" stroke="#FFF" stroke-width="2" fill="none"/>
          <path d="M70,22 Q76,17 82,22 Q88,17 94,22" stroke="#FFF" stroke-width="2" fill="none"/>
          <!-- Salvavidas azul y blanco (DIFERENCIA 3) -->
          <circle cx="130" cy="140" r="14" fill="#FFFFFF" stroke="#0D47A1" stroke-width="6"/>
          <circle cx="130" cy="140" r="6" fill="#1976D2"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 7: Parque de Cerezos
    // ----------------------------------------------------
    {
      id: 7,
      title: 'Nivel 7: El Parque de los Cerezos',
      icon: '🌸',
      total: 3,
      diffs: [
        { id: 1, x: 60, y: 85, r: 35, desc: 'La luz del farol' },
        { id: 2, x: 195, y: 125, r: 35, desc: 'El libro en el banco' },
        { id: 3, x: 270, y: 60, r: 35, desc: 'Los pétalos cayendo' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="110" fill="#F8BBD0"/>
          <rect y="110" width="320" height="70" fill="#A5D6A7"/>
          <!-- Gran Cerezo -->
          <rect x="220" y="65" width="20" height="70" fill="#4E342E"/>
          <circle cx="230" cy="50" r="42" fill="#F48FB1"/>
          <!-- Farol con luz encendida (Diferencia 1) -->
          <rect x="58" y="70" width="4" height="60" fill="#212121"/>
          <circle cx="60" cy="85" r="16" fill="rgba(255, 235, 59, 0.5)"/>
          <circle cx="60" cy="85" r="6" fill="#FFF59D"/>
          <!-- Banco con libro (Diferencia 2) -->
          <rect x="175" y="125" width="44" height="10" fill="#795548"/>
          <rect x="180" y="135" width="4" height="15" fill="#4E342E"/>
          <rect x="210" y="135" width="4" height="15" fill="#4E342E"/>
          <polygon points="190,123 200,120 205,123" fill="#FFFFFF" stroke="#1565C0" stroke-width="1.5"/>
          <!-- Pétalos cayendo (Diferencia 3) -->
          <circle cx="265" cy="55" r="4" fill="#E91E63"/>
          <circle cx="275" cy="70" r="4" fill="#E91E63"/>
          <circle cx="280" cy="90" r="4" fill="#E91E63"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="110" fill="#F8BBD0"/>
          <rect y="110" width="320" height="70" fill="#A5D6A7"/>
          <rect x="220" y="65" width="20" height="70" fill="#4E342E"/>
          <circle cx="230" cy="50" r="42" fill="#F48FB1"/>
          <!-- Farol apagado (DIFERENCIA 1) -->
          <rect x="58" y="70" width="4" height="60" fill="#212121"/>
          <circle cx="60" cy="85" r="6" fill="#9E9E9E"/>
          <!-- Banco sin libro (DIFERENCIA 2) -->
          <rect x="175" y="125" width="44" height="10" fill="#795548"/>
          <rect x="180" y="135" width="4" height="15" fill="#4E342E"/>
          <rect x="210" y="135" width="4" height="15" fill="#4E342E"/>
          <!-- Sin pétalos flotantes (DIFERENCIA 3) -->
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 8: El Huerto de Manzanas
    // ----------------------------------------------------
    {
      id: 8,
      title: 'Nivel 8: El Huerto y la Cosecha',
      icon: '🍎',
      total: 3,
      diffs: [
        { id: 1, x: 110, y: 85, r: 35, desc: 'La manzana que cae' },
        { id: 2, x: 215, y: 140, r: 35, desc: 'La cantidad de manzanas' },
        { id: 3, x: 75, y: 95, r: 35, desc: 'El pájaro en el tronco' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="90" fill="#B3E5FC"/>
          <rect y="90" width="320" height="90" fill="#81C784"/>
          <!-- Manzano -->
          <rect x="68" y="60" width="18" height="60" fill="#5D4037"/>
          <circle cx="77" cy="45" r="38" fill="#43A047"/>
          <circle cx="60" cy="35" r="6" fill="#E53935"/>
          <circle cx="85" cy="40" r="6" fill="#E53935"/>
          <!-- Manzana cayendo en el aire (Diferencia 1) -->
          <circle cx="110" cy="85" r="6" fill="#E53935"/>
          <!-- Cesta con 3 manzanas (Diferencia 2) -->
          <ellipse cx="215" cy="148" rx="22" ry="12" fill="#A1887F"/>
          <circle cx="210" cy="140" r="6" fill="#E53935"/>
          <circle cx="220" cy="140" r="6" fill="#E53935"/>
          <circle cx="215" cy="133" r="6" fill="#E53935"/>
          <!-- Valla de madera -->
          <line x1="140" y1="100" x2="310" y2="100" stroke="#FFF" stroke-width="4"/>
          <line x1="160" y1="90" x2="160" y2="120" stroke="#FFF" stroke-width="4"/>
          <line x1="200" y1="90" x2="200" y2="120" stroke="#FFF" stroke-width="4"/>
          <line x1="240" y1="90" x2="240" y2="120" stroke="#FFF" stroke-width="4"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="90" fill="#B3E5FC"/>
          <rect y="90" width="320" height="90" fill="#81C784"/>
          <rect x="68" y="60" width="18" height="60" fill="#5D4037"/>
          <circle cx="77" cy="45" r="38" fill="#43A047"/>
          <circle cx="60" cy="35" r="6" fill="#E53935"/>
          <circle cx="85" cy="40" r="6" fill="#E53935"/>
          <!-- Pájaro carpintero en el tronco (DIFERENCIA 3) -->
          <circle cx="84" cy="92" r="5" fill="#212121"/>
          <polygon points="84,88 88,86 84,90" fill="#E53935"/>
          <!-- Sin manzana cayendo (DIFERENCIA 1) -->
          <!-- Cesta con 5 manzanas (DIFERENCIA 2) -->
          <ellipse cx="215" cy="148" rx="22" ry="12" fill="#A1887F"/>
          <circle cx="206" cy="140" r="5" fill="#E53935"/>
          <circle cx="215" cy="140" r="5" fill="#E53935"/>
          <circle cx="224" cy="140" r="5" fill="#E53935"/>
          <circle cx="210" cy="132" r="5" fill="#E53935"/>
          <circle cx="220" cy="132" r="5" fill="#E53935"/>
          <line x1="140" y1="100" x2="310" y2="100" stroke="#FFF" stroke-width="4"/>
          <line x1="160" y1="90" x2="160" y2="120" stroke="#FFF" stroke-width="4"/>
          <line x1="200" y1="90" x2="200" y2="120" stroke="#FFF" stroke-width="4"/>
          <line x1="240" y1="90" x2="240" y2="120" stroke="#FFF" stroke-width="4"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 9: Noche de Campamento
    // ----------------------------------------------------
    {
      id: 9,
      title: 'Nivel 9: Noche Bajo las Estrellas',
      icon: '🌙',
      total: 3,
      diffs: [
        { id: 1, x: 260, y: 35, r: 35, desc: 'La carita de la luna' },
        { id: 2, x: 160, y: 140, r: 35, desc: 'El fuego en la fogata' },
        { id: 3, x: 65, y: 45, r: 35, desc: 'La estrella fugaz' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="180" fill="#1A237E"/>
          <!-- Estrellas fijas -->
          <circle cx="110" cy="30" r="2" fill="#FFF"/>
          <circle cx="180" cy="45" r="2" fill="#FFF"/>
          <circle cx="210" cy="25" r="2" fill="#FFF"/>
          <!-- Luna con carita (Diferencia 1) -->
          <circle cx="260" cy="35" r="18" fill="#FFF59D"/>
          <circle cx="266" cy="31" r="16" fill="#1A237E"/>
          <circle cx="254" cy="33" r="1.5" fill="#F57F17"/>
          <path d="M253,38 Q256,41 259,38" stroke="#F57F17" stroke-width="1.2" fill="none"/>
          <!-- Estrella fugaz (Diferencia 3) -->
          <line x1="45" y1="35" x2="75" y2="55" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
          <circle cx="75" cy="55" r="3" fill="#FFF"/>
          <!-- Colina oscura -->
          <ellipse cx="160" cy="210" rx="190" ry="70" fill="#2E7D32"/>
          <!-- Tienda naranja -->
          <polygon points="50,155 85,100 120,155" fill="#FF7043"/>
          <polygon points="85,100 85,155 105,155" fill="#D84315"/>
          <!-- Fogata con llamas (Diferencia 2) -->
          <ellipse cx="160" cy="155" rx="14" ry="6" fill="#4E342E"/>
          <polygon points="152,154 160,132 168,154" fill="#FF9800"/>
          <polygon points="155,154 160,138 165,154" fill="#FFEB3B"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="180" fill="#1A237E"/>
          <circle cx="110" cy="30" r="2" fill="#FFF"/>
          <circle cx="180" cy="45" r="2" fill="#FFF"/>
          <circle cx="210" cy="25" r="2" fill="#FFF"/>
          <!-- Luna lisa sin carita (DIFERENCIA 1) -->
          <circle cx="260" cy="35" r="18" fill="#FFF59D"/>
          <circle cx="266" cy="31" r="16" fill="#1A237E"/>
          <!-- Sin estrella fugaz (DIFERENCIA 3) -->
          <ellipse cx="160" cy="210" rx="190" ry="70" fill="#2E7D32"/>
          <polygon points="50,155 85,100 120,155" fill="#FF7043"/>
          <polygon points="85,100 85,155 105,155" fill="#D84315"/>
          <!-- Fogata apagada sin llamas (DIFERENCIA 2) -->
          <ellipse cx="160" cy="155" rx="14" ry="6" fill="#4E342E"/>
          <line x1="152" y1="152" x2="168" y2="152" stroke="#212121" stroke-width="3"/>
          <path d="M160,150 Q158,140 162,135" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"/>
        `;
      }
    },

    // ----------------------------------------------------
    // NIVEL 10: Gran Fiesta de Cumpleaños
    // ----------------------------------------------------
    {
      id: 10,
      title: 'Nivel 10: Gran Fiesta de Cumpleaños',
      icon: '🎂',
      total: 3,
      diffs: [
        { id: 1, x: 160, y: 65, r: 35, desc: 'La vela encendida' },
        { id: 2, x: 65, y: 45, r: 35, desc: 'El color del globo' },
        { id: 3, x: 255, y: 135, r: 35, desc: 'El lazo del regalo' }
      ],
      draw1: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="130" fill="#FFFDE7"/>
          <rect y="130" width="320" height="50" fill="#FFE082"/>
          <!-- Banderines de fiesta -->
          <polygon points="10,0 25,25 40,0" fill="#E53935"/>
          <polygon points="40,0 55,25 70,0" fill="#43A047"/>
          <polygon points="70,0 85,25 100,0" fill="#1E88E5"/>
          <polygon points="100,0 115,25 130,0" fill="#FDD835"/>
          <polygon points="130,0 145,25 160,0" fill="#E53935"/>
          <polygon points="160,0 175,25 190,0" fill="#8E24AA"/>
          <polygon points="190,0 205,25 220,0" fill="#43A047"/>
          <polygon points="220,0 235,25 250,0" fill="#1E88E5"/>
          <polygon points="250,0 265,25 280,0" fill="#FDD835"/>
          <polygon points="280,0 295,25 310,0" fill="#E53935"/>
          <!-- Globos: Rojo y Azul (Diferencia 2) -->
          <circle cx="55" cy="50" r="14" fill="#E53935"/>
          <line x1="55" y1="64" x2="60" y2="100" stroke="#BDBDBD"/>
          <circle cx="75" cy="40" r="14" fill="#1E88E5"/>
          <line x1="75" y1="54" x2="60" y2="100" stroke="#BDBDBD"/>
          <!-- Tarta de Cumpleaños -->
          <rect x="135" y="90" width="50" height="35" rx="4" fill="#F48FB1"/>
          <rect x="142" y="75" width="36" height="18" rx="3" fill="#FFF"/>
          <!-- Vela encendida con llama (Diferencia 1) -->
          <rect x="158" y="65" width="4" height="12" fill="#4FC3F7"/>
          <polygon points="160,54 157,64 163,64" fill="#FF9800"/>
          <!-- Caja de regalo con lazo dorado (Diferencia 3) -->
          <rect x="235" y="115" width="40" height="35" fill="#4CAF50"/>
          <rect x="252" y="115" width="6" height="35" fill="#FFD54F"/>
          <circle cx="255" cy="112" r="6" fill="#FFD54F"/>
        `;
      },
      draw2: (svg) => {
        svg.innerHTML = `
          <rect width="320" height="130" fill="#FFFDE7"/>
          <rect y="130" width="320" height="50" fill="#FFE082"/>
          <polygon points="10,0 25,25 40,0" fill="#E53935"/>
          <polygon points="40,0 55,25 70,0" fill="#43A047"/>
          <polygon points="70,0 85,25 100,0" fill="#1E88E5"/>
          <polygon points="100,0 115,25 130,0" fill="#FDD835"/>
          <polygon points="130,0 145,25 160,0" fill="#E53935"/>
          <polygon points="160,0 175,25 190,0" fill="#8E24AA"/>
          <polygon points="190,0 205,25 220,0" fill="#43A047"/>
          <polygon points="220,0 235,25 250,0" fill="#1E88E5"/>
          <polygon points="250,0 265,25 280,0" fill="#FDD835"/>
          <polygon points="280,0 295,25 310,0" fill="#E53935"/>
          <!-- Globos: Rojo y VERDE (DIFERENCIA 2) -->
          <circle cx="55" cy="50" r="14" fill="#E53935"/>
          <line x1="55" y1="64" x2="60" y2="100" stroke="#BDBDBD"/>
          <circle cx="75" cy="40" r="14" fill="#43A047"/>
          <line x1="75" y1="54" x2="60" y2="100" stroke="#BDBDBD"/>
          <!-- Tarta de Cumpleaños -->
          <rect x="135" y="90" width="50" height="35" rx="4" fill="#F48FB1"/>
          <rect x="142" y="75" width="36" height="18" rx="3" fill="#FFF"/>
          <!-- Vela apagada con humo (DIFERENCIA 1) -->
          <rect x="158" y="65" width="4" height="12" fill="#4FC3F7"/>
          <path d="M160,63 Q157,55 163,50" stroke="#757575" stroke-width="1.8" fill="none"/>
          <!-- Caja de regalo con lazo MORADO (DIFERENCIA 3) -->
          <rect x="235" y="115" width="40" height="35" fill="#4CAF50"/>
          <rect x="252" y="115" width="6" height="35" fill="#AB47BC"/>
          <circle cx="255" cy="112" r="6" fill="#AB47BC"/>
        `;
      }
    }
  ];

  function init() {
    setupEventListeners();
    loadLevel(currentLevelIndex);
  }

  function setupEventListeners() {
    // Botones de navegación de nivel
    const btnPrev = document.getElementById('btn-diff-prev');
    const btnNext = document.getElementById('btn-diff-next');

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentLevelIndex > 0) {
          window.SoundManager?.playClick();
          loadLevel(currentLevelIndex - 1);
        }
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentLevelIndex < levels.length - 1) {
          window.SoundManager?.playClick();
          loadLevel(currentLevelIndex + 1);
        }
      });
    }

    // Botón de siguiente nivel en tarjeta de completado
    const btnNextCard = document.getElementById('btn-diff-next-level');
    if (btnNextCard) {
      btnNextCard.addEventListener('click', () => {
        window.SoundManager?.playClick();
        if (currentLevelIndex < levels.length - 1) {
          loadLevel(currentLevelIndex + 1);
        } else {
          loadLevel(0); // Reiniciar en nivel 1
        }
      });
    }

    // Pista
    const btnHint = document.getElementById('btn-diff-hint');
    if (btnHint) {
      btnHint.addEventListener('click', () => {
        giveHint();
      });
    }

    // Clics táctiles en ambas imágenes
    const box1 = document.getElementById('diff-box-1');
    const box2 = document.getElementById('diff-box-2');

    if (box1) box1.addEventListener('click', (e) => handleImageClick(e, box1));
    if (box2) box2.addEventListener('click', (e) => handleImageClick(e, box2));
  }

  function loadLevel(index) {
    if (index < 0 || index >= levels.length) index = 0;
    currentLevelIndex = index;
    localStorage.setItem('club_memoria_diff_level', currentLevelIndex);
    foundDifferences = [];

    // Ocultar tarjeta de nivel completado
    const completeCard = document.getElementById('diff-level-complete-card');
    if (completeCard) completeCard.style.display = 'none';

    renderPills();
    renderScene();
    updateHeader();
  }

  function renderPills() {
    const container = document.getElementById('diff-levels-pills');
    if (!container) return;
    container.innerHTML = '';

    levels.forEach((lvl, idx) => {
      const pill = document.createElement('button');
      const isCompleted = completedLevels.includes(lvl.id);
      const isActive = idx === currentLevelIndex;

      pill.className = `diff-level-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
      pill.innerHTML = `${lvl.icon} ${lvl.id} ${isCompleted ? '✓' : ''}`;
      pill.title = lvl.title;

      pill.addEventListener('click', () => {
        window.SoundManager?.playClick();
        loadLevel(idx);
      });

      container.appendChild(pill);
    });
  }

  function updateHeader() {
    const lvl = levels[currentLevelIndex];

    const titleEl = document.getElementById('diff-level-title');
    if (titleEl) {
      titleEl.innerText = lvl.title;
    }

    const badgeEl = document.getElementById('diff-level-badge');
    if (badgeEl) {
      badgeEl.innerText = `${lvl.icon} Nivel ${lvl.id} de ${levels.length}`;
    }

    const prevBtn = document.getElementById('btn-diff-prev');
    if (prevBtn) {
      prevBtn.disabled = currentLevelIndex === 0;
      prevBtn.style.opacity = currentLevelIndex === 0 ? '0.4' : '1';
    }

    const nextBtn = document.getElementById('btn-diff-next');
    if (nextBtn) {
      nextBtn.disabled = currentLevelIndex === levels.length - 1;
      nextBtn.style.opacity = currentLevelIndex === levels.length - 1 ? '0.4' : '1';
    }

    updateCounter();
  }

  function renderScene() {
    const lvl = levels[currentLevelIndex];
    const svg1 = document.getElementById('svg-diff-1');
    const svg2 = document.getElementById('svg-diff-2');

    if (svg1 && lvl.draw1) lvl.draw1(svg1);
    if (svg2 && lvl.draw2) lvl.draw2(svg2);

    // Limpiar círculos marcadores previos
    document.querySelectorAll('.diff-found-circle').forEach(el => el.remove());
  }

  function handleImageClick(e, boxEl) {
    const rect = boxEl.getBoundingClientRect();
    const scaleX = 320 / rect.width;
    const scaleY = 180 / rect.height;

    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    const lvl = levels[currentLevelIndex];

    const matched = lvl.diffs.find(diff => {
      if (foundDifferences.includes(diff.id)) return false;
      const dist = Math.hypot(clickX - diff.x, clickY - diff.y);
      return dist <= diff.r;
    });

    if (matched) {
      foundDifferences.push(matched.id);
      markDifferenceFound(matched);
      window.SoundManager?.playChime();
      updateCounter();

      if (foundDifferences.length === lvl.total) {
        handleLevelCompleted();
      }
    } else {
      window.SoundManager?.playPop();
    }
  }

  function markDifferenceFound(diff) {
    ['diff-box-1', 'diff-box-2'].forEach(boxId => {
      const box = document.getElementById(boxId);
      if (!box) return;
      const circle = document.createElement('div');
      circle.className = 'diff-found-circle';

      const leftPercent = (diff.x / 320) * 100;
      const topPercent = (diff.y / 180) * 100;

      circle.style.left = `calc(${leftPercent}% - 22px)`;
      circle.style.top = `calc(${topPercent}% - 22px)`;
      circle.style.width = '44px';
      circle.style.height = '44px';

      box.appendChild(circle);
    });
  }

  function updateCounter() {
    const lvl = levels[currentLevelIndex];
    const textEl = document.getElementById('diff-counter-text');
    if (textEl) {
      textEl.innerText = `Diferencias encontradas: ${foundDifferences.length} de ${lvl.total}`;
    }
  }

  function handleLevelCompleted() {
    const lvl = levels[currentLevelIndex];

    if (!completedLevels.includes(lvl.id)) {
      completedLevels.push(lvl.id);
      localStorage.setItem('club_memoria_diff_completed', JSON.stringify(completedLevels));
    }

    renderPills();

    // Mostrar tarjeta de celebración del nivel
    const completeCard = document.getElementById('diff-level-complete-card');
    const completeTitle = document.getElementById('diff-complete-title');
    if (completeCard) {
      if (completeTitle) {
        completeTitle.innerText = `¡${lvl.title} Completado!`;
      }
      completeCard.style.display = 'flex';
    }

    setTimeout(() => {
      window.SoundManager?.playWin();
      window.App?.onActivityCompleted(`Busca Diferencias (${lvl.title})`);
    }, 450);
  }

  function giveHint() {
    const lvl = levels[currentLevelIndex];
    const unfound = lvl.diffs.find(d => !foundDifferences.includes(d.id));
    if (!unfound) return;

    foundDifferences.push(unfound.id);
    markDifferenceFound(unfound);
    window.SoundManager?.playChime();
    updateCounter();

    if (foundDifferences.length === lvl.total) {
      handleLevelCompleted();
    }
  }

  return {
    init,
    loadLevel,
    resetGame: () => loadLevel(currentLevelIndex)
  };
})();

window.DifferencesGame = DifferencesGame;
