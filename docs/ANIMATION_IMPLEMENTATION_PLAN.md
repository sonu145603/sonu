# Animation Implementation Plan: Sonu Patel Portfolio

> **Reference Source:** [charleshonig.design](https://charleshonig.design/)  
> **Figma Source of Truth:** [Portfolio — Sonu Patel (Node `22:23109`)](https://www.figma.com/design/li1IIIgBshpzWiL1TAgVrk/Portfolio?node-id=22-23109)  
> **Target Environment:** Vanilla HTML5 / CSS3 / Modern JavaScript (ES6+)

---

## 1. Executive Summary & Architecture Strategy

The objective of this project is to implement the refined, high-craft animation and interaction system of **Charles Honig's website** into **Sonu Patel's portfolio**, strictly adhering to Sonu's existing visual design, typography, spacing, and layouts in Figma node `22:23109`.

### Existing Repository & Tech Stack
* **Repository Architecture:** Static multi-page portfolio (HTML5, Vanilla CSS3 with CSS custom properties, Vanilla JavaScript).
* **Styling Paradigm:** Clean semantic layout with tokens (`--bg`, `--primary`, `--secondary`, `--border`, `--text`, `--font-ui`, `--font-inter`).
* **Performance Budget:** Direct zero-build execution in the browser. Animations will leverage GPU acceleration (`transform`, `opacity`, `will-change`), CSS Custom Properties, and modular lightweight scripts (GSAP 3.12 Core + ScrollTrigger via CDN or self-hosted, with an optional smooth scroll controller or native CSS/RAF).

---

## 2. Core Animation Design Tokens (Observed & Extracted)

Extracted directly from the production bundle of `charleshonig.design`:

```css
:root {
  /* Timings */
  --duration-instant: 80ms;
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 420ms;
  --duration-slower: 680ms;

  /* Easing Curves */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-emphasis: cubic-bezier(0.2, 0, 0, 1);
  --ease-sine: cubic-bezier(0.37, 0, 0.63, 1);

  /* Elevation & Shadows */
  --shadow-card-subtle: 0px 10px 30px 0px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0px 20px 40px 0px rgba(0, 0, 0, 0.16);
  --cursor-size: 28px;
  --cursor-size-hover: 38px;
}
```

---

## 3. Detailed Animation Inventory

### 3.1 Custom Cursor & Contextual Cursor Label

| Attribute | Specification |
| :--- | :--- |
| **Component** | `.custom-cursor` and `.cursor-label` |
| **Trigger** | `mousemove`, `pointerdown`, `pointerup`, element hover (`data-hover`) |
| **Initial State** | `opacity: 0`, `width: 28px`, `height: 28px`, `border: 1px solid var(--cursor-ink)`, `border-radius: 50%`, `transform: translate(-50%, -50%)` |
| **Final State (Hover)** | `width: 38px`, `height: 38px`, `box-shadow: 0 3px 12px color-mix(in srgb, var(--cursor-ink) 22%, transparent)` |
| **Label State** | Appears offset `x + 16px`, `y + 16px` with backdrop blur, displaying contextual text (e.g. "View Case Study", "Open", "Copy") |
| **Duration & Easing** | `200ms` `var(--ease-out)` for scale; smooth interpolation (lerp factor `0.15`) on `requestAnimationFrame` for cursor position |
| **Section Inversion** | On light vs dark sections, switches `--cursor-ink` to match local foreground contrast (`data-invert="yes"`) |
| **Mobile / Touch** | Completely disabled on touch devices (`@media (hover: none) or (pointer: coarse)`); native OS cursor remains hidden only on pointer-capable desktop |
| **Reduced Motion** | Disables lerping; snaps directly to pointer coordinates with simple opacity fade (`data-reduce="yes"`) |

---

### 3.2 Navigation Bar, Theme Switcher & Keyboard Shortcuts

| Attribute | Specification |
| :--- | :--- |
| **Component** | `header.site-header` / Figma `Navigation - Primary` (`22:23111`) |
| **Trigger** | Page Load + Window Scroll + Keydown (`h`, `w`, `p`, `a`, `c`) |
| **Entrance** | Header fades in: `opacity: 0 -> 1`, `translateY(-12px -> 0px)`, duration `420ms`, delay `100ms`, easing `var(--ease-out)` |
| **Scroll Dynamics** | Sticky header with dynamic `backdrop-filter: blur(12px)` and border alpha change on scroll; hides on fast scroll down, reveals immediately on scroll up |
| **Shortcut Badges** | Key badges (`<kbd>h</kbd>`, `<kbd>w</kbd>`, `<kbd>p</kbd>`, `<kbd>a</kbd>`) subtly scale on hover (`scale(1.08)` `160ms var(--ease-spring)`); active keydown triggers ripple on corresponding link and smooth-scrolls to target section |
| **Theme Toggle** | Smooth SVG icon rotation (`180deg`) and color crossfade (`240ms var(--ease-out)`) when toggling dark/light modes |
| **Mobile Equivalent** | Simplified bottom pill or compact hamburger menu; keyboard indicators hidden on mobile |

---

### 3.3 "Ask AI / Ask Charles" Side Drawer Assistant

| Attribute | Specification |
| :--- | :--- |
| **Component** | Header CTA Button (`22:23160`) + Slide Drawer Dialog (`22:30513`) |
| **Trigger** | Click on "Ask AI" button or keyboard shortcut; `Escape` or backdrop click to dismiss |
| **Drawer Entrance** | Drawer translates from `translateX(100%)` to `translateX(0%)`, duration `420ms`, easing `var(--ease-emphasis)`; backdrop overlay fades `opacity: 0 -> 1` (`300ms`) |
| **Page Layout Shift** | When open, body adds `class="agent-open"` with smooth padding compensation: `padding-right: var(--agent-panel-w)` with `transition: padding-right var(--duration-slow) var(--ease-out)` to prevent layout jump |
| **Prompt Chips** | Staggered entrance for prompt chips: `translateY(16px -> 0px)`, `opacity: 0 -> 1`, stagger `60ms`, duration `300ms` |
| **Typing Dots** | Keyframe animation (`agent-dot-1`, `agent-dot-2`, `agent-dot-3`) with staggered opacity pulses |
| **Mobile Equivalent** | Fullscreen modal overlay or bottom drawer sheet |

---

### 3.4 Hero Section: Typography Reveal & Meta Bar Dynamics

| Attribute | Specification |
| :--- | :--- |
| **Component** | Figma Hero Container (`22:23176` – `22:23177`) |
| **Trigger** | Initial page load after fonts are ready |
| **Headline Reveal** | Text line masking: each line wrapped in overflow-hidden container, animating `translateY(110% -> 0%)`, `opacity: 0 -> 1`, duration `680ms`, delay `120ms`, easing `var(--ease-out)` |
| **Location & Time** | Live clock calculates local time with seconds update; location badge features a subtle pulsing green beacon dot |
| **Live Visitor Pile** | Avatar cluster (`VisitorPile`) expands horizontally with staggered avatar reveals (`scale(0 -> 1)`, `200ms`, spring easing) |

---

### 3.5 Hero Bento: 3D Perspective Tilt & Floating Cards

| Attribute | Specification |
| :--- | :--- |
| **Component** | Hero Bento Wall (`22:23262` – `22:23263`) / Visual Showcase |
| **Trigger** | Page Load + `pointermove` across the hero container |
| **Entrance** | Cards stagger in: `opacity: 0 -> 1`, `translateY(40px -> 0px)`, rotate `-4deg -> 0deg`, duration `800ms`, stagger `100ms`, easing `var(--ease-out)` |
| **3D Tilt Interaction** | Pointer coordinates mapped to subtle 3D rotation (`rotateX(-4deg to 4deg)`, `rotateY(-6deg to 6deg)`) with damping/inertia |
| **Glassmorphic Cards** | Cards feature frosted border (`var(--card-glass-border)`), translucent fill (`var(--card-glass-fill)`), and an interior sheen overlay (`shadow-[inset_0px_0px_40px_rgba(0,0,0,0.04)]`) |
| **Mobile Equivalent** | Tilt disabled; cards render in an intuitive responsive horizontal swipe or clean vertical stack |

---

### 3.6 Case Study Cards: Scroll Trigger & Hover States

| Attribute | Specification |
| :--- | :--- |
| **Component** | Projects Grid (`22:27908`): Finaxa (`22:27909`), Pronex ArchAI (`22:27996`), Settle (`22:28068`), Clickio (`22:28177`) |
| **Trigger** | IntersectionObserver / ScrollTrigger + Card Hover |
| **Scroll Reveal** | Cards reveal into viewport: `translateY(60px -> 0px)`, `opacity: 0 -> 1`, duration `680ms`, easing `var(--ease-out)` |
| **Image Zoom on Hover** | Thumbnail scales smoothly: `transform: scale(1.0) -> scale(1.035)`, transition `420ms var(--ease-out)` |
| **Card Shadow Lift** | Card shadow deepens: `box-shadow: var(--shadow-card-subtle) -> var(--shadow-card-hover)`, transition `300ms var(--ease-out)` |
| **Cursor Label Trigger** | Hovering card activates `.cursor-label[data-active="yes"]` displaying `"View Case Study"` |
| **Badges & Metrics** | Read-time badge and clap/view counters subtly highlight on hover |
| **Mobile Equivalent** | Reveal on scroll active; hover states disabled on touch |

---

### 3.7 "Beyond the Case Studies" / Live Projects Section

| Attribute | Specification |
| :--- | :--- |
| **Component** | Figma Node `22:30436` (Live work & experiments) |
| **Trigger** | Scroll into view + Hover |
| **Divider Animation** | Section divider line expands horizontally (`scaleX(0 -> 1)`) on scroll enter |
| **Live Project Tiles** | Compact bento cards with border highlight on hover (`border-color` transition `200ms`), subtle image parallax, and external link icon tilt (`rotate(45deg)`) |

---

### 3.8 About & Experience Section

| Attribute | Specification |
| :--- | :--- |
| **Component** | Figma Node `22:28341` (My Story, Experience, Education) |
| **Trigger** | Scroll into view + List Item Hover |
| **Row Hover Effect** | Experience rows (`Pixclay`, `Freelance`, `Connex Better`, `Gujfly`) gain a subtle background fill tint, the role text shifts `translateX(4px)` with spring easing, and an indicator arrow fades in |
| **Education Cards** | Minimalist cards with border accent reveal on hover |

---

### 3.9 Footer: The Dynamic Rotating Verb ("Let's Create...")

| Attribute | Specification |
| :--- | :--- |
| **Component** | Footer CTA Heading (`22:28436` – `22:28448`) |
| **Trigger** | Auto-playing loop when footer enters viewport (IntersectionObserver) |
| **Rotating Verbs** | `["create", "design", "build", "make"]` |
| **Interval** | Exactly **2000ms** (2.0 seconds) |
| **Verb Animation** | Sliding mask: <br>• Enter: `translateY(110%) -> translateY(0%)` in `500ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)` <br>• Exit: `translateY(0%) -> translateY(-110%)` in `500ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)` |
| **Container Width** | Container width dynamically animates (`width: auto` mapped to word width) to smoothly accommodate differing word lengths without causing abrupt reflow |
| **Viewport Pause** | Animation halts when footer is out of viewport to preserve CPU/battery |
| **Reduced Motion** | Words swap instantly with no vertical translation |

---

### 3.10 Footer Links, Keyboard Shortcut & Back to Top

| Attribute | Specification |
| :--- | :--- |
| **Component** | Footer Links (`22:28472`–`22:28489`) & Space Key Bar (`22:28499`) |
| **Trigger** | Hover + Spacebar keypress or button click |
| **Link Hover** | Animated sliding underline (`transform-origin: left; scaleX(0 -> 1)`) and arrow icon translation `translateX(3px) translateY(-3px)` |
| **Spacebar Interaction** | Pressing the `Space` key (when not focused in inputs) smoothly scrolls back to top; bottom hint badge pulses softly |

---

## 4. Figma to Code Component Mapping Table

| # | Figma Frame / Layer | ID in Figma | Charles Honig Reference | Target Code Component | Recommended Implementation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Cursor System** | Virtual | Custom Cursor & Follower | `.custom-cursor`, `.cursor-label` | Vanilla JS `requestAnimationFrame` lerp + CSS variables |
| **2** | **Primary Navigation** | `22:23111` | Header + Keyboard Nav | `<header class="site-header">` | CSS sticky + Keydown listener (`h`, `w`, `p`, `a`, `c`) |
| **3** | **Dark Mode Switch** | `22:23133` | Theme Toggle | `<button class="theme-switch">` | CSS `data-theme` attribute + smooth SVG rotation |
| **4** | **Ask AI Button** | `22:23160` | Ask Charles CTA | `<button class="btn-ask-ai">` | Drawer trigger with layout-shift compensation |
| **5** | **Ask AI Dialog** | `22:30513` | Ask Charles Drawer | `<aside class="ai-drawer">` | CSS transform drawer + typing dot keyframes |
| **6** | **Hero Headline** | `22:23179` | Hero Headline Reveal | `<h1 class="hero-title">` | Masked line reveal with CSS/GSAP |
| **7** | **Hero Meta Bar** | `22:23183` | Location, Time & Visitors | `<div class="hero-meta">` | Live timezone offset + avatar pile stagger |
| **8** | **Hero Bento Wall** | `22:23263` | Hero Interactive Bento | `<div class="hero-bento">` | CSS Grid + pointermove 3D tilt + glassmorphism |
| **9** | **Finaxa Card** | `22:27909` | Case Study 1 Card | `<article class="project-card">` | ScrollTrigger reveal + image scale hover + cursor label |
| **10** | **Pronex ArchAI Card**| `22:27996` | Case Study 2 Card | `<article class="project-card">` | ScrollTrigger reveal + image scale hover + cursor label |
| **11** | **Settle Card** | `22:28068` | Case Study 3 Card | `<article class="project-card">` | ScrollTrigger reveal + image scale hover + cursor label |
| **12** | **Clickio Card** | `22:28177` | Case Study 4 Card | `<article class="project-card">` | ScrollTrigger reveal + image scale hover + cursor label |
| **13** | **Live Work Bento** | `22:30436` | Beyond Case Studies | `<section class="live-work">` | Staggered grid cards + border hover sheen |
| **14** | **Experience Rows** | `22:28359` | Where I've Been Rows | `<div class="exp-row">` | CSS transition row highlight + arrow nudge |
| **15** | **Rotating Verb** | `22:28436` | "Let's create..." Loop | `<h2 class="footer-rotating">` | Pure JS/CSS keyframe popLayout slider (2000ms) |
| **16** | **Footer Links & Bar**| `22:28434` | Footer CTA & Space key | `<footer class="site-footer">` | Spacebar scroll listener + magnetic link hovers |

---

## 5. Technical Stack & Implementation Architecture

### 5.1 Architecture Decision
To maintain Sonu's clean vanilla structure without introducing heavy frameworks:
1. **Core Animation Engine:** Use **GSAP 3.12 + ScrollTrigger** (loaded via lightweight script tags) for scroll-synchronized entrances, card pin/stagger reveals, and smooth responsive triggers.
2. **Micro-Interactions & Hover Physics:** Native CSS custom properties and Transitions using the exact cubic-bezier curves (`--ease-out`, `--ease-spring`).
3. **Cursor Physics:** Lightweight `requestAnimationFrame` lerping loop for the cursor follower and `.cursor-label` positioning to ensure high FPS with zero jank.
4. **Smooth Scroll:** Native CSS smooth scrolling (`scroll-behavior: smooth`) or optional lightweight Lenis if approved, ensuring zero disruption to trackpad or mouse wheel inertia.

### 5.2 Accessibility & Performance Safeguards
* **`prefers-reduced-motion`:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .custom-cursor, .cursor-label { display: none !important; }
  }
  ```
* **Hardware Acceleration:** All animated properties strictly limited to `transform`, `opacity`, and `filter`.
* **Zero Layout Shifts:** Masks and rotating verbs utilize fixed-height wrappers and absolute positioning so text changes never shift surrounding elements.

---

## 6. Next Steps & Approval Gate

Per your workflow instructions:
* **Phase 1 (Inspection & Analysis):** Complete.
* **Phase 2 (Animation Research & Documentation):** Complete.
* **Phase 3 (Implementation):** Awaiting your explicit approval before modifying or generating project code.
