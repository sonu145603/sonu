/**
 * Soni Patel Portfolio - Main Interaction Controller
 * Powered by Charles Honig Interaction Patterns & Figma Source of Truth
 */

(() => {
  'use strict';

  const VERBS = ['create', 'design', 'build', 'make'];
  const ROTATE_INTERVAL = 2000;

  /* ==========================================================================
     1. CUSTOM CURSOR & CONTEXTUAL LABEL
     ========================================================================== */
  const initCustomCursor = () => {
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = document.querySelector('.custom-cursor');
    const label = document.querySelector('.cursor-label');
    if (!cursor || !label) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let isVisible = false;
    let isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      if (isVisible) {
        if (isReduced) {
          curX = mouseX;
          curY = mouseY;
        } else {
          curX += (mouseX - curX) * 0.16;
          curY += (mouseY - curY) * 0.16;
        }
        cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;

        if (label.getAttribute('data-active') === 'yes') {
          const lw = label.offsetWidth || 100;
          const lh = label.offsetHeight || 24;
          let tx = mouseX + 16;
          let ty = mouseY + 16;
          if (tx + lw > window.innerWidth - 12) tx = mouseX - lw - 12;
          if (ty + lh > window.innerHeight - 12) ty = mouseY - lh - 12;
          label.style.transform = `translate(${tx}px, ${ty}px)`;
        }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.setAttribute('data-active', 'yes');
      }

      // Check footer inversion
      const footer = document.querySelector('footer');
      if (footer) {
        const fRect = footer.getBoundingClientRect();
        if (mouseY >= fRect.top && mouseY <= fRect.bottom) {
          cursor.setAttribute('data-invert', 'yes');
        } else {
          cursor.setAttribute('data-invert', 'no');
        }
      }

      // Check hover targets
      const target = e.target.closest('a, button, [data-name="Button"], [data-name="Link"], [data-cursor-label]');
      if (target) {
        cursor.setAttribute('data-hover', 'yes');
        const customText = target.getAttribute('data-cursor-label') || (target.innerText && target.innerText.length < 25 ? target.innerText.trim() : null);
        if (customText) {
          label.textContent = customText;
          label.setAttribute('data-active', 'yes');
        } else {
          label.setAttribute('data-active', 'no');
        }
      } else {
        cursor.setAttribute('data-hover', 'no');
        label.setAttribute('data-active', 'no');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursor.setAttribute('data-active', 'no');
      label.setAttribute('data-active', 'no');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      cursor.setAttribute('data-active', 'yes');
    });
  };

  /* ==========================================================================
     2. NAVIGATION SHORTCUTS & CLICK BINDINGS
     ========================================================================== */
  const initNavigation = () => {
    // Bind buttons in Figma Header to smooth scroll
    const navItems = [
      { text: 'Home', selector: '#home', key: 'h' },
      { text: 'Work', selector: '#work', key: 'w' },
      { text: 'Play', selector: '#play', key: 'p' },
      { text: 'About', selector: '#about', key: 'a' },
      { text: 'Contact', selector: '#contact', key: 'c' },
    ];

    document.querySelectorAll('[data-name="Button"]').forEach(btn => {
      const txt = btn.innerText || '';
      navItems.forEach(item => {
        if (txt.includes(item.text)) {
          btn.style.cursor = 'pointer';
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const el = document.querySelector(item.selector);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          });
        }
      });
    });

    // Theme Switch
    const switchEl = document.querySelector('[data-name="Switch - Switch to dark mode"]') || document.querySelector('[data-node-id="22:23133"]');
    if (switchEl) {
      switchEl.style.cursor = 'pointer';
      switchEl.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('soni-theme', next);
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      const activeEl = document.activeElement;
      if (activeEl && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeEl.tagName)) return;

      const key = e.key.toLowerCase();

      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const match = navItems.find(item => item.key === key);
      if (match) {
        e.preventDefault();
        const el = document.querySelector(match.selector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Space to ride button in footer
    const spaceToRide = document.querySelector('[data-node-id="22:28497"]');
    if (spaceToRide) {
      spaceToRide.style.cursor = 'pointer';
      spaceToRide.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  /* ==========================================================================
     3. "ASK AI" ASSISTANT DRAWER (Figma 22:30513 Dialog)
     ========================================================================== */
  const openDrawer = () => {
    const drawer = document.getElementById('aiDrawer');
    const backdrop = document.getElementById('aiBackdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.documentElement.classList.add('agent-open');

    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--agent-panel-w', `${scrollbarW}px`);
  };

  const closeDrawer = () => {
    const drawer = document.getElementById('aiDrawer');
    const backdrop = document.getElementById('aiBackdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.documentElement.classList.remove('agent-open');
    document.documentElement.style.setProperty('--agent-panel-w', '0px');
  };

  const initAiDrawer = () => {
    // Header Ask AI button
    const askAiBtn = document.querySelector('[data-name="Button - Ask Charles, an AI guide to this portfolio"]');
    if (askAiBtn) {
      askAiBtn.style.cursor = 'pointer';
      askAiBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    }

    const backdrop = document.getElementById('aiBackdrop');
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Dialog close button in drawer (node 22:30519)
    const closeBtn = document.querySelector('[data-node-id="22:30519"]') || document.querySelector('#aiDrawer [data-name="Icon"]');
    if (closeBtn) {
      closeBtn.style.cursor = 'pointer';
      closeBtn.addEventListener('click', closeDrawer);
    }
  };

  /* ==========================================================================
     4. HERO INTERACTIVE BENTO WALL (Charles Honig Reference Implementation)
        - 9-Tile Grid Physics
        - Staggered Spring Entrance
        - Direct Pointer Drag with Tilt & Elastic Snap-back
        - Cursor Impulse Push (useDeckPush)
     ========================================================================== */
  const initHeroWall = () => {
    const wall = document.querySelector('.hero-wall');
    if (!wall) return;

    const tiles = wall.querySelectorAll('.hero-tile');
    const wrappers = wall.querySelectorAll('.hero-tile-wrapper');
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 0. Staggered Spring Entrance on load
    const enterRotations = [-8, -4, 4, 8, -8, -4, 4, -4, 8];
    if (!isReduced && window.gsap) {
      gsap.from(wrappers, {
        opacity: 0,
        scale: 0.65,
        rotation: (i) => enterRotations[i] || 0,
        duration: 0.85,
        ease: 'back.out(1.4)',
        stagger: 0.04,
        delay: 0.1,
        clearProps: 'opacity,scale,transform'
      });
    }

    // 1. Direct Pointer Drag Manipulation with Inertia & Tilt
    let activeTile = null;

    tiles.forEach((tile) => {
      let isDragging = false;
      let startX = 0, startY = 0;
      let currentX = 0, currentY = 0;
      let lastMoveX = 0;
      let velocityX = 0;

      tile.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        isDragging = true;
        activeTile = tile;
        tile.classList.add('is-dragging');
        tile.setPointerCapture(e.pointerId);

        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        lastMoveX = e.clientX;
        velocityX = 0;

        tile.style.zIndex = '60';
        tile.style.transition = 'none';

        // Suppress tooltip while dragging
        const label = document.querySelector('.cursor-label');
        if (label) {
          label.setAttribute('data-active', 'no');
        }
      });

      tile.addEventListener('pointermove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;

        velocityX = e.clientX - lastMoveX;
        lastMoveX = e.clientX;

        // Dynamic rotation tilt based on drag horizontal displacement and velocity
        const tilt = Math.max(-12, Math.min(12, velocityX * 0.45 + currentX * 0.02));
        tile.style.transform = 'translate3d(' + currentX + 'px, ' + currentY + 'px, 0) scale(1.04) rotate(' + tilt + 'deg)';
      });

      const handleRelease = (e) => {
        if (!isDragging) return;
        isDragging = false;
        activeTile = null;
        try { tile.releasePointerCapture(e.pointerId); } catch (_) {}
        tile.classList.remove('is-dragging');

        if (window.gsap) {
          gsap.to(tile, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.75,
            ease: 'elastic.out(1, 0.45)',
            onComplete: () => {
              tile.style.zIndex = '';
              tile.style.transform = 'none';
              currentX = 0;
              currentY = 0;
            }
          });
        } else {
          tile.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease';
          tile.style.transform = 'translate3d(0, 0, 0) scale(1) rotate(0deg)';
          setTimeout(() => {
            tile.style.transition = '';
            tile.style.zIndex = '';
            tile.style.transform = 'none';
            currentX = 0;
            currentY = 0;
          }, 650);
        }
      };

      tile.addEventListener('pointerup', handleRelease);
      tile.addEventListener('pointercancel', handleRelease);
    });

    // 2. Proximity Impulse Push (useDeckPush) on non-dragged tiles
    if (!isReduced) {
      let lastCursor = null;
      wall.addEventListener('pointermove', (e) => {
        if (activeTile || e.pointerType !== 'mouse') return;

        const mx = e.clientX;
        const my = e.clientY;

        if (lastCursor) {
          const vx = mx - lastCursor.x;
          const vy = my - lastCursor.y;
          const speed = Math.hypot(vx, vy);

          if (speed > 1.5) {
            tiles.forEach((tile) => {
              if (tile === activeTile) return;
              const rect = tile.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const dist = Math.hypot(mx - cx, my - cy);
              const maxRadius = 260;

              if (dist < maxRadius) {
                const force = (1 - dist / maxRadius) * Math.min(speed * 0.12, 7);
                const angle = Math.atan2(cy - my, cx - mx);
                const pushX = Math.cos(angle) * force;
                const pushY = Math.sin(angle) * force;

                if (window.gsap) {
                  gsap.to(tile, {
                    x: pushX,
                    y: pushY,
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto',
                    onComplete: () => {
                      gsap.to(tile, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: 'elastic.out(1, 0.45)'
                      });
                    }
                  });
                }
              }
            });
          }
        }
        lastCursor = { x: mx, y: my };
      }, { passive: true });

      wall.addEventListener('pointerleave', () => {
        lastCursor = null;
        tiles.forEach((tile) => {
          if (tile !== activeTile && window.gsap) {
            gsap.to(tile, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
          }
        });
      });
    }
  };

  /* ==========================================================================
     5. FOOTER DYNAMIC ROTATING VERB LOOP (Exact Charles Honig Implementation)
     Words: ["create", "design", "build", "make"]
     ========================================================================== */
  const initRotatingVerb = () => {
    // Locate the create word container in footer
    const verbContainer = document.getElementById('verb-rotator') || document.querySelector('.rotating-verb-wrap');
    if (!verbContainer) return;

    verbContainer.classList.add('rotating-verb-wrap');
    verbContainer.style.overflow = 'hidden';
    verbContainer.style.position = 'relative';

    const pEl = verbContainer.querySelector('#rotating-verb') || verbContainer.querySelector('span, p');
    if (!pEl) return;
    pEl.classList.add('rotating-verb', 'slide-up-in');

    let currentVerbEl = pEl;
    let index = 0;
    let isAnimating = false;

    // Set initial width
    verbContainer.style.width = `${currentVerbEl.offsetWidth || 107}px`;

    const nextVerb = () => {
      if (isAnimating) return;
      isAnimating = true;

      const nextIndex = (index + 1) % VERBS.length;
      const nextWord = VERBS[nextIndex];

      const nextVerbEl = document.createElement('span');
      nextVerbEl.className = currentVerbEl.className;
      nextVerbEl.classList.remove('slide-up-in');
      nextVerbEl.classList.add('slide-up-initial');
      nextVerbEl.textContent = nextWord;
      nextVerbEl.style.position = 'absolute';
      nextVerbEl.style.top = '0';
      nextVerbEl.style.left = '0';
      verbContainer.appendChild(nextVerbEl);

      const nextWidth = nextVerbEl.offsetWidth || 107;
      verbContainer.style.width = `${nextWidth}px`;

      requestAnimationFrame(() => {
        currentVerbEl.classList.remove('slide-up-in');
        currentVerbEl.classList.add('slide-up-out');

        nextVerbEl.classList.remove('slide-up-initial');
        nextVerbEl.classList.add('slide-up-in');

        setTimeout(() => {
          if (currentVerbEl && currentVerbEl.parentNode) {
            currentVerbEl.remove();
          }
          nextVerbEl.style.position = '';
          currentVerbEl = nextVerbEl;
          index = nextIndex;
          isAnimating = false;
        }, 520);
      });
    };

    let timer = null;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!timer) timer = setInterval(nextVerb, ROTATE_INTERVAL);
        } else {
          if (timer) {
            clearInterval(timer);
            timer = null;
          }
        }
      });
    }, { threshold: 0.1 });

    const footer = document.querySelector('footer');
    if (footer) observer.observe(footer);
  };

  /* ==========================================================================
     6. GSAP SCROLL REVEALS
     ========================================================================== */
  const initScrollReveals = () => {
    if (!window.gsap || !window.ScrollTrigger) return;
    window.gsap.registerPlugin(window.ScrollTrigger);

    document.querySelectorAll('.reveal-section').forEach(section => {
      window.gsap.fromTo(section,
        { opacity: 0.2, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  };

  /* ==========================================================================
     7. PROJECT CARD TAP NAVIGATION
     ========================================================================== */
  const initProjectCardClicks = () => {
    const isWorkDir = window.location.pathname.includes('/work/');
    const prefix = isWorkDir ? '' : 'work/';

    const projectVisualLinks = [
      { selector: '[data-node-id="22:27944"], [data-node-id="22:27945"], [data-node-id="22:27916"]', url: `${prefix}finaxa.html`, label: 'Open Finaxa' },
      { selector: '[data-node-id="22:28031"], [data-node-id="22:28033"], [data-node-id="22:28003"]', url: `${prefix}pronex-archai.html`, label: 'Open ArchAI' },
      { selector: '[data-node-id="22:28103"], [data-node-id="22:28133"], [data-node-id="22:28075"]', url: `${prefix}settle.html`, label: 'Open Settle' },
      { selector: '[data-node-id="22:28212"], [data-node-id="22:28213"], [data-node-id="22:28184"]', url: `${prefix}clickio.html`, label: 'Open Clickio' },
    ];

    projectVisualLinks.forEach(p => {
      document.querySelectorAll(p.selector).forEach(el => {
        el.style.cursor = 'pointer';
        el.setAttribute('data-cursor-label', p.label);
        el.addEventListener('click', (e) => {
          if (e.target.closest('button, a')) return;
          window.location.href = p.url;
        });
      });
    });
  };

  /* ==========================================================================
     8. FOOTER EMAIL COPY TO CLIPBOARD
     ========================================================================== */
  const initFooterEmailCopy = () => {
    const copyBtn = document.getElementById('copy-email-btn');
    if (!copyBtn) return;
    
    const emailText = document.getElementById('email-address-text');
    const copySvg = document.getElementById('copy-icon-svg');
    const checkSvg = document.getElementById('check-icon-svg');
    const emailToCopy = emailText ? emailText.textContent.trim() : 'charleshonigdesign@gmail.com';
    let timeoutId = null;

    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(emailToCopy);
      } catch (err) {
        const ta = document.createElement('textarea');
        ta.value = emailToCopy;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      if (copySvg && checkSvg) {
        copySvg.classList.add('hidden');
        checkSvg.classList.remove('hidden');
        copyBtn.setAttribute('aria-label', 'Email copied');
        
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          checkSvg.classList.add('hidden');
          copySvg.classList.remove('hidden');
          copyBtn.setAttribute('aria-label', `Copy email ${emailToCopy}`);
        }, 1600);
      }
    });
  };

  /* ==========================================================================
     9. STEP-BY-STEP DESIGN EVOLUTION ANIMATION (Charles Honig Pattern)
     ========================================================================== */
  const initDesignEvolutionAnimation = () => {
    const stage = document.querySelector('.design-evolution-stage');
    if (!stage || !window.gsap) return;

    const card1 = stage.querySelector('.evo-card-1');
    const card2 = stage.querySelector('.evo-card-2');
    const card3 = stage.querySelector('.evo-card-3');
    const card4 = stage.querySelector('.evo-card-4');

    const arrow1 = stage.querySelector('.evo-arrow-1');
    const arrow2 = stage.querySelector('.evo-arrow-2');
    const arrow3 = stage.querySelector('.evo-arrow-3');

    const pill1 = stage.querySelector('.evo-pill-1');
    const pill2 = stage.querySelector('.evo-pill-2');
    const pill3 = stage.querySelector('.evo-pill-3');
    const pill4 = stage.querySelector('.evo-pill-4');

    const replayBtn = stage.querySelector('.evolution-replay-btn');

    let tl = null;

    const playSequence = () => {
      if (tl) tl.kill();

      const w = stage.offsetWidth || 1158;
      const su = w / 1158;
      const off2 = (44 - 360) * su;
      const off3 = (44 - 610) * su;
      const off4 = (44 - 860) * su;

      // Reset initial values
      window.gsap.set(card1, { opacity: 0, scale: 0.82, x: 0 });
      window.gsap.set(card2, { opacity: 0, scale: 0.82, x: off2 });
      window.gsap.set(card3, { opacity: 0, scale: 0.82, x: off3 });
      window.gsap.set(card4, { opacity: 0, scale: 0.82, x: off4 });

      window.gsap.set([arrow1, arrow2, arrow3], { opacity: 0, scale: 0.4 });
      window.gsap.set([pill1, pill2, pill3, pill4], { opacity: 0, y: 16, scale: 0.85 });

      tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Step 1: Initial Sketch pops in
      tl.to(card1, { opacity: 1, scale: 1, duration: 0.65, ease: 'back.out(1.3)' })
        .to(pill1, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, '-=0.25')

      // Step 2: Arrow 1 pops, 1st Wireframe slides out from behind
        .to(arrow1, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, '+=0.08')
        .to(card2, { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.15')
        .to(pill2, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, '-=0.25')

      // Step 3: Arrow 2 pops, 2nd Wireframe slides out from behind
        .to(arrow2, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, '+=0.08')
        .to(card3, { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.15')
        .to(pill3, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }, '-=0.25')

      // Step 4: Arrow 3 pops, Final Design slides out from behind
        .to(arrow3, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(1.8)' }, '+=0.08')
        .to(card4, { opacity: 1, scale: 1, x: 0, duration: 0.75, ease: 'power3.out' }, '-=0.15')
        .to(pill4, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.8)' }, '-=0.25');
    };

    if (window.ScrollTrigger) {
      window.ScrollTrigger.create({
        trigger: stage,
        start: 'top 80%',
        onEnter: () => playSequence(),
        once: true
      });
    } else {
      playSequence();
    }

    stage.addEventListener('click', () => {
      playSequence();
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSequence();
      });
    }
  };
  window.initDesignEvolutionAnimation = initDesignEvolutionAnimation;

  /* ==========================================================================
     DOM READY INIT
     ========================================================================== */
  const start = () => {
    initCustomCursor();
    initNavigation();
    initAiDrawer();
    initHeroWall();
    initRotatingVerb();
    initScrollReveals();
    initProjectCardClicks();
    initFooterEmailCopy();
    initDesignEvolutionAnimation();
    if (typeof window.initFooterRunner === "function") {
      window.initFooterRunner();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
