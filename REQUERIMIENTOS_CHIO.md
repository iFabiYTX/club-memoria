# Documento de Requerimientos y Viabilidad de Proyecto

**Cliente / Solicitante:** Chio  
**Empresa Desarrolladora:** Echomaii Corp  
**Proyecto:** Aplicación Interactiva de Estimulación Cognitiva y Motriz para Adultos Mayores  
**Versión:** 1.0 (Borrador para Aprobación)  
**Fecha:** Octubre 2026  

---

## 1. Resumen Ejecutivo y Viabilidad

### ¿Es posible realizar este proyecto?
**Sí, 100% viable.** Es un proyecto noble, con alto impacto positivo y técnicamente muy factible. Existen tecnologías modernas que permiten crear una aplicación fluida, intuitiva y accesible que funcione tanto en teléfonos celulares, tablets y computadoras.

---

## 2. ¿Dónde se puede subir y cuánto cuesta? (¿Podemos hacerlo gratis?)

Existen tres caminos principales para distribuir la app. Echomaii Corp recomienda comenzar por la opción más económica y accesible:

| Plataforma / Modalidad | ¿Cómo entra el usuario? | Costo de Publicación | Ventajas para Adultos Mayores |
| :--- | :--- | :--- | :--- |
| **Opción A: Web App / PWA (Recomendada para Fase 1)** | Desde un enlace web o un icono instalado en la pantalla de inicio del celular. | **$0 USD (100% Gratis)** en servicios como Vercel o Firebase Hosting. | No requiere entrar a tiendas de apps ni recordar contraseñas de Google/Apple. Abre con 1 clic. |
| **Opción B: Google Play Store (Android)** | Descarga directa desde la tienda de Google. | **$25 USD (pago único para siempre)** de cuenta desarrollador. | Mayor confianza si el usuario solo sabe instalar desde la tienda. |
| **Opción C: Apple App Store (iPhone / iPad)** | Descarga desde App Store. | **$99 USD al año** (suscripción anual obligatoria de Apple). | Llega a usuarios de iPad / iPhone, pero tiene costo recurrente elevado. |

> **Recomendación de Echomaii Corp:**
> 1. Desarrollar la app como una **Web App Progresiva (PWA)** instalable o aplicación híbrida. El hosting y base de datos iniciales son **$0 costo**.
> 2. Si más adelante se quiere presencia formal en la tienda de Android, solo se abona el pago único de \$25 USD de Google.

---

## 3. Principios de Diseño para Adultos Mayores (Accesibilidad Gerontológica)

Para que la app sea realmente un éxito con personas mayores, no basta con hacer juegos: el diseño debe adaptarse a sus necesidades físicas y sensoriales:

1. **Botones Extra Grandes:** Zonas de toque amplias (mínimo 56x56 píxeles) para facilitar la pulsación incluso con temblores o artritis.
2. **Tipografía Clara y Alto Contraste:** Letras grandes, fuentes legibles (sin cursivas complejas) y fondos limpios sin saturación visual.
3. **Sin Presión de Tiempo:** Eliminar cronómetros con cuenta regresiva estresante. El ritmo lo define la persona.
4. **Cero Publicidad Invasiva:** Las apps comerciales suelen inundar la pantalla de anuncios que confunden al usuario mayor. Esta app debe ser limpia y segura.
5. **Retroalimentación Multisensorial Positiva:** Sonidos suaves y agradables de éxito, vibración suave al tocar (haptic feedback) y mensajes motivadores constantes.
6. **Modo Offline (Sin Internet Obligatorio):** Que los juegos funcionen incluso sin conexión Wi-Fi o datos móviles.

---

## 4. Requerimientos Funcionales (Módulos y Actividades)

### Módulo 1: Perfil y Bienvenida
- **Acceso Directo:** Sin registros complicados ni contraseñas difíciles de memorizar. Solo escribir su nombre o elegir un avatar amigable.
- **Ajuste de Tamaño de Letra:** Opción visible desde el inicio para regular texto: *Normal / Grande / Extra Grande*.

---

### Módulo 2: Actividades Cognitivas y Motrices

#### A. Sopa de Letras Adaptada (Atención y Rastreo Visual)
- **Objetivo:** Estimular concentración, vocabulario y coordinación visomotora.
- **Mecánica:** Cuadrículas accesibles (ej. 6x6 en nivel fácil, 8x8 en normal). Palabras con temas cotidianos (Frutas, Animales, Flores, Ciudades).
- **Interacción Motriz:** Seleccionar tocando la primera y la última letra (o deslizando suavemente). Línea de color de alto contraste sobre la palabra encontrada.

#### B. Sudoku Cognitivo Simplificado (Razonamiento y Lógica)
- **Objetivo:** Estimular flexibilidad mental y memoria de trabajo.
- **Nivel Introductorio:** Sudoku 4x4 (números del 1 al 4) para aprender sin frustración.
- **Nivel Intermedio:** Sudoku 6x6 o 9x9 con opción de ayuda visual (resaltar filas y columnas).
- **Opción Simbólica:** Posibilidad de jugar con frutas, formas geométricas o colores en lugar de solo números.

#### C. Memoria de Trabajo (Parejas y Secuencias)
- **Juego de Cartas / Parejas:** Tarjetas grandes con imágenes familiares (objetos del hogar, naturaleza). Tableros pequeños (4 a 12 cartas).
- **Juego "Sigue el Ritmo":** Secuencia simple de luces/sonidos que el usuario debe repetir en orden (estimulación directa de la memoria de trabajo).

#### D. Trazos y Laberintos Suaves (Motricidad Fina y Coordinación Ojo-Mano)
- **Objetivo:** Ejercitar la precisión en el movimiento de los dedos sobre la pantalla táctil.
- **Mecánica:** Unir puntos numerados para revelar un dibujo o guiar una figura por un camino ancho sin salirse.

---

### Módulo 3: Metacognición y Progreso Positivo

- **¿Cómo te sentiste hoy? (Autoevaluación Metacognitiva):**
  - Al terminar una sesión, una pantalla simple con 3 caritas (Feliz, Tranquilo, Cansado) para fomentar que el usuario reflexione sobre su propio estado mental y anímico.
- **Diario de Logros:**
  - Calendario visual donde cada día que ejercitan la mente se marca con una estrella dorada.
  - Mensajes de felicitación: *"¡Excelente! Hoy ejercitaste tu memoria durante 10 minutos"*.

---

## 5. Preguntas de Validación para Chio

Para que Chio revise este documento y defina sus preferencias:

1. **Nombre de la App:** ¿Tiene en mente algún nombre especial o prefiere que Echomaii Corp le proponga opciones (ej. *Mente Plena, ÁgilMente, Club Memoria, Chio Vital*)?
2. **Dispositivo Principal:** ¿La mayoría de los adultos mayores que conoce usan teléfono móvil, tablet o computadora? (Las tablets son ideales por el tamaño de pantalla).
3. **Juegos Preferidos:** De los propuestos (Sopa de Letras, Sudoku, Memoria de Parejas, Trazos Motrices), ¿hay alguno que considere indispensable o algún otro juego que le gustaría agregar (ej. crucigramas, adivinanzas, diferencias)?
4. **Presupuesto y Publicación:** ¿Le parece bien comenzar con la versión Web/PWA gratis para probar con los usuarios y luego decidir si subirla a Google Play Store?

---

*Documento elaborado por Echomaii Corp.*
