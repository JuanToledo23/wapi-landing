# Análisis de Contexto — wapi-landing

Proyecto **Astro 5 + Tailwind v4**. Landing page de Wapi (bandeja unificada de WhatsApp/Instagram/Messenger con agente de IA).

> **Notas para el agente que recibe este contexto:**
> - **No existe `tailwind.config.*`** — es Tailwind v4, cuya configuración de tokens vive dentro del bloque `@theme` de `src/styles/global.css`.
> - Los componentes importan de `src/consts.ts` (`SITE`, `WHATSAPP_URL`). Ese archivo existe en el árbol pero su contenido no fue solicitado en el dump original (ver sección al final).

---

## 1. Árbol de archivos

Excluye `node_modules`, `.git`, `dist`, `.astro`.

```
.
./.DS_Store
./.gitignore
./README.md
./astro.config.mjs
./package-lock.json
./package.json
./public/favicon.svg
./src/.DS_Store
./src/assets/logo-horizontal.svg
./src/assets/logo-icono.svg
./src/assets/onda-w.svg
./src/components/AgenteIA.astro
./src/components/CTAFinal.astro
./src/components/ComoFunciona.astro
./src/components/Features.astro
./src/components/Footer.astro
./src/components/Hero.astro
./src/components/Navbar.astro
./src/components/ParaQuienEs.astro
./src/components/Precios.astro
./src/components/Problema.astro
./src/components/WhatsAppButton.astro
./src/consts.ts
./src/layouts/Layout.astro
./src/pages/index.astro
./src/styles/global.css
./tsconfig.json
```

---

## 2. Tailwind config

No existe `tailwind.config.*` — Tailwind v4, config vía `@theme` en `src/styles/global.css` (ver sección 4).

---

## 3. `astro.config.mjs`

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://wapi.mx',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

---

## 4. `src/styles/global.css`

```css
@import 'tailwindcss';

/* ---------------------------------------------------------------------------
   Design tokens — registered with Tailwind v4 so utilities like bg-bg,
   text-primary, font-display are generated automatically.
--------------------------------------------------------------------------- */
@theme {
  /* Primarios */
  --color-primary: #f2542d;
  --color-primary-dark: #d4400f;
  --color-primary-light: #ffd0bf;
  --color-primary-xlight: #fff3ef;

  /* Fondos */
  --color-bg: #0f1117;
  --color-surface: #1a1d27;

  /* Texto */
  --color-text: #eef2ff;
  --color-text-secondary: #8893b0;

  /* Neutros */
  --color-white: #ffffff;
  --color-gray-light: #f9fafb;
  --color-border: #e5e7eb;

  /* Tipografía */
  --font-display: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Easing "spring" tipo Linear/Vercel */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ---------------------------------------------------------------------------
   Reset + base
--------------------------------------------------------------------------- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
}

/* Lenis handles smooth scroll; disable native when Lenis is active */
html.lenis,
html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-stopped {
  overflow: hidden;
}

body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: 400;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-display);
  line-height: 1.1;
  margin: 0;
  text-wrap: balance;
}

p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

img,
svg {
  display: block;
  max-width: 100%;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ---------------------------------------------------------------------------
   Helpers de layout
--------------------------------------------------------------------------- */
.container {
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 24px;
}

.section {
  padding-block: clamp(64px, 10vw, 128px);
}

/* ---------------------------------------------------------------------------
   Botón WhatsApp / CTA
--------------------------------------------------------------------------- */
.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  border-radius: 8px;
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border: none;
  text-align: center;
  line-height: 1.3;
  transition: all 0.2s ease;
  will-change: transform;
}

.btn-whatsapp:hover {
  box-shadow: 0 0 24px rgba(242, 84, 45, 0.4);
  transform: translateY(-1px);
}

.btn-whatsapp svg {
  width: 20px;
  height: 20px;
}

/* Variante inversa (CTA final con fondo naranja) */
.btn-whatsapp--invert {
  background: var(--color-white);
  color: var(--color-primary);
}
.btn-whatsapp--invert:hover {
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.45);
}

/* ---------------------------------------------------------------------------
   Reveal (estado inicial antes de que GSAP tome el control).
   Si JS está desactivado o reduce-motion está activo, se muestran igual.
--------------------------------------------------------------------------- */
.reveal {
  opacity: 0;
}
.gsap-ready .reveal {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Fallback: si no hay JS, no dejar contenido invisible */
.no-js .reveal {
  opacity: 1 !important;
}
```

---

## 5. `src/pages/index.astro`

```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Hero from '../components/Hero.astro';
import Problema from '../components/Problema.astro';
import ComoFunciona from '../components/ComoFunciona.astro';
import AgenteIA from '../components/AgenteIA.astro';
import Features from '../components/Features.astro';
import Precios from '../components/Precios.astro';
import ParaQuienEs from '../components/ParaQuienEs.astro';
import CTAFinal from '../components/CTAFinal.astro';
import Footer from '../components/Footer.astro';
---

<Layout>
  <Navbar />
  <main>
    <Hero />
    <Problema />
    <ComoFunciona />
    <AgenteIA />
    <Features />
    <Precios />
    <ParaQuienEs />
    <CTAFinal />
  </main>
  <Footer />
</Layout>
```

---

## 6. `src/layouts/Layout.astro`

```astro
---
import '../styles/global.css';
import { SITE } from '../consts';

interface Props {
  title?: string;
  description?: string;
}

const { title = SITE.title, description = SITE.description } = Astro.props;
---

<!doctype html>
<html lang="es" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="generator" content={Astro.generator} />

    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={SITE.url} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <!-- Open Graph -->
    <meta property="og:title" content={title} />
    <meta
      property="og:description"
      content="Concentra WhatsApp, Instagram y Messenger con un agente de IA que conoce tu negocio."
    />
    <meta property="og:url" content={SITE.url} />
    <meta property="og:type" content="website" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Wapi" />
    <meta
      name="twitter:description"
      content="Todos los mensajes de tu negocio en un solo lugar."
    />

    <!-- Fuentes -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Inter:wght@400;500&display=swap"
      rel="stylesheet"
    />

    <!-- GSAP + ScrollTrigger (CDN, deferred para no bloquear el render) -->
    <script
      is:inline
      defer
      src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
    ></script>
    <script
      is:inline
      defer
      src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"
    ></script>

    <!-- Marca <html> con js para revertir el fallback no-js -->
    <script is:inline>
      document.documentElement.classList.remove('no-js');
    </script>
  </head>
  <body>
    <slot />

    <script>
      import Lenis from 'lenis';
      import { inject } from '@vercel/analytics';

      inject();

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      // Espera a que GSAP (CDN) esté disponible, con timeout de seguridad.
      function waitForGsap(timeout = 4000): Promise<boolean> {
        return new Promise((resolve) => {
          const start = performance.now();
          (function check() {
            if ((window as any).gsap && (window as any).ScrollTrigger) {
              resolve(true);
            } else if (performance.now() - start > timeout) {
              resolve(false);
            } else {
              requestAnimationFrame(check);
            }
          })();
        });
      }

      function revealAllNow() {
        document
          .querySelectorAll<HTMLElement>('.reveal')
          .forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
          });
      }

      async function init() {
        // --- Lenis smooth scroll ---
        let lenis: Lenis | null = null;
        if (!reduceMotion) {
          lenis = new Lenis({ lerp: 0.1 });
        }

        const hasGsap = !reduceMotion && (await waitForGsap());

        if (!hasGsap) {
          // Sin GSAP (o reduce-motion): mostrar todo y mantener Lenis con RAF propio.
          revealAllNow();
          if (lenis) {
            const raf = (time: number) => {
              lenis!.raf(time);
              requestAnimationFrame(raf);
            };
            requestAnimationFrame(raf);
          }
          return;
        }

        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        document.documentElement.classList.add('gsap-ready');

        // Integración Lenis <-> GSAP ticker (forma recomendada).
        if (lenis) {
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add((time: number) => lenis!.raf(time * 1000));
          gsap.ticker.lagSmoothing(0);
        }

        // --- Reveals en grupo (stagger entre hijos) ---
        // Usamos fromTo: el estado final (opacity:1) se aplica como estilo
        // inline y gana sobre el `.reveal { opacity: 0 }` del CSS (anti-flash).
        document
          .querySelectorAll<HTMLElement>('[data-reveal-group]')
          .forEach((group) => {
            const children = group.querySelectorAll('.reveal');
            if (!children.length) return;
            const stagger = parseFloat(
              group.dataset.revealStagger || '0.15',
            );
            gsap.fromTo(
              children,
              { opacity: 0, y: 40, scale: 0.985 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: 'power3.out',
                stagger,
                scrollTrigger: { trigger: group, start: 'top 80%' },
              },
            );
          });

        // --- Reveals individuales (fuera de cualquier grupo) ---
        const standalone = Array.from(
          document.querySelectorAll<HTMLElement>('.reveal'),
        ).filter((el) => !el.closest('[data-reveal-group]'));

        standalone.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40, scale: 0.985 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%' },
            },
          );
        });

        ScrollTrigger.refresh();

        // Smooth-scroll para anclas internas vía Lenis.
        document
          .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
          .forEach((a) => {
            a.addEventListener('click', (e) => {
              const id = a.getAttribute('href');
              if (!id || id === '#') return;
              const target = document.querySelector(id);
              if (!target) return;
              e.preventDefault();
              if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -80 });
              else target.scrollIntoView({ behavior: 'smooth' });
            });
          });
      }

      init().catch((err) => {
        console.error('[wapi] init failed, revealing content', err);
        revealAllNow();
      });

      // Red de seguridad: solo si GSAP nunca llegó a inicializarse mostramos
      // todo. Si GSAP está activo, NO tocamos nada — los elementos bajo el fold
      // están en opacity:0 esperando su ScrollTrigger (revelarlos aquí causaba
      // un "parpadeo" al hacer scroll).
      setTimeout(() => {
        if (!document.documentElement.classList.contains('gsap-ready')) {
          revealAllNow();
        }
      }, 3000);
    </script>
  </body>
</html>
```

---

## 7. Componentes (`src/components/*`)

### `AgenteIA.astro`

```astro
---
import WhatsAppButton from './WhatsAppButton.astro';
---

<section class="agente">
  <div class="agente__inner">
    <h2 class="agente__titulo reveal">
      Como tu mejor empleado.<br />Pero disponible a las 3am.
    </h2>

    <div class="agente__lista" data-reveal-group data-reveal-stagger="0.15">
      <div class="argumento reveal">
        <p class="argumento__lead">Sabe todo lo que tú decides que sepa.</p>
        <p class="argumento__texto">
          Precios, servicios, políticas, excepciones, cómo manejar una queja. Si
          tu empleado lo sabría, el agente también.
        </p>
      </div>

      <div class="argumento reveal">
        <p class="argumento__lead">Responde como tú quieres que responda.</p>
        <p class="argumento__texto">
          Tono formal o cercano, con el nombre de tu negocio, con tu estilo. No
          suena a bot — suena a tu negocio.
        </p>
      </div>

      <div class="argumento reveal">
        <p class="argumento__lead">
          Cuando necesitas entrar, entras.<br />
          <span class="argumento__lead-sub"
            >Cuando el agente lo detecta, avisa.</span
          >
        </p>
        <p class="argumento__texto">
          Tu equipo puede tomar cualquier conversación en el momento que quiera.
          Y si el agente detecta que algo requiere atención humana, notifica de
          inmediato — con todo el contexto de la conversación listo.
        </p>
      </div>
    </div>

    <p class="agente__remate reveal">
      ¿Quieres ver cómo funciona para tu negocio? El agente de Wapi te está
      esperando ahorita.
    </p>
    <div class="agente__cta reveal">
      <WhatsAppButton text="Pregúntale al agente de Wapi" icon={true} />
    </div>
  </div>
</section>

<style>
  .agente {
    background: #0f1117;
    padding-block: clamp(80px, 12vw, 140px);
  }
  .agente__inner {
    max-width: 800px;
    margin-inline: auto;
    padding-inline: 24px;
  }

  .agente__titulo {
    font-weight: 800;
    font-size: clamp(36px, 6vw, 60px);
    line-height: 1.08;
    letter-spacing: -0.025em;
    text-align: center;
  }

  .agente__lista {
    margin-top: clamp(56px, 8vw, 80px);
    display: flex;
    flex-direction: column;
    gap: clamp(48px, 6vw, 56px);
  }

  .argumento__lead {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(22px, 3vw, 26px);
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }
  .argumento__lead-sub {
    font-size: 0.82em;
    color: var(--color-text-secondary);
  }
  .argumento__texto {
    margin-top: 14px;
    font-size: 17px;
    line-height: 1.6;
    color: var(--color-text-secondary);
    max-width: 60ch;
  }

  .agente__remate {
    margin-top: clamp(56px, 8vw, 80px);
    max-width: 32ch;
    margin-inline: auto;
    text-align: center;
    font-size: clamp(17px, 2.2vw, 19px);
    color: var(--color-text-secondary);
  }
  .agente__cta {
    margin-top: 28px;
    display: flex;
    justify-content: center;
  }
</style>
```

### `CTAFinal.astro`

```astro
---
import WhatsAppButton from './WhatsAppButton.astro';
---

<section class="ctafinal section">
  <div class="ctafinal__inner">
    <h2 class="ctafinal__titulo reveal">
      ¿Cuántos mensajes sin respuesta son demasiados?
    </h2>
    <p class="ctafinal__sub reveal">
      Habla con nuestro agente ahorita — él te explica cómo funciona Wapi para
      tu tipo de negocio y resuelve cualquier duda en este momento.
    </p>
    <div class="ctafinal__cta reveal">
      <WhatsAppButton
        text="Escríbenos por WhatsApp"
        variant="invert"
        icon={true}
      />
      <p class="ctafinal__nota">
        Es IA, no un humano. Y eso es exactamente lo que te ofrecemos.
      </p>
    </div>
  </div>
</section>

<style>
  .ctafinal {
    background: var(--color-primary);
  }
  .ctafinal__inner {
    max-width: 760px;
    margin-inline: auto;
    padding-inline: 24px;
    text-align: center;
  }
  .ctafinal__titulo {
    font-weight: 800;
    font-size: clamp(32px, 5vw, 48px);
    color: #fff;
    letter-spacing: -0.02em;
  }
  .ctafinal__sub {
    margin: 20px auto 0;
    max-width: 40em;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.85);
  }
  .ctafinal__cta {
    margin-top: 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .ctafinal__nota {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
  }
</style>
```

### `ComoFunciona.astro`

```astro
---
const pasos = [
  {
    num: '01',
    titulo: 'Lo configuramos juntos',
    texto:
      'Tu cuenta de WhatsApp, Instagram y Messenger es tuya — nosotros te ayudamos a verificar tu negocio ante Meta y a conectar todo. Si no tienes un número de WhatsApp para tu negocio, te decimos exactamente cómo conseguirlo. Tú no necesitas saber nada técnico.',
  },
  {
    num: '02',
    titulo: 'Tu negocio responde desde un solo lugar',
    texto:
      'Tú, tu equipo, o el agente de IA — todos desde la misma pantalla, sin mensajes perdidos. WhatsApp, Instagram y Messenger en una sola bandeja.',
  },
  {
    num: '03',
    titulo: 'Tú ves todo en tiempo real',
    texto:
      'Cada conversación, cada respuesta, cada cliente. Desde tu celular, a cualquier hora. Sin depender de que alguien te cuente cómo va el negocio.',
  },
];
---

<section id="como-funciona" class="comofunciona">
  <div class="comofunciona__inner">
    <h2 class="comofunciona__titulo reveal">
      Funciona desde el primer día.<br />Sin IT, sin complicaciones.
    </h2>

    <div class="pasos" data-reveal-group data-reveal-stagger="0.15">
      {
        pasos.map((p) => (
          <div class="paso reveal">
            <span class="paso__num" aria-hidden="true">
              {p.num}
            </span>
            <div class="paso__contenido">
              <h3 class="paso__titulo">{p.titulo}</h3>
              <p class="paso__texto">{p.texto}</p>
            </div>
          </div>
        ))
      }
    </div>
  </div>
</section>

<style>
  .comofunciona {
    background: #1a1d27;
    padding-block: clamp(80px, 12vw, 140px);
  }
  .comofunciona__inner {
    max-width: 800px;
    margin-inline: auto;
    padding-inline: 24px;
  }
  .comofunciona__titulo {
    font-weight: 700;
    font-size: clamp(28px, 4.4vw, 40px);
    letter-spacing: -0.01em;
    text-align: center;
  }

  /* Timeline vertical que conecta los tres pasos */
  .pasos {
    position: relative;
    margin-top: clamp(56px, 8vw, 80px);
    padding-left: 44px;
    display: flex;
    flex-direction: column;
    gap: clamp(56px, 8vw, 88px);
  }
  .pasos::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    bottom: 10px;
    width: 1px;
    background: rgba(255, 255, 255, 0.09);
  }

  .paso {
    position: relative;
  }

  /* Número gigante como textura de fondo */
  .paso__num {
    position: absolute;
    top: -0.4em;
    left: 4px;
    z-index: 0;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(120px, 19vw, 190px);
    line-height: 1;
    letter-spacing: -0.05em;
    color: var(--color-primary);
    opacity: 0.18;
    pointer-events: none;
    user-select: none;
  }

  .paso__contenido {
    position: relative;
    z-index: 1;
    padding-top: clamp(44px, 7vw, 72px);
  }
  .paso__titulo {
    font-weight: 700;
    font-size: clamp(21px, 3vw, 24px);
    color: var(--color-white);
    margin-bottom: 12px;
  }
  .paso__texto {
    color: var(--color-text-secondary);
    font-size: 17px;
    line-height: 1.6;
    max-width: 46ch;
  }

  @media (max-width: 600px) {
    .pasos {
      padding-left: 28px;
    }
    .paso__num {
      font-size: clamp(96px, 28vw, 130px);
      left: 0;
    }
  }
</style>
```

### `Features.astro`

```astro
---
const convos = [
  { ini: 'MR', nombre: 'María Robles', msg: '¿Tienen cita para mañana?', canal: 'wa', activa: true },
  { ini: 'JL', nombre: 'Jorge Luna', msg: 'Gracias, ahí nos vemos 🙌', canal: 'ig', activa: false },
  { ini: 'PV', nombre: 'Paola Vega', msg: '¿Aceptan tarjeta?', canal: 'ms', activa: false },
  { ini: 'CT', nombre: 'Carlos Tena', msg: '¿A qué hora abren hoy?', canal: 'wa', activa: false },
];
---

<section class="features section">
  <div class="features__inner">
    <h2 class="features__titulo reveal">
      Una sola herramienta. Dos experiencias distintas.
    </h2>

    <div class="features__tabs reveal" role="tablist" aria-label="Vistas de Wapi">
      <button
        class="tab is-active"
        role="tab"
        aria-selected="true"
        data-tab="equipo"
      >
        Tu equipo
      </button>
      <button class="tab" role="tab" aria-selected="false" data-tab="dueno">
        Tú como dueño
      </button>
    </div>

    <div class="features__grid reveal">
      <!-- Texto con crossfade -->
      <div class="features__texts">
        <p class="feature-text is-active" data-text="equipo">
          Todos los mensajes de WhatsApp, Instagram y Messenger en una sola
          pantalla. Notas internas, historial completo del cliente,
          notificaciones en el celular. Sin saltar entre apps, sin mensajes
          perdidos.
        </p>
        <p class="feature-text" data-text="dueno">
          Cada conversación visible en tiempo real. Alertas cuando algo lleva
          demasiado tiempo sin respuesta. Reportes de atención por persona. Todo
          desde tu celular, estés donde estés.
        </p>
      </div>

      <!-- Visual estilizado de la bandeja -->
      <div class="inbox" aria-hidden="true">
        <div class="inbox__list">
          {
            convos.map((c) => (
              <div class:list={['inbox__item', c.activa && 'is-active']}>
                <span class="inbox__avatar">{c.ini}</span>
                <span class="inbox__meta">
                  <span class="inbox__name">{c.nombre}</span>
                  <span class="inbox__msg">{c.msg}</span>
                </span>
                <span class:list={['inbox__canal', `canal--${c.canal}`]} />
              </div>
            ))
          }
        </div>
        <div class="inbox__panel">
          <div class="inbox__panel-head">
            <span class="inbox__avatar inbox__avatar--lg">MR</span>
            <span class="inbox__name">María Robles</span>
            <span class="inbox__tag">Agente Wapi</span>
          </div>
          <div class="inbox__chat">
            <div class="ib ib--in">¿Tienen cita para mañana?</div>
            <div class="ib ib--out">
              ¡Claro! Tenemos espacio mañana a las 11am y a las 4pm. ¿Cuál te
              acomoda?
            </div>
            <div class="ib ib--note">Nota interna: cliente frecuente ⭐</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .features {
    background: var(--color-surface);
  }
  .features__inner {
    max-width: 1000px;
    margin-inline: auto;
    padding-inline: 24px;
  }
  .features__titulo {
    font-weight: 700;
    font-size: clamp(28px, 4.4vw, 40px);
    text-align: center;
    letter-spacing: -0.01em;
  }

  .features__tabs {
    margin: 40px auto 0;
    display: inline-flex;
    gap: 4px;
    padding: 4px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
  .features__tabs {
    display: flex;
    width: fit-content;
    margin-inline: auto;
  }
  .tab {
    appearance: none;
    border: none;
    background: transparent;
    color: var(--color-text-secondary);
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .tab.is-active {
    background: var(--color-primary);
    color: #fff;
  }

  .features__grid {
    margin-top: 48px;
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    gap: 48px;
    align-items: center;
  }

  .features__texts {
    position: relative;
    min-height: 160px;
  }
  .feature-text {
    position: absolute;
    inset: 0;
    font-size: 18px;
    color: var(--color-text-secondary);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .feature-text.is-active {
    opacity: 1;
    pointer-events: auto;
  }

  /* -------- Inbox mockup -------- */
  .inbox {
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    background: var(--color-bg);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
    min-height: 320px;
  }
  .inbox__list {
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    padding: 8px;
  }
  .inbox__item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
  }
  .inbox__item.is-active {
    background: rgba(242, 84, 45, 0.12);
  }
  .inbox__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #2a2f3d, #3a4150);
    color: #c7cfe0;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 600;
  }
  .inbox__avatar--lg {
    width: 30px;
    height: 30px;
  }
  .inbox__meta {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .inbox__name {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text);
  }
  .inbox__msg {
    font-size: 12px;
    color: var(--color-text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .inbox__canal {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .canal--wa {
    background: #25d366;
  }
  .canal--ig {
    background: #e1306c;
  }
  .canal--ms {
    background: #0084ff;
  }

  .inbox__panel {
    display: flex;
    flex-direction: column;
  }
  .inbox__panel-head {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .inbox__tag {
    margin-left: auto;
    font-size: 11px;
    font-weight: 600;
    color: var(--color-primary);
    background: rgba(242, 84, 45, 0.12);
    padding: 3px 8px;
    border-radius: 6px;
  }
  .inbox__chat {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .ib {
    max-width: 85%;
    font-size: 13px;
    padding: 8px 11px;
    border-radius: 10px;
    line-height: 1.35;
  }
  .ib--in {
    align-self: flex-start;
    background: var(--color-surface);
    color: var(--color-text);
  }
  .ib--out {
    align-self: flex-end;
    background: #005c4b;
    color: #f4fff9;
  }
  .ib--note {
    align-self: stretch;
    background: rgba(255, 209, 102, 0.1);
    border: 1px dashed rgba(255, 209, 102, 0.4);
    color: #ffd166;
    font-size: 12px;
  }

  @media (max-width: 860px) {
    .features__grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .features__texts {
      min-height: 130px;
    }
  }
  @media (max-width: 480px) {
    .inbox {
      grid-template-columns: 1fr;
    }
    .inbox__list {
      border-right: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
  }
</style>

<script>
  const tabs = document.querySelectorAll<HTMLButtonElement>('.features .tab');
  const texts = document.querySelectorAll<HTMLElement>('.features .feature-text');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      texts.forEach((txt) => {
        txt.classList.toggle('is-active', txt.dataset.text === target);
      });
    });
  });
</script>
```

### `Footer.astro`

```astro
---
import logoIcono from '../assets/logo-icono.svg';
---

<footer class="footer">
  <div class="container footer__inner">
    <a href="#" class="footer__logo" aria-label="Wapi — inicio">
      <img src={logoIcono.src} alt="Wapi" width="32" height="32" />
    </a>

    <nav class="footer__links" aria-label="Enlaces legales">
      <a href="#">Términos</a>
      <span class="footer__dot">·</span>
      <a href="#">Aviso de privacidad</a>
    </nav>

    <a href="mailto:hola@wapi.mx" class="footer__email">hola@wapi.mx</a>

    <p class="footer__copy">© 2025 Wapi. Todos los derechos reservados.</p>
  </div>

  <div class="container">
    <p class="footer__legal">
      © 2026 Wapi. Operado por Juan Alberto Toledo Tello.
    </p>
  </div>
</footer>

<style>
  .footer {
    background: var(--color-bg);
    border-top: 1px solid var(--color-surface);
    padding-block: 32px;
  }
  .footer__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-wrap: wrap;
  }
  .footer__logo img {
    width: 32px;
    height: 32px;
  }
  .footer__links {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    color: var(--color-text-secondary);
  }
  .footer__links a {
    transition: color 0.2s ease;
  }
  .footer__links a:hover {
    color: var(--color-text);
  }
  .footer__dot {
    color: var(--color-text-secondary);
  }
  .footer__email {
    font-size: 14px;
    color: var(--color-text-secondary);
    transition: color 0.2s ease;
  }
  .footer__email:hover {
    color: var(--color-primary);
  }
  .footer__copy {
    font-size: 14px;
    color: var(--color-text-secondary);
  }
  .footer__legal {
    margin-top: 20px;
    font-size: 12px;
    color: var(--color-text-secondary);
    opacity: 0.7;
    text-align: center;
  }

  @media (max-width: 680px) {
    .footer__inner {
      flex-direction: column;
      text-align: center;
      gap: 16px;
    }
  }
</style>
```

### `Hero.astro`

```astro
---
import logoIcono from '../assets/logo-icono.svg';
import ondaW from '../assets/onda-w.svg';
import WhatsAppButton from './WhatsAppButton.astro';
---

<section class="hero">
  <img class="hero__wave" src={ondaW.src} alt="" aria-hidden="true" />

  <div class="container hero__grid">
    <!-- Columna izquierda: copy -->
    <div class="hero__copy" data-reveal-group data-reveal-stagger="0.12">
      <h1 class="hero__headline reveal">
        ¿Cuántos clientes has perdido por un mensaje sin respuesta?
      </h1>

      <p class="hero__sub reveal">
        Un solo lugar para tu WhatsApp, Instagram y Messenger, con un agente
        entrenado para atender exactamente como lo haría tu mejor empleado —
        disponible 24/7, con el tono y la información de tu negocio.
      </p>

      <p class="hero__refuerzo reveal">No uno genérico. Uno tuyo.</p>

      <div class="hero__cta reveal">
        <WhatsAppButton
          text="Hablar con nuestro agente ahorita"
          icon={true}
        />
        <p class="hero__cta-sub">
          Es IA, no un humano. Y eso es exactamente lo que te ofrecemos.
        </p>
      </div>

      <p class="hero__ancla reveal">
        El 78% de los clientes elige al primer negocio que responde. ¿Cuántas
        veces no fuiste tú?
      </p>
    </div>

    <!-- Columna derecha: chat animado -->
    <div class="hero__chat-wrap" id="chat-wrap">
      <div class="chat" role="img" aria-label="Conversación de ejemplo entre un cliente y el agente de IA de Wapi para la Clínica Dental Robles">
        <div class="chat__header">
          <div class="chat__avatar">
            <img src={logoIcono.src} alt="" aria-hidden="true" />
          </div>
          <div class="chat__title">
            <strong>Clínica Dental Robles</strong>
            <span class="chat__badge">
              <i class="chat__dot"></i> Agente Wapi activo
            </span>
          </div>
        </div>

        <div class="chat__body" id="chat-body">
          <!-- Turno 1 — cliente -->
          <div class="row row--left t1">
            <div class="typing"><span></span><span></span><span></span></div>
          </div>
          <div class="row row--left m1">
            <div class="bubble bubble--in">
              Buenas, ¿cuánto cuesta una limpieza dental?
            </div>
          </div>

          <!-- Turno 2 — agente -->
          <div class="row row--right t2">
            <div class="typing typing--out"><span></span><span></span><span></span></div>
          </div>
          <div class="row row--right m2">
            <div class="bubble bubble--out">
              ¡Hola! Una limpieza cuesta $650 e incluye revisión sin costo.
              Atendemos lunes a viernes de 9am a 7pm y sábados de 9am a 2pm.
            </div>
          </div>

          <!-- Turno 3 — cliente -->
          <div class="row row--left t3">
            <div class="typing"><span></span><span></span><span></span></div>
          </div>
          <div class="row row--left m3">
            <div class="bubble bubble--in">¿Y tienen estacionamiento?</div>
          </div>

          <!-- Turno 4 — agente -->
          <div class="row row--right t4">
            <div class="typing typing--out"><span></span><span></span><span></span></div>
          </div>
          <div class="row row--right m4">
            <div class="bubble bubble--out">
              Sí, contamos con estacionamiento gratuito en el edificio. ¿Hay algo
              más en lo que te pueda ayudar? 😊
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    padding-top: 128px;
    padding-bottom: clamp(64px, 10vw, 120px);
    background: var(--color-bg);
  }

  .hero__wave {
    position: absolute;
    top: 12%;
    left: -10%;
    width: 130%;
    max-width: none;
    opacity: 0.03;
    pointer-events: none;
    user-select: none;
  }

  .hero__grid {
    position: relative;
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 48px;
    align-items: center;
  }

  .hero__headline {
    font-weight: 800;
    font-size: clamp(36px, 5.2vw, 64px);
    letter-spacing: -0.02em;
  }

  .hero__sub {
    margin-top: 24px;
    max-width: 36em;
    font-size: clamp(17px, 2.2vw, 20px);
    color: var(--color-text-secondary);
  }

  .hero__refuerzo {
    margin-top: 16px;
    font-weight: 500;
    font-size: 18px;
    color: var(--color-primary);
  }

  .hero__cta {
    margin-top: 32px;
  }

  .hero__cta-sub {
    margin-top: 12px;
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .hero__ancla {
    margin-top: 56px;
    max-width: 30em;
    font-size: 15px;
    line-height: 1.5;
    color: var(--color-text-secondary);
  }

  /* ---------------- Chat ---------------- */
  .hero__chat-wrap {
    display: flex;
    justify-content: center;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
    transition-delay: 0.35s;
  }
  .hero__chat-wrap.is-visible {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .hero__chat-wrap {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  .chat {
    width: 100%;
    max-width: 360px;
    border-radius: 20px;
    overflow: hidden;
    background: #ece5dd;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .chat__header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #075e54;
    color: #fff;
  }

  .chat__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .chat__avatar img {
    width: 26px;
    height: 26px;
  }

  .chat__title {
    display: flex;
    flex-direction: column;
    line-height: 1.3;
  }
  .chat__title strong {
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 600;
  }

  .chat__badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
  }
  .chat__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #25d366;
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
    animation: pulse-dot 1.6s infinite;
  }
  @keyframes pulse-dot {
    0% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(37, 211, 102, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
    }
  }

  .chat__body {
    padding: 16px;
    min-height: 380px;
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
  }
  .row--left {
    justify-content: flex-start;
  }
  .row--right {
    justify-content: flex-end;
  }

  .bubble {
    max-width: 80%;
    padding: 9px 13px;
    border-radius: 12px;
    font-family: var(--font-body);
    font-size: 14px;
    line-height: 1.4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
  }
  .bubble--in {
    background: #ffffff;
    color: #1f2933;
    border-top-left-radius: 2px;
  }
  .bubble--out {
    background: #005c4b;
    color: #f4fff9;
    border-top-right-radius: 2px;
  }

  /* Indicador de "escribiendo" */
  .typing {
    display: inline-flex;
    gap: 4px;
    padding: 12px 14px;
    background: #ffffff;
    border-radius: 12px;
    border-top-left-radius: 2px;
  }
  .typing--out {
    background: #005c4b;
    border-radius: 12px;
    border-top-right-radius: 2px;
  }
  .typing span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9aa3ad;
    animation: blink 1.2s infinite ease-in-out;
  }
  .typing--out span {
    background: rgba(255, 255, 255, 0.7);
  }
  .typing span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes blink {
    0%,
    60%,
    100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-2px);
    }
  }

  /* -------- Timeline (total 10s) — corre solo con .chat--animating -------- */
  /* Indicadores: aparecen, se mantienen, colapsan al llegar el mensaje */
  .chat--animating .t1 {
    animation: typing-show 10s ease forwards;
  }
  .chat--animating .m1 {
    animation: msg-show-sm 10s ease forwards;
  }
  .chat--animating .t2 {
    animation: typing-show-2 10s ease forwards;
  }
  .chat--animating .m2 {
    animation: msg-show-lg-2 10s ease forwards;
  }
  .chat--animating .t3 {
    animation: typing-show-3 10s ease forwards;
  }
  .chat--animating .m3 {
    animation: msg-show-sm-3 10s ease forwards;
  }
  .chat--animating .t4 {
    animation: typing-show-4 10s ease forwards;
  }
  .chat--animating .m4 {
    animation: msg-show-lg-4 10s ease forwards;
  }

  @keyframes typing-show {
    0%,
    5% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
    6%,
    13% {
      opacity: 1;
      max-height: 44px;
      margin-bottom: 8px;
    }
    15%,
    100% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
  }
  @keyframes msg-show-sm {
    0%,
    13% {
      opacity: 0;
      max-height: 0;
      transform: translateY(8px);
      margin-bottom: 0;
    }
    16%,
    100% {
      opacity: 1;
      max-height: 160px;
      transform: translateY(0);
      margin-bottom: 8px;
    }
  }
  @keyframes typing-show-2 {
    0%,
    33% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
    34%,
    41% {
      opacity: 1;
      max-height: 44px;
      margin-bottom: 8px;
    }
    43%,
    100% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
  }
  @keyframes msg-show-lg-2 {
    0%,
    41% {
      opacity: 0;
      max-height: 0;
      transform: translateY(8px);
      margin-bottom: 0;
    }
    44%,
    100% {
      opacity: 1;
      max-height: 260px;
      transform: translateY(0);
      margin-bottom: 8px;
    }
  }
  @keyframes typing-show-3 {
    0%,
    56% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
    57%,
    64% {
      opacity: 1;
      max-height: 44px;
      margin-bottom: 8px;
    }
    66%,
    100% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
  }
  @keyframes msg-show-sm-3 {
    0%,
    64% {
      opacity: 0;
      max-height: 0;
      transform: translateY(8px);
      margin-bottom: 0;
    }
    67%,
    100% {
      opacity: 1;
      max-height: 160px;
      transform: translateY(0);
      margin-bottom: 8px;
    }
  }
  @keyframes typing-show-4 {
    0%,
    84% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
    85%,
    92% {
      opacity: 1;
      max-height: 44px;
      margin-bottom: 8px;
    }
    94%,
    100% {
      opacity: 0;
      max-height: 0;
      margin-bottom: 0;
    }
  }
  @keyframes msg-show-lg-4 {
    0%,
    92% {
      opacity: 0;
      max-height: 0;
      transform: translateY(8px);
      margin-bottom: 0;
    }
    95%,
    100% {
      opacity: 1;
      max-height: 260px;
      transform: translateY(0);
      margin-bottom: 0;
    }
  }

  /* Si el usuario prefiere menos movimiento: mostrar todo el chat estático */
  @media (prefers-reduced-motion: reduce) {
    .row {
      animation: none !important;
      opacity: 1 !important;
      max-height: none !important;
      margin-bottom: 8px !important;
    }
    .t1,
    .t2,
    .t3,
    .t4 {
      display: none !important;
    }
    .typing span,
    .chat__dot {
      animation: none !important;
    }
  }

  /* ---------------- Responsive ---------------- */
  @media (max-width: 900px) {
    .hero__grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .hero__copy {
      text-align: left;
    }
    .hero__ancla {
      margin-top: 32px;
    }
  }
</style>

<script>
  const chatWrap = document.getElementById('chat-wrap');
  const chatBody = document.getElementById('chat-body');

  if (chatWrap && chatBody) {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (reduceMotion) {
      chatWrap.classList.add('is-visible');
    } else {
      function startChatAnimation() {
        chatBody!.classList.remove('chat--animating');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            chatBody!.classList.add('chat--animating');
          });
        });
      }

      let loopId: ReturnType<typeof setInterval> | null = null;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            chatWrap.classList.add('is-visible');
            setTimeout(() => {
              startChatAnimation();
              loopId = setInterval(startChatAnimation, 13000);
            }, 700);
            observer.disconnect();
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(chatWrap);
    }
  }
</script>
```

### `Navbar.astro`

```astro
---
import logo from '../assets/logo-horizontal.svg';
import WhatsAppButton from './WhatsAppButton.astro';
---

<header id="navbar" class="navbar">
  <div class="container navbar__inner">
    <a href="#" class="navbar__logo" aria-label="Wapi — inicio">
      <img src={logo.src} alt="Wapi" width="96" height="28" />
    </a>

    <nav class="navbar__links" aria-label="Navegación principal">
      <a href="#como-funciona">Cómo funciona</a>
      <a href="#precios">Precios</a>
      <a href="#para-quien-es">Para quién es</a>
    </nav>

    <WhatsAppButton text="Hablar con el agente" class="navbar__cta" />
  </div>
</header>

<style>
  @keyframes navbar-enter {
    from {
      opacity: 0;
      transform: translateY(-16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .navbar {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 50;
    background: transparent;
    transition: background 0.3s ease, backdrop-filter 0.3s ease,
      border-color 0.3s ease;
    border-bottom: 1px solid transparent;
    animation: navbar-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
  }

  @media (prefers-reduced-motion: reduce) {
    .navbar {
      animation: none;
    }
  }

  .navbar.is-scrolled {
    background: rgba(15, 17, 23, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: rgba(255, 255, 255, 0.06);
  }

  .navbar__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    height: 72px;
  }

  .navbar__logo img {
    height: 28px;
    width: auto;
  }

  .navbar__links {
    display: flex;
    gap: 32px;
    font-size: 15px;
    color: var(--color-text-secondary);
  }

  .navbar__links a {
    transition: color 0.2s ease;
  }
  .navbar__links a:hover {
    color: var(--color-text);
  }

  /* CTA un poco más compacto en el navbar */
  .navbar :global(.navbar__cta) {
    padding: 10px 20px;
    font-size: 15px;
  }

  /* Responsive: ocultar links centrales en móvil (sin hamburger en v1) */
  @media (max-width: 768px) {
    .navbar__links {
      display: none;
    }
    .navbar__inner {
      height: 64px;
    }
  }
</style>

<script>
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle('is-scrolled', window.scrollY > 50);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
</script>
```

### `ParaQuienEs.astro`

```astro
---
const afirmaciones = [
  'Tu negocio recibe preguntas por WhatsApp todos los días.',
  'Hay momentos en que nadie puede responder de inmediato.',
  'Quieres saber cómo está siendo atendido tu cliente, pero no puedes ver las conversaciones.',
];
---

<section id="para-quien-es" class="paraquien section">
  <div class="paraquien__inner">
    <h2 class="paraquien__titulo reveal">
      Si recibes mensajes de clientes, Wapi es para ti.
    </h2>

    <ul class="paraquien__lista" data-reveal-group data-reveal-stagger="0.2">
      {afirmaciones.map((a) => <li class="paraquien__item reveal">{a}</li>)}
    </ul>

    <p class="paraquien__remate reveal">
      Clínicas, restaurantes, despachos, salones, tiendas, talleres, notarías,
      gimnasios, inmobiliarias — si tus clientes te escriben, Wapi funciona para
      tu negocio.
    </p>
  </div>
</section>

<style>
  .paraquien {
    background: var(--color-surface);
  }
  .paraquien__inner {
    max-width: 720px;
    margin-inline: auto;
    padding-inline: 24px;
    text-align: center;
  }
  .paraquien__titulo {
    font-weight: 700;
    font-size: clamp(28px, 4.4vw, 40px);
    letter-spacing: -0.01em;
  }
  .paraquien__lista {
    list-style: none;
    margin: 48px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .paraquien__item {
    font-size: 20px;
    color: var(--color-text-secondary);
  }
  .paraquien__remate {
    margin-top: 48px;
    font-weight: 500;
    font-size: 16px;
    color: var(--color-text);
    line-height: 1.6;
  }
</style>
```

### `Precios.astro`

```astro
---
import WhatsAppButton from './WhatsAppButton.astro';
---

<section id="precios" class="precios section">
  <div class="precios__inner">
    <h2 class="precios__titulo reveal">
      Elige tu plan.<br />Sin sorpresas, sin letra chica.
    </h2>
    <p class="precios__sub reveal">
      La configuración de tus canales está incluida en los dos planes. Nosotros
      te guiamos desde cero.
    </p>

    <div class="precios__grid" data-reveal-group data-reveal-stagger="0.12">
      <!-- Plan Esencial -->
      <div class="plan reveal">
        <h3 class="plan__nombre">Plan Esencial</h3>
        <p class="plan__desc">Para negocios de 1 a 3 personas</p>
        <p class="plan__precio">
          $1,490 <span>MXN/mes</span>
        </p>
        <ul class="plan__features">
          <li>WhatsApp, Instagram y Messenger en una sola bandeja</li>
          <li>Hasta 3 usuarios</li>
          <li>Agente de IA incluido</li>
          <li>Supervisión en tiempo real</li>
        </ul>
        <WhatsAppButton
          text="Empieza gratis — escríbenos por WhatsApp"
          class="plan__cta"
        />
      </div>

      <!-- Plan Crecimiento (destacado) -->
      <div class="plan plan--destacado reveal">
        <span class="plan__badge">Recomendado</span>
        <h3 class="plan__nombre">Plan Crecimiento</h3>
        <p class="plan__desc">Para negocios con más equipo y más volumen</p>
        <p class="plan__precio">
          $2,490 <span>MXN/mes</span>
        </p>
        <p class="plan__incluye">Incluye todo del Plan Esencial más:</p>
        <ul class="plan__features">
          <li>Hasta 8 usuarios</li>
          <li>Agente de IA con mayor capacidad</li>
          <li>Reportes por agente y alertas de tiempo de respuesta</li>
        </ul>
        <WhatsAppButton
          text="Empieza gratis — escríbenos por WhatsApp"
          class="plan__cta"
        />
      </div>
    </div>

    <ul class="precios__confianza reveal">
      <li>14 días gratis</li>
      <li>Configuración de todos tus canales incluida</li>
      <li>Soporte en español desde el primer día</li>
    </ul>
  </div>
</section>

<style>
  .precios {
    background: var(--color-bg);
  }
  .precios__inner {
    max-width: 980px;
    margin-inline: auto;
    padding-inline: 24px;
    text-align: center;
  }
  .precios__titulo {
    font-weight: 700;
    font-size: clamp(28px, 4.4vw, 40px);
    letter-spacing: -0.01em;
  }
  .precios__sub {
    margin: 16px auto 0;
    max-width: 46em;
    font-size: 18px;
    color: var(--color-text-secondary);
  }

  .precios__grid {
    margin-top: 56px;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 24px;
    align-items: stretch;
    text-align: left;
  }

  .plan {
    display: flex;
    flex-direction: column;
    padding: 32px;
    border-radius: 16px;
    background: rgba(26, 29, 39, 0.5);
    border: 1px solid var(--color-surface);
  }
  .plan--destacado {
    position: relative;
    background: var(--color-surface);
    border: 1px solid var(--color-primary);
    box-shadow: 0 24px 60px rgba(242, 84, 45, 0.12);
  }
  .plan__badge {
    position: absolute;
    top: -13px;
    left: 32px;
    background: var(--color-primary);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 999px;
  }
  .plan__nombre {
    font-weight: 700;
    font-size: 22px;
  }
  .plan__desc {
    margin-top: 6px;
    color: var(--color-text-secondary);
    font-size: 15px;
  }
  .plan__precio {
    margin-top: 20px;
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 40px;
    line-height: 1;
  }
  .plan__precio span {
    font-family: var(--font-body);
    font-weight: 400;
    font-size: 15px;
    color: var(--color-text-secondary);
  }
  .plan__incluye {
    margin-top: 24px;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
  }
  .plan__features {
    list-style: none;
    margin: 24px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
  }
  .plan__incluye + .plan__features {
    margin-top: 12px;
  }
  .plan__features li {
    position: relative;
    padding-left: 28px;
    font-size: 15px;
    color: var(--color-text-secondary);
  }
  .plan__features li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(242, 84, 45, 0.15);
  }
  .plan__features li::after {
    content: '';
    position: absolute;
    left: 6px;
    top: 7px;
    width: 6px;
    height: 9px;
    border: solid var(--color-primary);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  .precios :global(.plan__cta) {
    margin-top: 28px;
    width: 100%;
    min-height: 56px;
    padding-inline: 20px;
    font-size: 15px;
    text-wrap: balance;
  }

  .precios__confianza {
    list-style: none;
    margin: 40px 0 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px 28px;
  }
  .precios__confianza li {
    position: relative;
    padding-left: 24px;
    font-size: 14px;
    color: var(--color-text-secondary);
  }
  .precios__confianza li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-weight: 700;
  }

  @media (max-width: 760px) {
    .precios__grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

### `Problema.astro`

```astro
---
const afirmaciones = [
  'Hay mensajes sin responder y no te enteraste hasta el día siguiente.',
  'Un cliente preguntó precio a las 9pm. Nadie respondió. Ya no escribió.',
  'No sabes si tu negocio está atendiendo bien porque no puedes ver las conversaciones.',
];
---

<section class="problema">
  <div class="problema__inner">
    <h2 class="problema__apertura reveal">
      Hay mensajes sin responder en tu negocio.<br />
      <span class="problema__apertura-dim">Y cuando te das cuenta, ya es tarde.</span>
    </h2>

    <div class="problema__lista" data-reveal-group data-reveal-stagger="0.2">
      {afirmaciones.map((texto) => <p class="problema__item reveal">{texto}</p>)}
    </div>

    <p class="problema__remate reveal">
      El 78% de los clientes elige al primer negocio que responde. ¿Cuántas
      veces no fuiste tú?
    </p>
  </div>
</section>

<style>
  .problema {
    background: #0f1117;
    padding-block: clamp(80px, 12vw, 140px);
  }
  .problema__inner {
    max-width: 800px;
    margin-inline: auto;
    padding-inline: 24px;
    text-align: center;
  }

  .problema__apertura {
    font-weight: 700;
    font-size: clamp(28px, 4.4vw, 38px);
    line-height: 1.2;
    letter-spacing: -0.02em;
  }
  .problema__apertura-dim {
    color: var(--color-text-secondary);
  }

  .problema__lista {
    margin-top: 72px;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }
  .problema__item {
    font-family: var(--font-display);
    font-weight: 700;
    font-size: clamp(24px, 3.4vw, 34px);
    line-height: 1.3;
    letter-spacing: -0.01em;
    color: var(--color-text);
    text-wrap: balance;
  }

  .problema__remate {
    margin-top: 72px;
    margin-inline: auto;
    max-width: 52ch;
    font-size: clamp(16px, 2vw, 18px);
    color: var(--color-text-secondary);
  }

  @media (max-width: 600px) {
    .problema__lista {
      gap: 48px;
    }
  }
</style>
```

### `WhatsAppButton.astro`

```astro
---
import { WHATSAPP_URL } from '../consts';

interface Props {
  text: string;
  variant?: 'default' | 'invert';
  icon?: boolean;
  class?: string;
}

const {
  text,
  variant = 'default',
  icon = false,
  class: className = '',
} = Astro.props;
---

<a
  href={WHATSAPP_URL}
  target="_blank"
  rel="noopener noreferrer"
  class:list={[
    'btn-whatsapp',
    variant === 'invert' && 'btn-whatsapp--invert',
    className,
  ]}
>
  {
    icon && (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    )
  }
  <span>{text}</span>
</a>
```

---

## 8. `package.json`

```json
{
  "name": "wapi-landing",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  },
  "dependencies": {
    "astro": "^5.7.0",
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "lenis": "^1.1.18",
    "@vercel/analytics": "^1.4.1"
  }
}
```

---

## Apéndice: archivos referenciados no incluidos en el dump original

- **`src/consts.ts`** — exporta `SITE` (con `title`, `description`, `url`) y `WHATSAPP_URL`. Usado por `Layout.astro` y `WhatsAppButton.astro`. Su contenido no estaba entre los comandos solicitados.
- **`src/assets/*.svg`** — `logo-horizontal.svg`, `logo-icono.svg`, `onda-w.svg`. Importados como assets de Astro.
- **`public/favicon.svg`**, **`tsconfig.json`** — presentes en el árbol, no volcados.
