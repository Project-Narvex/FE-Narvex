'use client';

import React from 'react';
import AboutImage from './AboutImage';
import { Statistic, StrapiImage } from '@/lib/strapi';

interface CompanyAspectsProps {
  aspects: {
    aspect1?: { id: number; title: string; description: string };
    aspect2?: { id: number; title: string; description: string };
    aspect3?: { id: number; title: string; description: string };
    aspect4?: { id: number; title: string; description: string };
  };
  cardHighlight?: {
    id: number;
    title: string;
    description: string;
    media: StrapiImage;
    statistic1: Statistic;
    statistic2: Statistic;
  };
}

export default function CompanyAspects({ aspects, cardHighlight }: CompanyAspectsProps) {
  // Safely extract aspects with validation (max 4, min 0)
  const aspectItems = [
    aspects?.aspect1,
    aspects?.aspect2,
    aspects?.aspect3,
    aspects?.aspect4
  ].filter((aspect): aspect is NonNullable<typeof aspect> => 
    aspect && aspect.title && aspect.description
  ).slice(0, 4); // Ensure maximum 4 items
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
      <div>
        <h3 className="text-2xl font-bold text-blue-900 mb-8">Nilai-Nilai Perusahaan</h3>
        {aspectItems.length > 0 ? (
          <div className="space-y-6">
            {aspectItems.map((aspect) => (
              <div key={aspect.id} className="flex items-start p-4 rounded-xl hover:shadow-depth-subtle glass-morphism backdrop-blur-sm transition-all duration-300">
                <div className="w-6 h-6 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full mt-1 mr-4 flex-shrink-0 shadow-gold-depth animate-pulse"></div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2 text-lg">{aspect.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{aspect.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg mb-4">Nilai-nilai perusahaan akan segera ditampilkan</div>
            <div className="inline-flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-gold-50 shadow-depth-2">
              <span className="text-2xl mr-2">🌟</span>
              <span className="text-sm font-medium text-blue-900">Coming Soon</span>
            </div>
          </div>
        )}
      </div>
      
      {cardHighlight ? (
        <div className="bg-white rounded-xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism p-8 text-center">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-gradient-to-br from-blue-100 to-blue-200 shadow-blue-depth">
            <AboutImage
              image={cardHighlight.media}
              alt={cardHighlight.title}
              width={96}
              height={96}
              className="w-full h-full object-cover rounded-3xl"
              fallbackIcon="🎨"
            />
          </div>
          <h4 className="text-2xl font-bold text-blue-900 mb-6">{cardHighlight.title}</h4>
          <p className="text-gray-600 flex-1 leading-relaxed mb-8">
            {cardHighlight.description}
          </p>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 hover:shadow-depth-subtle">
              <div className="text-3xl font-bold text-gold-600 mb-2">
                {cardHighlight.statistic1.value}{cardHighlight.statistic1.suffix}
              </div>
              <div className="text-sm text-gray-600 font-medium">{cardHighlight.statistic1.label}</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 hover:shadow-depth-subtle">
              <div className="text-3xl font-bold text-gold-600 mb-2">
                {cardHighlight.statistic2.value}{cardHighlight.statistic2.suffix}
              </div>
              <div className="text-sm text-gray-600 font-medium">{cardHighlight.statistic2.label}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism p-8 text-center">
          <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 bg-gradient-to-br from-blue-100 to-blue-200 shadow-blue-depth">
            <span className="text-4xl">🎨</span>
          </div>
          <h4 className="text-2xl font-bold text-blue-900 mb-6">Narvex Creative Services</h4>
          <p className="text-gray-600 flex-1 leading-relaxed mb-8">
            Perusahaan creative services yang mengkhususkan diri dalam branding, event production, dan digital marketing.
          </p>
          <div className="grid grid-cols-2 gap-6 text-center">
            <div className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 hover:shadow-depth-subtle">
              <div className="text-3xl font-bold text-gold-600 mb-2">100+</div>
              <div className="text-sm text-gray-600 font-medium">Projects</div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-gold-50 to-gold-100 hover:shadow-depth-subtle">
              <div className="text-3xl font-bold text-gold-600 mb-2">50+</div>
              <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
