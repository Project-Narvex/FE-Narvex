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
export function mapStrapiLogo(logoData: unknown, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium', fallbackText?: string): {
  logoUrl: string | null;
  hasLogo: boolean;
  altText: string;
  fallbackText?: string;
} {
  // Check if logo exists and has proper structure
  if (!logoData || typeof logoData !== 'object' || !(logoData as Record<string, unknown>).url) {
    return {
      logoUrl: null,
      hasLogo: false,
      altText: fallbackText || 'Logo',
      fallbackText: fallbackText || '司'
    };
  }

  try {
    const logoObj = logoData as Record<string, unknown>;
    const logoUrl = getStrapiImageUrl(logoData as StrapiImage, size);
    return {
      logoUrl,
      hasLogo: true,
      altText: (logoObj.alternativeText as string) || (logoObj.name as string) || fallbackText || 'Logo',
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
export function mapClientLogo(client: unknown): {
  logoUrl: string | null;
  hasLogo: boolean;
  altText: string;
  fallbackInitials: string;
} {
  const clientObj = client as Record<string, unknown>;
  const fallbackInitials = clientObj.name && typeof clientObj.name === 'string'
    ? clientObj.name.split(' ').map((word: string) => word.charAt(0)).join('').toUpperCase().slice(0, 3)
    : 'LOGO';

  if (!clientObj.logo || typeof clientObj.logo !== 'object' || !(clientObj.logo as Record<string, unknown>).url) {
    return {
      logoUrl: null,
      hasLogo: false,
      altText: `${(clientObj.name as string) || 'Client'} logo`,
      fallbackInitials
    };
  }

  try {
    const logoUrl = getStrapiImageUrl(clientObj.logo as StrapiImage, 'medium');
    return {
      logoUrl,
      hasLogo: true,
      altText: (clientObj.logo as Record<string, unknown>).alternativeText as string || (clientObj.logo as Record<string, unknown>).name as string || `${(clientObj.name as string) || 'Client'} logo`,
      fallbackInitials
    };
  } catch (error) {
    console.warn('Error mapping client logo:', clientObj, error);
    return {
      logoUrl: null,
      hasLogo: false,
      altText: `${(clientObj.name as string) || 'Client'} logo`,
      fallbackInitials
    };
  }
}

// Helper function to transform homepage component based on its type
export function transformHomepageComponent(component: unknown): HomepageComponent {
  const comp = component as Record<string, unknown>;
  switch (comp.__component) {
    case 'sections.hero-section':
      return comp as HeroSection;
    case 'components.company-highlights':
      return comp as CompanyHighlight;
    case 'components.service-highlight':
      return comp as ServiceHighlight;
    case 'sections.project-highlights':
      return comp as ProjectHighlight;
    case 'sections.testimonial-carousel':
      return comp as TestimonialCarousel;
    case 'sections.article':
      return comp as ArticleSection;
    case 'sections.contact':
      return comp as ContactSection;
    case 'sections.collaboration':
      return comp as CollaborationSection;
    default:
      return comp as HomepageComponent;
  }
}

// Helper function to transform about page component based on its type
export function transformAboutPageComponent(component: unknown): AboutPageComponent {
  const comp = component as Record<string, unknown>;
  switch (comp.__component) {
    case 'about.hero':
      return comp as AboutHero;
    case 'about.aspect':
      return comp as AboutAspect;
    case 'about.vision-mission':
      return comp as AboutVisionMission;
    case 'about.legal':
      return comp as AboutLegal;
    case 'sections.team-highlight':
      return comp as AboutTeamHighlight;
    case 'sections.awards-section':
      return comp as AboutAwardsSection;
    case 'about.company-culture':
      return comp as AboutCompanyCulture;
    default:
      return comp as AboutPageComponent;
  }
}

// Helper function to transform service page component based on its type
export function transformServicePageComponent(component: unknown): ServicePageComponent {
  const comp = component as Record<string, unknown>;
  switch (comp.__component) {
    case 'service.hero':
      return comp as ServiceHero;
    case 'service.services':
      return comp as ServiceServices;
    case 'service.strengths':
      return comp as ServiceStrengths;
    case 'sections.contact':
      return comp as ServiceContact;
    default:
      return comp as ServicePageComponent;
  }
}

// Helper function to transform company page component based on its type
export function transformCompanyPageComponent(component: unknown): CompanyPageComponent {
  const comp = component as Record<string, unknown>;
  switch (comp.__component) {
    case 'service.hero':
      return comp as CompanyHero;
    case 'company.company-highlight':
      return comp as CompanyPageHighlight;
    default:
      return comp as CompanyPageComponent;
  }
}

// Helper function to transform portfolio page component based on its type
export function transformPortfolioPageComponent(component: unknown): PortfolioPageComponent {
  const comp = component as Record<string, unknown>;
  switch (comp.__component) {
    case 'portfolio.hero':
      return comp as PortfolioHero;
    case 'portfolio.highlight-portofolio':
      return comp as PortfolioHighlight;
    case 'portfolio.portofolio':
      return comp as PortfolioExplore;
    default:
      return comp as PortfolioPageComponent;
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
export function processServiceImage(imageData: unknown): {
  hasImage: boolean;
  imageUrl: string | null;
  altText: string;
} {
  if (!imageData || typeof imageData !== 'object' || !(imageData as Record<string, unknown>).url) {
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
      altText: (imageData as Record<string, unknown>).alternativeText as string || (imageData as Record<string, unknown>).name as string || 'Service Image'
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
