import React from 'react';
import CompaniesClient from '@/components/pages/companies/companies-client';
import { strapi, transformCompanyPageComponent, extractListFromRichText, getStrapiImageUrl } from '@/lib/strapi';
import type { CompanyPageData, CompanyHero, CompanyHighlight } from '@/lib/strapi';

// This is now a Server Component
export default async function CompaniesPage() {
  try {
    const companyPageData: any = await strapi.getCompanyPage();
    
    // Debug: Log the API response structure
    console.log('Company Page API Response:', JSON.stringify(companyPageData, null, 2));
    
    // Check if we have the expected data structure
    if (!companyPageData || !companyPageData.data) {
      throw new Error('Invalid API response structure');
    }
    
    // Extract the actual page data
    const pageData = companyPageData.data;
    
    // Check if pageContent exists
    if (!pageData.pageContent || !Array.isArray(pageData.pageContent)) {
      throw new Error('pageContent not found or not an array');
    }
    
    // Transform components
    const components = pageData.pageContent.map(transformCompanyPageComponent);
    
    // Extract hero section
    const heroSection = components.find(comp => comp.__component === 'service.hero') as CompanyHero;
    
    // Extract company highlight section
    const companyHighlightSection = components.find(comp => comp.__component === 'company.company-highlight') as CompanyHighlight;
    
    // Transform company data to match the expected format
    const companies = companyHighlightSection?.Company?.map((companyData) => {
      // Extract services from rich text
      const services = extractListFromRichText(companyData.services.description);
      
      // Transform portfolio data
      const portfolio = companyData.company.portofolios?.map(portfolio => ({
        title: portfolio.title,
        category: portfolio.portfolio_categories?.[0]?.name || 'General'
      })) || [];
      
      // Transform clients data
      const clients = companyData.company.clients?.map(client => client.name) || [];
      
      // Get company logo URL
      const logoUrl = companyData.company.logo ? getStrapiImageUrl(companyData.company.logo, 'medium') : null;
      
      return {
        id: companyData.company.slug,
        name: companyData.title,
        tagline: companyData.Subtitle,
        description: companyData.description,
        icon: "palette", // Default icon, can be customized based on company type
        color: 'bg-blue-500', // Default color, can be customized
        instagram: companyData.company.socials?.instagram || '',
        website: companyData.company.socials?.instagram || '', // Using instagram as website fallback
        services: services,
        portfolio: portfolio,
        clients: clients,
        logoUrl: logoUrl,
        phone: companyData.company.phone_number,
        address: companyData.company.address ? 
          `${companyData.company.address.address}, ${companyData.company.address.city}, ${companyData.company.address.province}` : 
          '',
        socials: companyData.company.socials
      };
    }) || [];
    
    return (
      <CompaniesClient 
        companies={companies}
        heroSection={heroSection}
        companyHighlightSection={companyHighlightSection}
      />
    );
    
  } catch (error) {
    console.error('Error fetching company page data:', error);
    
    // Fallback to static data if API fails
    const fallbackCompanies = [
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
      }
    ];
    
    return <CompaniesClient companies={fallbackCompanies} />;
  }
}