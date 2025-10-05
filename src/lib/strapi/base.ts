// Strapi API Base Client

import { StrapiResponse, StrapiEntity } from './types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export class StrapiAPI {
  private baseURL: string;
  private token?: string;

  constructor(baseURL: string = STRAPI_URL, token?: string) {
    this.baseURL = baseURL;
    this.token = token || STRAPI_TOKEN;
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  protected async requestPage<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  protected buildQueryParams(params?: {
    populate?: string[];
    filters?: Record<string, unknown>;
    sort?: string[];
    pagination?: { page: number; pageSize: number };
  }): string {
    const searchParams = new URLSearchParams();
    
    if (params?.populate) {
      params.populate.forEach(field => {
        searchParams.append('populate', field);
      });
    }
    
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        searchParams.append(`filters[${key}]`, String(value));
      });
    }
    
    if (params?.sort) {
      params.sort.forEach(field => {
        searchParams.append('sort', field);
      });
    }
    
    if (params?.pagination) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }

    return searchParams.toString();
  }
}

// Helper function to transform Strapi entity to flat object
export function transformStrapiEntity<T>(entity: StrapiEntity): T & { id: number } {
  return {
    id: entity.id,
    ...entity.attributes,
  } as T & { id: number };
}

// Helper function to transform array of Strapi entities
export function transformStrapiEntities<T>(entities: StrapiEntity[]): (T & { id: number })[] {
  return entities.map(entity => transformStrapiEntity<T>(entity));
}
