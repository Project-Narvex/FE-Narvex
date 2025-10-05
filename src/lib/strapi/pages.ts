// Strapi API Page Services

import { StrapiAPI } from './base';

const STRAPI_HOME_PAGE_URL = process.env.STRAPI_HOME_PAGE_URL || '/api/home-page?populate=*';
const STRAPI_ABOUT_PAGE_URL = process.env.STRAPI_ABOUT_PAGE_URL || '/api/about-page?populate=*';
const STRAPI_SERVICE_PAGE_URL = process.env.STRAPI_SERVICE_PAGE_URL || '/api/service-page?populate=*';
const STRAPI_COMPANY_PAGE_URL = process.env.STRAPI_COMPANY_PAGE_URL || '/api/company-page?populate=*';
const STRAPI_PORTOFOLIO_PAGE_URL = process.env.STRAPI_PORTOFOLIO_PAGE_URL || '/api/portofolio-page?populate=*';

export class StrapiPageService extends StrapiAPI {
  // Homepage
  async getHomepage() {
    const homepageEndpoint = STRAPI_HOME_PAGE_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/home-page?populate=*';
    return this.requestPage(`${homepageEndpoint}`);
  }

  // About Page
  async getAboutPage() {
    const aboutPageEndpoint = STRAPI_ABOUT_PAGE_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/about-page?populate=*';
    return this.requestPage(`${aboutPageEndpoint}`);
  }

  // Service Page
  async getServicePage() {
    try {
      const servicePageEndpoint = STRAPI_SERVICE_PAGE_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/service-page?populate=*';
      
      console.log('Fetching service page from:', `${this.baseURL}/api${servicePageEndpoint}`);
      
      const data = await this.requestPage(`${servicePageEndpoint}`);
      console.log('Service page API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching service page:', error);
      throw error;
    }
  }

  // Company Page
  async getCompanyPage() {
    try {
      const companyPageEndpoint = STRAPI_COMPANY_PAGE_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/company-page?populate=*';
      
      console.log('Fetching company page from:', `${this.baseURL}/api${companyPageEndpoint}`);
      
      const data = await this.requestPage(`${companyPageEndpoint}`);
      console.log('Company page API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching company page:', error);
      throw error;
    }
  }

  // Portfolio Page
  async getPortfolioPage() {
    try {
      const portfolioPageEndpoint = STRAPI_PORTOFOLIO_PAGE_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/portofolio-page?populate=*';
      
      console.log('Fetching portfolio page from:', `${this.baseURL}/api${portfolioPageEndpoint}`);
      
      const data = await this.requestPage(`${portfolioPageEndpoint}`);
      console.log('Portfolio page API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching portfolio page:', error);
      throw error;
    }
  }
}
