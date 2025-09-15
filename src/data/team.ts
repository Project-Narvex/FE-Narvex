export interface TeamMember {
  id: string;
  name: string;
  position: string;
  companyId: string;
  department: string;
  bio: string;
  avatar: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  skills: string[];
  experience: string;
  education?: string;
  achievements?: string[];
  isLeadership: boolean;
  joinDate: string;
}

export const teamMembers: TeamMember[] = [
  // Narvex Leadership
  {
    id: 'ceo-narvex',
    name: 'Ahmad Rizki Pratama',
    position: 'Chief Executive Officer',
    companyId: 'narvex',
    department: 'Executive',
    bio: 'Visionary leader dengan pengalaman lebih dari 8 tahun di industri MICE dan event production. Memimpin transformasi Narvex menjadi ekosistem perusahaan terintegrasi.',
    avatar: '/images/team/ahmad-rizki.jpg',
    email: 'ahmad@narvex.id',
    linkedin: 'ahmad-rizki-pratama',
    skills: ['Strategic Planning', 'Business Development', 'Leadership', 'MICE Industry'],
    experience: '8+ years',
    education: 'MBA - Business Management',
    achievements: [
      'Founded CV. Nara Exhibition Indonesia',
      'Expanded to 4 subsidiary companies',
      'Led 50+ successful major events'
    ],
    isLeadership: true,
    joinDate: '2020-01-01'
  },
  {
    id: 'coo-narvex',
    name: 'Sarah Johnson',
    position: 'Chief Operating Officer',
    companyId: 'narvex',
    department: 'Operations',
    bio: 'Expert dalam operational excellence dan project management dengan track record mengelola event-event berskala besar dengan tingkat kepuasan klien 95%+.',
    avatar: '/images/team/sarah-johnson.jpg',
    email: 'sarah@narvex.id',
    linkedin: 'sarah-johnson-ops',
    skills: ['Operations Management', 'Project Management', 'Quality Control', 'Team Leadership'],
    experience: '6+ years',
    education: 'Bachelor - Industrial Engineering',
    achievements: [
      'Implemented quality management system',
      'Achieved 95%+ client satisfaction rate',
      'Managed 100+ successful events'
    ],
    isLeadership: true,
    joinDate: '2020-03-01'
  },
  {
    id: 'event-manager-narvex',
    name: 'Budi Santoso',
    position: 'Senior Event Manager',
    companyId: 'narvex',
    department: 'Event Management',
    bio: 'Spesialis dalam event planning dan execution dengan keahlian khusus dalam MICE events dan corporate functions.',
    avatar: '/images/team/budi-santoso.jpg',
    email: 'budi@narvex.id',
    skills: ['Event Planning', 'Vendor Management', 'Budget Management', 'Client Relations'],
    experience: '5+ years',
    education: 'Bachelor - Event Management',
    isLeadership: false,
    joinDate: '2021-01-15'
  },
  
  // Skywork.id Team
  {
    id: 'creative-director-skywork',
    name: 'Maria Sari Dewi',
    position: 'Creative Director',
    companyId: 'skywork',
    department: 'Creative',
    bio: 'Creative visionary yang memimpin tim Skywork.id dengan filosofi "Bekerja dengan Seni". Berpengalaman dalam brand identity dan visual design.',
    avatar: '/images/team/maria-sari.jpg',
    email: 'maria@skywork.id',
    instagram: '@mariasari_design',
    linkedin: 'maria-sari-dewi',
    skills: ['Brand Identity', 'Visual Design', 'Creative Strategy', 'Art Direction'],
    experience: '7+ years',
    education: 'Bachelor - Visual Communication Design',
    achievements: [
      'Led 50+ brand identity projects',
      'Won Best Creative Agency 2023',
      'Featured in Design Magazine'
    ],
    isLeadership: true,
    joinDate: '2022-01-01'
  },
  {
    id: 'senior-designer-skywork',
    name: 'Andi Wijaya',
    position: 'Senior Graphic Designer',
    companyId: 'skywork',
    department: 'Design',
    bio: 'Designer berpengalaman dengan keahlian dalam digital design dan print media. Passionate dalam menciptakan visual yang impactful.',
    avatar: '/images/team/andi-wijaya.jpg',
    email: 'andi@skywork.id',
    skills: ['Graphic Design', 'Digital Design', 'Print Design', 'Typography'],
    experience: '4+ years',
    education: 'Bachelor - Graphic Design',
    isLeadership: false,
    joinDate: '2022-03-01'
  },
  
  // Gutama Learning Team
  {
    id: 'head-education-gutama',
    name: 'Dr. Lisa Permata',
    position: 'Head of Education',
    companyId: 'gutama',
    department: 'Education',
    bio: 'Educator dan trainer berpengalaman dengan spesialisasi dalam corporate training dan professional development programs.',
    avatar: '/images/team/lisa-permata.jpg',
    email: 'lisa@gutamalearning.com',
    linkedin: 'dr-lisa-permata',
    skills: ['Training Design', 'Adult Learning', 'Curriculum Development', 'Assessment'],
    experience: '10+ years',
    education: 'PhD - Educational Psychology',
    achievements: [
      'Developed 20+ training programs',
      'Trained 1000+ professionals',
      'Published educational research'
    ],
    isLeadership: true,
    joinDate: '2022-02-01'
  },
  
  // CreativeWork Team
  {
    id: 'strategy-lead-creativework',
    name: 'Reza Pratama',
    position: 'Creative Strategy Lead',
    companyId: 'creativework',
    department: 'Strategy',
    bio: 'Strategic thinker yang mengkhususkan diri dalam creative strategy dan innovation consultation untuk modern business.',
    avatar: '/images/team/reza-pratama.jpg',
    email: 'reza@creativework.id',
    linkedin: 'reza-pratama-strategy',
    skills: ['Creative Strategy', 'Innovation', 'Business Consulting', 'Design Thinking'],
    experience: '6+ years',
    education: 'Master - Business Innovation',
    isLeadership: true,
    joinDate: '2022-04-01'
  },
  
  // Evervow.wo Team
  {
    id: 'wedding-planner-evervow',
    name: 'Sinta Maharani',
    position: 'Senior Wedding Planner',
    companyId: 'evervow',
    department: 'Wedding Planning',
    bio: 'Wedding planner berpengalaman yang passionate dalam menciptakan momen pernikahan yang magical dan unforgettable.',
    avatar: '/images/team/sinta-maharani.jpg',
    email: 'sinta@evervow.wo',
    instagram: '@sinta_weddingplanner',
    linkedin: 'sinta-maharani',
    skills: ['Wedding Planning', 'Event Coordination', 'Vendor Management', 'Design Consultation'],
    experience: '5+ years',
    education: 'Bachelor - Event Management',
    achievements: [
      'Planned 100+ weddings',
      'Featured in Wedding Magazine',
      '98% client satisfaction rate'
    ],
    isLeadership: true,
    joinDate: '2022-05-01'
  }
];

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return teamMembers.find(member => member.id === id);
};

export const getTeamByCompany = (companyId: string): TeamMember[] => {
  return teamMembers.filter(member => member.companyId === companyId);
};

export const getLeadershipTeam = (): TeamMember[] => {
  return teamMembers.filter(member => member.isLeadership);
};

export const getTeamByDepartment = (department: string): TeamMember[] => {
  return teamMembers.filter(member => member.department === department);
};

export const getAllTeamMembers = (): TeamMember[] => {
  return teamMembers;
};