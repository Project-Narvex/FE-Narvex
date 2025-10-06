'use client';

import React from 'react';
import TeamMemberPhoto from './TeamMemberPhoto';
import { StrapiImage } from '@/lib/strapi';

interface TeamMembersProps {
  teamMembers: Array<{
    id: number;
    documentId: string;
    name: string;
    position: string;
    bio: string;
    orderNo?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    photo?: StrapiImage | null;
  }>;
  statistics: {
    statistic1: { id: number; value: number; suffix: string | null; label: string };
    statistic2: { id: number; value: number; suffix: string | null; label: string };
    statistic3: { id: number; value: number; suffix: string | null; label: string };
    statistic4: { id: number; value: number; suffix: string | null; label: string };
  };
}

export default function TeamMembers({ teamMembers, statistics }: TeamMembersProps) {
  return (
    <div>
      {/* Leadership Team */}
      {teamMembers.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-blue-900 text-center mb-8">Tim Kepemimpinan</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(0, 6).map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-depth-3 hover:shadow-depth-5 transition-all duration-500 backdrop-blur-sm glass-morphism p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-blue-depth overflow-hidden">
                  <TeamMemberPhoto
                    photo={member.photo || null}
                    name={member.name}
                    size={96}
                  />
                </div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">{member.name}</h4>
                <p className="text-gold-600 font-medium mb-3 text-sm">{member.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Team Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-depth-2 hover:shadow-depth-subtle">
          <div className="text-3xl font-bold text-blue-900 mb-2">
            {statistics.statistic1.value}{statistics.statistic1.suffix}
          </div>
          <div className="text-sm text-gray-600">{statistics.statistic1.label}</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 shadow-depth-2 hover:shadow-depth-subtle">
          <div className="text-3xl font-bold text-blue-900 mb-2">
            {statistics.statistic2.value}{statistics.statistic2.suffix}
          </div>
          <div className="text-sm text-gray-600">{statistics.statistic2.label}</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-depth-2 hover:shadow-depth-subtle">
          <div className="text-3xl font-bold text-blue-900 mb-2">
            {statistics.statistic3.value}{statistics.statistic3.suffix}
          </div>
          <div className="text-sm text-gray-600">{statistics.statistic3.label}</div>
        </div>
        <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 shadow-depth-2 hover:shadow-depth-subtle">
          <div className="text-3xl font-bold text-blue-900 mb-2">
            {statistics.statistic4.value}{statistics.statistic4.suffix}
          </div>
          <div className="text-sm text-gray-600">{statistics.statistic4.label}</div>
        </div>
      </div>
    </div>
  );
}
