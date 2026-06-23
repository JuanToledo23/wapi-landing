# wapi.mx — Landing page

Landing estática para Wapi (SPEC-001). Astro + Tailwind CSS v4 + GSAP/ScrollTrigger + Lenis.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/ (HTML estático)
npm run preview  # sirve dist/ localmente
```

## Stack

- **Astro 5** — HTML estático.
- **Tailwind CSS v4** — vía `@tailwindcss/vite`. Tokens de diseño en `src/styles/global.css` (`@theme`).
- **GSAP + ScrollTrigger** — entradas por scroll (`.reveal` y `[data-reveal-group]`), cargado por CDN.
- **Lenis** — smooth scroll, inicializado en `src/layouts/Layout.astro`.
- **Animación del chat (hero)** — CSS keyframes puros (`src/components/Hero.astro`).
- **Vercel Analytics** — `inject()` en el layout.

### Patrón de animación de scroll
- Añade `class="reveal"` a un elemento para animarlo al entrar al viewport.
- Envuelve varios `.reveal` en `[data-reveal-group]` para escalonarlos; ajusta el delay con
  `data-reveal-stagger="0.2"`.
- Respeta `prefers-reduced-motion` y degrada sin JS (todo se muestra).

## ⚠️ Pendientes antes de lanzar

1. **Número de WhatsApp** — reemplazar `521XXXXXXXXXX` en `src/consts.ts` (`WHATSAPP_NUMBER`).
   Alimenta los 6 CTAs.
2. **Precios** — confirmar `$1,490` y `$2,490 MXN/mes` en `src/components/Precios.astro`.
3. **Páginas legales** — crear `/terminos` y `/privacidad`, luego activar los links del footer
   (`src/components/Footer.astro`, hoy apuntan a `#`).
4. **Agente entrenado** — verificar que el agente responde en el número configurado.
5. **Deploy** — conectar el repo a Vercel; dominio `wapi.mx`. Output estático, sin adapter.
6. **QA** — Lighthouse ≥90 (Performance/Accessibility/SEO), iOS Safari y Android Chrome.

## Estructura

```
src/
├── layouts/Layout.astro      # meta/SEO, fuentes, Lenis, GSAP, analytics
├── pages/index.astro
├── components/               # Navbar, Hero, Problema, ComoFunciona, AgenteIA,
│                             # Features, Precios, ParaQuienEs, CTAFinal, Footer,
│                             # WhatsAppButton (reutilizable)
├── assets/                   # logo-horizontal, logo-icono, onda-w
├── styles/global.css         # tokens (@theme), reset, .btn-whatsapp
└── consts.ts                 # WHATSAPP_URL y metadatos del sitio
```
