'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  category: 'branding' | 'events' | 'digital' | 'all';
  image: string;
  description: string;
  tags: string[];
  client?: string;
}

interface PortfolioSectionProps {
  title?: string;
  subtitle?: string;
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Brand Identity Skywork',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    description: 'Comprehensive brand identity design untuk Skywork Events dengan fokus pada profesionalisme dan kreativitas.',
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
    client: 'Skywork Events'
  },
  {
    id: 2,
    title: 'Wedding Event Production',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&crop=center',
    description: 'Event production untuk pernikahan mewah dengan konsep elegant dan romantic yang tak terlupakan.',
    tags: ['Event Planning', 'Stage Design', 'Decoration'],
    client: 'Private Client'
  },
  {
    id: 3,
    title: 'Digital Campaign Gutama',
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    description: 'Kampanye digital marketing untuk Gutama Learning yang meningkatkan engagement hingga 300%.',
    tags: ['Social Media', 'Content Creation', 'Digital Strategy'],
    client: 'Gutama Learning'
  },
  {
    id: 4,
    title: 'Creative Sky Branding',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center',
    description: 'Rebranding lengkap untuk Creative Sky dengan pendekatan fresh dan modern.',
    tags: ['Rebranding', 'Logo Design', 'Marketing Materials'],
    client: 'Creative Sky'
  },
  {
    id: 5,
    title: 'Corporate Event Evervow',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&crop=center',
    description: 'Event production untuk corporate gathering Evervow dengan tema professional dan engaging.',
    tags: ['Corporate Event', 'Audio Visual', 'Event Management'],
    client: 'Evervow'
  },
  {
    id: 6,
    title: 'Social Media Strategy',
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop&crop=center',
    description: 'Strategi social media comprehensive untuk meningkatkan brand awareness dan engagement.',
    tags: ['Social Media', 'Content Strategy', 'Brand Awareness'],
    client: 'Multiple Clients'
  }
];

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  title = "Portfolio Terpilih",
  subtitle = "Lihat beberapa project terbaik yang telah kami kerjakan untuk berbagai klien dari berbagai industri.",
  projects = defaultProjects
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'branding' | 'events' | 'digital'>('all');

  const filters = [
    { key: 'all' as const, label: 'Semua' },
    { key: 'branding' as const, label: 'Branding' },
    { key: 'events' as const, label: 'Events' },
    { key: 'digital' as const, label: 'Digital' }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portfolio" className="section-padding bg-white scroll-snap-section">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">
            {title}
          </h2>
          <p className="body-large max-w-3xl mx-auto text-gray-600 mb-8 scroll-animate animate-stagger-2">
            {subtitle}
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter.key
                    ? 'bg-gold-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              variant="portfolio"
              className={`group cursor-pointer scroll-animate-scale`}
              data-stagger={index * 150}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative w-full h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white w-full">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-200 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="bg-gold-500 px-3 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">{project.client}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center scroll-animate animate-stagger-4">
          <p className="body-large mb-8 text-gray-600">
            Tertarik dengan hasil kerja kami? Mari diskusikan project Anda dan wujudkan visi kreatif bersama.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="large"
              className="group"
            >
              Lihat Semua Portfolio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={scrollToContact}
              className="group"
            >
              Mulai Project Anda
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
export type { PortfolioSectionProps, Project };