'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Client {
  name: string;
  logo: string;
}

interface ClientCarouselProps {
  clients: Client[];
  autoScroll?: boolean;
  scrollSpeed?: number;
}

const ClientCarousel: React.FC<ClientCarouselProps> = ({
  clients,
  autoScroll = true,
  scrollSpeed = 30
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!autoScroll || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scroll = () => {
      scrollAmount += 1;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, scrollSpeed);

    // Pause on hover
    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      const newInterval = setInterval(scroll, scrollSpeed);
      return newInterval;
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', () => {
      const newInterval = setInterval(scroll, scrollSpeed);
      return newInterval;
    });

    return () => {
      clearInterval(interval);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoScroll, scrollSpeed]);

  const handleImageError = (clientName: string) => {
    setImageErrors(prev => new Set([...prev, clientName]));
  };

  const getClientInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {duplicatedClients.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className="flex-shrink-0 w-32 h-24 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 group"
          >
            {imageErrors.has(client.name) ? (
              // Text-based logo fallback
              <div 
                className="w-28 h-20 rounded-lg flex items-center justify-center text-white font-bold text-sm text-center px-2 group-hover:scale-105 transition-transform duration-300 border border-white/20"
                style={{
                  background: `linear-gradient(135deg, var(--blue-600) 0%, var(--gold-500) 100%)`,
                  fontFamily: 'var(--font-primary)'
                }}
              >
                <div>
                  <div className="text-lg font-extrabold mb-1">
                    {getClientInitials(client.name)}
                  </div>
                  <div className="text-xs font-medium leading-tight opacity-90">
                    {client.name.length > 12 ? client.name.substring(0, 12) + '...' : client.name}
                  </div>
                </div>
              </div>
            ) : (
              // Image logo with fallback
              <div className="relative w-28 h-20 p-2">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  sizes="112px"
                  onError={() => handleImageError(client.name)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-blue-900 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-blue-900 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ClientCarousel;
export type { ClientCarouselProps, Client };