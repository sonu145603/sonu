# Soni Patel — Product Designer Portfolio

> A high-craft, interactive product design portfolio showcasing end-to-end UX/UI case studies, design systems, and digital product experiences across B2B SaaS, mobile apps, and e-commerce.

🌐 **Live Demo:** [https://sonupatel.vercel.app](https://sonupatel.vercel.app) (Also mirrored at [sonu-patel.vercel.app](https://sonu-patel.vercel.app) and [soni-patel.vercel.app](https://soni-patel.vercel.app))

---

## 🌟 Overview

This repository hosts the personal portfolio of **Soni Patel**, a UI/UX & Product Designer with 2+ years of experience transforming complex problem spaces into intuitive, elegant digital products.

The portfolio is engineered with attention to typography, micro-interactions, spatial hierarchy, and fluid animation choreography inspired by modern design standards (including custom cursor physics, keyboard navigation, and theme switching).

---

## 🚀 Featured Case Studies

| Project | Domain | Platform | Key Highlights |
| :--- | :--- | :--- | :--- |
| **[Finaxa](work/finaxa.html)** | B2B FinTech & SaaS | Web Application | Financial Operating System, automated AP reconciliation, real-time ledger intelligence, and enterprise multi-entity dashboards. |
| **[Pronex ArchAI](work/pronex-archai.html)** | AI & Spatial Computing | Desktop / Web App | AI architectural copilot for generative spatial layout, BIM analysis, code compliance checking, and rapid 3D prototyping. |
| **[Settle](work/settle.html)** | HealthTech & Mindfulness | Mobile (iOS & Android) | Breathwork and mental well-being app designed around low-friction daily practice, haptic feedback integration, and calming color palettes. |
| **[Clickio](work/clickio.html)** | AdTech & Analytics | Web Platform | High-density data visualization, programmatic yield optimization, Core Web Vitals monitoring, and publisher revenue insights. |
| **Lumière Luxury Lighting** | E-commerce | Responsive Web | Immersive digital showroom and boutique shopping experience for premium lighting fixtures. |
| **GoQuick** | FinTech | Mobile App | Fast, secure peer-to-peer payments and money management. |

---

## 🛠️ Tech Stack & Architecture

- **Markup & Styling:** Semantic HTML5, CSS3 Custom Properties (Design Tokens), Tailwind CSS
- **Interactions & Motion:** Vanilla JavaScript (ES6+), GSAP (GreenSock) 3.12, ScrollTrigger
- **Typography:** Exact Figma font pairing — *Lato* and *Inter*
- **Architecture:** Zero-build static architecture for instantaneous browser loading, maximum portability, and zero dependency overhead.

### Key Interactive Features
- 🎯 **Contextual Custom Cursor:** Dynamic physics-based cursor with contextual labels (e.g., *View Case Study*, *Back Home*, *Explore*).
- ⌨️ **Keyboard Shortcut Navigation:** Quick single-key navigation (`H`ome, `W`ork, `P`lay, `A`bout).
- 🌓 **Theme Switcher:** Dark/light mode switching with smooth token transitions.
- 📱 **Fully Responsive:** Fluid layout supporting mobile viewports up to 1440px+ ultra-wide displays.

---

## 📂 Project Structure

```text
├── assets/
│   ├── figma/            # High-resolution case study mockups and screen exports
│   ├── hero/             # Hero section graphical assets and portraits
│   ├── icons/            # SVG vector icons and navigation glyphs
│   ├── projects/         # Project showcase cards and thumbnails
│   └── videos/           # Prototype motion previews and demo clips
├── css/
│   └── styles.css        # Core styles, design tokens, typography, and theme vars
├── docs/
│   └── ANIMATION_IMPLEMENTATION_PLAN.md  # Detailed animation choreo documentation
├── js/
│   ├── main.js           # Core interaction controller (cursor, shortcuts, scroll)
│   └── footer-runner.js  # Interactive footer animation module
├── work/                 # Deep-dive case study pages
│   ├── clickio.html
│   ├── finaxa.html
│   ├── goquick.html
│   ├── luxury-lighting.html
│   ├── pronex-archai.html
│   ├── settle.html
│   └── woogyy.html
├── index.html            # Main portfolio landing page
├── .gitignore            # OS and temporary file exclusions
└── README.md             # Project documentation
```

---

## 💻 How to Run Locally

Because this project requires no build tools or package installations, you can run it immediately using any local server or web browser:

### Option 1: Direct File Opening
Double-click `index.html` or open it with your browser of choice.

### Option 2: Local HTTP Server (Recommended)
Using Python 3:
```bash
python3 -m http.server 8000
```
Then navigate to [http://localhost:8000](http://localhost:8000).

Using Node.js:
```bash
npx serve .
```

---

## 📬 Contact & Connect

- **GitHub:** [@sonu145603](https://github.com/sonu145603)
- **Role:** Product Designer / UI & UX Designer
