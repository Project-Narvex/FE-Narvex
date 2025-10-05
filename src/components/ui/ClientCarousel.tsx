'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { mapClientLogo } from '@/lib/strapi';
import { ClientLogoImage } from './LogoImage';
import { SmartClientLogoImage } from './SmartLogoImage';
import { SafeClientLogoImage } from './SafeLogoImage';

interface Client {
  name: string;
  logo: string | any; // Allow both string URL and StrapiImage object
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
            {imageErrors.has(client.name) ? (
              // Text-based logo fallback
              <div 
                className="w-32 h-24 rounded-lg flex items-center justify-center text-white font-bold text-sm text-center px-4 group-hover:scale-105 transition-transform duration-300 border border-white/20 bg-white/5 backdrop-blur-sm client-logo-fallback"
              >
                <div>
                  <div className="text-xl font-extrabold mb-1 opacity-90">
                    {getClientInitials(client.name)}
                  </div>
                  <div className="text-xs font-medium leading-tight opacity-75">
                    {client.name.length > 14 ? client.name.length > 14 ? client.name.substring(0, 14) + '...' : client.name : client.name}
                  </div>
                </div>
              </div>
            ) : (
              <SafeClientLogoImage
                src={client.logo}
                alt={`${client.name} logo`}
                fallbackText={getClientInitials(client.name)}
                size={120}
                className="client-logo-container"
              />
            )}
          </div>
        ))}
      </div>
      

    </div>
  );
};

export default ClientCarousel;
export type { ClientCarouselProps, Client };