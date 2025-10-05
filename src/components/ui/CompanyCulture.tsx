'use client';

import React from 'react';
import AboutImage from './AboutImage';
import { StrapiImage, extractTextFromRichText } from '@/lib/strapi';

interface CompanyCultureProps {
  culture: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    media: StrapiImage;
  };
  className?: string;
}

export default function CompanyCulture({ culture, className = '' }: CompanyCultureProps) {
  const description = extractTextFromRichText(culture.description);
  
  return (
    <div className={`bg-white rounded-xl shadow-depth-2 hover:shadow-depth-3 transition-all duration-300 overflow-hidden ${className}`}>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6">
          <h4 className="text-xl font-semibold text-blue-900 mb-4">{culture.title}</h4>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="relative">
          <AboutImage
            image={culture.media}
            alt={`${culture.title} illustration`}
            width={400}
            height={300}
            className="w-full h-full"
            fallbackIcon="🌟"
          />
        </div>
      </div>
    </div>
  );
}
