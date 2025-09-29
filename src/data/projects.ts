export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'exhibition' | 'booth' | 'activation' | 'tour' | 'corporate' | 'creative' | 'education' | 'wedding';
  companyId: string;
  client: string;
  location: string;
  date: string;
  year: number;
  description: string;
  longDescription?: string;
  services: string[];
  images: string[];
  gallery?: string[]; // Additional gallery images for detailed view
  tags: string[];
  results?: {
    [key: string]: string;
  };
  featured: boolean;
  status: 'completed' | 'ongoing' | 'upcoming';
  budget?: string;
  duration?: string;
  teamSize?: number;
  // CMS-compatible fields for detailed views
  challenges?: string[]; // Project challenges faced
  solutions?: string[]; // Solutions implemented
  timeline?: {
    phase: string;
    description: string;
    date: string;
    completed: boolean;
  }[];
  testimonials?: {
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
  }[];
  technologies?: string[]; // Technologies or tools used
  objectives?: string[]; // Project objectives
  deliverables?: string[]; // Project deliverables
  relatedProjects?: string[]; // IDs of related projects
  seoTitle?: string; // SEO optimized title
  seoDescription?: string; // SEO meta description
  ogImage?: string; // Open Graph image for social sharing
}

export const projects: Project[] = [
  // Narvex Projects
  {
    id: 'jbbi-expo-2023',
    title: 'JBBI Expo & Seminar Nasional',
    slug: 'jbbi-expo-seminar-nasional-bandung',
    category: 'exhibition',
    companyId: 'narvex',
    client: 'JBBI (Jaringan Bisnis Berkelanjutan Indonesia)',
    location: 'Grand Ballroom Sudirman, Bandung',
    date: '2023-09-15',
    year: 2023,
    description: 'Penyelenggaraan expo dan seminar nasional dengan tema sustainability dan bisnis berkelanjutan.',
    longDescription: 'Event berskala nasional yang menggabungkan exhibition dan seminar dengan fokus pada sustainability dan bisnis berkelanjutan. Melibatkan 50+ exhibitor dan 500+ peserta dari berbagai industri.',
    services: ['Event Management', 'Exhibition Design', 'Audio Visual', 'Registration System', 'Catering Management'],
    images: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&crop=center'],
    gallery: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop&crop=center', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop&crop=center', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&h=800&fit=crop&crop=center', 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=800&fit=crop&crop=center'],
    tags: ['Exhibition', 'Sustainability', 'Business', 'Seminar'],
    results: {
      participants: '500+',
      exhibitors: '50+',
      satisfaction: '95%',
      mediaReach: '100K+'
    },
    featured: true,
    status: 'completed',
    duration: '3 days',
    teamSize: 15,
    challenges: [
      'Koordinasi dengan 50+ exhibitor dari berbagai industri',
      'Mengatur sistem registrasi untuk 500+ peserta',
      'Memastikan tema sustainability terintegrasi di seluruh event'
    ],
    solutions: [
      'Implementasi sistem manajemen exhibitor digital',
      'Penggunaan QR code untuk registrasi dan check-in',
      'Desain booth dan materi yang eco-friendly'
    ],
    timeline: [
      {
        phase: 'Planning & Preparation',
        description: 'Perencanaan konsep, koordinasi dengan exhibitor, dan persiapan venue',
        date: '2023-07-01',
        completed: true
      },
      {
        phase: 'Setup & Installation',
        description: 'Setup booth, instalasi audio visual, dan persiapan final',
        date: '2023-09-13',
        completed: true
      },
      {
        phase: 'Event Execution',
        description: 'Pelaksanaan expo dan seminar selama 3 hari',
        date: '2023-09-15',
        completed: true
      }
    ],
    testimonials: [
      {
        name: 'Dr. Sari Wijaya',
        role: 'Director',
        company: 'JBBI',
        content: 'Narvex berhasil mengorganisir event yang luar biasa. Profesionalisme dan perhatian terhadap detail sangat mengesankan.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face'
      }
    ],
    technologies: ['Digital Registration System', 'QR Code Technology', 'Live Streaming Platform', 'Audio Visual Equipment'],
    objectives: [
      'Meningkatkan awareness tentang bisnis berkelanjutan',
      'Memfasilitasi networking antar pelaku bisnis',
      'Showcase produk dan layanan berkelanjutan'
    ],
    deliverables: [
      'Event management lengkap selama 3 hari',
      'Koordinasi 50+ exhibitor',
      'Sistem registrasi digital',
      'Dokumentasi foto dan video event'
    ],
    relatedProjects: ['spg-kefii-booth-2023', 'activity-camel-2023'],
    seoTitle: 'JBBI Expo & Seminar Nasional - Sustainability Business Exhibition',
    seoDescription: 'Event expo dan seminar nasional bertema sustainability dan bisnis berkelanjutan dengan 50+ exhibitor dan 500+ peserta di Bandung.',
    ogImage: '/images/projects/jbbi-expo-og.jpg'
  },
  {
    id: 'spg-kefii-booth-2023',
    title: 'SPG Kefii Booth',
    slug: 'spg-kefii-booth-grand-city-mall',
    category: 'booth',
    companyId: 'narvex',
    client: 'Kefii',
    location: 'Grand City Mall, Surabaya',
    date: '2023-08-20',
    year: 2023,
    description: 'Desain dan konstruksi booth promosi produk Kefii dengan konsep modern dan eye-catching.',
    longDescription: 'Booth activation untuk brand Kefii di Grand City Mall dengan desain yang menarik dan interaktif. Fokus pada brand awareness dan lead generation.',
    services: ['Booth Design', 'Construction', 'Brand Activation', 'Staff Coordination', 'Lead Management'],
    images: ['https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop&crop=center'],
    tags: ['Booth Design', 'Brand Activation', 'Retail', 'Product Launch'],
    results: {
      visitors: '2000+',
      leads: '300+',
      conversion: '15%',
      brandAwareness: '85%'
    },
    featured: true,
    status: 'completed',
    duration: '7 days',
    teamSize: 8
  },
  {
    id: 'activity-camel-2023',
    title: 'Activity Camel',
    slug: 'activity-camel-taman-apsari',
    category: 'activation',
    companyId: 'narvex',
    client: 'Camel',
    location: 'Taman Apsari, Surabaya',
    date: '2023-07-10',
    year: 2023,
    description: 'Brand activation outdoor dengan konsep adventure dan petualangan yang sesuai dengan brand Camel.',
    longDescription: 'Outdoor brand activation yang mengusung tema adventure dan petualangan. Event ini dirancang untuk meningkatkan engagement dengan target audience Camel.',
    services: ['Event Activation', 'Outdoor Setup', 'Entertainment', 'Safety Management', 'Logistics'],
    images: ['https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop&crop=center'],
    tags: ['Brand Activation', 'Outdoor Event', 'Adventure', 'Engagement'],
    results: {
      participants: '1000+',
      engagement: '85%',
      reach: '50K+',
      socialMentions: '2K+'
    },
    featured: true,
    status: 'completed',
    duration: '2 days',
    teamSize: 12
  },
  {
    id: 'gathering-inova-reborn-2023',
    title: 'Gathering Inova Reborn',
    slug: 'gathering-inova-reborn-jember-bali',
    category: 'tour',
    companyId: 'narvex',
    client: 'Inova Community',
    location: 'Jember-Banyuwangi-Bali',
    date: '2023-06-05',
    year: 2023,
    description: 'Community tour multi-destinasi dengan program team building dan networking.',
    longDescription: 'Tour komunitas yang menggabungkan wisata, team building, dan networking. Meliputi 3 destinasi dengan berbagai aktivitas yang dirancang untuk memperkuat ikatan komunitas.',
    services: ['Tour Management', 'Transportation', 'Accommodation', 'Activity Coordination', 'Documentation'],
    images: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center'],
    tags: ['Community Tour', 'Team Building', 'Networking', 'Multi-destination'],
    results: {
      participants: '150+',
      destinations: '3',
      satisfaction: '98%',
      networkingConnections: '500+'
    },
    featured: true,
    status: 'completed',
    duration: '4 days',
    teamSize: 10
  },
  {
    id: 'kementerian-lhk-outings',
    title: 'Corporate Outings Kementerian LHK',
    slug: 'corporate-outings-kementerian-lhk',
    category: 'corporate',
    companyId: 'narvex',
    client: 'Kementerian Lingkungan Hidup dan Kehutanan',
    location: 'Various Locations',
    date: '2022-10-01',
    year: 2022,
    description: 'Serangkaian corporate outing dan team building untuk pegawai Kementerian LHK.',
    longDescription: 'Program corporate outing berkelanjutan untuk Kementerian LHK dengan berbagai aktivitas team building dan recreational activities di berbagai lokasi.',
    services: ['Event Planning', 'Venue Management', 'Team Building', 'Catering', 'Transportation'],
    images: ['https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&crop=center', 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&crop=center'],
    tags: ['Corporate Event', 'Team Building', 'Government', 'Recreation'],
    results: {
      events: '5+',
      participants: '800+',
      satisfaction: '92%',
      teamCohesion: '88%'
    },
    featured: false,
    status: 'completed',
    duration: '6 months',
    teamSize: 20
  },
  
  // Skywork.id Projects
  {
    id: 'skywork-brand-identity-a',
    title: 'Brand Identity Project Alpha',
    slug: 'skywork-brand-identity-alpha',
    category: 'creative',
    companyId: 'skywork',
    client: 'Tech Startup Alpha',
    location: 'Jakarta',
    date: '2023-11-01',
    year: 2023,
    description: 'Comprehensive brand identity design untuk startup teknologi dengan pendekatan modern dan inovatif.',
    services: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center'],
    tags: ['Branding', 'Logo Design', 'Startup', 'Technology'],
    featured: false,
    status: 'completed'
  },
  
  // Gutama Learning Projects
  {
    id: 'gutama-corporate-training-b',
    title: 'Corporate Training Program Beta',
    slug: 'gutama-corporate-training-beta',
    category: 'education',
    companyId: 'gutama',
    client: 'Corporate Client Beta',
    location: 'Jakarta',
    date: '2023-10-15',
    year: 2023,
    description: 'Program training korporat untuk pengembangan skill leadership dan management.',
    services: ['Training Design', 'Facilitation', 'Assessment', 'Certification'],
    images: ['https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&crop=center'],
    tags: ['Training', 'Leadership', 'Corporate', 'Skill Development'],
    featured: false,
    status: 'completed'
  },
  
  // CreativeWork Projects
  {
    id: 'creativework-campaign-gamma',
    title: 'Creative Campaign Gamma',
    slug: 'creativework-campaign-gamma',
    category: 'creative',
    companyId: 'creativework',
    client: 'Brand Gamma',
    location: 'Jakarta',
    date: '2023-09-01',
    year: 2023,
    description: 'Kampanye kreatif terintegrasi untuk brand awareness dan engagement.',
    services: ['Creative Strategy', 'Campaign Development', 'Content Creation', 'Execution'],
    images: ['https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop&crop=center'],
    tags: ['Creative Campaign', 'Brand Awareness', 'Content', 'Strategy'],
    featured: false,
    status: 'completed'
  },
  
  // Evervow.wo Projects
  {
    id: 'evervow-wedding-delta',
    title: 'Romantic Garden Wedding Delta',
    slug: 'evervow-romantic-garden-wedding-delta',
    category: 'wedding',
    companyId: 'evervow',
    client: 'Couple Delta',
    location: 'Bali',
    date: '2023-12-02',
    year: 2023,
    description: 'Pernikahan outdoor dengan konsep romantic garden yang elegan dan memorable.',
    services: ['Wedding Planning', 'Decoration', 'Coordination', 'Photography'],
    images: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&crop=center'],
    tags: ['Wedding', 'Outdoor', 'Romantic', 'Garden'],
    featured: false,
    status: 'completed'
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCompany = (companyId: string): Project[] => {
  return projects.filter(project => project.companyId === companyId);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectsByYear = (year: number): Project[] => {
  return projects.filter(project => project.year === year);
};

export const getRecentProjects = (limit: number = 6): Project[] => {
  return projects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};