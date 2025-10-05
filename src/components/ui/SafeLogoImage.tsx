'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Building2, ImageIcon } from 'lucide-react';

interface SafeLogoImageProps {
  src: string | any;
  alt: string;
  fallbackText?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function SafeLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  width = 80,
  height = 80,
  priority = false,
  sizes = '80px',
  quality = 90
}: SafeLogoImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  // Handle both string URLs and StrapiImage objects
  const getImageUrl = (imageSrc: string | any): string | null => {
    if (typeof imageSrc === 'string') {
      return imageSrc;
    }
    
    if (imageSrc && typeof imageSrc === 'object') {
      // Handle StrapiImage object
      if (imageSrc.url) {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        
        // Check if it's already a full URL
        if (imageSrc.url.startsWith('http')) {
          return imageSrc.url;
        }
        
        // Build full URL
        return `${STRAPI_URL}${imageSrc.url}`;
      }
    }
    
    return null;
  };

  const imageUrl = getImageUrl(src);

  // Determine the best objectFit based on image aspect ratio
  const getOptimalObjectFit = (): 'cover' | 'contain' => {
    if (!imageAspectRatio) return 'cover';
    
    const containerAspectRatio = width / height;
    
    // For service icons, always use cover to fill the container completely
    // This ensures no background shows through
    if (className?.includes('service-icon') || className?.includes('w-16')) {
      return 'cover';
    }
    
    // If image is much wider than container (landscape), use cover to fill
    if (imageAspectRatio > containerAspectRatio * 1.5) {
      return 'cover';
    }
    
    // If image is much taller than container (portrait), use cover to fill
    if (imageAspectRatio < containerAspectRatio * 0.7) {
      return 'cover';
    }
    
    // For square-ish images, use contain to avoid cropping important parts
    return 'contain';
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    setImageAspectRatio(aspectRatio);
    setIsLoading(false);
  };

  if (!imageUrl || imageError) {
    // For service icons, use a transparent background with just the text
    if (className?.includes('service-icon') || className?.includes('w-16')) {
      return (
        <div 
          className={`flex items-center justify-center rounded-lg ${className}`}
          style={{ width, height }}
        >
          <div className="text-center text-white p-2">
            <p className="font-bold text-sm">{fallbackText || 'IC'}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-500 p-2">
          <Building2 className="w-6 h-6 mx-auto mb-1 text-gray-400" />
          <p className="font-medium text-xs">{fallbackText || 'Logo'}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`smart-logo-image ${className}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
      
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={`${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit: getOptimalObjectFit(),
          objectPosition: 'center'
        }}
        sizes={sizes}
        priority={priority}
        quality={quality}
        onLoad={(e) => {
          handleImageLoad(e);
          setIsLoading(false);
        }}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

// Specialized component for company highlight logos with smart aspect ratio handling
export function SafeCompanyLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 80
}: {
  src: string | any;
  alt: string;
  fallbackText?: string;
  className?: string;
  size?: number;
}) {
  return (
    <SafeLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`company-logo-container ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={95}
      priority={true}
    />
  );
}

// Specialized component for client carousel logos with smart aspect ratio handling
export function SafeClientLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 120
}: {
  src: string | any;
  alt: string;
  fallbackText?: string;
  className?: string;
  size?: number;
}) {
  return (
    <SafeLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={90}
      priority={false}
    />
  );
}

// Specialized component for service icons with high quality
export function SafeServiceIconImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 32
}: {
  src: string | any;
  alt: string;
  fallbackText?: string;
  className?: string;
  size?: number;
}) {
  return (
    <SafeLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`service-icon-high-quality service-icon ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={95}
      priority={true}
    />
  );
}
