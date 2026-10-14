# 🧠 CLUB MEMORIA — Informe Técnico y Funcional del Proyecto

**Estimulación Cognitiva, Motriz y Metacognición para Adultos Mayores**  
*Desarrollado por Echomaii Corp para Chio*  
*Versión 1.0 Oficial — 100% Gratuito y Libre de Publicidad*

---

## 💡 ¿Cómo explicar el proyecto cuando pregunten si es una página web o una app móvil?

> **Respuesta Rápida y Profesional:**  
> **«Es ambas cosas a la vez, gracias a una arquitectura híbrida moderna (PWA + APK Nativo)».**
>
> 1. **Como Página Web (PWA):** Se puede abrir de inmediato en cualquier dispositivo (computadora, tablet o celular) a través de su enlace oficial [https://ifabiytx.github.io/club-memoria/](https://ifabiytx.github.io/club-memoria/) sin necesidad de descargas previas.
> 2. **Como Aplicación Móvil (APK):** Está empaquetada e instalada como una **aplicación nativa real de Android (`.apk`)** que vive en el celular con su propio icono, pantalla completa y **funciona 100% offline** (no gasta datos móviles ni requiere conexión a internet para jugar).
> 3. **Costo de Operación:** **$0 USD (Gratis de por vida)**. No requiere servidores dedicados de pago ni suscripciones mensuales.

---

## 1. Ficha Técnica del Proyecto

| Parámetro | Detalle de Implementación |
| :--- | :--- |
| **Nombre Oficial** | **Club Memoria** |
| **Público Objetivo** | Adultos mayores y personas en programas de estimulación cognitiva y psicomotriz preventiva |
| **Diseñado y Promovido por** | **Chio** |
| **Empresa Desarrolladora** | **Echomaii Corp** |
| **Tipo de Arquitectura** | Híbrida: PWA (Progressive Web App) + APK Nativo Android empaquetado con Capacitor |
| **Lenguajes Base** | HTML5 Semántico, CSS3 Responsivo Mobile-First, JavaScript Moderno (ES6+ modular) |
| **Motor de Audio** | Web Audio API nativo (síntesis de frecuencias en tiempo real, cero archivos de audio pesados) |
| **Almacenamiento Local** | HTML5 LocalStorage (persistencia de estrellas, récord de niveles, nombre de usuario) |
| **Funcionamiento Offline** | Service Worker (Cache API v3) — 100% operativo sin cobertura de red |
| **Repositorio Oficial** | [https://github.com/iFabiYTX/club-memoria](https://github.com/iFabiYTX/club-memoria) |
| **Acceso Web en Vivo** | [https://ifabiytx.github.io/club-memoria/](https://ifabiytx.github.io/club-memoria/) |
| **Instalador APK Android** | `Club-Memoria-v1.0.apk` (3.68 MB en GitHub Releases) |

---

## 2. Las 4 Actividades Cognitivas Desarrolladas

Cada actividad fue programada desde cero con criterios gerontológicos específicos, evitando temporizadores con cuenta regresiva estresantes y privilegiando la paciencia, el refuerzo positivo y la motricidad fina adaptada:

### 🧩 A. Rompecabezas Progresivo (100 Niveles - Estilo Candy Crush)
* **Estructura:** 100 niveles organizados en 4 fases temáticas (🌸 Flores 1-25, 🐶 Animales 26-50, 🏞️ Paisajes 51-75, 🎨 Arte 76-100).
* **Interfaz:** Camino sinuoso en zig-zag con fondo de pradera viva, hitos por fase y botón de nivel activo animado con pulso visual.
* **Mecánica:** Tablero de intercambio de piezas ilustradas con guía numérica discreta (*badges* en esquina superior) para facilitar la resolución sin tapar la ilustración.
* **Habilidades estimuladas:** Coordinación visomotora, praxias constructivas, paciencia y orientación espacial.

### 🔢 B. Sudoku 9x9 Profesional con Sistema de Vidas
* **Estructura:** Tablero clásico completo de 9x9 generado matemáticamente con algoritmo de *backtracking* (retroceso) para garantizar una solución única válida.
* **Dificultades:** 4 niveles calibrados por densidad de pistas (Fácil: 46 pistas, Medio: 36 pistas, Avanzado: 28 pistas, Extremo: 22 pistas).
* **Sistema de Vidas:** 3 corazones (❤️) exclusivos para el Sudoku. Los errores descuentan una vida y muestran una vibración visual suave sin penalizar al usuario en el resto de la app.
* **Control Táctil:** Teclado numérico gigante en dos filas (1-5 y 6-9 + borrador) pensado ergonómicamente para dedos mayores.
* **Habilidades estimuladas:** Razonamiento numérico lógico, memoria de trabajo y flexibilidad cognitiva.

### 🔍 C. Sopa de Letras Táctil (Selección por Deslizamiento / Swipe)
* **Doble Modalidad:** Fácil (cuadrícula 10x10 solo horizontal/vertical) y Difícil (cuadrícula 12x12 multi-direccional y diagonal).
* **Control Gestual:** Permite seleccionar deslizando el dedo sobre la pantalla con resaltado dorado en tiempo real (`touch-action: none` para no mover la página por accidente), o tocar la primera y última letra (accesibilidad para temblores motrices).
* **Temáticas Enriquecidas:** Frutas Saludables, Flores y Jardinería, Lugares y Ciudades.
* **Habilidades estimuladas:** Rastreo visual selectivo, atención sostenida y reconocimiento ortográfico de vocabulario.

### 👀 D. Busca las 3 Diferencias (10 Niveles Ilustrados)
* **Estructura:** 10 niveles con imágenes vectoriales SVG de alta definición completamente diferentes (Jardín, Playa, Salón con Gato, Cocina, Bosque, Puerto, Cerezos, Huerto, Noche Estrellada, Cumpleaños).
* **Sensibilidad Táctil:** Zonas de toque ampliadas (radio 35 px) y círculos pulsantes en ambas imágenes al detectar un acierto.
* **Progresión:** Barra selectora de 10 píldoras con marcas de verificación (✓) y tarjeta de victoria al completar cada escena con botón de avance.
* **Habilidades estimuladas:** Agudeza visual comparativa, discriminación figura-fondo y memoria icónica.

---

## 3. Metacognición, Bienestar y Gamificación Positiva

* **❤️ Módulo de Metacognición («¿Cómo te sentiste hoy?»):**  
  Al culminar cualquier juego, se presenta una pantalla de chequeo emocional donde el usuario elige entre tres estados: *«Con energía»*, *«Tranquilo»* o *«Un poco cansado»*. La app responde con un mensaje afectivo personalizado (por ejemplo, sugiriendo hidratarse y descansar la vista) y avanza suavemente tras 2.2 segundos para evitar desorientación.
* **🏆 Salón de Honor y Logros Semanales:**  
  Cada victoria otorga +2 estrellas doradas (⭐). El usuario cuenta con su propio nombre editable, un podio de honor visual (oro, plata, bronce) con compañeros amigables de práctica y un calendario semanal con marcas que celebran la constancia sin castigar los días sin juego.

---

## 4. Arquitectura de Software y Despliegue

1. **Cero Costo de Infraestructura ($0 USD):** No requiere servidores dedicados, bases de datos SQL ni servicios de pago. Toda la lógica corre en el dispositivo del usuario.
2. **PWA y Modo 100% Offline:** Utiliza un `Service Worker` registrado (Cache v3) que descarga y almacena en caché todos los activos. Una vez abierta la primera vez, la aplicación funciona sin internet.
3. **Sonidos Sintetizados en Tiempo Real (Web Audio API):** Para mantener la aplicación ultra-ligera (menos de 4 megabytes), todos los efectos sonoros se sintetizan por código, evitando descargar archivos de audio pesados.
4. **Empaquetado Nativo con Capacitor:** Se utilizó `@capacitor/core` y `@capacitor/android` para encapsular la interfaz web en una aplicación Android nativa real.
5. **Compilación Automatizada en la Nube (GitHub Actions):** Se programó un flujo de trabajo CI/CD en `.github/workflows/build-apk.yml`. Servidores en la nube de GitHub con Linux Ubuntu, Java 17 Temurin y Android SDK compilan automáticamente el archivo `Club-Memoria-v1.0.apk`.

---

## 5. Resumen Ejecutivo para Explicar a Evaluadores o Familias

> **Puntos Clave para Chio:**  
> 1. **«No es una página web común, es una aplicación multiplataforma»**: Se puede usar desde cualquier navegador web en computadoras y tablets, pero también se instala como App en teléfonos Android mediante archivo .APK.  
> 2. **«No gasta el plan de internet de los adultos mayores»**: Funciona 100% offline tras su instalación.  
> 3. **«Diseño Gerontológico Real»**: Letras grandes, colores de alto contraste, botones de más de 48px y sin publicidad molesta ni compras integradas.  
> 4. **«Desarrollo Profesional por Echomaii Corp»**: Código limpio, modular, versionado en GitHub y preparado para publicar en Google Play Store si se desea en el futuro.
