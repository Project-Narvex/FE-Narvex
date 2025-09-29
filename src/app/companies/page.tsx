import React from 'react';
import CompaniesClient from '@/components/pages/companies/companies-client';

export default function CompaniesPage() {
  const companies = [
    {
      id: 'skywork',
      name: 'Skywork.id',
      tagline: 'Bekerja dengan Seni',
      description: 'Platform kreatif yang menghadirkan solusi desain dan branding dengan pendekatan artistik yang unik.',
      icon: "palette",
      color: 'bg-blue-500',
      instagram: '@skywork.id',
      website: 'skywork.id',
      services: [
        'Brand Identity Design',
        'Logo & Visual Identity',
        'Print Design',
        'Digital Design',
        'Packaging Design',
        'Marketing Materials',
        'Social Media Design',
        'Creative Consultation'
      ],
      portfolio: [
        { title: 'Brand Identity Project A', category: 'Branding' },
        { title: 'Logo Design Project B', category: 'Logo Design' },
        { title: 'Print Campaign C', category: 'Print Design' },
        { title: 'Digital Campaign D', category: 'Digital Design' }
      ],
      clients: ['Client A', 'Client B', 'Client C', 'Client D']
    },
    {
      id: 'gutama',
      name: 'Gutama Learning',
      tagline: 'Empowering Through Education',
      description: 'Platform pembelajaran yang menyediakan program edukasi dan training berkualitas untuk pengembangan skill.',
      icon: "graduation-cap",
      color: 'bg-green-500',
      instagram: '@gutamalearning',
      website: 'gutamalearning.com',
      services: [
        'Professional Training',
        'Skill Development Programs',
        'Corporate Training',
        'Online Courses',
        'Workshop & Seminar',
        'Certification Programs',
        'Learning Resources',
        'Educational Consultation'
      ],
      portfolio: [
        { title: 'Corporate Training Program A', category: 'Corporate Training' },
        { title: 'Online Course B', category: 'Online Learning' },
        { title: 'Workshop Series C', category: 'Workshop' },
        { title: 'Certification Program D', category: 'Certification' }
      ],
      clients: ['Company A', 'Company B', 'Company C', 'Company D']
    },
    {
      id: 'creativework',
      name: 'CreativeWork',
      tagline: 'Creative Solutions for Modern Business',
      description: 'Layanan kreatif komprehensif untuk solusi branding, desain, dan strategi kreatif bisnis modern.',
      icon: "lightbulb",
      color: 'bg-purple-500',
      instagram: '@creativesky.id',
      website: 'creativework.id',
      services: [
        'Creative Strategy',
        'Brand Development',
        'Creative Campaign',
        'Content Creation',
        'Creative Direction',
        'Design Thinking Workshop',
        'Innovation Consultation',
        'Creative Solutions'
      ],
      portfolio: [
        { title: 'Creative Campaign A', category: 'Campaign' },
        { title: 'Brand Development B', category: 'Branding' },
        { title: 'Content Strategy C', category: 'Content' },
        { title: 'Creative Direction D', category: 'Direction' }
      ],
      clients: ['Brand A', 'Brand B', 'Brand C', 'Brand D'],
      notice: 'Transisi dari CreativeSky ke CreativeWork untuk fokus yang lebih spesifik pada solusi kreatif bisnis.'
    },
    {
      id: 'evervow',
      name: 'Evervow.wo',
      tagline: 'Creating Magical Wedding Moments',
      description: 'Spesialis wedding planning dan production yang menghadirkan momen pernikahan yang tak terlupakan.',
      icon: "heart",
      color: 'bg-pink-500',
      instagram: '@evervow.wo',
      website: 'evervow.wo',
      services: [
        'Wedding Planning',
        'Wedding Decoration',
        'Venue Selection',
        'Catering Coordination',
        'Photography & Videography',
        'Entertainment Management',
        'Wedding Consultation',
        'Honeymoon Planning'
      ],
      portfolio: [
        { title: 'Romantic Garden Wedding', category: 'Outdoor Wedding' },
        { title: 'Elegant Ballroom Wedding', category: 'Indoor Wedding' },
        { title: 'Beach Wedding Ceremony', category: 'Destination Wedding' },
        { title: 'Traditional Wedding', category: 'Cultural Wedding' }
      ],
      clients: ['Couple A', 'Couple B', 'Couple C', 'Couple D']
    }
  ];

  return <CompaniesClient companies={companies} />;
}