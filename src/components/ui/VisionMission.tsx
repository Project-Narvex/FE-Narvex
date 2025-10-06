'use client';

import React from 'react';
import AboutImage from './AboutImage';
import { StrapiImage, extractTextFromRichText, extractListFromRichText } from '@/lib/strapi';

interface VisionMissionProps {
  vision: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    logo: StrapiImage;
  };
  mission: {
    id: number;
    title: string;
    description: Array<{
      type: string;
      format?: string;
      children: Array<{
        type: string;
        children: Array<{
          text: string;
          type: string;
        }>;
      }>;
    }>;
    logo: StrapiImage;
  };
}

export default function VisionMission({ vision, mission }: VisionMissionProps) {
  const visionText = extractTextFromRichText(vision.description);
  const missionItems = extractListFromRichText(mission.description);
  
  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Vision */}
      <div className="bg-white rounded-xl shadow-depth-2 hover:shadow-depth-3 transition-all duration-300 p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <AboutImage
            image={vision.logo}
            alt="Vision logo"
            width={80}
            height={80}
            className="w-full h-full rounded-full"
            fallbackIcon="🎯"
          />
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-6">{vision.title}</h3>
        <p className="text-gray-600 leading-relaxed">{visionText}</p>
      </div>
      
      {/* Mission */}
      <div className="bg-white rounded-xl shadow-depth-2 hover:shadow-depth-3 transition-all duration-300 p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-gold-100 to-gold-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <AboutImage
            image={mission.logo}
            alt="Mission logo"
            width={80}
            height={80}
            className="w-full h-full rounded-full"
            fallbackIcon="🚀"
          />
        </div>
        <h3 className="text-2xl font-bold text-blue-900 mb-6">{mission.title}</h3>
        <ul className="text-left text-gray-600 space-y-3 leading-relaxed list-none">
          {missionItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
