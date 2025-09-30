import React from 'react';
import AboutClient from '@/components/pages/about/about-client';
import { teamMembers, getLeadershipTeam, getTeamByCompany } from '@/data/team';
import { companies, getParentCompany } from '@/data/companies';

// This is now a Server Component
export default function AboutPage() {
  // Pre-compute data on the server
  const parentCompany = getParentCompany();
  const allCompanies = companies;
  
  // Get team data
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
  
  // Company vision and mission data
  const companyInfo = {
    vision: "Menjadi perusahaan creative services terdepan di Indonesia yang memberikan solusi inovatif dan berkualitas tinggi untuk membantu klien mencapai kesuksesan bisnis mereka.",
    mission: [
      "Memberikan layanan creative services berkualitas tinggi dengan pendekatan profesional dan inovatif",
      "Membantu klien membangun brand identity yang kuat dan memorable", 
      "Menghadirkan event production yang memorable dan impactful",
      "Mengoptimalkan digital presence klien melalui strategi digital marketing yang efektif"
    ],
    values: [
      { title: "Innovation", description: "Selalu mencari cara baru dan kreatif dalam setiap project" },
      { title: "Quality", description: "Berkomitmen memberikan hasil terbaik dengan standar tinggi" },
      { title: "Collaboration", description: "Bekerja sama dengan klien untuk mencapai tujuan bersama" },
      { title: "Integrity", description: "Menjaga kepercayaan dan transparansi dalam setiap kerjasama" }
    ]
  };

  return (
    <AboutClient 
      parentCompany={parentCompany}
      leadershipTeam={leadershipTeam}
      companyStats={companyStats}
      companyInfo={companyInfo}
    />
  );
}