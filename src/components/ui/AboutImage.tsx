'use client';

import React from 'react';
import Image from 'next/image';
import { StrapiImage, getStrapiImageUrl } from '@/lib/strapi';

interface AboutImageProps {
  image: StrapiImage;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fallbackIcon?: string;
}

export default function AboutImage({
  image,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fallbackIcon = '🖼️'
}: AboutImageProps) {
  const imageUrl = getStrapiImageUrl(image, 'medium');
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        priority={priority}
        sizes={sizes}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">
                ${fallbackIcon}
              </div>
            `;
          }
        }}
      />
    </div>
  );
}
