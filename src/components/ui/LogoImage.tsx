'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Building2, ImageIcon } from 'lucide-react';

interface LogoImageProps {
  src: string | any; // Allow both string URL and StrapiImage object
  alt: string;
  fallbackText?: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  sizes?: string;
  fillContainer?: boolean; // New prop to determine if image should fill the entire container
}

function LogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  width = 80,
  height = 80,
  objectFit = 'cover', // Changed default to 'cover' for better fill
  priority = false,
  sizes = '80px',
  fillContainer = true // New prop with default true
}: LogoImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-gray-400" />
        </div>
      )}
      
      {fillContainer ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            objectFit: objectFit,
            objectPosition: 'center'
          }}
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
          onLoadingComplete={() => setIsLoading(false)}
        />
      ) : (
        <Image
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{
            objectFit: objectFit,
            objectPosition: 'center'
          }}
          sizes={sizes}
          priority={priority}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
          onLoadingComplete={() => setIsLoading(false)}
        />
      )}
    </div>
  );
}

// Specialized component for company highlight logos
export function CompanyLogoImage({ 
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
    <LogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`group-hover:scale-110 transition-transform duration-300 ${className}`}
      width={size}
      height={size}
      objectFit="cover"
      fillContainer={true}
      sizes={`${size}px`}
    />
  );
}

// Specialized component for client carousel logos
export function ClientLogoImage({ 
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
    <LogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`hover:scale-105 transition-transform duration-300 ${className}`}
      width={size}
      height={size}
      objectFit="cover"
      fillContainer={true}
      sizes={`${size}px`}
    />
  );
}

export { LogoImage };
