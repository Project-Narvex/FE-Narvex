'use client';

import React from 'react';
import { SafeLogoImage } from './SafeLogoImage';

// Specialized component for portfolio project images
export function SafePortfolioImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  width = 400,
  height = 256
}: {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <SafeLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`transition-transform duration-500 group-hover:scale-110 ${className}`}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={90}
      priority={false}
    />
  );
}

// Specialized component for testimonial avatar images
export function SafeAvatarImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 64
}: {
  src: string | unknown;
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
      className={`rounded-full object-cover ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={90}
      priority={false}
    />
  );
}

// Specialized component for blog article images
export function SafeArticleImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  width = 400,
  height = 160
}: {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <SafeLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`w-full h-full object-cover ${className}`}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={90}
      priority={false}
    />
  );
}

// Specialized component for company logo images
export function SafeCompanyLogoImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  width = 120,
  height = 80
}: {
  src: string | unknown;
  alt: string;
  fallbackText?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <SafeLogoImage
      src={src}
      alt={alt}
      fallbackText={fallbackText}
      className={`object-contain ${className}`}
      width={width}
      height={height}
      sizes={`${width}px`}
      quality={90}
      priority={false}
    />
  );
}

// Specialized component for service icon images
export function SafeServiceIconImage({ 
  src, 
  alt, 
  fallbackText,
  className = '',
  size = 64
}: {
  src: string | unknown;
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
      className={`object-cover rounded-lg ${className}`}
      width={size}
      height={size}
      sizes={`${size}px`}
      quality={90}
      priority={false}
    />
  );
}