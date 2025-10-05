'use client';

import React from 'react';

interface AwardProps {
  award: {
    id: number;
    title: string;
    issuer: string;
    year: string;
  };
  className?: string;
}

export default function Award({ award, className = '' }: AwardProps) {
  return (
    <div className={`bg-gradient-to-br from-gold-50 to-gold-100 rounded-xl p-6 shadow-depth-2 hover:shadow-depth-3 transition-all duration-300 ${className}`}>
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xl">🏆</span>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-blue-900 mb-2">{award.title}</h4>
          <p className="text-gray-600 text-sm mb-1">
            <span className="font-medium">Diterbitkan oleh:</span> {award.issuer}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Tahun:</span> {award.year}
          </p>
        </div>
      </div>
    </div>
  );
}
