'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-in-left' | 'slide-in-right' | 'zoom-in';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  once = true,
  id
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated || !once) {
            setTimeout(() => {
              setIsVisible(true);
              if (once) setHasAnimated(true);
            }, delay);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold, once, hasAnimated]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out';
    const durationClass = `duration-${duration}`;
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'slide-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'slide-in-left':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'slide-in-right':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'zoom-in':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        default:
          return `${baseClasses} ${durationClass} opacity-0`;
      }
    } else {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} ${durationClass} opacity-100`;
        case 'slide-up':
          return `${baseClasses} ${durationClass} opacity-100 translate-y-0`;
        case 'slide-in-left':
          return `${baseClasses} ${durationClass} opacity-100 translate-x-0`;
        case 'slide-in-right':
          return `${baseClasses} ${durationClass} opacity-100 translate-x-0`;
        case 'zoom-in':
          return `${baseClasses} ${durationClass} opacity-100 scale-100`;
        default:
          return `${baseClasses} ${durationClass} opacity-100`;
      }
    }
  };

  return (
    <div
      ref={elementRef}
      id={id}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
export type { AnimatedSectionProps };