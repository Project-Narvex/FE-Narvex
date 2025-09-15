export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: 'company-updates' | 'industry-insights' | 'project-stories' | 'tips-tricks' | 'subsidiary-news';
  author: string;
  authorId?: string;
  publishDate: string;
  lastModified?: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  views?: number;
  likes?: number;
}

export const blogArticles: BlogArticle[] = [
  {
    id: 'narvex-mice-services-launch',
    title: 'Narvex Meluncurkan Layanan MICE Terintegrasi untuk Pasar Indonesia',
    slug: 'narvex-meluncurkan-layanan-mice-terintegrasi',
    excerpt: 'Dengan pengalaman lebih dari 3 tahun, Narvex kini memperluas layanan dengan solusi MICE yang komprehensif untuk memenuhi kebutuhan industri yang berkembang pesat.',
    content: `
# Narvex Meluncurkan Layanan MICE Terintegrasi untuk Pasar Indonesia

CV. Nara Exhibition Indonesia, yang dikenal dengan brand Narvex, dengan bangga mengumumkan peluncuran layanan MICE (Meeting, Incentive, Convention, Exhibition) terintegrasi yang dirancang khusus untuk memenuhi kebutuhan pasar Indonesia yang berkembang pesat.

## Layanan MICE Komprehensif

Layanan MICE Narvex mencakup:
- **Meeting Management**: Pengelolaan meeting corporate dengan fasilitas lengkap
- **Incentive Programs**: Program insentif untuk motivasi karyawan dan partner
- **Convention Services**: Penyelenggaraan konvensi skala besar
- **Exhibition Management**: Manajemen pameran dan expo profesional

## Keunggulan Kompetitif

Dengan dukungan dari 4 subsidiary companies (Skywork.id, Gutama Learning, CreativeWork, dan Evervow.wo), Narvex mampu memberikan solusi end-to-end yang tidak hanya mencakup event management, tetapi juga creative services, educational programs, dan specialized services.

"Kami melihat peluang besar di industri MICE Indonesia. Dengan pengalaman yang telah kami miliki dan dukungan ekosistem subsidiary yang kuat, kami yakin dapat memberikan value yang signifikan bagi klien," ujar Ahmad Rizki Pratama, CEO Narvex.

## Target dan Proyeksi

Narvex menargetkan untuk menangani 100+ event MICE dalam 2 tahun ke depan, dengan fokus pada corporate clients, government institutions, dan international organizations yang beroperasi di Indonesia.
    `,
    category: 'company-updates',
    author: 'Tim Narvex',
    authorId: 'ceo-narvex',
    publishDate: '2024-01-15',
    readTime: '5 min',
    tags: ['MICE', 'Layanan Baru', 'Ekspansi', 'Business Growth'],
    featured: true,
    published: true,
    featuredImage: '/images/blog/mice-services-launch.jpg',
    seoTitle: 'Narvex Luncurkan Layanan MICE Terintegrasi - Event Management Indonesia',
    seoDescription: 'Narvex meluncurkan layanan MICE komprehensif untuk pasar Indonesia dengan dukungan 4 subsidiary companies.',
    views: 1250,
    likes: 89
  },
  {
    id: 'hybrid-event-trends-2024',
    title: 'Tren Event Hybrid: Masa Depan Industri MICE di Era Digital',
    slug: 'tren-event-hybrid-masa-depan-industri-mice',
    excerpt: 'Analisis mendalam tentang bagaimana event hybrid mengubah landscape industri MICE dan strategi adaptasi yang perlu dilakukan oleh event organizer.',
    content: `
# Tren Event Hybrid: Masa Depan Industri MICE di Era Digital

Industri MICE mengalami transformasi signifikan dengan munculnya tren event hybrid yang menggabungkan pengalaman offline dan online. Artikel ini menganalisis dampak dan peluang dari tren ini.

## Definisi Event Hybrid

Event hybrid adalah format acara yang menggabungkan:
- Peserta yang hadir secara fisik di venue
- Peserta yang berpartisipasi secara virtual melalui platform digital
- Interaksi real-time antara kedua kelompok peserta

## Keuntungan Event Hybrid

### 1. Jangkauan yang Lebih Luas
- Tidak terbatas oleh lokasi geografis
- Dapat menjangkau audience internasional
- Mengurangi barrier untuk partisipasi

### 2. Cost Effectiveness
- Mengurangi biaya travel dan akomodasi
- Optimalisasi venue capacity
- ROI yang lebih baik

### 3. Fleksibilitas
- Peserta dapat memilih mode partisipasi
- Akses recording untuk review
- Adaptasi terhadap situasi tak terduga

## Tantangan Implementasi

- **Teknologi**: Investasi dalam platform dan infrastruktur
- **Engagement**: Menjaga interaksi yang meaningful
- **Content**: Adaptasi konten untuk dual audience

## Strategi Sukses

Berdasarkan pengalaman Narvex dalam mengelola event hybrid:

1. **Platform Integration**: Pilih platform yang user-friendly
2. **Content Adaptation**: Sesuaikan konten untuk kedua audience
3. **Technical Support**: Siapkan tim teknis yang kompeten
4. **Engagement Strategy**: Rancang interaksi yang inklusif

## Kesimpulan

Event hybrid bukan hanya tren sementara, tetapi evolusi natural dari industri MICE. Event organizer yang dapat beradaptasi dengan format ini akan memiliki competitive advantage di masa depan.
    `,
    category: 'industry-insights',
    author: 'Sarah Johnson',
    authorId: 'coo-narvex',
    publishDate: '2024-01-12',
    readTime: '8 min',
    tags: ['Hybrid Event', 'Digital Transformation', 'MICE Industry', 'Technology'],
    featured: false,
    published: true,
    featuredImage: '/images/blog/hybrid-event-trends.jpg',
    views: 890,
    likes: 67
  },
  {
    id: 'jbbi-expo-behind-scenes',
    title: 'Behind the Scenes: JBBI Expo & Seminar Nasional di Bandung',
    slug: 'behind-scenes-jbbi-expo-seminar-nasional-bandung',
    excerpt: 'Cerita di balik layar penyelenggaraan JBBI Expo yang sukses, mulai dari perencanaan hingga eksekusi dengan 500+ peserta dan 50+ exhibitor.',
    content: `
# Behind the Scenes: JBBI Expo & Seminar Nasional di Bandung

JBBI Expo & Seminar Nasional merupakan salah satu project terbesar yang ditangani Narvex di tahun 2023. Artikel ini mengungkap cerita di balik layar kesuksesan event tersebut.

## Overview Project

- **Client**: JBBI (Jaringan Bisnis Berkelanjutan Indonesia)
- **Venue**: Grand Ballroom Sudirman, Bandung
- **Peserta**: 500+ participants
- **Exhibitor**: 50+ companies
- **Durasi**: 3 hari

## Fase Perencanaan (3 Bulan Sebelum Event)

### Bulan 1: Konsep dan Strategi
- Meeting intensif dengan klien untuk memahami objectives
- Riset target audience dan industry trends
- Pengembangan konsep event yang align dengan tema sustainability

### Bulan 2: Vendor Selection dan Logistics
- Seleksi vendor audio visual, catering, dan dekorasi
- Koordinasi dengan venue untuk technical requirements
- Pengembangan sistem registrasi online

### Bulan 3: Final Preparation
- Rehearsal dan technical testing
- Briefing tim dan volunteer
- Final check semua aspek logistik

## Tantangan dan Solusi

### Tantangan 1: Koordinasi Multi-Stakeholder
**Solusi**: Implementasi project management system dengan clear timeline dan responsibility matrix

### Tantangan 2: Technical Complexity
**Solusi**: Backup system untuk semua technical equipment dan dedicated IT support team

### Tantangan 3: Weather Contingency
**Solusi**: Indoor venue dengan climate control dan backup power supply

## Eksekusi Event

### Hari 1: Opening Ceremony
- Welcome registration dengan sistem QR code
- Opening speech dari key stakeholders
- Keynote presentation tentang sustainable business

### Hari 2: Exhibition dan Networking
- 50+ booth dari berbagai industri
- Business matching sessions
- Panel discussion dengan industry experts

### Hari 3: Seminar dan Closing
- Technical seminar sessions
- Award ceremony
- Networking dinner

## Hasil dan Impact

- **Satisfaction Rate**: 95% (berdasarkan post-event survey)
- **Media Coverage**: 15+ media outlets
- **Business Connections**: 200+ business cards exchanged
- **Follow-up Meetings**: 50+ scheduled meetings

## Lessons Learned

1. **Preparation is Key**: 80% kesuksesan ditentukan di fase planning
2. **Team Coordination**: Clear communication channel sangat critical
3. **Contingency Planning**: Always have Plan B (and Plan C)
4. **Client Collaboration**: Regular check-in dengan klien ensures alignment

## Tim yang Terlibat

- **Project Manager**: Budi Santoso
- **Event Coordinator**: Tim Narvex (8 orang)
- **Technical Support**: Partner vendor
- **Creative Support**: Skywork.id team

JBBI Expo menjadi benchmark untuk project-project selanjutnya dan membuktikan kemampuan Narvex dalam mengelola event skala besar dengan kompleksitas tinggi.
    `,
    category: 'project-stories',
    author: 'Ahmad Rizki',
    authorId: 'event-manager-narvex',
    publishDate: '2024-01-10',
    readTime: '6 min',
    tags: ['Case Study', 'Exhibition', 'Event Management', 'Project Success'],
    featured: true,
    published: true,
    featuredImage: '/images/blog/jbbi-expo-behind-scenes.jpg',
    views: 1100,
    likes: 95
  },
  {
    id: 'skywork-best-creative-agency-2023',
    title: 'Skywork.id Raih Penghargaan Best Creative Agency 2023',
    slug: 'skywork-raih-penghargaan-best-creative-agency-2023',
    excerpt: 'Subsidiary Narvex, Skywork.id, meraih penghargaan bergengsi sebagai Best Creative Agency 2023 berkat pendekatan "Bekerja dengan Seni" yang inovatif.',
    category: 'subsidiary-news',
    author: 'Tim Skywork',
    authorId: 'creative-director-skywork',
    publishDate: '2024-01-08',
    readTime: '4 min',
    tags: ['Penghargaan', 'Skywork.id', 'Creative Agency', 'Achievement'],
    featured: false,
    published: true,
    views: 750,
    likes: 58
  },
  {
    id: 'tips-memilih-venue-corporate-event',
    title: '5 Tips Memilih Venue yang Tepat untuk Corporate Event',
    slug: 'tips-memilih-venue-tepat-corporate-event',
    excerpt: 'Panduan praktis untuk memilih venue yang sesuai dengan kebutuhan corporate event, mulai dari kapasitas hingga fasilitas pendukung.',
    category: 'tips-tricks',
    author: 'Maria Sari',
    authorId: 'event-manager-narvex',
    publishDate: '2024-01-05',
    readTime: '7 min',
    tags: ['Event Planning', 'Venue Selection', 'Corporate Event', 'Tips'],
    featured: false,
    published: true,
    views: 650,
    likes: 42
  }
];

export const getArticleById = (id: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.id === id);
};

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find(article => article.slug === slug);
};

export const getArticlesByCategory = (category: string): BlogArticle[] => {
  if (category === 'all') return blogArticles.filter(article => article.published);
  return blogArticles.filter(article => article.category === category && article.published);
};

export const getFeaturedArticles = (): BlogArticle[] => {
  return blogArticles.filter(article => article.featured && article.published);
};

export const getRecentArticles = (limit: number = 6): BlogArticle[] => {
  return blogArticles
    .filter(article => article.published)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};

export const getArticlesByAuthor = (authorId: string): BlogArticle[] => {
  return blogArticles.filter(article => article.authorId === authorId && article.published);
};

export const searchArticles = (query: string): BlogArticle[] => {
  const lowercaseQuery = query.toLowerCase();
  return blogArticles.filter(article => 
    article.published && (
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    )
  );
};

export const getPopularArticles = (limit: number = 5): BlogArticle[] => {
  return blogArticles
    .filter(article => article.published)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
};

export const getCategoryStats = () => {
  const categories = {
    'all': blogArticles.filter(a => a.published).length,
    'company-updates': blogArticles.filter(a => a.category === 'company-updates' && a.published).length,
    'industry-insights': blogArticles.filter(a => a.category === 'industry-insights' && a.published).length,
    'project-stories': blogArticles.filter(a => a.category === 'project-stories' && a.published).length,
    'tips-tricks': blogArticles.filter(a => a.category === 'tips-tricks' && a.published).length,
    'subsidiary-news': blogArticles.filter(a => a.category === 'subsidiary-news' && a.published).length
  };
  return categories;
};