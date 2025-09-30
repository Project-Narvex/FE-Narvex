import React from 'react';
import PortfolioClient from '@/components/pages/portofolio/portofolio-client';
import { projects, getFeaturedProjects } from '@/data/projects';

// This is now a Server Component
export default function PortfolioPage() {
  // Pre-compute data on the server
  const allProjects = projects;
  
  // Get featured projects
  const featuredProjects = getFeaturedProjects();
  
  // Pre-compute filter options
  const portfolioCategories = [
    { id: 'all', name: 'All Categories' },
    { id: 'exhibition', name: 'Exhibition' },
    { id: 'booth', name: 'Booth Design' },
    { id: 'activation', name: 'Brand Activation' },
    { id: 'tour', name: 'Tour & Travel' },
    { id: 'corporate', name: 'Corporate Events' },
    { id: 'creative', name: 'Creative Services' },
    { id: 'education', name: 'Education & Training' },
    { id: 'wedding', name: 'Wedding Services' }
  ];
  
  // Get unique years from projects
  const availableYears = [...new Set(allProjects.map(project => project.year))]
    .sort((a, b) => b - a);
   
  // Get unique clients from projects
  const availableClients = [...new Set(allProjects.map(project => project.client))];
  
  // Get unique companies from projects
  const availableCompanies = [...new Set(allProjects.map(project => project.companyId))];
  
  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'completed', name: 'Completed' },
    { id: 'ongoing', name: 'Ongoing' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'featured', name: 'Featured' }
  ];

  // Create service highlights based on categories
  const serviceHighlights = [
    {
      id: 'exhibition-showcase',
      title: 'Exhibition & Events',
      category: 'exhibition',
      description: 'Penyelenggaraan exhibition dan event berskala besar dengan standar internasional.',
      count: `${allProjects.filter(p => p.category === 'exhibition').length}+ Events`,
      icon: '🎪'
    },
    {
      id: 'booth-showcase',
      title: 'Booth Design & Construction',
      category: 'booth',
      description: 'Desain dan konstruksi booth yang menarik dan fungsional untuk berbagai kebutuhan.',
      count: `${allProjects.filter(p => p.category === 'booth').length}+ Booths`,
      icon: '🏗️'
    },
    {
      id: 'activation-showcase',
      title: 'Brand Activation',
      category: 'activation',
      description: 'Aktivasi brand yang engaging dan memorable untuk meningkatkan brand awareness.',
      count: `${allProjects.filter(p => p.category === 'activation').length}+ Activations`,
      icon: '🚀'
    },
    {
      id: 'corporate-showcase',
      title: 'Corporate Services',
      category: 'corporate',
      description: 'Layanan korporat komprehensif untuk berbagai kebutuhan perusahaan.',
      count: `${allProjects.filter(p => p.category === 'corporate').length}+ Projects`,
      icon: '🏢'
    }
  ];

  // Pass all pre-computed data to the client component
  return (
    <PortfolioClient 
      initialProjects={allProjects}
      portfolioCategories={portfolioCategories}
      availableYears={availableYears}
      availableClients={availableClients}
      statusOptions={statusOptions}
      serviceHighlights={serviceHighlights}
    />
  );
}