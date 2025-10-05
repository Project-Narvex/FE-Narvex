// Strapi API Content Services

import { StrapiAPI } from './base';

const STRAPI_PORTOFOLIO_URL = process.env.STRAPI_PORTOFOLIO_URL || '/api/portofolios?populate=*';

export class StrapiContentService extends StrapiAPI {
  // Companies
  async getCompanies(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const query = this.buildQueryParams(params);
    return this.request(`/companies${query ? `?${query}` : ''}`);
  }

  async getCompanyBySlug(slug: string) {
    return this.request(`/companies?filters[slug][$eq]=${slug}&populate=*`);
  }

  // Projects
  async getProjects(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const query = this.buildQueryParams(params);
    return this.request(`/projects${query ? `?${query}` : ''}`);
  }

  async getFeaturedProjects() {
    return this.request('/projects?filters[featured][$eq]=true&populate=*&sort=date:desc');
  }

  async getProjectsByCompany(companySlug: string) {
    return this.request(`/projects?filters[company][slug][$eq]=${companySlug}&populate=*`);
  }

  // Portfolio List
  async getPortfolios(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    try {
      const portfolioEndpoint = STRAPI_PORTOFOLIO_URL.replace(process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337', '').replace('/api', '') || '/portofolios?populate=*';
      
      const query = this.buildQueryParams(params);
      const url = `${portfolioEndpoint}${query ? `?${query}` : ''}`;
      
      console.log('Fetching portfolios from:', `${this.baseURL}/api${url}`);
      
      const data = await this.requestPage(url);
      console.log('Portfolios API response:', data);
      return data;
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      throw error;
    }
  }

  // Blog Articles
  async getBlogArticles(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }) {
    const query = this.buildQueryParams(params);
    return this.request(`/blog-articles${query ? `?${query}` : ''}`);
  }

  async getFeaturedArticles() {
    return this.request('/blog-articles?filters[featured][$eq]=true&populate=*&sort=publishDate:desc');
  }

  async getRecentArticles(limit: number = 5) {
    return this.request(`/blog-articles?populate=*&sort=publishDate:desc&pagination[pageSize]=${limit}`);
  }
}
