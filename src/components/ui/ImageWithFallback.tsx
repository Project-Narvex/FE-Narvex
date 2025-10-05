'use client';

import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string | unknown;
  alt: string;
  className?: string;
  fallbackText?: string;
  category?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  fallbackText, 
  category,
  width,
  height,
  fill = false,
  sizes
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  // Handle both string URLs and StrapiImage objects
  const getImageUrl = (imageSrc: string | unknown): string | null => {
    console.log('ImageWithFallback - Raw src:', imageSrc);
    
    if (typeof imageSrc === 'string') {
      console.log('ImageWithFallback - String URL:', imageSrc);
      // If it's a relative URL, build full URL
      if (imageSrc.startsWith('/')) {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.narvex.id';
        const fullUrl = `${STRAPI_URL}${imageSrc}`;
        console.log('ImageWithFallback - Built full URL from string:', fullUrl);
        return fullUrl;
      }
      return imageSrc;
    }
    
    if (imageSrc && typeof imageSrc === 'object') {
      // Handle StrapiImage object
      const imageObj = imageSrc as Record<string, unknown>;
      console.log('ImageWithFallback - Image object:', imageObj);
      
      // Check for direct url property
      if (imageObj.url && typeof imageObj.url === 'string') {
        const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.narvex.id';
        
        // Check if it's already a full URL
        if (imageObj.url.startsWith('http')) {
          console.log('ImageWithFallback - Full URL:', imageObj.url);
          return imageObj.url;
        }
        
        // Build full URL - ensure we don't double slash
        const cleanUrl = imageObj.url.startsWith('/') ? imageObj.url : `/${imageObj.url}`;
        const fullUrl = `${STRAPI_URL}${cleanUrl}`;
        console.log('ImageWithFallback - Built URL:', fullUrl);
        return fullUrl;
      }
      
      // Check for formats (large, medium, small, thumbnail)
      if (imageObj.formats && typeof imageObj.formats === 'object') {
        const formats = imageObj.formats as Record<string, any>;
        console.log('ImageWithFallback - Formats available:', Object.keys(formats));
        
        // Try to get large format first, then medium, then small
        const preferredFormats = ['large', 'medium', 'small', 'thumbnail'];
        for (const format of preferredFormats) {
          if (formats[format] && formats[format].url) {
            const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://admin.narvex.id';
            const formatUrl = formats[format].url;
            const fullUrl = formatUrl.startsWith('http') ? formatUrl : `${STRAPI_URL}${formatUrl}`;
            console.log(`ImageWithFallback - Using ${format} format:`, fullUrl);
            return fullUrl;
          }
        }
      }
    }
    
    console.log('ImageWithFallback - No valid URL found');
    return null;
  };

  const imageUrl = getImageUrl(src);
  console.log('ImageWithFallback - Final imageUrl:', imageUrl);

  if (!imageUrl || imageError) {
    return (
      <div className={`bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-500 p-8">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="font-medium text-lg mb-2">{fallbackText}</p>
          {category && <p className="text-sm text-gray-400 capitalize">{category} Project</p>}
          <p className="text-xs text-gray-400 mt-2">Image placeholder - CMS ready</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => {
          console.error('Image failed to load:', imageUrl);
          setImageError(true);
        }}
        onLoad={() => {
          console.log('Image loaded successfully:', imageUrl);
        }}
      />
    </div>
  );
}