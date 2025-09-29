// src/components/ui/CMSImage.tsx
'use client';

import React from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import { Image as ImageIcon } from 'lucide-react';

interface CMSImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackText?: string;
  category?: string;
}

export default function CMSImage({ src, alt, className, fallbackText, category }: CMSImageProps) {
  const [imageError, setImageError] = React.useState(false);

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

  // Use the Next.js Image component
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill // Use fill to make it cover the parent container
        className="object-cover" // Ensure the image covers the area
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Help Next.js pick the right size
        onError={() => setImageError(true)}
      />
    </div>
  );
}