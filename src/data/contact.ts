// Contact page data structure for CMS integration

export interface ContactInfo {
  id: string;
  name: string;
  description: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
  businessHours: {
    weekdays: string;
    saturday: string;
    sunday?: string;
  };
  socialMedia: {
    instagram: string;
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  services: string[];
}

export interface ServiceInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  services: string[];
  contact: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

export interface ContactPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: string;
  };
  serviceSelection: {
    title: string;
    description: string;
  };
  contactForm: {
    title: string;
    description: string;
    fields: {
      name: { required: boolean; placeholder: string; };
      email: { required: boolean; placeholder: string; };
      phone: { required: boolean; placeholder: string; };
      company: { required: boolean; placeholder: string; };
      service: { required: boolean; options: string[]; };
      budget: { required: boolean; options: { value: string; label: string; }[]; };
      timeline: { required: boolean; options: { value: string; label: string; }[]; };
      message: { required: boolean; placeholder: string; };
    };
    submitButton: {
      text: string;
      loadingText: string;
    };
    successMessage: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  socialSection: {
    title: string;
    description: string;
  };
}

export interface FormSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
  targetService?: string;
  submittedAt: Date;
  status: 'pending' | 'contacted' | 'completed';
  source: 'website' | 'social' | 'referral';
}

// Default contact page content (would be fetched from CMS)
export const defaultContactPageContent: ContactPageContent = {
  hero: {
    title: "Hubungi Kami",
    subtitle: "Narvex Creative Services",
    description: "Siap membantu mewujudkan project impian Anda dengan layanan creative services terbaik dari Narvex"
  },
  serviceSelection: {
    title: "Pilih Layanan Anda",
    description: "Pilih kategori layanan yang sesuai dengan kebutuhan project Anda untuk konsultasi yang lebih tepat sasaran"
  },
  contactForm: {
    title: "Konsultasi Gratis",
    description: "Formulir ini akan diteruskan langsung ke tim spesialis untuk konsultasi yang tepat.",
    fields: {
      name: { required: true, placeholder: "Masukkan nama lengkap" },
      email: { required: true, placeholder: "email@example.com" },
      phone: { required: true, placeholder: "+62 xxx xxxx xxxx" },
      company: { required: false, placeholder: "Nama perusahaan (opsional)" },
      service: { required: true, options: [] }, // Will be populated dynamically
      budget: {
        required: false,
        options: [
          { value: "under-10m", label: "< 10 Juta" },
          { value: "10m-50m", label: "10 - 50 Juta" },
          { value: "50m-100m", label: "50 - 100 Juta" },
          { value: "100m-500m", label: "100 - 500 Juta" },
          { value: "above-500m", label: "> 500 Juta" },
          { value: "discuss", label: "Diskusi Lebih Lanjut" }
        ]
      },
      timeline: {
        required: false,
        options: [
          { value: "urgent", label: "Mendesak (< 1 minggu)" },
          { value: "1-2weeks", label: "1-2 minggu" },
          { value: "1month", label: "1 bulan" },
          { value: "2-3months", label: "2-3 bulan" },
          { value: "flexible", label: "Fleksibel" }
        ]
      },
      message: { required: true, placeholder: "Ceritakan detail proyek Anda, tujuan, target audiens, dan ekspektasi hasil..." }
    },
    submitButton: {
      text: "Kirim Pesan",
      loadingText: "Mengirim..."
    },
    successMessage: {
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda.",
      buttonText: "Kirim Pesan Lain"
    }
  },
  socialSection: {
    title: "Terhubung dengan Kami",
    description: "Ikuti kami di media sosial untuk mendapatkan update terbaru tentang proyek dan layanan kami"
  }
};

// Default company information (would be fetched from CMS)
export const defaultContactInfo: ContactInfo = {
  id: "narvex-main",
  name: "CV. Nara Exhibition Indonesia",
  description: "Partner Terpercaya untuk Creative Services, Event Production, dan Digital Marketing",
  address: {
    street: "Jakarta",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12345",
    country: "Indonesia",
    coordinates: {
      lat: -6.2088,
      lng: 106.8456
    }
  },
  contact: {
    phone: "+62 xxx xxxx xxxx",
    email: "narvex.ind@gmail.com",
    whatsapp: "+62 xxx xxxx xxxx"
  },
  businessHours: {
    weekdays: "Senin - Jumat: 09:00 - 18:00",
    saturday: "Sabtu: 09:00 - 15:00",
    sunday: "Minggu: Tutup"
  },
  socialMedia: {
    instagram: "https://instagram.com/narvex.id",
    facebook: "https://facebook.com/narvex.id",
    linkedin: "https://linkedin.com/company/narvex",
    youtube: "https://youtube.com/@narvex"
  }
};

// Default service categories for contact form
export const defaultServiceCategories: ServiceCategory[] = [
  {
    id: 'branding',
    name: 'Branding & Design',
    description: 'Logo design, brand identity, dan visual branding yang memorable',
    icon: '🎨',
    color: 'bg-blue-500',
    services: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Print Design']
  },
  {
    id: 'event',
    name: 'Event Production',
    description: 'Event planning, stage design, dan production management',
    icon: '🎪',
    color: 'bg-purple-500',
    services: ['Event Planning', 'Stage Design', 'Audio Visual', 'Event Coordination']
  },
  {
    id: 'digital',
    name: 'Digital Marketing',
    description: 'Social media management, content creation, dan digital advertising',
    icon: '📱',
    color: 'bg-green-500',
    services: ['Social Media Management', 'Content Creation', 'SEO', 'Digital Ads']
  },
  {
    id: 'consultation',
    name: 'Consultation',
    description: 'Strategic consultation untuk brand development dan marketing',
    icon: '💡',
    color: 'bg-gold-500',
    services: ['Brand Strategy', 'Market Analysis', 'Business Consultation', 'Creative Direction']
  }
];

// Main Service Information
export const mainService: ServiceInfo = {
    id: 'main-service',
    name: 'Narvex Creative Services',
    description: 'Solusi terintegrasi untuk semua kebutuhan branding, event, dan digital marketing Anda.',
    icon: '耳',
    color: 'bg-blue-500',
    services: [
      'Brand Strategy & Identity',
      'Logo & Visual Design',
      'Event Planning & Management',
      'Stage & Set Design',
      'Social Media Strategy',
      'Content Creation',
      'Brand Consultation',
      'Market Analysis'
    ],
    contact: {
      phone: '+62 xxx xxxx xxxx',
      email: 'contact@narvex.id',
      whatsapp: '+62 xxx xxxx xxxx'
    }
};


// CMS API functions (would integrate with Strapi)
export const contactAPI = {
  // Get contact page content
  async getContactPageContent(): Promise<ContactPageContent> {
    try {
      return defaultContactPageContent;
    } catch (error) {
      console.error('Error fetching contact page content:', error);
      return defaultContactPageContent;
    }
  },

  // Get contact information
  async getContactInfo(): Promise<ContactInfo> {
    try {
      return defaultContactInfo;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return defaultContactInfo;
    }
  },

  // Get service categories
  async getMainService(): Promise<ServiceInfo> {
    try {
      return mainService;
    } catch (error) {
      console.error('Error fetching main service:', error);
      return mainService;
    }
  },

  // Submit contact form
  async submitContactForm(formData: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'>): Promise<{ success: boolean; message: string; id?: string }> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      return {
        success: true,
        message: 'Pesan berhasil dikirim. Tim kami akan segera menghubungi Anda.',
        id: `submission_${Date.now()}`
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
      };
    }
  }
};