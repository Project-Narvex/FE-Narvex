'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // 0.1 to 1, where 1 is normal scroll speed
  direction?: 'up' | 'down';
  className?: string;
  offset?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = 0
}) => {
  const [scrollY, setScrollY] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      if (elementRef.current) {
        setElementTop(elementRef.current.offsetTop);
      }
    };

    // Set initial position
    handleResize();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getTransform = () => {
    const scrolled = scrollY - elementTop + offset;
    const rate = scrolled * speed;
    const translateY = direction === 'up' ? -rate : rate;
    
    return `translateY(${translateY}px)`;
  };

  return (
    <div
      ref={elementRef}
      className={`${className}`}
      style={{
        transform: getTransform(),
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;
export type { ParallaxSectionProps };