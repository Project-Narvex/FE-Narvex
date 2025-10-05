'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Building2, ImageIcon } from 'lucide-react';

interface SmartLogoImageProps {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  quality?: number; // New prop for image quality
  placeholder?: 'blur' | 'empty'; // New prop for placeholder
}

export function SmartLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  width = 80,
  height = 80,
  priority = false,
  sizes = '80px',
  quality = 90, // High quality by default
  placeholder = 'empty' // Changed to empty to avoid blur error
}: SmartLogoImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | null>(null);

  // Handle both string URLs and StrapiImage objects
  const getImageUrl = (imageSrc: string | unknown): string | null => {
    if (typeof imageSrc === 'string') {
      return imageSrc;
    }
    
    if (imageSrc && typeof imageSrc === 'object') {
      // Handle StrapiImage object
      const imageObj = imageSrc as Record<string, unknown>;
      if (imageObj.url && typeof imageObj.url === 'string') {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        
        // Check if it's already a full URL
        if (imageObj.url.startsWith('http')) {
          return imageObj.url;
        }
        
        // Build full URL
        return `${STRAPI_URL}${imageObj.url}`;
      }
    }
    
    return null;
  };

  const imageUrl = getImageUrl(src);

  // Determine the best objectFit based on image aspect ratio
  const getOptimalObjectFit = (): 'cover' | 'contain' => {
    if (!imageAspectRatio) return 'cover';
    
    const containerAspectRatio = width / height;
    
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
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
      
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit: getOptimalObjectFit(),
          objectPosition: 'center'
        }}
        sizes={sizes}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        onLoad={handleImageLoad}
        onError={() => {
          setImageError(true);
          setIsLoading(false);
        }}
        onLoadingComplete={() => setIsLoading(false)}
        // Add error boundary for better error handling
        unoptimized={false}
      />
    </div>
  );
}

// Specialized component for company highlight logos with smart aspect ratio handling
export function SmartCompanyLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 80
}: {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  size?: number;
}) {
  return (
    <SmartLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`group-hover:scale-110 transition-transform duration-300 ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={95}
      priority={true}
    />
  );
}

// Specialized component for client carousel logos with smart aspect ratio handling
export function SmartClientLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 120
}: {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  size?: number;
}) {
  return (
    <SmartLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`hover:scale-105 transition-transform duration-300 ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={90}
      priority={false}
    />
  );
}

// Specialized component for service icons with high quality
export function SmartServiceIconImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 32
}: {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  size?: number;
}) {
  return (
    <SmartLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`service-icon-high-quality transition-transform duration-300 ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={95}
      priority={true}
    />
  );
}
