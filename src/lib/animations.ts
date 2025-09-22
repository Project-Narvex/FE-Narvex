'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrollToPlugin);
  
  // Performance optimizations
  gsap.config({
    force3D: true,
    nullTargetWarn: false
  });
  
  // Mobile optimizations
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    // Reduce animation complexity on mobile
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150
    });
  }
}

/**
 * Text Animation Types
 */
export type TextAnimationType = 
  | 'fade-in'
  | 'slide-up'
  | 'typewriter'
  | 'wave'
  | 'rotate-in'
  | 'scale-bounce'
  | 'blur-focus'
  | 'elastic'
  | 'flip'
  | 'glitch';

/**
 * Text Animation Controller
 * Specialized controller for advanced text animations with SplitText
 */
export class TextAnimationController {
  private splitTexts: SplitText[] = [];
  private animations: gsap.core.Timeline[] = [];

  constructor() {
    this.initializeTextAnimations();
  }

  private initializeTextAnimations() {
    // Initialize all text elements with animation data attributes
    this.initializeFadeInAnimations();
    this.initializeSlideUpAnimations();
    this.initializeTypewriterAnimations();
    this.initializeWaveAnimations();
    this.initializeRotateInAnimations();
    this.initializeScaleBounceAnimations();
    this.initializeBlurFocusAnimations();
    this.initializeElasticAnimations();
    this.initializeFlipAnimations();
    this.initializeGlitchAnimations();
  }

  private initializeFadeInAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="fade-in"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars,words' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.4');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.02');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.chars, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeSlideUpAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="slide-up"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'words,lines' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.6');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.05');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.words, {
        opacity: 0,
        y: 30,
        rotationX: -15
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeTypewriterAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="typewriter"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.02');

      // Hide all characters initially
      gsap.set(split.chars, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      // Typewriter effect with cursor
      split.chars.forEach((char, index) => {
        tl.to(char, {
          opacity: 1,
          duration: 0.01,
          ease: 'none'
        }, index * duration);
      });

      this.animations.push(tl);
    });
  }

  private initializeWaveAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="wave"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.8');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.03');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.chars, {
        opacity: 0,
        y: 15,
        rotation: 5
      }, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration,
        ease: 'power2.out',
        stagger: {
          amount: stagger * split.chars.length,
          from: 'center'
        }
      });

      this.animations.push(tl);
    });
  }

  private initializeRotateInAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="rotate-in"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars,words' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.6');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.03');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.chars, {
        opacity: 0,
        rotation: 20,
        scale: 0.9
      }, {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeScaleBounceAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="scale-bounce"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'words' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.5');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.05');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.words, {
        opacity: 0,
        scale: 0.9,
        y: 20
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeBlurFocusAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="blur-focus"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.7');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.03');

      // Apply initial blur
      gsap.set(split.chars, { filter: 'blur(3px)', opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.to(split.chars, {
        filter: 'blur(0px)',
        opacity: 1,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeElasticAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="elastic"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.7');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.03');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.chars, {
        opacity: 0,
        scaleY: 0.8,
        transformOrigin: 'bottom'
      }, {
        opacity: 1,
        scaleY: 1,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeFlipAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="flip"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'words' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.6');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.05');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      tl.fromTo(split.words, {
        opacity: 0,
        rotationY: -25,
        transformOrigin: 'center'
      }, {
        opacity: 1,
        rotationY: 0,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  private initializeGlitchAnimations() {
    const elements = gsap.utils.toArray('[data-text-animation="glitch"]') as Element[];
    elements.forEach((element) => {
      const split = new SplitText(element, { type: 'chars' });
      this.splitTexts.push(split);

      const delay = parseFloat(element.getAttribute('data-delay') || '0');
      const duration = parseFloat(element.getAttribute('data-duration') || '0.6');
      const stagger = parseFloat(element.getAttribute('data-stagger') || '0.02');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        delay
      });

      // Simplified glitch effect with subtle movements
      tl.fromTo(split.chars, {
        opacity: 0,
        x: () => gsap.utils.random(-5, 5),
        y: () => gsap.utils.random(-3, 3)
      }, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        ease: 'power2.out',
        stagger
      });

      this.animations.push(tl);
    });
  }

  public destroy() {
    // Kill all animations
    this.animations.forEach(animation => animation.kill());
    this.animations = [];

    // Revert all SplitText instances
    this.splitTexts.forEach(split => split.revert());
    this.splitTexts = [];
  }
}

/**
 * GSAP Animation Controller
 * Handles scroll-triggered animations using GSAP ScrollTrigger and SplitText
 */
export class GSAPAnimationController {
  private animations: gsap.core.Timeline[] = [];
  private splitTexts: SplitText[] = [];
  private textController: TextAnimationController;

  constructor() {
    this.textController = new TextAnimationController();
    this.init();
  }

  private init() {
    // Check if user prefers reduced motion
    if (this.prefersReducedMotion()) {
      return;
    }

    // Initialize animations after a short delay to ensure DOM is ready
    gsap.delayedCall(0.1, () => {
      this.initializeScrollAnimations();
      this.initializeTextAnimations();
      this.initializeStaggerAnimations();
    });
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private initializeScrollAnimations() {
    // Basic scroll animations
    const scrollElements = gsap.utils.toArray('.scroll-animate') as Element[];
    scrollElements.forEach((element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(element, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        }
      );

      this.animations.push(tl);
    });

    // Left slide animations
    const leftElements = gsap.utils.toArray('.scroll-animate-left') as Element[];
    leftElements.forEach((element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(element,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
      );

      this.animations.push(tl);
    });

    // Right slide animations
    const rightElements = gsap.utils.toArray('.scroll-animate-right') as Element[];
    rightElements.forEach((element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(element,
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
      );

      this.animations.push(tl);
    });

    // Scale animations
    const scaleElements = gsap.utils.toArray('.scroll-animate-scale') as Element[];
    scaleElements.forEach((element) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(element,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );

      this.animations.push(tl);
    });
  }

  private initializeTextAnimations() {
    // SplitText animations for headings
    const headings = gsap.utils.toArray('h1, h2, h3, .split-text') as Element[];
    headings.forEach((heading) => {
      const split = new SplitText(heading, { type: 'words,chars' });
      this.splitTexts.push(split);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate characters with stagger
      tl.fromTo(split.chars,
        { 
          opacity: 0, 
          y: 30,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: {
            amount: 0.4,
            from: 'start'
          }
        }
      );

      this.animations.push(tl);
    });
  }

  private initializeStaggerAnimations() {
    // Stagger animations for cards and grid items
    const staggerContainers = gsap.utils.toArray('.animate-stagger') as Element[];
    staggerContainers.forEach((container) => {
      const children = container.children;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(children,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: {
            amount: 0.4,
            from: 'start'
          }
        }
      );

      this.animations.push(tl);
    });
  }

  public refresh() {
    // Refresh ScrollTrigger to recalculate positions
    ScrollTrigger.refresh();
  }

  public destroy() {
    // Destroy text controller
    this.textController.destroy();

    // Kill all animations
    this.animations.forEach(animation => animation.kill());
    this.animations = [];

    // Revert all SplitText instances
    this.splitTexts.forEach(split => split.revert());
    this.splitTexts = [];

    // Kill all ScrollTriggers
    ScrollTrigger.killAll();
  }

  /**
   * Get text controller for external access
   */
  public getTextController(): TextAnimationController {
    return this.textController;
  }
}

/**
 * GSAP Stagger Animation Helper
 * Adds GSAP stagger animations to child elements
 */
export function addGSAPStaggerAnimation(
  container: Element,
  childSelector: string,
  animationProps: { from?: gsap.TweenVars; to?: gsap.TweenVars } = {}
) {
  const children = container.querySelectorAll(childSelector);
  
  if (children.length === 0) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  tl.fromTo(children,
    { 
      opacity: 0, 
      y: 25,
      scale: 0.97,
      ...animationProps.from
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      stagger: {
        amount: 0.3,
        from: 'start'
      },
      ...animationProps.to
    }
  );

  return tl;
}

/**
 * GSAP Smooth Scroll to Section
 * Enhanced smooth scrolling with GSAP
 */
export function smoothScrollToSection(targetId: string) {
  const target = document.querySelector(targetId);
  if (!target) return;

  gsap.to(window, {
    duration: 1.2,
    scrollTo: {
      y: target,
      offsetY: 80
    },
    ease: 'power2.inOut'
  });
}

/**
 * Section-specific animation configurations
 */
export const sectionAnimationConfigs = {
  hero: {
    title: { animation: 'wave', delay: 0.3, duration: 0.8, stagger: 0.03 },
    subtitle: { animation: 'fade-in', delay: 0.6, duration: 0.6, stagger: 0.03 },
    description: { animation: 'slide-up', delay: 0.9, duration: 0.6, stagger: 0.05 }
  },
  about: {
    heading: { animation: 'typewriter', delay: 0, duration: 0.03, stagger: 0 },
    content: { animation: 'fade-in', delay: 0.3, duration: 0.6, stagger: 0.03 },
    cards: { animation: 'scale-bounce', delay: 0.6, duration: 0.5, stagger: 0.05 }
  },
  services: {
    heading: { animation: 'rotate-in', delay: 0, duration: 0.6, stagger: 0.03 },
    description: { animation: 'blur-focus', delay: 0.3, duration: 0.7, stagger: 0.03 },
    cards: { animation: 'flip', delay: 0.6, duration: 0.6, stagger: 0.05 }
  },
  portfolio: {
    heading: { animation: 'elastic', delay: 0, duration: 0.7, stagger: 0.03 },
    filters: { animation: 'slide-up', delay: 0.3, duration: 0.6, stagger: 0.05 },
    items: { animation: 'scale-bounce', delay: 0.6, duration: 0.5, stagger: 0.05 }
  },
  testimonials: {
    heading: { animation: 'glitch', delay: 0, duration: 0.6, stagger: 0.02 },
    content: { animation: 'fade-in', delay: 0.3, duration: 0.6, stagger: 0.03 }
  },
  contact: {
    heading: { animation: 'wave', delay: 0, duration: 0.8, stagger: 0.03 },
    form: { animation: 'slide-up', delay: 0.3, duration: 0.6, stagger: 0.05 },
    info: { animation: 'fade-in', delay: 0.6, duration: 0.6, stagger: 0.05 }
  }
};

/**
 * Animation configuration interface
 */
interface AnimationConfig {
  animation: string;
  delay: number;
  duration: number;
  stagger: number;
}

interface SectionConfig {
  [key: string]: AnimationConfig;
}

/**
 * Apply section-specific text animations
 */
export function applySectionAnimations(sectionId: string, config: SectionConfig) {
  const section = document.querySelector(`#${sectionId}`);
  if (!section) return;

  Object.entries(config).forEach(([elementType, animConfig]: [string, AnimationConfig]) => {
    const elements = section.querySelectorAll(`[data-element="${elementType}"]`);
    elements.forEach((element) => {
      element.setAttribute('data-text-animation', animConfig.animation);
      element.setAttribute('data-delay', animConfig.delay.toString());
      element.setAttribute('data-duration', animConfig.duration.toString());
      element.setAttribute('data-stagger', animConfig.stagger.toString());
    });
  });
}

/**
 * Initialize GSAP animations when DOM is ready
 */
export function initializeAnimations() {
  if (typeof window === 'undefined') return null;

  const controller = new GSAPAnimationController();

  // Apply section-specific animations
  gsap.delayedCall(0.1, () => {
    Object.entries(sectionAnimationConfigs).forEach(([sectionId, config]) => {
      applySectionAnimations(sectionId, config);
    });
  });

  // Add specific stagger animations for sections
  gsap.delayedCall(0.2, () => {
    // Company intro cards
    const companyIntroCards = document.querySelector('#about .grid');
    if (companyIntroCards) {
      addGSAPStaggerAnimation(companyIntroCards, '.text-center', {
        from: { opacity: 0, y: 30, scale: 0.95 },
        to: { duration: 0.6, ease: 'power2.out' }
      });
    }

    // Blog articles
    const blogArticles = document.querySelector('.grid.md\\:grid-cols-2');
    if (blogArticles) {
      addGSAPStaggerAnimation(blogArticles, 'article', {
        from: { opacity: 0, y: 40, rotationY: 5 },
        to: { duration: 0.7, ease: 'power2.out' }
      });
    }

    // Contact cards
    const contactCards = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-4');
    if (contactCards) {
      addGSAPStaggerAnimation(contactCards, 'a', {
        from: { opacity: 0, scale: 0.95, y: 25 },
        to: { duration: 0.5, ease: 'power2.out' }
      });
    }

    // Services grid
    const servicesGrid = document.querySelector('#services .grid');
    if (servicesGrid) {
      addGSAPStaggerAnimation(servicesGrid, '.service-card', {
        from: { opacity: 0, y: 40, scale: 0.95 },
        to: { duration: 0.6, ease: 'power2.out' }
      });
    }

    // Portfolio items
    const portfolioGrid = document.querySelector('#portfolio .grid');
    if (portfolioGrid) {
      addGSAPStaggerAnimation(portfolioGrid, '.portfolio-item', {
        from: { opacity: 0, scale: 0.95, rotationY: 10 },
        to: { duration: 0.7, ease: 'power2.out' }
      });
    }
  });

  return controller;
}

/**
 * GSAP Parallax Effect Helper
 * Enhanced parallax scrolling effect using GSAP
 */
export function addGSAPParallaxEffect(element: Element, speed: number = 0.5) {
  if (typeof window === 'undefined') return;

  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/**
 * GSAP Pulse Animation for CTA Buttons
 */
export function addGSAPPulseAnimation(element: Element) {
  gsap.to(element, {
    scale: 1.02,
    duration: 1.5,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1
  });
}

/**
 * GSAP Hover Animations
 */
export function addGSAPHoverAnimations() {
  // Button hover effects
  const buttons = gsap.utils.toArray('button, .btn') as Element[];
  buttons.forEach((button) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(button, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });

    button.addEventListener('mouseenter', () => tl.play());
    button.addEventListener('mouseleave', () => tl.reverse());
  });

  // Card hover effects
  const cards = gsap.utils.toArray('.card, .service-card, .portfolio-item') as Element[];
  cards.forEach((card) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      y: -5,
      scale: 1.01,
      duration: 0.3,
      ease: 'power2.out'
    });

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());
  });
}

/**
 * Remove animations for accessibility
 */
export function removeAnimationsForAccessibility() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable GSAP animations
    gsap.globalTimeline.clear();
    ScrollTrigger.killAll();
    
    // Remove CSS animations
    const animatedElements = document.querySelectorAll('[class*="animate"]');
    animatedElements.forEach((element) => {
      element.classList.forEach((className) => {
        if (className.startsWith('animate')) {
          element.classList.remove(className);
        }
      });
    });
  }
}

/**
 * Enhanced Depth Animation Controller
 * Provides advanced depth effects including parallax, 3D transforms, and layered animations
 */
export class DepthAnimationController {
  private parallaxElements: Element[] = [];
  private floatingElements: Element[] = [];
  private depthLayers: Map<Element, number> = new Map();
  private mousePosition = { x: 0, y: 0 };
  private isInitialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined' || this.isInitialized) return;
    
    this.setupMouseTracking();
    this.initializeParallaxElements();
    this.initializeFloatingElements();
    this.initializeDepthLayers();
    this.initializeTiltEffects();
    this.isInitialized = true;
  }

  private setupMouseTracking() {
    document.addEventListener('mousemove', (e) => {
      this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mousePosition.y = (e.clientY / window.innerHeight) * 2 - 1;
      this.updateMouseParallax();
    });
  }

  private initializeParallaxElements() {
    const elements = gsap.utils.toArray('[data-parallax]') as Element[];
    elements.forEach((element) => {
      const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
      const depth = parseFloat(element.getAttribute('data-depth') || '1');
      
      this.parallaxElements.push(element);
      this.depthLayers.set(element, depth);
      
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  private initializeFloatingElements() {
    const elements = gsap.utils.toArray('[data-float]') as Element[];
    elements.forEach((element, index) => {
      const amplitude = parseFloat(element.getAttribute('data-float-amplitude') || '10');
      const duration = parseFloat(element.getAttribute('data-float-duration') || '3');
      const delay = parseFloat(element.getAttribute('data-float-delay') || '0');
      
      this.floatingElements.push(element);
      
      gsap.to(element, {
        y: `+=${amplitude}`,
        rotation: 2,
        duration: duration,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        delay: delay + (index * 0.2)
      });
    });
  }

  private initializeDepthLayers() {
    const layers = gsap.utils.toArray('[data-depth-layer]') as Element[];
    layers.forEach((layer) => {
      const depth = parseFloat(layer.getAttribute('data-depth-layer') || '1');
      const blur = Math.max(0, (depth - 1) * 2);
      
      gsap.set(layer, {
        filter: `blur(${blur}px)`,
        opacity: Math.max(0.3, 1 - (depth - 1) * 0.2),
        scale: 1 - (depth - 1) * 0.05
      });
      
      // Parallax based on depth
      gsap.to(layer, {
        yPercent: -20 * depth,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  private initializeTiltEffects() {
    const tiltElements = gsap.utils.toArray('[data-tilt]') as Element[];
    tiltElements.forEach((element) => {
      const maxTilt = parseFloat(element.getAttribute('data-tilt') || '10');
      
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          rotationY: maxTilt * this.mousePosition.x * 0.5,
          rotationX: -maxTilt * this.mousePosition.y * 0.5,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  private updateMouseParallax() {
    const mouseElements = gsap.utils.toArray('[data-mouse-parallax]') as Element[];
    mouseElements.forEach((element) => {
      const intensity = parseFloat(element.getAttribute('data-mouse-parallax') || '0.1');
      
      gsap.to(element, {
        x: this.mousePosition.x * intensity * 20,
        y: this.mousePosition.y * intensity * 20,
        duration: 0.8,
        ease: 'power2.out'
      });
    });
  }

  public addDepthHover(element: Element, config: {
    scale?: number;
    y?: number;
    rotationY?: number;
    shadowIntensity?: number;
    duration?: number;
  } = {}) {
    const {
      scale = 1.05,
      y = -10,
      rotationY = 5,
      shadowIntensity = 0.3,
      duration = 0.3
    } = config;
    
    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      scale,
      y,
      rotationY,
      boxShadow: `0 20px 40px rgba(0,0,0,${shadowIntensity})`,
      duration,
      ease: 'power2.out'
    });
    
    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());
  }

  public createFloatingShapes(container: Element, count: number = 5) {
    for (let i = 0; i < count; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-shape';
      shape.setAttribute('data-float', 'true');
      shape.setAttribute('data-float-amplitude', (Math.random() * 20 + 10).toString());
      shape.setAttribute('data-float-duration', (Math.random() * 4 + 2).toString());
      shape.setAttribute('data-float-delay', (Math.random() * 2).toString());
      
      const size = Math.random() * 100 + 50;
      const opacity = Math.random() * 0.3 + 0.1;
      const hue = Math.random() * 60 + 200; // Blue to purple range
      
      gsap.set(shape, {
        width: size,
        height: size,
        borderRadius: '50%',
        background: `hsla(${hue}, 70%, 60%, ${opacity})`,
        position: 'absolute',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        filter: 'blur(1px)',
        zIndex: -1
      });
      
      container.appendChild(shape);
    }
    
    this.initializeFloatingElements();
  }

  public destroy() {
    this.parallaxElements = [];
    this.floatingElements = [];
    this.depthLayers.clear();
    this.isInitialized = false;
  }
}

/**
 * Enhanced Parallax Effect with Depth Layers
 */
export function addEnhancedParallax(element: Element, config: {
  speed?: number;
  depth?: number;
  blur?: number;
  opacity?: number;
  scale?: number;
} = {}) {
  const {
    speed = 0.5,
    blur = 0,
    opacity = 1,
    scale = 1
  } = config;
  
  // Apply depth-based styling
  gsap.set(element, {
    filter: `blur(${blur}px)`,
    opacity: opacity,
    scale: scale,
    transformStyle: 'preserve-3d'
  });
  
  // Parallax animation
  gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
}

/**
 * 3D Card Hover Effect
 */
export function add3DCardEffect(card: Element, config: {
  maxRotation?: number;
  perspective?: number;
  shadowIntensity?: number;
  liftHeight?: number;
} = {}) {
  const {
    maxRotation = 15,
    perspective = 1000,
    shadowIntensity = 0.3,
    liftHeight = 20
  } = config;
  
  let bounds: DOMRect;
  
  const updateBounds = () => {
    bounds = card.getBoundingClientRect();
  };
  
  card.addEventListener('mouseenter', () => {
    updateBounds();
    gsap.to(card, {
      transformPerspective: perspective,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mousemove', (e: Event) => {
    if (!bounds) return;
    
    const mouseEvent = e as MouseEvent;
    const x = (mouseEvent.clientX - bounds.left) / bounds.width;
    const y = (mouseEvent.clientY - bounds.top) / bounds.height;
    
    const rotateX = (y - 0.5) * maxRotation;
    const rotateY = (x - 0.5) * -maxRotation;
    
    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      y: -liftHeight,
      boxShadow: `0 ${liftHeight + 10}px ${liftHeight * 2}px rgba(0,0,0,${shadowIntensity})`,
      duration: 0.2,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      y: 0,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      duration: 0.5,
      ease: 'power2.out'
    });
  });
}

/**
 * Morphing Background Pattern
 */
export function createMorphingBackground(container: Element) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.opacity = '0.1';
  
  const resizeCanvas = () => {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  let time = 0;
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsla(${200 + Math.sin(time * 0.01) * 30}, 70%, 60%, 0.3)`);
    gradient.addColorStop(1, `hsla(${240 + Math.cos(time * 0.01) * 30}, 70%, 60%, 0.3)`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    time++;
    requestAnimationFrame(animate);
  };
  
  animate();
  container.appendChild(canvas);
}

/**
 * Hero Section Entrance Animation with Enhanced Depth
 */
export function initializeHeroAnimation() {
  const heroTl = gsap.timeline({ delay: 0.5 });
  
  // Animate hero text elements with depth
  heroTl.fromTo('.hero-title', 
    { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotationX: 15,
      transformPerspective: 1000
    },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotationX: 0,
      duration: 1.2, 
      ease: 'power3.out' 
    }
  )
  .fromTo('.hero-subtitle',
    { 
      opacity: 0, 
      y: 50,
      filter: 'blur(5px)'
    },
    { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      duration: 0.8, 
      ease: 'power2.out' 
    },
    '-=0.6'
  )
  .fromTo('.hero-buttons',
    { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    { 
      opacity: 1, 
      y: 0,
      scale: 1,
      duration: 0.6, 
      ease: 'power2.out' 
    },
    '-=0.4'
  )
  .fromTo('.hero-stats',
    { 
      opacity: 0, 
      y: 40,
      rotationY: 10
    },
    { 
      opacity: 1, 
      y: 0,
      rotationY: 0,
      duration: 0.8, 
      ease: 'power2.out', 
      stagger: 0.1 
    },
    '-=0.3'
  );

  return heroTl;
}

/**
 * Sticky Scroll Animation for Value Cards
 * Pins a container and animates child elements sequentially on scroll.
 * @param sectionElement The outer container used to define scroll height.
 * @param wrapperElement The inner container that will be pinned.
 * @param childSelector The selector for the child elements to animate.
 * @returns A GSAP Timeline instance with a .kill() method for cleanup.
 */
export function initializeStickyValuesAnimation(
  sectionElement: Element,
  wrapperElement: Element,
  childSelector: string
) {
  // Ambil semua elemen anak yang akan dianimasikan
  const children = gsap.utils.toArray(childSelector) as Element[];
  if (children.length === 0) return null;

  // Atur tinggi section container untuk menciptakan ruang scroll
  // Faktor 80vh per item memberikan ruang yang cukup untuk setiap animasi
  gsap.set(sectionElement, { height: `${children.length * 80}vh` });

  // Buat timeline GSAP yang dikontrol oleh ScrollTrigger
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperElement,
      start: 'top top', // Mulai saat bagian atas wrapper menyentuh bagian atas viewport
      end: 'bottom bottom', // Akhiri saat bagian bawah wrapper menyentuh bagian bawah viewport
      scrub: 1, // Buat animasi berjalan mulus mengikuti scroll
      pin: true, // Sematkan wrapperElement selama animasi
      anticipatePin: 1,
    },
  });

  // Tambahkan animasi fade-in dan slide-up untuk setiap elemen anak secara berurutan
  children.forEach((child, index) => {
    timeline.fromTo(
      child,
      { autoAlpha: 0, y: 50 }, // Kondisi awal: transparan dan sedikit di bawah
      {
        autoAlpha: 1,
        y: 0,
        duration: 1, // Durasi untuk satu animasi
        ease: 'power2.inOut',
      },
      index * 0.5 // Tambahkan jeda 0.5 detik antar animasi untuk efek sekuensial
    );
  });

  // Kembalikan timeline agar bisa di-kill saat komponen unmount
  return timeline;
}
