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

  // Pass all pre-computed data to the client component
  return (
    <PortfolioClient 
      initialProjects={allProjects}
      portfolioCategories={portfolioCategories}
      availableYears={availableYears}
      availableClients={availableClients}
      statusOptions={statusOptions}
    />
  );
}