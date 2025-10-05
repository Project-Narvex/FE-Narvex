// Strapi API Helper Functions

import { 
  StrapiImage, 
  HomepageComponent, 
  AboutPageComponent, 
  ServicePageComponent, 
  CompanyPageComponent, 
  PortfolioPageComponent,
  HeroSection,
  CompanyHighlight,
  ServiceHighlight,
  ProjectHighlight,
  TestimonialCarousel,
  ArticleSection,
  ContactSection,
  CollaborationSection,
  AboutHero,
  AboutAspect,
  AboutVisionMission,
  AboutLegal,
  AboutTeamHighlight,
  AboutAwardsSection,
  AboutCompanyCulture,
  ServiceHero,
  ServiceServices,
  ServiceStrengths,
  ServiceContact,
  CompanyHero,
  CompanyPageHighlight,
  PortfolioHero,
  PortfolioHighlight,
  PortfolioExplore
} from './types';

// Helper function to get optimized image URL from Strapi image
export function getStrapiImageUrl(image: StrapiImage, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'): string {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  if (size === 'original') {
    return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  }
  
  const format = image.formats?.[size];
  if (format) {
    return format.url.startsWith('http') ? format.url : `${STRAPI_URL}${format.url}`;
  }
  
  // Fallback to original image if format not available
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
}

// Helper function for automatic logo mapping with better error handling
export function mapStrapiLogo(logoData: any, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium', fallbackText?: string): {
  logoUrl: string | null;
  hasLogo: boolean;
  altText: string;
  fallbackText?: string;
} {
  // Check if logo exists and has proper structure
  if (!logoData || !logoData.url) {
    return {
      logoUrl: null,
      hasLogo: false,
      altText: fallbackText || 'Logo',
      fallbackText: fallbackText || '司'
    };
  }

  try {
    const logoUrl = getStrapiImageUrl(logoData as StrapiImage, size);
    return {
      logoUrl,
      hasLogo: true,
      altText: logoData.alternativeText || logoData.name || fallbackText || 'Logo',
      fallbackText: fallbackText || '司'
    };
  } catch (error) {
    console.warn('Error mapping Strapi logo:', logoData, error);
    return {
      logoUrl: null,
      hasLogo: false,
      altText: fallbackText || 'Logo',
      fallbackText: fallbackText ? fallbackText.slice(0, 3).toUpperCase() : '司'
    };
  }
}

// Helper function for client logo mapping specifically for carousel
export function mapClientLogo(client: any): {
  logoUrl: string | null;
  hasLogo: boolean;
  altText: string;
  fallbackInitials: string;
} {
  const fallbackInitials = client.name 
    ? client.name.split(' ').map((word: string) => word.charAt(0)).join('').toUpperCase().slice(0, 3)
    : 'LOGO';

  if (!client.logo || !client.logo.url) {
    return {
      logoUrl: null,
      hasLogo: false,
      altText: `${client.name || 'Client'} logo`,
      fallbackInitials
    };
  }

  try {
    const logoUrl = getStrapiImageUrl(client.logo as StrapiImage, 'medium');
    return {
      logoUrl,
      hasLogo: true,
      altText: client.logo.alternativeText || client.logo.name || `${client.name} logo`,
      fallbackInitials
    };
  } catch (error) {
    console.warn('Error mapping client logo:', client, error);
    return {
      logoUrl: null,
      hasLogo: false,
      altText: `${client.name || 'Client'} logo`,
      fallbackInitials
    };
  }
}

// Helper function to transform homepage component based on its type
export function transformHomepageComponent(component: any): HomepageComponent {
  switch (component.__component) {
    case 'sections.hero-section':
      return component as HeroSection;
    case 'components.company-highlights':
      return component as CompanyHighlight;
    case 'components.service-highlight':
      return component as ServiceHighlight;
    case 'sections.project-highlights':
      return component as ProjectHighlight;
    case 'sections.testimonial-carousel':
      return component as TestimonialCarousel;
    case 'sections.article':
      return component as ArticleSection;
    case 'sections.contact':
      return component as ContactSection;
    case 'sections.collaboration':
      return component as CollaborationSection;
    default:
      return component as HomepageComponent;
  }
}

// Helper function to transform about page component based on its type
export function transformAboutPageComponent(component: any): AboutPageComponent {
  switch (component.__component) {
    case 'about.hero':
      return component as AboutHero;
    case 'about.aspect':
      return component as AboutAspect;
    case 'about.vision-mission':
      return component as AboutVisionMission;
    case 'about.legal':
      return component as AboutLegal;
    case 'sections.team-highlight':
      return component as AboutTeamHighlight;
    case 'sections.awards-section':
      return component as AboutAwardsSection;
    case 'about.company-culture':
      return component as AboutCompanyCulture;
    default:
      return component as AboutPageComponent;
  }
}

// Helper function to transform service page component based on its type
export function transformServicePageComponent(component: any): ServicePageComponent {
  switch (component.__component) {
    case 'service.hero':
      return component as ServiceHero;
    case 'service.services':
      return component as ServiceServices;
    case 'service.strengths':
      return component as ServiceStrengths;
    case 'sections.contact':
      return component as ServiceContact;
    default:
      return component as ServicePageComponent;
  }
}

// Helper function to transform company page component based on its type
export function transformCompanyPageComponent(component: any): CompanyPageComponent {
  switch (component.__component) {
    case 'service.hero':
      return component as CompanyHero;
    case 'company.company-highlight':
      return component as CompanyPageHighlight;
    default:
      return component as CompanyPageComponent;
  }
}

// Helper function to transform portfolio page component based on its type
export function transformPortfolioPageComponent(component: any): PortfolioPageComponent {
  switch (component.__component) {
    case 'portfolio.hero':
      return component as PortfolioHero;
    case 'portfolio.highlight-portofolio':
      return component as PortfolioHighlight;
    case 'portfolio.portofolio':
      return component as PortfolioExplore;
    default:
      return component as PortfolioPageComponent;
  }
}

// Helper function to get optimized image URL for company logos
export function getCompanyLogoUrl(image: StrapiImage, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'): string {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  // For company logos, prefer medium size for better quality
  if (size === 'original') {
    return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
  }
  
  const format = image.formats?.[size];
  if (format) {
    return format.url.startsWith('http') ? format.url : `${STRAPI_URL}${format.url}`;
  }
  
  // Fallback to original image if format not available
  return image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
}

// Helper function to validate and process service images
export function processServiceImage(imageData: any): {
  hasImage: boolean;
  imageUrl: string | null;
  altText: string;
} {
  if (!imageData || !imageData.url) {
    return {
      hasImage: false,
      imageUrl: null,
      altText: 'Service Image'
    };
  }

  try {
    const imageUrl = getCompanyLogoUrl(imageData as StrapiImage, 'medium');
    return {
      hasImage: true,
      imageUrl,
      altText: imageData.alternativeText || imageData.name || 'Service Image'
    };
  } catch (error) {
    console.warn('Error processing service image:', imageData, error);
    return {
      hasImage: false,
      imageUrl: null,
      altText: 'Service Image'
    };
  }
}

// Helper function to extract text from Strapi rich text content
export function extractTextFromRichText(richTextArray: Array<{
  type: string;
  children: Array<{
    text: string;
    type: string;
  }>;
}>): string {
  return richTextArray
    .map(item => 
      item.children
        .filter(child => child.type === 'text')
        .map(child => child.text)
        .join('')
    )
    .join(' ');
}

// Helper function to extract list items from Strapi rich text content
export function extractListFromRichText(richTextArray: Array<{
  type: string;
  format?: string;
  children: Array<{
    type: string;
    children: Array<{
      text: string;
      type: string;
    }>;
  }>;
}>): string[] {
  return richTextArray
    .filter(item => item.type === 'list')
    .map(item => 
      item.children
        .filter(child => child.type === 'list-item')
        .map(child => 
          child.children
            .filter(grandChild => grandChild.type === 'text')
            .map(grandChild => grandChild.text)
            .join('')
        )
    )
    .flat();
}
