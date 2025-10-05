// Main Strapi API Client - Modular Architecture

import { StrapiPageService } from './strapi/pages';
import { StrapiContentService } from './strapi/content';

// Re-export all types
export * from './strapi/types';

// Re-export all helpers
export * from './strapi/helpers';

// Re-export base utilities
export * from './strapi/base';

// Create service instances
const contentService = new StrapiContentService();

// Combined API client that provides all services
class CombinedStrapiAPI extends StrapiPageService {
  // Page services (inherited from StrapiPageService)
  
  // Content services
  getCompanies = contentService.getCompanies.bind(contentService);
  getCompanyBySlug = contentService.getCompanyBySlug.bind(contentService);
  getProjects = contentService.getProjects.bind(contentService);
  getFeaturedProjects = contentService.getFeaturedProjects.bind(contentService);
  getProjectsByCompany = contentService.getProjectsByCompany.bind(contentService);
  getPortfolios = contentService.getPortfolios.bind(contentService);
  getBlogArticles = contentService.getBlogArticles.bind(contentService);
  getFeaturedArticles = contentService.getFeaturedArticles.bind(contentService);
  getRecentArticles = contentService.getRecentArticles.bind(contentService);
}

// Create a default instance
export const strapi = new CombinedStrapiAPI();

// Export the class for custom instances
export { CombinedStrapiAPI as StrapiAPI };

// Export individual services for specific use cases
export { StrapiPageService, StrapiContentService };