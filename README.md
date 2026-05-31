# Cátedra Tercera Edad y Vejez — UBA

**Sitio web oficial** de la Cátedra de Tercera Edad y Vejez de la Facultad de Psicología, Universidad de Buenos Aires.
Dirigida por el Dr. Ricardo Iacub.

- URL: https://catedraterceraedadyvejez.psi.uba.ar/
- Repositorio: https://github.com/IanGorski/Web-Catedra-Vejez
- Contacto: catedraterceraedadyvejez@gmail.com
- Instagram: @terceraedadyvejezuba
- YouTube: @catedraterceraedadyvejez

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 19.2.5 + TypeScript 6.0.3 (modo estricto) |
| Build tool | Vite 8.0.10 |
| Estilos | CSS puro con custom properties (sin framework) |
| i18n | LangProvider + LangContext (ES / EN) |
| Formularios | Formspree AJAX + hook personalizado |
| Analítica | Google Analytics 4 (GA4) |
| Testing unitario | Vitest 4.1.5 + Testing Library (11 archivos, jsdom) |
| Testing e2e | Playwright 1.60.0 (2 specs) |
| Compresión | vite-plugin-compression |

---

## Estructura del proyecto

```
catedra-vejez/
├── public/
│   ├── robots.txt
│   ├── _headers
│   └── img/
│       ├── Isologo/          # Logo oficial
│       └── galeria/          # Fotos de jornadas
│
├── src/
│   ├── sections/             # Secciones principales
│   │   ├── Banner.tsx
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Audiencias.tsx
│   │   ├── Stats.tsx
│   │   ├── Hub.tsx           # Hub central con 14 paneles lazy
│   │   ├── Contacto.tsx
│   │   └── Footer.tsx
│   │
│   ├── sections/             # Secciones del Hub (lazy-loaded)
│   │   ├── Nosotros.tsx
│   │   ├── Equipo.tsx
│   │   ├── Investigacion.tsx
│   │   ├── Publicaciones.tsx
│   │   ├── Prensa.tsx
│   │   ├── Estudiantes.tsx
│   │   ├── Posgrado.tsx
│   │   ├── Recursos.tsx
│   │   ├── Clinica.tsx
│   │   ├── Noticias.tsx
│   │   ├── Agenda.tsx
│   │   ├── Galeria.tsx
│   │   ├── Testimonios.tsx
│   │   └── FAQ.tsx
│   │
│   ├── components/           # Componentes reutilizables
│   │   ├── ui.tsx            # BackToTop y primitivas UI
│   │   ├── Modal.tsx
│   │   ├── FontSizeControls.tsx
│   │   ├── InstitucionalBadge.tsx
│   │   ├── LangProvider.tsx
│   │   ├── LangSwitcher.tsx
│   │   └── WhatsAppButton.tsx
│   │
│   ├── hooks/
│   │   ├── useForm.ts        # AJAX + validación + honeypot
│   │   ├── useTheme.ts       # Dark/light + localStorage
│   │   ├── useLang.ts        # Contexto de idioma
│   │   └── useAnimateOnScroll.ts
│   │
│   ├── data/
│   │   ├── i18n.ts           # Textos ES / EN
│   │   └── content.ts        # Publicaciones, FAQ, etc.
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── __tests__/            # Tests unitarios (7 archivos)
│   ├── App.tsx               # Layout principal
│   └── main.tsx
│
├── tests/                    # Tests de integración (4 archivos)
│   └── e2e/                  # Tests Playwright (2 specs)
│       ├── full-site-smoke.spec.ts
│       └── mobile-navigation.spec.ts
│
├── index.html                # GA4 + CSP + OG/Twitter meta + splash
├── vite.config.ts            # Alias @/, manualChunks React
└── package.json
```

---

## Secciones del sitio

### Página principal

| Sección | Descripción |
|---------|-------------|
| Banner | Barra informativa dismissible (se oculta y no vuelve a aparecer) |
| Navbar | Menú principal, toggle dark/light, selector de idioma, sección activa |
| Hero | Portada con aurora animada, embers, lema, pilares y botones de acción |
| Audiencias | 3 tarjetas: Estudiantes, Profesionales, Adultos mayores |
| Stats | Contadores animados (años, estudiantes, publicaciones) |
| Hub | 14 secciones de contenido en paneles emergentes (lazy-loaded) |
| Contacto | Formulario general de contacto |
| Footer | 4 columnas: marca, mapa del sitio, servicios, redes sociales |

### Hub — 14 secciones (paneles slide-over)

| Sección | Descripción |
|---------|-------------|
| Quiénes somos | Dr. Iacub, lema, 5 pilares de trabajo |
| Equipo | Cuerpo docente con cargos |
| Investigación | Líneas de investigación activas |
| Publicaciones | Producción académica por año y tipo |
| Prensa y Medios | Apariciones en medios + formulario de prensa |
| Materia de Grado | Campus virtual, bibliografía, prácticas, form. tutorías |
| Posgrado | Programa de Actualización + Diplomatura |
| Recursos | Materiales descargables |
| Cartilla Clínica | Formulario de derivación clínica |
| Noticias | Novedades con filtros por categoría |
| Agenda | Próximas actividades y eventos |
| Galería | Fotos de jornadas y actividades |
| Testimonios | Experiencias en formato burbuja de chat |
| FAQ | Preguntas frecuentes en acordeón (dos columnas) |

---

## Componentes flotantes

| Componente | Descripción |
|------------|-------------|
| `BackToTop` (en `ui.tsx`) | Botón "Volver arriba" que aparece al hacer scroll |
| `WhatsAppButton` | Botón FAB directo a WhatsApp (nro: 5491156215140) |
| `FontSizeControls` | 3 niveles: 100%, 115%, 130% (guardado en localStorage) |
| `InstitucionalBadge` | Drawer con datos institucionales (dirección, email, etc.) |
| `Modal` | Modal reutilizable con trap de foco y cierre por Escape |
| `LangProvider` | Proveedor de contexto de idioma (ES / EN) |
| `LangSwitcher` | Botón toggle para cambiar idioma |

---

## Formularios y destinos

| Formulario | Sección | Destinatario |
|------------|---------|-------------|
| Contacto general | Contacto | catedraterceraedadyvejez@gmail.com |
| Cartilla Clínica | Hub / Clínica | catedraenredes@gmail.com |
| Tutorías de Tesis | Hub / Estudiantes | JTP Mariana Mansinho |
| Consultas de Prensa | Hub / Prensa | catedraterceraedadyvejez@gmail.com |

Todos los formularios usan:
- **Formspree AJAX** (sin redirección de página)
- **Hook `useForm`** con validación de campos y formato
- **Honeypot** antispam
- **Toast** de confirmación o error al enviar

---

## Analítica y SEO

- **Google Analytics 4:** ID `G-X10KNJ3HP9` en `index.html`
- **Canonical URL:** `https://catedraterceraedadyvejez.psi.uba.ar/`
- **Open Graph / Twitter Card:** meta tags para preview en redes
  - `og:title`, `og:description`, `og:image`, `og:locale: es_AR`, `og:site_name`
  - Twitter: `summary_large_image`
- **robots.txt:** en `/public`
- **Theme color:** `#E8916A`
- **Fuentes:** Inter y Lora (Google Fonts, preconnect)

---

## Seguridad

- **Content Security Policy (CSP):** meta tag en `index.html`
- Permite: Formspree, Google Analytics, fuentes propias
- **Honeypot** en todos los formularios
- Sin dependencias externas de CSS (sin Bootstrap, sin Tailwind)

---

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview

# Ejecutar los tests unitarios (watch mode)
npm test

# Ejecutar los tests unitarios (una sola vez)
npm run test:run

# Cobertura de tests
npm run coverage

# Tests e2e con Playwright
npm run test:e2e

# Tests e2e con navegador visible
npm run test:e2e:headed
```

---

## Variables / configuración relevante

| Parámetro | Valor |
|-----------|-------|
| Puerto dev | 5173 |
| Alias `@/` | `src/` |
| Google Analytics ID | `G-X10KNJ3HP9` |
| Canonical URL | `https://catedraterceraedadyvejez.psi.uba.ar/` |
| WhatsApp | `5491156215140` |
| Hosts permitidos (dev) | `*.ngrok-free.app` |
| Chunk separado | React + React-DOM (`manualChunks`) |

---

## Paleta de colores

| Nombre | Variable CSS | Hex |
|--------|-------------|-----|
| Salmón Pantone 16-1542 | `--color-primary` | #E8916A |
| Amarillo Primrose Pantone 13-0755 | `--color-accent` | #EDDF52 |

---

## Pendientes para el lanzamiento

| # | Qué falta | Estado | Responsable |
|---|-----------|--------|-------------|
| 1 | Deploy en Vercel | ✅ Listo | Desarrollador |
| 2 | Dominio definitivo | ✅ Definido | Cliente |
| 3 | Fotos para galería (mínimo 6) | ⏳ Pendiente | Cliente |
| 4 | PDF Cartilla Clínica | ⏳ Pendiente | Cliente |
| 5 | Datos reales del equipo docente | ⏳ Pendiente | Cliente |
| 6 | Publicaciones reales (autores, año, DOI) | ⏳ Pendiente | Cliente |
| 7 | Noticias y agenda reales | ⏳ Pendiente | Cliente |
| 8 | Imagen para compartir en redes (1200×630 px) | ⏳ Pendiente | Cliente |
| 9 | Prueba end-to-end de formularios en producción | ⏳ Pendiente | Desarrollador |
| 10 | Prueba en dispositivos iOS y Android | ⏳ Pendiente | Desarrollador |

---

## Créditos

Sitio desarrollado para la **Cátedra de Tercera Edad y Vejez**, Facultad de Psicología, UBA.
