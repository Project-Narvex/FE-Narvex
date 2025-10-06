import React from 'react';
import PortfolioClient from '@/components/pages/portofolio/portofolio-client';
import { strapi, PortfolioPageData, PortfolioListData, PortfolioItem, getStrapiImageUrl } from '@/lib/strapi';

// This is now a Server Component
export default async function PortfolioPage() {
  try {
    // Fetch portfolio page data and portfolio list data
    const [portfolioPageResponse, portfolioListResponse] = await Promise.all([
      strapi.getPortfolioPage().catch(error => {
        console.error('Error fetching portfolio page:', error);
        return { data: null };
      }),
      strapi.getPortfolios({
        populate: ['cover', 'gallery', 'portfolio_categories', 'company', 'client', 'services'],
        sort: ['date:desc'],
        pagination: { page: 1, pageSize: 100 }
      }).catch(error => {
        console.error('Error fetching portfolios:', error);
        return { data: [], meta: { pagination: { page: 1, pageSize: 100, pageCount: 0, total: 0 } } };
      })
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const portfolioPageData: PortfolioPageData | null = (portfolioPageResponse as any)?.data || null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const portfolioListData: PortfolioListData = (portfolioListResponse as any) || { data: [], meta: { pagination: { page: 1, pageSize: 100, pageCount: 0, total: 0 } } };

    // Helper function to map project categories to valid types
    const mapProjectCategory = (categoryName: string | null | undefined): 'exhibition' | 'booth' | 'activation' | 'tour' | 'corporate' | 'creative' | 'education' | 'wedding' => {
      switch (categoryName) {
        case 'Fun':
          return 'creative';
        case 'Party':
          return 'activation';
        case 'Exhibition':
          return 'exhibition';
        case 'Booth':
          return 'booth';
        case 'Tour':
          return 'tour';
        case 'Corporate':
          return 'corporate';
        case 'Education':
          return 'education';
        case 'Wedding':
          return 'wedding';
        default:
          return 'creative';
      }
    };
    const transformedProjects = portfolioListData.data.map((item: PortfolioItem) => ({
      id: item.id.toString(),
      title: item.title,
      slug: item.slug,
      category: mapProjectCategory(item.portfolio_categories?.[0]?.name),
      companyId: 'narvex-main', // Default company ID as required by interface
      company: item.company?.name || 'Unknown Company',
      client: item.client?.name || 'Unknown Client',
      location: item.company?.address ? `${item.company.address.city}, ${item.company.address.province}` : 'Unknown Location',
      date: item.date || new Date(item.createdAt).getFullYear().toString(),
      year: item.date ? parseInt(item.date.split('-')[0]) : new Date(item.createdAt).getFullYear(),
      description: item.excerpt,
      longDescription: item.excerpt,
      services: item.services?.map(service => service.title) || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images: item.gallery?.map((img: any) => getStrapiImageUrl(img, 'medium')) || [],
      tags: item.portfolio_categories?.map(cat => cat.name) || [],
      results: {}, // Will be populated from detailed project data if needed
      featured: item.Highlight || false,
      status: 'completed' as const,
      budget: '',
      duration: '',
      teamSize: 0,
      cover: item.cover,
      linkURL: item.linkURL
    }));

    // Get featured projects from portfolio page data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const featuredProjects = portfolioPageData?.highlight_portofolio?.featuredProjects?.map((project: any) => ({
      id: project.id.toString(),
      title: project.title,
      slug: project.slug,
      category: mapProjectCategory(project.portfolio_categories?.[0]?.name),
      companyId: 'narvex-main', // Default company ID as required by interface
      company: project.company?.name || 'Unknown Company',
      client: project.client?.name || 'Unknown Client',
      location: project.company?.address ? `${project.company.address.city}, ${project.company.address.province}` : 'Unknown Location',
      date: project.date || new Date(project.createdAt).getFullYear().toString(),
      year: project.date ? parseInt(project.date.split('-')[0]) : new Date(project.createdAt).getFullYear(),
      description: project.excerpt,
      longDescription: project.excerpt,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      services: project.services?.map((service: any) => service.title) || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      images: project.gallery?.map((img: any) => getStrapiImageUrl(img, 'medium')) || [],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      tags: project.portfolio_categories?.map((cat: any) => cat.name) || [],
      results: {}, // Will be populated from detailed project data if needed
      featured: project.Highlight || false,
      status: 'completed' as const,
      budget: '',
      duration: '',
      teamSize: 0,
      cover: project.cover,
      linkURL: project.linkURL
    })) || [];

    // Pre-compute filter options
    const portfolioCategories = [
      { id: 'all', name: 'All Categories' },
      ...Array.from(new Set(transformedProjects.map(project => project.category)))
        .map(category => ({ 
          id: category, 
          name: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ').replace('_', ' ')
        }))
    ];
    
    // Get unique years from projects
    const availableYears = [...new Set(transformedProjects.map(project => project.year))]
      .filter(year => year && !isNaN(year))
      .sort((a, b) => b - a);
     
    // Get unique clients from projects
    const availableClients = [...new Set(transformedProjects.map(project => project.client))]
      .filter(client => client && client !== 'Unknown Client');
    
    // Get unique companies from projects (commented out as not used in current implementation)
    // const availableCompanies = [...new Set(transformedProjects.map(project => project.company))];
    
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
        initialProjects={transformedProjects}
        featuredProjects={featuredProjects}
        portfolioPageData={portfolioPageData}
        portfolioCategories={portfolioCategories}
        availableYears={availableYears}
        availableClients={availableClients}
        statusOptions={statusOptions}
      />
    );
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    
    // Fallback to empty data
    return (
      <PortfolioClient 
        initialProjects={[]}
        featuredProjects={[]}
        portfolioPageData={null}
        portfolioCategories={[{ id: 'all', name: 'All Categories' }]}
        availableYears={[]}
        availableClients={[]}
        statusOptions={[{ id: 'all', name: 'All Status' }]}
      />
    );
  }
}