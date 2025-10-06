import React from 'react';
import CompaniesClient from '@/components/pages/companies/companies-client';
import { strapi, transformCompanyPageComponent, extractListFromRichText, getStrapiImageUrl, transformHomepageComponent } from '@/lib/strapi';
import type { CompanyHero, CompanyHighlight, StrapiResponse, CompanyPageData, ContactSection } from '@/lib/strapi';

// This is now a Server Component
export default async function CompaniesPage() {
  try {
    // Fetch both company page data AND homepage data
    const companyPageData = await strapi.getCompanyPage() as StrapiResponse<CompanyPageData>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const homepageData = await strapi.getHomepage() as any;
    
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const companies = (companyHighlightSection as any)?.Company?.map((companyData: any) => {
      // Extract services from rich text
      const services = extractListFromRichText(companyData.services.description);
      
      // Transform portfolio data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const portfolio = companyData.company.portofolios?.map((portfolio: any) => ({
        title: portfolio.title,
        category: portfolio.portfolio_categories?.[0]?.name || 'General'
      })) || [];
      
      // Transform clients data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const clients = companyData.company.clients?.map((client: any) => client.name) || [];
      
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
    
    // Extract contact section FROM HOMEPAGE (not from company page)
    let contactSection: ContactSection | undefined;
    
    // Process homepage data to get contactSection
    if (homepageData) {
      let homepageEntity;
      if (homepageData.data) {
        homepageEntity = Array.isArray(homepageData.data) ? homepageData.data[0] : homepageData.data;
      } else if (homepageData.id) {
        homepageEntity = homepageData;
      }
      
      if (homepageEntity && homepageEntity.pageContent) {
        const homepageComponents = homepageEntity.pageContent.map(transformHomepageComponent);
        contactSection = homepageComponents.find(c => c.__component === 'sections.contact') as ContactSection;
      }
    }
    
    // Extract integration data from company page API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const integrationData: any = {
      title: pageData.integration?.title || '',
      description: pageData.integration?.description || '',
      cards: []
    };
    
    // Build cards array from card_1, card_2, card_3, card_4
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cardFields = ['card_1', 'card_2', 'card_3', 'card_4'] as const;
    cardFields.forEach((fieldName) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const card = (pageData as any)[fieldName];
      if (card && card.title) {
        // Extract text from rich text description
        let descriptionText = '';
        if (card.description && Array.isArray(card.description)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          card.description.forEach((block: any) => {
            if (block.type === 'paragraph' && block.children) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              block.children.forEach((child: any) => {
                if (child.text) {
                  descriptionText += child.text;
                }
              });
            }
          });
        }
        
        integrationData.cards.push({
          title: card.title,
          description: descriptionText,
          logo: card.logo ? getStrapiImageUrl(card.logo, 'thumbnail') : null
        });
      }
    });
    
    return (
      <CompaniesClient 
        companies={companies}
        heroSection={heroSection}
        companyHighlightSection={companyHighlightSection}
        contactSection={contactSection}
        integrationData={integrationData}
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