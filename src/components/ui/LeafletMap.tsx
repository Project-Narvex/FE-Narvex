'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

L.Marker.prototype.options.icon = DefaultIcon;

const LeafletMap: React.FC = () => {
  // Jakarta coordinates
  const jakartaPosition: [number, number] = [-6.2088, 106.8456];

  useEffect(() => {
    // Additional setup if needed
  }, []);

  return (
    <MapContainer
      center={jakartaPosition}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;