export interface Company {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  website?: string;
  email: string;
  phone: string;
  whatsapp: string;
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  };
  services: string[];
  established?: string;
  location: string;
  color: string;
  isParent?: boolean;
}

export const companies: Company[] = [
  {
    id: 'narvex',
    name: 'CV. Nara Exhibition Indonesia',
    tagline: 'Your Trusted MICE & Event Production Partner',
    description: 'Perusahaan induk yang menaungi ekosistem layanan kreatif terintegrasi, mengkhususkan diri dalam MICE services, event production, dan solusi kreatif komprehensif.',
    email: 'narvex.ind@gmail.com',
    phone: '+62 xxx xxxx xxxx',
    whatsapp: '+62 xxx xxxx xxxx',
    website: 'narvex.id',
    social: {
      instagram: '@narvex.id',
      linkedin: 'narvex-indonesia'
    },
    services: [
      'MICE Services',
      'Event Organization',
      'Equipment Rental',
      'Furniture Production',
      'Integrated Solutions'
    ],
    established: '2020',
    location: 'Jakarta, Indonesia',
    color: 'bg-blue-900',
    isParent: true
  },
  {
    id: 'skywork',
    name: 'Skywork.id',
    tagline: 'Bekerja dengan Seni',
    description: 'Platform kreatif yang menghadirkan solusi desain dan branding dengan pendekatan artistik yang unik.',
    email: 'hello@skywork.id',
    phone: '+62 xxx xxxx xxxx',
    whatsapp: '+62 xxx xxxx xxxx',
    website: 'skywork.id',
    social: {
      instagram: '@skywork.id',
      linkedin: 'skywork-id'
    },
    services: [
      'Brand Identity Design',
      'Logo & Visual Identity',
      'Print Design',
      'Digital Design',
      'Packaging Design',
      'Marketing Materials',
      'Social Media Design',
      'Creative Consultation'
    ],
    established: '2022',
    location: 'Jakarta, Indonesia',
    color: 'bg-blue-500'
  },
  {
    id: 'gutama',
    name: 'Gutama Learning',
    tagline: 'Empowering Through Education',
    description: 'Platform pembelajaran yang menyediakan program edukasi dan training berkualitas untuk pengembangan skill.',
    email: 'info@gutamalearning.com',
    phone: '+62 xxx xxxx xxxx',
    whatsapp: '+62 xxx xxxx xxxx',
    website: 'gutamalearning.com',
    social: {
      instagram: '@gutamalearning',
      linkedin: 'gutama-learning'
    },
    services: [
      'Professional Training',
      'Skill Development Programs',
      'Corporate Training',
      'Online Courses',
      'Workshop & Seminar',
      'Certification Programs',
      'Learning Resources',
      'Educational Consultation'
    ],
    established: '2022',
    location: 'Jakarta, Indonesia',
    color: 'bg-green-500'
  },
  {
    id: 'creativework',
    name: 'CreativeWork',
    tagline: 'Creative Solutions for Modern Business',
    description: 'Layanan kreatif komprehensif untuk solusi branding, desain, dan strategi kreatif bisnis modern.',
    email: 'hello@creativework.id',
    phone: '+62 xxx xxxx xxxx',
    whatsapp: '+62 xxx xxxx xxxx',
    website: 'creativework.id',
    social: {
      instagram: '@creativesky.id',
      linkedin: 'creativework-id'
    },
    services: [
      'Creative Strategy',
      'Brand Development',
      'Creative Campaign',
      'Content Creation',
      'Creative Direction',
      'Design Thinking Workshop',
      'Innovation Consultation',
      'Creative Solutions'
    ],
    established: '2022',
    location: 'Jakarta, Indonesia',
    color: 'bg-purple-500'
  },
  {
    id: 'evervow',
    name: 'Evervow.wo',
    tagline: 'Creating Magical Wedding Moments',
    description: 'Spesialis wedding planning dan production yang menghadirkan momen pernikahan yang tak terlupakan.',
    email: 'hello@evervow.wo',
    phone: '+62 xxx xxxx xxxx',
    whatsapp: '+62 xxx xxxx xxxx',
    website: 'evervow.wo',
    social: {
      instagram: '@evervow.wo',
      linkedin: 'evervow-wo'
    },
    services: [
      'Wedding Planning',
      'Wedding Decoration',
      'Venue Selection',
      'Catering Coordination',
      'Photography & Videography',
      'Entertainment Management',
      'Wedding Consultation',
      'Honeymoon Planning'
    ],
    established: '2022',
    location: 'Jakarta, Indonesia',
    color: 'bg-pink-500'
  }
];

export const getCompanyById = (id: string): Company | undefined => {
  return companies.find(company => company.id === id);
};

export const getCompanies = (): Company[] => {
  return companies.filter(company => !company.isParent);
};

export const getParentCompany = (): Company | undefined => {
  return companies.find(company => company.isParent);
};