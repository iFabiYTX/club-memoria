import os
import sys
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, HRFlowable, ListFlowable, ListItem
)
from reportlab.pdfgen import canvas

# ========================================================
# PALETA DE COLORES OFICIAL DE CLUB MEMORIA
# ========================================================
PRIMARY = colors.HexColor('#2B6E62')     # Verde Esmeralda / Pino
PRIMARY_DARK = colors.HexColor('#1B473F')# Verde Oscuro
PRIMARY_LIGHT = colors.HexColor('#E8F4F2')# Fondo suave verde
ACCENT = colors.HexColor('#D97706')      # Ámbar / Dorado
ACCENT_LIGHT = colors.HexColor('#FEF3C7')# Fondo suave dorado
DARK_TEXT = colors.HexColor('#1F2937')   # Texto principal
MUTED_TEXT = colors.HexColor('#4B5563')  # Texto secundario
BORDER_COLOR = colors.HexColor('#D1D5DB')# Bordes sutiles
BG_PARCHMENT = colors.HexColor('#F7F5EE')# Fondo cálido
BG_CARD = colors.HexColor('#F9FAFB')     # Fondo de tarjetas
WHITE = colors.HexColor('#FFFFFF')
SUCCESS = colors.HexColor('#10B981')

# ========================================================
# CANVAS CON NUMERACIÓN DE PÁGINAS DINÁMICA
# ========================================================
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, total_pages):
        self.saveState()
        page_w, page_h = A4

        # Encabezado (a partir de la página 2)
        if self._pageNumber > 1:
            self.setStrokeColor(BORDER_COLOR)
            self.setLineWidth(0.75)
            self.line(40, page_h - 40, page_w - 40, page_h - 40)
            
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(PRIMARY)
            self.drawString(40, page_h - 34, "CLUB MEMORIA")
            
            self.setFont("Helvetica", 8)
            self.setFillColor(MUTED_TEXT)
            self.drawString(110, page_h - 34, "•  Informe de Arquitectura, Desarrollo y Funcionalidad")
            
            self.drawRightString(page_w - 40, page_h - 34, "Echomaii Corp  |  Para: Chio")

        # Pie de página (en todas las páginas)
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.75)
        self.line(40, 42, page_w - 40, 42)

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(PRIMARY)
        self.drawString(40, 30, "Club Memoria v1.0")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(MUTED_TEXT)
        self.drawString(115, 30, "•  Documento Técnico y Explicativo Oficial  •  Confidencial y de Libre Consulta")

        page_str = f"Página {self._pageNumber} de {total_pages}"
        self.drawRightString(page_w - 40, 30, page_str)

        self.restoreState()

# ========================================================
# GENERADOR DEL INFORME
# ========================================================
def generate_pdf(filename="INFORME_TECNICO_CLUB_MEMORIA.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=52,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Estilos Tipográficos Personalizados
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=PRIMARY_DARK,
        spaceAfter=4
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=MUTED_TEXT,
        spaceAfter=12
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=PRIMARY_DARK,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=PRIMARY,
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=DARK_TEXT,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    callout_text = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=DARK_TEXT
    )

    badge_style = ParagraphStyle(
        'Badge',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=WHITE
    )

    story = []
    page_w, page_h = A4
    content_w = page_w - 80 # 595.27 - 80 = 515.27 pt

    # ========================================================
    # PORTADA / ENCABEZADO PRINCIPAL CON LOGO
    # ========================================================
    icon_path = "icon-192.png"
    icon_flowable = None
    if os.path.exists(icon_path):
        icon_flowable = Image(icon_path, width=54, height=54)

    header_data = [
        [
            icon_flowable if icon_flowable else Paragraph("🧠", title_style),
            [
                Paragraph("CLUB MEMORIA", title_style),
                Paragraph("<b>Dossier Técnico y Funcional de la Aplicación</b> — Estimulación Cognitiva y Motriz para Adultos Mayores", subtitle_style),
                Paragraph("<b>Desarrollado por:</b> Echomaii Corp  |  <b>Promotora y Diseñadora del Proyecto:</b> Chio  |  <b>Versión:</b> 1.0 Oficial", ParagraphStyle('SubSub', fontName='Helvetica', fontSize=8, textColor=PRIMARY))
            ]
        ]
    ]

    header_table = Table(header_data, colWidths=[65, content_w - 65])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceBefore=4, spaceAfter=10))

    # ========================================================
    # CUADRO DESTACADO: LA PREGUNTA CENTRAL DE CHIO
    # ========================================================
    faq_box_data = [[
        Paragraph(
            "<b>💡 ¿CÓMO RESPONDER CUANDO PREGUNTEN: «¿ES UNA PÁGINA WEB O UNA APLICACIÓN MÓVIL?»</b><br/><br/>"
            "La respuesta exacta y profesional es: <b>«Es ambas cosas a la vez, gracias a una arquitectura híbrida moderna (PWA + APK Nativo)».</b><br/>"
            "• <b>Como Página Web (PWA):</b> Se puede abrir al instante desde cualquier navegador (Chrome, Safari) sin descargas pesadas mediante el enlace web oficial.<br/>"
            "• <b>Como Aplicación Móvil (APK):</b> Se empaquetó e instaló como una aplicación nativa real de Android (.apk) que vive en el celular con su propio icono, pantalla completa y <b>100% libre de internet</b> (no consume datos móviles ni requiere Wi-Fi para jugar).<br/>"
            "• <b>Costo Operativo:</b> Cero pesos ($0 USD). No requiere servidores de pago ni mensualidades.",
            callout_text
        )
    ]]
    faq_table = Table(faq_box_data, colWidths=[content_w])
    faq_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), PRIMARY_LIGHT),
        ('BOX', (0,0), (-1,-1), 1.5, PRIMARY),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(faq_table)
    story.append(Spacer(1, 10))

    # ========================================================
    # 1. FICHA TÉCNICA RESUMEN
    # ========================================================
    story.append(Paragraph("1. Ficha Técnica del Proyecto", h1_style))
    
    spec_data = [
        [Paragraph("<b>Parámetro</b>", body_bold), Paragraph("<b>Detalle de Implementación</b>", body_bold)],
        [Paragraph("Nombre Oficial", body_style), Paragraph("<b>Club Memoria</b>", body_style)],
        [Paragraph("Público Objetivo", body_style), Paragraph("Adultos mayores y personas en programas de estimulación cognitiva y psicomotriz preventiva.", body_style)],
        [Paragraph("Empresa Desarrolladora", body_style), Paragraph("<b>Echomaii Corp</b> (para Chio)", body_style)],
        [Paragraph("Tipo de Software", body_style), Paragraph("Híbrido: PWA (Progressive Web App) + APK Nativo Android empaquetado vía Capacitor.", body_style)],
        [Paragraph("Lenguajes Base", body_style), Paragraph("HTML5 Semántico, CSS3 Responsivo Mobile-First, JavaScript Moderno (ES6+ modular).", body_style)],
        [Paragraph("Motor de Audio", body_style), Paragraph("Web Audio API nativo (síntesis de frecuencias en tiempo real, sin archivos de audio pesados).", body_style)],
        [Paragraph("Almacenamiento Local", body_style), Paragraph("HTML5 LocalStorage (persistencia de estrellas, récord de niveles, personalización de usuario).", body_style)],
        [Paragraph("Funcionamiento Offline", body_style), Paragraph("Service Worker (Cache API v3) — 100% operativo sin cobertura de red.", body_style)],
        [Paragraph("Repositorio de Código", body_style), Paragraph("https://github.com/iFabiYTX/club-memoria", body_style)],
        [Paragraph("Acceso Web en Vivo", body_style), Paragraph("https://ifabiytx.github.io/club-memoria/", body_style)],
        [Paragraph("Instalador Móvil Directo", body_style), Paragraph("Club-Memoria-v1.0.apk (3.68 MB en GitHub Releases)", body_style)]
    ]

    spec_table = Table(spec_data, colWidths=[130, content_w - 130])
    spec_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_LIGHT),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(spec_table)
    story.append(Spacer(1, 10))

    # ========================================================
    # 2. LOS 4 JUEGOS COGNITIVOS Y SU ENFOQUE NEUROPSICOLÓGICO
    # ========================================================
    story.append(Paragraph("2. Actividades Cognitivas Desarrolladas", h1_style))
    story.append(Paragraph(
        "Cada ejercicio fue programado desde cero con criterios gerontológicos específicos, evitando temporizadores con cuenta regresiva estresantes y privilegiando la paciencia, el refuerzo positivo y la motricidad fina adaptada:",
        body_style
    ))

    activities = [
        (
            "🧩 Rompecabezas Progresivo (100 Niveles - Estilo Candy Crush)",
            "• <b>Estructura:</b> 100 niveles distribuidos en 4 fases temáticas (🌸 Flores 1-25, 🐶 Animales 26-50, 🏞️ Paisajes 51-75, 🎨 Arte 76-100).<br/>"
            "• <b>Interfaz:</b> Camino sinuoso tipo Candy Crush con fondo decorado, hito por fase y botón de nivel activo animado.<br/>"
            "• <b>Mecánica:</b> Tablero de intercambio de piezas ilustradas con guía numérica discreta (badges) para facilitar la resolución sin tapar la ilustración.<br/>"
            "• <b>Habilidades estimuladas:</b> Coordinación visomotora, praxias constructivas, paciencia y orientación espacial."
        ),
        (
            "🔢 Sudoku 9x9 Profesional con Vidas",
            "• <b>Estructura:</b> Tablero completo de 9x9 generado matemáticamente con backtracking para garantizar solución única válida.<br/>"
            "• <b>Dificultades:</b> 4 niveles ajustados por densidad de pistas (Fácil: 46 pistas, Medio: 36 pistas, Avanzado: 28 pistas, Extremo: 22 pistas).<br/>"
            "• <b>Sistema de Vidas:</b> 3 corazones exclusivos para Sudoku. Los errores descuentan un corazón y activan una vibración visual sin penalizar al usuario en el resto de la app.<br/>"
            "• <b>Control Táctil:</b> Teclado numérico gigante en dos filas (1-5 y 6-9 + borrador) pensado para dedos mayores.<br/>"
            "• <b>Habilidades estimuladas:</b> Razonamiento numérico lógico, memoria de trabajo y flexibilidad cognitiva."
        ),
        (
            "🔍 Sopa de Letras Táctil (Swipe / Deslizamiento del Dedo)",
            "• <b>Doble Modalidad:</b> Fácil (10x10 solo horizontal/vertical) y Difícil (12x12 multi-direccional y diagonal).<br/>"
            "• <b>Control Gestual Táctil:</b> Permite seleccionar arrastrando el dedo sobre la pantalla con resaltado dorado en tiempo real, o tocar primera y última letra (accesibilidad para temblores motrices).<br/>"
            "• <b>Temáticas Enriquecidas:</b> Frutas Saludables, Flores y Jardinería, Lugares y Ciudades.<br/>"
            "• <b>Habilidades estimuladas:</b> Rastreo visual selectivo, atención sostenida y reconocimiento ortográfico de vocabulario."
        ),
        (
            "👀 Busca las 3 Diferencias (10 Niveles Ilustrados)",
            "• <b>Estructura:</b> 10 niveles con imágenes vectoriales SVG de alta definición completamente diferentes (Jardín, Playa, Salón con Gato, Cocina, Bosque, Puerto, Cerezos, Huerto, Noche Estrellada, Cumpleaños).<br/>"
            "• <b>Sensibilidad Táctil Accesible:</b> Zonas de toque ampliadas (radio 35 px) y círculos pulsantes en ambas imágenes al detectar un acierto.<br/>"
            "• <b>Progresión:</b> Barra selectora de 10 píldoras con marcas de verificación (✓) y tarjeta de victoria al completar cada escena.<br/>"
            "• <b>Habilidades estimuladas:</b> Agudeza visual comparativa, discriminación figura-fondo y memoria icónica."
        )
    ]

    for title, desc in activities:
        act_box = [
            [Paragraph(f"<b>{title}</b>", ParagraphStyle('ActTitle', fontName='Helvetica-Bold', fontSize=9.5, textColor=PRIMARY_DARK))],
            [Paragraph(desc, body_style)]
        ]
        t = Table(act_box, colWidths=[content_w])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), BG_CARD),
            ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
            ('TOPPADDING', (0,0), (-1,-1), 4),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t)
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 6))

    # ========================================================
    # 3. MÓDULOS DE ACOMPAÑAMIENTO: METACOGNICIÓN Y SALÓN DE HONOR
    # ========================================================
    story.append(Paragraph("3. Metacognición, Bienestar y Gamificación Positiva", h1_style))
    story.append(Paragraph(
        "Más allá de los juegos, la aplicación incorpora dos pilares formativos esenciales para adultos mayores:",
        body_style
    ))

    meta_items = [
        [
            Paragraph("<b>❤️ Módulo de Metacognición («¿Cómo te sentiste hoy?»)</b>", body_bold),
            Paragraph(
                "Al culminar cualquier juego, se presenta una pantalla de chequeo emocional donde el usuario elige entre tres opciones ilustradas: <i>«Con energía»</i>, <i>«Tranquilo»</i> o <i>«Un poco cansado»</i>. "
                "La app responde con un mensaje afectivo personalizado (por ejemplo, sugiriendo hidratarse y descansar la vista) y avanza suavemente tras 2.2 segundos para evitar desorientación o bloqueos.",
                body_style
            )
        ],
        [
            Paragraph("<b>🏆 Salón de Honor y Logros Semanales</b>", body_bold),
            Paragraph(
                "Cada victoria otorga +2 estrellas doradas (⭐). El usuario cuenta con su propio nombre editable, un podio de honor visual (oro, plata, bronce) con compañeros amigables de práctica y un calendario semanal con marcas que celebran la constancia y disciplina cognitiva sin castigar los días sin juego.",
                body_style
            )
        ]
    ]
    meta_table = Table(meta_items, colWidths=[150, content_w - 150])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), WHITE),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # ========================================================
    # 4. ARQUITECTURA TÉCNICA E IMPLEMENTACIÓN
    # ========================================================
    story.append(Paragraph("4. Arquitectura de Software y Despliegue en la Nube", h1_style))
    story.append(Paragraph(
        "A continuación se detalla cómo se estructuró la solución técnica para lograr máxima velocidad, cero costo y doble modalidad (Web + APK):",
        body_style
    ))

    tech_points = [
        ("Cero Costo de Infraestructura ($0 USD):", "No requiere servidores backend dedicados, bases de datos SQL de pago ni servicios en la nube facturables. Toda la lógica de generación matemática (Sudoku, sopas de letras, cálculo vectorial) corre en el propio dispositivo del usuario."),
        ("PWA (Progressive Web App) y Modo Offline:", "Utiliza un <code>Service Worker</code> registrado (Cache v3) que descarga y almacena en caché todos los activos (código, imágenes, hojas de estilo). Una vez abierta por primera vez, <b>la aplicación funciona sin necesidad de conexión a internet</b>."),
        ("Sonidos Generados por Código (Web Audio API):", "Para mantener la aplicación ultra-ligera (menos de 4 megabytes), todos los efectos sonoros (clics suaves, arpegios de victoria, acordes de campana) se sintetizan en tiempo real mediante osciladores matemáticos, evitando descargar archivos MP3 pesados."),
        ("Empaquetado Nativo con Capacitor:", "Se utilizó la tecnología de vanguardia <code>@capacitor/core</code> y <code>@capacitor/android</code> para encapsular la interfaz web en una aplicación Android nativa real (WebView de alto rendimiento)."),
        ("Compilación Automatizada en la Nube (GitHub Actions):", "Se programó un flujo de trabajo CI/CD en <code>.github/workflows/build-apk.yml</code>. Cada vez que se actualiza el código, servidores en la nube de GitHub con Linux Ubuntu, Java 17 Temurin y Android SDK compilan automáticamente el archivo <code>Club-Memoria-v1.0.apk</code>.")
    ]

    for p_title, p_desc in tech_points:
        p_row = [
            [Paragraph(f"<b>• {p_title}</b> {p_desc}", body_style)]
        ]
        pt = Table(p_row, colWidths=[content_w])
        pt.setStyle(TableStyle([
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 4),
            ('TOPPADDING', (0,0), (-1,-1), 1),
            ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ]))
        story.append(pt)

    story.append(Spacer(1, 10))

    # ========================================================
    # 5. GUÍA RÁPIDA PARA EXPLICAR Y COMPARTIR EL PROYECTO
    # ========================================================
    story.append(Paragraph("5. Resumen Ejecutivo para Explicar a Evaluadores o Familias", h1_style))

    summary_box_data = [
        [
            Paragraph(
                "<b>📌 ARGUMENTOS CLAVE PARA CHIO:</b><br/>"
                "1. <b>«No es un enlace web común, es una aplicación multiplataforma»:</b> Se puede usar desde cualquier navegador web en computadoras y tablets, pero también se instala como App en teléfonos Android mediante archivo .APK.<br/>"
                "2. <b>«No gasta internet de los abuelos»:</b> Funciona 100% offline tras su instalación, protegiendo los planes de datos móviles.<br/>"
                "3. <b>«Diseño Gerontológico Real»:</b> Letras grandes, colores de alto contraste, áreas de toque de más de 48px y sin publicidad molesta ni compras integradas.<br/>"
                "4. <b>«Desarrollo Profesional por Echomaii Corp»:</b> Código limpio, modular, versionado en GitHub y preparado para escalar a Google Play Store si se desea en el futuro.",
                callout_text
            )
        ]
    ]
    summary_table = Table(summary_box_data, colWidths=[content_w])
    summary_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), ACCENT_LIGHT),
        ('BOX', (0,0), (-1,-1), 1.2, ACCENT),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(summary_table)

    # Generar el documento
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generado con éxito: {filename} ({os.path.getsize(filename)} bytes)")

if __name__ == '__main__':
    generate_pdf()
