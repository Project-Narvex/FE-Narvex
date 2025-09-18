export interface ClientLogo {
  name: string;
  logo: string;
  category?: string;
}

export const clientLogos: ClientLogo[] = [
  {
    name: 'Bank Indonesia',
    logo: '/logos/BI.png',
    category: 'Government'
  },
  {
    name: 'Badanamu',
    logo: '/logos/Badanamu.png',
    category: 'Education'
  },
  {
    name: 'Basarnas',
    logo: '/logos/Basarnas.png',
    category: 'Government'
  },
  {
    name: 'Campina',
    logo: '/logos/Campina.png',
    category: 'FMCG'
  },
  {
    name: 'DGW',
    logo: '/logos/DGW.png',
    category: 'Corporate'
  },
  {
    name: 'Erafone',
    logo: '/logos/Erafone.png',
    category: 'Retail'
  },
  {
    name: 'Erajaya',
    logo: '/logos/Erajaya.png',
    category: 'Retail'
  },
  {
    name: 'J99',
    logo: '/logos/J99.png',
    category: 'Media'
  },
  {
    name: 'Jaya',
    logo: '/logos/Jaya.png',
    category: 'Corporate'
  },
  {
    name: 'Kominfo',
    logo: '/logos/Kominfo.png',
    category: 'Government'
  },
  {
    name: 'Kota Madiun',
    logo: '/logos/Madiun.png',
    category: 'Government'
  },
  {
    name: 'Kementerian Perhubungan',
    logo: '/logos/Mentri_perhubungan.png',
    category: 'Government'
  },
  {
    name: 'Plaza Surabaya',
    logo: '/logos/PlazaSBY.png',
    category: 'Retail'
  },
  {
    name: 'Puma',
    logo: '/logos/Puma.png',
    category: 'Fashion'
  },
  {
    name: 'RCH',
    logo: '/logos/RCH.png',
    category: 'Healthcare'
  },
  {
    name: 'SAW Tour',
    logo: '/logos/SAWTour.png',
    category: 'Tourism'
  },
  {
    name: 'SDM Taman',
    logo: '/logos/SDMTaman.png',
    category: 'Education'
  },
  {
    name: 'SMAN 2',
    logo: '/logos/SMAN2.png',
    category: 'Education'
  },
  {
    name: 'Universitas Airlangga',
    logo: '/logos/Unair.png',
    category: 'Education'
  },
  {
    name: 'Upscaled',
    logo: '/logos/Upscaled.png',
    category: 'Technology'
  }
];

export const getClientsByCategory = (category: string): ClientLogo[] => {
  return clientLogos.filter(client => client.category === category);
};

export const getRandomClients = (count: number): ClientLogo[] => {
  const shuffled = [...clientLogos].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getAllClients = (): ClientLogo[] => {
  return clientLogos;
};