import React from 'react';
import ServicesClient from '@/components/pages/services/services-client';

// This is now a Server Component
export default function ServicesPage() {
  const services = [
    {
      icon: "palette",
      title: "Creative Design & Branding",
      subtitle: "Brand Identity, Graphic Design, Visual Communication",
      description: "Layanan komprehensif untuk membangun brand identity yang kuat dan memorable melalui strategi kreatif yang tepat sasaran.",
      features: [
        "Brand Identity Development",
        "Logo Design & Brand Guidelines",
        "Marketing Materials Design",
        "Packaging Design",
        "Visual Communication",
        "Brand Strategy & Positioning"
      ],
      color: "bg-blue-500"
    },
    {
      icon: "calendar",
      title: "Event Production",
      subtitle: "Corporate Events, Product Launches, Conferences",
      description: "Event production yang memorable dan impactful dengan eksekusi yang sempurna dari perencanaan hingga pelaksanaan.",
      features: [
        "Event Planning & Coordination",
        "Stage Design & Decoration",
        "Event Management",
        "Audio Visual Equipment",
        "Live Streaming & Documentation",
        "Vendor Coordination"
      ],
      color: "bg-gold-500"
    },
    {
      icon: "smartphone",
      title: "Digital Marketing",
      subtitle: "Social Media, SEO, Digital Advertising, Website Development",
      description: "Strategi digital marketing yang efektif dan terukur untuk mengoptimalkan digital presence dan mencapai target audience.",
      features: [
        "Social Media Management",
        "Search Engine Optimization (SEO)",
        "Google Ads & Facebook Ads",
        "Content Marketing & Copywriting",
        "Website Development",
        "Digital Strategy & Analytics"
      ],
      color: "bg-blue-500"
    },
    {
      icon: "users",
      title: "Brand Consultation",
      subtitle: "Strategic Planning, Brand Positioning, Competitive Analysis",
      description: "Konsultasi strategis untuk membantu klien membangun brand yang kuat dengan positioning yang tepat di pasar.",
      features: [
        "Brand Positioning Strategy",
        "Competitive Analysis",
        "Market Research & Insights",
        "Brand Messaging Development",
        "Creative Strategy Planning",
        "Brand Performance Evaluation"
      ],
      color: "bg-gold-600"
    }
  ];

  return <ServicesClient services={services} />;
}