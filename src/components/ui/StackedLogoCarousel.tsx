'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Client {
  name: string;
  logo: string;
}

interface StackedLogoCarouselProps {
  clients: Client[];
  autoScroll?: boolean;
  scrollSpeed?: number;
  className?: string;
}

const StackedLogoCarousel: React.FC<StackedLogoCarouselProps> = ({
  clients,
  autoScroll = true,
  scrollSpeed = 50,
  className = ''
}) => {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll) return;

    const topRow = topRowRef.current;
    const bottomRow = bottomRowRef.current;
    
    if (!topRow || !bottomRow) return;

    let topScrollAmount = 0;
    let bottomScrollAmount = 0;
    let topInterval: NodeJS.Timeout | null = null;
    let bottomInterval: NodeJS.Timeout | null = null;
    let isPaused = false;
    
    const topMaxScroll = topRow.scrollWidth - topRow.clientWidth;
    const bottomMaxScroll = bottomRow.scrollWidth - bottomRow.clientWidth;

    const scrollTop = () => {
      if (isPaused) return;
      topScrollAmount += 0.5; // Smoother scrolling
      if (topScrollAmount >= topMaxScroll) {
        topScrollAmount = 0;
      }
      topRow.scrollLeft = topScrollAmount;
    };

    const scrollBottom = () => {
      if (isPaused) return;
      bottomScrollAmount -= 0.5; // Smoother scrolling
      if (bottomScrollAmount <= 0) {
        bottomScrollAmount = bottomMaxScroll;
      }
      bottomRow.scrollLeft = bottomScrollAmount;
    };

    const startScrolling = () => {
      if (topInterval) clearInterval(topInterval);
      if (bottomInterval) clearInterval(bottomInterval);
      
      topInterval = setInterval(scrollTop, scrollSpeed);
      bottomInterval = setInterval(scrollBottom, scrollSpeed + 10); // Slightly different speed
    };

    const pauseScrolling = () => {
      isPaused = true;
      if (topInterval) {
        clearInterval(topInterval);
        topInterval = null;
      }
      if (bottomInterval) {
        clearInterval(bottomInterval);
        bottomInterval = null;
      }
    };

    const resumeScrolling = () => {
      isPaused = false;
      startScrolling();
    };

    // Start scrolling
    startScrolling();

    // Pause on hover
    const handleMouseEnter = pauseScrolling;
    const handleMouseLeave = resumeScrolling;

    topRow.addEventListener('mouseenter', handleMouseEnter);
    bottomRow.addEventListener('mouseenter', handleMouseEnter);
    topRow.addEventListener('mouseleave', handleMouseLeave);
    bottomRow.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (topInterval) clearInterval(topInterval);
      if (bottomInterval) clearInterval(bottomInterval);
      topRow.removeEventListener('mouseenter', handleMouseEnter);
      bottomRow.removeEventListener('mouseenter', handleMouseEnter);
      topRow.removeEventListener('mouseleave', handleMouseLeave);
      bottomRow.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoScroll, scrollSpeed]);

  const getClientInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  // Split clients into two rows with more duplicates for smoother scrolling
  const midPoint = Math.ceil(clients.length / 2);
  const topRowClients = [...clients.slice(0, midPoint), ...clients.slice(0, midPoint), ...clients.slice(0, midPoint)];
  const bottomRowClients = [...clients.slice(midPoint), ...clients.slice(midPoint), ...clients.slice(midPoint)];

  const LogoItem = ({ client, index }: { client: Client; index: number }) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <div
        key={`${client.name}-${index}`}
        className="flex-shrink-0 w-32 h-20 flex items-center justify-center mx-4 opacity-60 hover:opacity-100 transition-all duration-500 group"
      >
        {imageError ? (
          <div 
            className="w-28 h-16 rounded-lg flex items-center justify-center text-white font-bold text-sm text-center px-2 group-hover:scale-105 transition-transform duration-300 border border-white/20 shadow-lg"
            style={{
              background: `linear-gradient(135deg, #1e3a8a 0%, #d4af37 100%)`,
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
          <div className="relative w-28 h-16 p-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 group-hover:bg-white/10 transition-all duration-300">
            <Image
              src={client.logo}
              alt={`${client.name} logo`}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300 filter brightness-0 invert opacity-70 group-hover:opacity-100"
              sizes="112px"
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative py-8 ${className}`}>
      {/* Top Row - Moving Right */}
      <div className="relative overflow-hidden mb-6">
        <div
          ref={topRowRef}
          className="flex gap-0 overflow-x-hidden scrollbar-hide"
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {topRowClients.map((client, index) => (
            <LogoItem key={`top-${client.name}-${index}`} client={client} index={index} />
          ))}
        </div>
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-900 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-blue-900 to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Bottom Row - Moving Left */}
      <div className="relative overflow-hidden">
        <div
          ref={bottomRowRef}
          className="flex gap-0 overflow-x-hidden scrollbar-hide"
          style={{
            scrollBehavior: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {bottomRowClients.map((client, index) => (
            <LogoItem key={`bottom-${client.name}-${index}`} client={client} index={index} />
          ))}
        </div>
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-blue-900 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-blue-900 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default StackedLogoCarousel;
export type { StackedLogoCarouselProps, Client };