'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

// Dynamically import the map to avoid SSR issues
const DynamicMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <MapPin className="w-12 h-12 mx-auto mb-2" />
        <p>Loading Map...</p>
      </div>
    </div>
  )
});

interface MapComponentProps {
  height?: string;
  className?: string;
  center?: [number, number];
  zoom?: number;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  height = "h-48", 
  className = "",
  center,
  zoom
}) => {
  return (
    <div className={`${height} ${className} rounded-lg overflow-hidden`}>
      <DynamicMap center={center} zoom={zoom} />
    </div>
  );
};

export default MapComponent;