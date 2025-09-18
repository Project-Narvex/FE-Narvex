'use client';

/**
 * Scroll Animation Controller
 * Handles scroll-triggered animations using Intersection Observer
 */
export class ScrollAnimationController {
  private observer: IntersectionObserver | null = null;
  private animatedElements = new Set<Element>();

  constructor() {
    this.init();
  }

  private init() {
    // Check if user prefers reduced motion
    if (this.prefersReducedMotion()) {
      return;
    }

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animateElement(entry.target);
            this.animatedElements.add(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Start observing elements
    this.observeElements();
  }

  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private observeElements() {
    if (!this.observer) return;

    // Observe all elements with scroll animation classes
    const elements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );

    elements.forEach((element) => {
      this.observer!.observe(element);
    });
  }

  private animateElement(element: Element) {
    // Add animation class
    element.classList.add('animate-in');

    // Handle staggered animations for child elements
    const staggerChildren = element.querySelectorAll('[data-stagger]');
    staggerChildren.forEach((child, index) => {
      const delay = parseInt(child.getAttribute('data-stagger') || '0') + (index * 100);
      setTimeout(() => {
        child.classList.add('animate-in');
      }, delay);
    });
  }

  public refresh() {
    // Re-observe new elements that might have been added
    this.observeElements();
  }

  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.animatedElements.clear();
  }
}

/**
 * Stagger Animation Helper
 * Adds staggered animation delays to child elements
 */
export function addStaggerAnimation(
  container: Element,
  childSelector: string,
  baseDelay: number = 100
) {
  const children = container.querySelectorAll(childSelector);
  children.forEach((child, index) => {
    child.setAttribute('data-stagger', (index * baseDelay).toString());
  });
}

/**
 * Smooth Scroll to Section
 * Enhanced smooth scrolling with easing
 */
export function smoothScrollToSection(targetId: string) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start: number | null = null;

  function animation(currentTime: number) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuart(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  }

  requestAnimationFrame(animation);
}

/**
 * Initialize animations when DOM is ready
 */
export function initializeAnimations() {
  if (typeof window === 'undefined') return null;

  const controller = new ScrollAnimationController();

  // Add stagger animations to specific sections
  const companyIntroCards = document.querySelector('#about .grid');
  if (companyIntroCards) {
    addStaggerAnimation(companyIntroCards, '.text-center', 150);
  }

  const blogArticles = document.querySelector('.grid.md\\:grid-cols-2');
  if (blogArticles) {
    addStaggerAnimation(blogArticles, 'article', 200);
  }

  const contactCards = document.querySelector('.grid.md\\:grid-cols-2.lg\\:grid-cols-4');
  if (contactCards) {
    addStaggerAnimation(contactCards, 'a', 100);
  }

  return controller;
}

/**
 * Parallax Effect Helper
 * Simple parallax scrolling effect
 */
export function addParallaxEffect(element: Element, speed: number = 0.5) {
  if (typeof window === 'undefined') return;

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * speed;
    (element as HTMLElement).style.transform = `translateY(${parallax}px)`;
  }

  window.addEventListener('scroll', updateParallax, { passive: true });
  return () => window.removeEventListener('scroll', updateParallax);
}

/**
 * Pulse Animation for CTA Buttons
 */
export function addPulseAnimation(element: Element) {
  element.classList.add('animate-pulse-glow');
}

/**
 * Remove animations for accessibility
 */
export function removeAnimationsForAccessibility() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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