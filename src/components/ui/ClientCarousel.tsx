'use client';

import React, { useEffect, useRef } from 'react';
import { SafeClientLogoImage } from './SafeLogoImage';

interface Client {
  name: string;
  logo: string | unknown; // Allow both string URL and StrapiImage object
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

  useEffect(() => {
    if (!autoScroll || !scrollRef.current || clients.length === 0) return;

    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;
    let interval: NodeJS.Timeout | null = null;
    let isPaused = false;
    let animationFrame: number | null = null;

    const scroll = () => {
      if (isPaused) return;
      
      scrollAmount += 0.5; // Slower, smoother scrolling
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      
      animationFrame = requestAnimationFrame(scroll);
    };

    const startScrolling = () => {
      if (interval) clearInterval(interval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      
      // Use requestAnimationFrame for smoother animation
      animationFrame = requestAnimationFrame(scroll);
    };

    const pauseScrolling = () => {
      isPaused = true;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
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

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (interval) clearInterval(interval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [autoScroll, scrollSpeed, clients.length]);

  const getClientInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 3);
  };

  // Duplicate clients for seamless loop - ensure we have enough clients for smooth scrolling
  const duplicatedClients = clients.length > 0 ? [...clients, ...clients, ...clients, ...clients] : [];

  // Show fallback message if no clients
  if (clients.length === 0) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-400 text-center">No clients available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-hidden scrollbar-hide client-carousel-container"
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
            <SafeClientLogoImage
              src={client.logo}
              alt={`${client.name} logo`}
              fallbackText={getClientInitials(client.name)}
              size={120}
              className="client-logo-container"
            />
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default ClientCarousel;
export type { ClientCarouselProps, Client };