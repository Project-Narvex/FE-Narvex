'use client';

import React from 'react';
import Image from 'next/image';
import { StrapiImage, getStrapiImageUrl } from '@/lib/strapi';

interface TeamMemberPhotoProps {
  photo: StrapiImage | null;
  name: string;
  className?: string;
  size?: number;
}

export default function TeamMemberPhoto({
  photo,
  name,
  className = '',
  size = 96
}: TeamMemberPhotoProps) {
  if (!photo) {
    return (
      <div className={`w-${size/4} h-${size/4} bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center ${className}`}>
        <span className="text-2xl">👤</span>
      </div>
    );
  }

  const imageUrl = getStrapiImageUrl(photo, 'medium');
  
  return (
    <div className={`w-${size/4} h-${size/4} bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={`${name} photo`}
        width={size}
        height={size}
        className="w-full h-full object-cover rounded-full"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = '<span class="text-2xl">👤</span>';
          }
        }}
      />
    </div>
  );
}
