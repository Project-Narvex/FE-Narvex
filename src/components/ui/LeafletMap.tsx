'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom office marker with brand colors
const OfficeIcon = L.divIcon({
  html: `
    <div style="
      background-color: #6382b4;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid #dbc48a;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      <div style="
        color: white;
        font-size: 16px;
        font-weight: bold;
      ">🏢</div>
    </div>
  `,
  className: 'custom-office-marker',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

// Custom user location marker
const UserLocationIcon = L.divIcon({
  html: `
    <div style="
      background-color: #4285f4;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">
      <div style="
        background-color: white;
        width: 8px;
        height: 8px;
        border-radius: 50%;
      "></div>
    </div>
  `,
  className: 'custom-user-marker',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
  popupAnchor: [0, -10]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map view updates
const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

interface LeafletMapProps {
  center?: [number, number];
  zoom?: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom = 13 }) => {
  // Jakarta coordinates as fallback
  const jakartaPosition: [number, number] = useMemo(() => [-6.2088, 106.8456], []);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center || jakartaPosition);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Start real-time location tracking
    if (navigator.geolocation) {
      setIsTracking(true);
      
      // Watch position for real-time updates
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const currentPosition: [number, number] = [latitude, longitude];
          
          setUserPosition(currentPosition);
          setMapCenter(currentPosition);
          setLocationError(null);
          setLastUpdate(new Date());
          setIsTracking(false);
          
          console.log(`Location updated: ${latitude}, ${longitude} (accuracy: ${accuracy}m)`);
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          setLocationError(error.message);
          setIsTracking(false);
          // Keep Jakarta as fallback
          setMapCenter(jakartaPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000 // 1 minute
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser');
      setMapCenter(jakartaPosition);
      setIsTracking(false);
    }
    
    // Cleanup function to stop watching position
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [jakartaPosition]);

  return (
    <MapContainer
      center={mapCenter}
      zoom={userPosition ? 15 : zoom}
      style={{ height: '100%', width: '100%' }}
      className="leaflet-container"
    >
      <MapUpdater center={mapCenter} zoom={userPosition ? 15 : zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* User's current location marker */}
      {userPosition && (
        <Marker position={userPosition} icon={UserLocationIcon}>
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-bold text-lg mb-2" style={{color: '#4285f4'}}>
                Your Location {isTracking && <span className="text-xs">(Updating...)</span>}
              </h3>
              <p className="text-gray-600 mb-2">
                Real-time Position
              </p>
              <p className="text-sm text-gray-500">
                Lat: {userPosition[0].toFixed(6)}<br/>
                Lng: {userPosition[1].toFixed(6)}
              </p>
              {lastUpdate && (
                <p className="text-xs text-gray-400 mt-2">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              )}
              {isTracking && (
                <div className="flex items-center justify-center mt-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-blue-600">Tracking location...</span>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Narvex Office marker */}
      <Marker position={jakartaPosition} icon={OfficeIcon}>
        <Popup>
          <div className="text-center p-2">
            <h3 className="font-bold text-lg mb-2" style={{color: '#6382b4'}}>
              Narvex Office
            </h3>
            <p className="text-gray-600 mb-2">
              Jakarta, Indonesia
            </p>
            <p className="text-sm text-gray-500">
              Alamat lengkap akan diberikan setelah konfirmasi meeting
            </p>
            <div className="mt-3 pt-2 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <strong>Jam Operasional:</strong><br/>
                Senin - Jumat: 09:00 - 18:00<br/>
                Sabtu: 09:00 - 15:00
              </p>
            </div>
            {locationError && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-orange-600">
                  <strong>Note:</strong> Using default location<br/>
                  {locationError}
                </p>
              </div>
            )}
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;