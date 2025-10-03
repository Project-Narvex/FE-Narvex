import React from 'react';
import ServicesClient from '@/components/pages/services/services-client';
import { getServicePageData, getHeroSection, getServicesSection, getStrengthsSection, getContactSection, extractServiceDescription } from '@/lib/service-page-data';

// This is now an async Server Component
export default async function ServicesPage() {
  // Fetch service page data from Strapi API
  const servicePageData = await getServicePageData();
  
  // Log the data for debugging
  console.log('🛠️ Service page data received:', {
    hasData: !!servicePageData,
    dataId: servicePageData?.id,
    pageContentCount: servicePageData?.pageContent?.length || 0
  });
  
  // If no data from API, show error message
  if (!servicePageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Service Page Data
          </h1>
          <p className="text-gray-600 mb-4">
            There was an error fetching data from the API. Please check your connection and try again.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Extract sections from API data
  const heroSection = getHeroSection(servicePageData);
  const servicesSection = getServicesSection(servicePageData);
  const strengthsSection = getStrengthsSection(servicePageData);
  const contactSection = getContactSection(servicePageData);

  // Transform API data to match existing component structure
  const services = servicesSection?.services?.map((service, index) => ({
    icon: "palette", // We'll use the actual icon from API
    title: service.title,
    subtitle: service.Subtitle || '',
    description: service.description.split('\n\n')[0] || service.description, // Get first paragraph
    features: extractServiceDescription(service.description),
    color: index % 2 === 0 ? "bg-blue-500" : "bg-gold-500", // Alternate colors
    apiData: service // Keep original API data for icon access
  })) || [];

  return (
    <ServicesClient 
      servicePageData={servicePageData}
      heroSection={heroSection}
      servicesSection={servicesSection}
      strengthsSection={strengthsSection}
      contactSection={contactSection}
      services={services}
    />
  );
}