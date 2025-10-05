'use client';

import React from 'react';
import Image from 'next/image';
import { StrapiImage, getStrapiImageUrl } from '@/lib/strapi';

interface LegalDocumentProps {
  document: {
    id: number;
    documentId: string;
    Document_Name: string;
    no: string;
    Issued_By: string;
    Issue_Date: string;
    Expiry_Date: string;
    Statuses: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    file: StrapiImage;
  };
  className?: string;
}

export default function LegalDocument({ document, className = '' }: LegalDocumentProps) {
  const imageUrl = getStrapiImageUrl(document.file, 'medium');
  
  return (
    <div className={`bg-white rounded-xl shadow-depth-2 hover:shadow-depth-3 transition-all duration-300 p-6 ${className}`}>
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-blue-900 mb-2">{document.Document_Name}</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Nomor:</span> {document.no}</p>
          <p><span className="font-medium">Diterbitkan oleh:</span> {document.Issued_By}</p>
          <p><span className="font-medium">Tanggal terbit:</span> {new Date(document.Issue_Date).toLocaleDateString('id-ID')}</p>
          <p><span className="font-medium">Tanggal berakhir:</span> {new Date(document.Expiry_Date).toLocaleDateString('id-ID')}</p>
          <p>
            <span className="font-medium">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              document.Statuses 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {document.Statuses ? 'Aktif' : 'Tidak Aktif'}
            </span>
          </p>
        </div>
      </div>
      
      <div className="relative overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={`${document.Document_Name} document`}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 text-4xl">
                  📄
                </div>
              `;
            }
          }}
        />
      </div>
    </div>
  );
}
