import React from 'react';
import AboutClient from '@/components/pages/about/about-client';
import { getAboutPageData, getHeroSection, getAspectSection, getVisionMissionSection, getTeamSection, getAwardsSection, getCompanyCultureSection, getLegalSection, extractTextFromRichText, extractVisionText, extractMissionContent, getImageUrl } from '@/lib/about-page-data';
import { teamMembers, getLeadershipTeam, getTeamByCompany } from '@/data/team';
import { companies, getParentCompany } from '@/data/companies';

// This is now an async Server Component
export default async function AboutPage() {
  // Fetch about page data from Strapi API
  const aboutPageData = await getAboutPageData();
  
  // Log the data for debugging
  console.log('🏢 About page data received:', {
    hasData: !!aboutPageData,
    dataId: aboutPageData?.id,
    pageContentCount: aboutPageData?.pageContent?.length || 0
  });
  
  // If no data from API, show error message
  if (!aboutPageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load About Page Data
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
  const heroSection = getHeroSection(aboutPageData);
  const aspectSection = getAspectSection(aboutPageData);
  const visionMissionSection = getVisionMissionSection(aboutPageData);
  const teamSection = getTeamSection(aboutPageData);
  const awardsSection = getAwardsSection(aboutPageData);
  const companyCultureSection = getCompanyCultureSection(aboutPageData);
  const legalSection = getLegalSection(aboutPageData);

  // Fallback data from local files
  const parentCompany = getParentCompany();
  const allCompanies = companies;
  const leadershipTeam = getLeadershipTeam();
  const narvexTeam = getTeamByCompany('narvex');
  const allTeamMembers = teamMembers;
  
  // Pre-compute company statistics
  const companyStats = {
    totalCompanies: allCompanies.length,
    establishedYear: parentCompany?.established || '2020',
    totalTeamMembers: allTeamMembers.length,
    leadershipCount: leadershipTeam.length
  };
  
  // Company vision and mission data from API or fallback
  const companyInfo = {
    vision: visionMissionSection?.vision ? extractVisionText(visionMissionSection.vision.description) : "Menjadi perusahaan creative services terdepan di Indonesia yang memberikan solusi inovatif dan berkualitas tinggi untuk membantu klien mencapai kesuksesan bisnis mereka.",
    mission: visionMissionSection?.mission ? extractMissionContent(visionMissionSection.mission.description) : [
      { type: 'bullet', content: "Memberikan layanan creative services berkualitas tinggi dengan pendekatan profesional dan inovatif" },
      { type: 'bullet', content: "Membantu klien membangun brand identity yang kuat dan memorable" },
      { type: 'bullet', content: "Menghadirkan event production yang memorable dan impactful" },
      { type: 'bullet', content: "Mengoptimalkan digital presence klien melalui strategi digital marketing yang efektif" }
    ],
    values: aspectSection ? [
      aspectSection.aspect1 ? { title: aspectSection.aspect1.title, description: aspectSection.aspect1.description } : null,
      aspectSection.aspect2 ? { title: aspectSection.aspect2.title, description: aspectSection.aspect2.description } : null,
      aspectSection.aspect3 ? { title: aspectSection.aspect3.title, description: aspectSection.aspect3.description } : null,
      aspectSection.aspect4 ? { title: aspectSection.aspect4.title, description: aspectSection.aspect4.description } : null,
    ].filter(Boolean) : [
      { title: "Innovation", description: "Selalu mencari cara baru dan kreatif dalam setiap project" },
      { title: "Quality", description: "Berkomitmen memberikan hasil terbaik dengan standar tinggi" },
      { title: "Collaboration", description: "Bekerja sama dengan klien untuk mencapai tujuan bersama" },
      { title: "Integrity", description: "Menjaga kepercayaan dan transparansi dalam setiap kerjasama" }
    ]
  };

  return (
    <AboutClient 
      aboutPageData={aboutPageData}
      heroSection={heroSection}
      aspectSection={aspectSection}
      visionMissionSection={visionMissionSection}
      teamSection={teamSection}
      awardsSection={awardsSection}
      companyCultureSection={companyCultureSection}
      legalSection={legalSection}
      parentCompany={parentCompany}
      leadershipTeam={leadershipTeam}
      companyStats={companyStats}
      companyInfo={companyInfo}
    />
  );
}