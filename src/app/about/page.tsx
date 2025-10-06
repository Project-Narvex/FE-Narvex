import React from 'react';
import AboutPageClient from '@/components/pages/about/about-client-api';
import { strapi, StrapiResponse } from '@/lib/strapi';
import { AboutPageData } from '@/lib/strapi';

// This is now a Server Component
export default async function AboutPage() {
  let aboutData: AboutPageData | null = null;
  
  try {
    // Fetch about page data from Strapi API
    const response = await strapi.getAboutPage() as StrapiResponse<AboutPageData>;
    aboutData = response.data;
  } catch (error) {
    console.error('Error fetching about page data:', error);
    // Fallback to static data if API fails
    aboutData = {
      id: 9,
      documentId: "axd488i56suzqck4wowcy8lj",
      createdAt: "2025-10-03T15:21:26.455Z",
      updatedAt: "2025-10-03T15:42:11.534Z",
      publishedAt: "2025-10-03T15:42:11.975Z",
      pageContent: [
        {
          __component: "about.hero",
          id: 9,
          title: "Tentang Narvex",
          description: "CV. Nara Exhibition Indonesia - Partner Terpercaya untuk Creative Services, Event Production, dan Digital Marketing"
        }
      ],
      seo: []
    };
  }

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Halaman Tidak Tersedia</h1>
          <p className="text-gray-600">Data halaman about sedang tidak dapat diakses.</p>
        </div>
      </div>
    );
  }

  return <AboutPageClient aboutData={aboutData} />;
}