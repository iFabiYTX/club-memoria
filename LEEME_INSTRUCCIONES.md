# Club Memoria — Guía Rápida de Uso y Despliegue Gratuito

**Desarrollado por:** Echomaii Corp  
**Para:** Chio  
**Versión:** 1.0 (PWA Interactiva Completa)  

---

## 🚀 1. Cómo probar la aplicación en tu computadora AHORA

Tienes dos opciones muy sencillas:

### Opción A (La más rápida):
Simplemente haz **doble clic en el archivo `index.html`** dentro de esta carpeta. Se abrirá de inmediato en tu navegador habitual (Chrome, Edge, etc.).

### Opción B (Con servidor local para probar en tu celular por Wi-Fi):
1. Abre una terminal en esta carpeta.
2. Ejecuta:
   ```bash
   python -m http.server 8000
   ```
3. Abre en tu navegador `http://localhost:8000`.
4. Para abrirlo en el celular de Chio (si están en la misma red Wi-Fi):
   - Averigua la IP local de tu PC (con `ipconfig`, ej: `192.168.1.15`).
   - En el celular de Chio, abre en Chrome o Safari: `http://192.168.1.15:8000`.

---

## 🌐 2. Cómo publicarla en Internet GRATIS para que Chio la use siempre

La aplicación está lista para funcionar como una **PWA (Progressive Web App)** sin costo de mantenimiento:

### Método 1: Vercel o Netlify (Recomendado — En 1 minuto)
1. Ve a [vercel.com](https://vercel.com) o [netlify.com](https://netlify.com) (cuentas gratuitas).
2. Arrastra y suelta esta carpeta `app chio` en su panel.
3. Te generará un enlace público seguro (ejemplo: `https://club-memoria.vercel.app`).
4. Pásale ese enlace a Chio por WhatsApp.

### Método 2: GitHub Pages (100% Gratis)
1. Sube estos archivos a un repositorio de GitHub (ej. `club-memoria`).
2. En GitHub ve a **Settings > Pages** y activa la rama `main`.
3. Tu enlace quedará disponible en `https://tu-usuario.github.io/club-memoria`.

---

## 📱 3. Cómo instalarla en el celular de Chio (Como si fuera de la tienda)

Cuando Chio abra el enlace web en su teléfono:

- **En Android (Chrome):**
  Tocar los 3 puntos de la esquina superior y seleccionar **«Agregar a la pantalla principal»** o **«Instalar aplicación»**.
- **En iPhone / iPad (Safari):**
  Tocar el botón de compartir (el cuadrado con la flecha hacia arriba) y elegir **«Agregar al inicio»**.

Aparecerá el ícono de **Club Memoria** en la pantalla de su celular, abriéndose en pantalla completa sin barras de navegador, sin anuncios y funcionando incluso sin conexión a internet.
