'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
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

  if (!src || imageError) {
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
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className="object-cover"
        sizes={sizes}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
