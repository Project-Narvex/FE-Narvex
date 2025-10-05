// Contact Page Data Transformation Utilities

import { 
  ContactPageData, 
  ContactPageComponent, 
  ContactHero, 
  ContactServiceCard, 
  ContactForm, 
  ContactInfo,
  ContactMessageData 
} from '@/lib/strapi/types';

// Helper function to extract text from Strapi rich text format
function extractTextFromDescription(description: any): string {
  if (!description) return '';
  
  if (typeof description === 'string') {
    return description;
  }
  
  if (Array.isArray(description)) {
    return description.map(item => {
      if (typeof item === 'string') {
        return item;
      }
      if (item && typeof item === 'object') {
        if (item.children && Array.isArray(item.children)) {
          return item.children.map(child => {
            if (typeof child === 'string') {
              return child;
            }
            if (child && typeof child === 'object' && child.text) {
              return child.text;
            }
            return '';
          }).join('');
        }
        if (item.text) {
          return item.text;
        }
      }
      return '';
    }).join(' ');
  }
  
  if (description && typeof description === 'object') {
    if (description.children && Array.isArray(description.children)) {
      return description.children.map(child => {
        if (typeof child === 'string') {
          return child;
        }
        if (child && typeof child === 'object' && child.text) {
          return child.text;
        }
        return '';
      }).join('');
    }
    if (description.text) {
      return description.text;
    }
  }
  
  return '';
}

export interface TransformedContactPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  serviceCards: Array<{
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
  }>;
  contactForm: {
    title: string;
    description: string;
    fields: {
      name: { placeholder: string };
      email: { placeholder: string };
      phone: { placeholder: string };
      company: { placeholder: string };
      message: { placeholder: string };
      budget: { options: Array<{ value: string; label: string }> };
      timeline: { options: Array<{ value: string; label: string }> };
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
  contactInfo: {
    address: {
      city: string;
      country: string;
    };
    businessHours: {
      weekdays: string;
      saturday: string;
      sunday?: string;
    };
    contact: {
      email: string;
      phone: string;
      whatsapp: string;
    };
    socialMedia: {
      instagram: string;
    };
  };
  socialSection: {
    title: string;
    description: string;
  };
}

export function transformContactPageData(data: any): TransformedContactPageContent {
  console.log('Transforming contact page data:', data);
  
  // Handle different data structures
  let components: any[] = [];
  
  if (data?.data?.pageContent && Array.isArray(data.data.pageContent)) {
    components = data.data.pageContent;
  } else if (data?.data && typeof data.data === 'object') {
    // Handle case where data is structured differently
    components = Object.values(data.data).filter(item => 
      item && typeof item === 'object' && item.__component
    ) as any[];
  } else {
    console.warn('No valid components found in data structure');
    components = [];
  }
  
  console.log('Extracted components:', components);
  
  // Extract hero section
  const heroComponent = components.find(comp => comp.__component === 'contact.hero') as ContactHero;
  const hero = {
    title: heroComponent?.title || 'Hubungi Kami',
    subtitle: heroComponent?.subtitle || 'Mari Diskusikan Proyek Anda',
    description: extractTextFromDescription(heroComponent?.description) || 'Tim kami siap membantu mewujudkan visi kreatif Anda dengan solusi yang inovatif dan profesional.'
  };
  
  // Extract service cards - handle different structures
  let serviceCardComponents: ContactServiceCard[] = [];
  
  // Try to find service cards by component type
  serviceCardComponents = components.filter(comp => comp.__component === 'contact.service-card') as ContactServiceCard[];
  
  // If no service cards found by component type, try to find by other patterns
  if (serviceCardComponents.length === 0) {
    // Look for card_1, card_2, etc. pattern
    const cardKeys = Object.keys(data?.data || {}).filter(key => key.startsWith('card_'));
    console.log('Found card keys:', cardKeys);
    
    serviceCardComponents = cardKeys.map(key => {
      const card = data.data[key];
      console.log(`Processing ${key}:`, card);
      
      if (card && card.title) {
        return {
          __component: 'contact.service-card',
          id: card.id || 1,
          title: card.title,
          description: card.description || '',
          icon: card.icon || '🎨',
          color: card.color || 'bg-blue-500',
          services: card.services || [],
          contact: {
            phone: card.contact?.phone || '+62 812 3456 7890',
            email: card.contact?.email || 'info@narvex.id',
            whatsapp: card.contact?.whatsapp || '+62 812 3456 7890'
          }
        } as ContactServiceCard;
      }
      return null;
    }).filter(Boolean) as ContactServiceCard[];
    
    console.log('Processed service cards:', serviceCardComponents);
  }
  
  const serviceCards = serviceCardComponents.map((card, index) => ({
    id: `service-${index + 1}`,
    name: card.title,
    description: extractTextFromDescription(card.description) || '',
    icon: card.icon || '🎨',
    color: card.color || 'bg-blue-500',
    services: card.services || [],
    contact: {
      phone: card.contact?.phone || '+62 812 3456 7890',
      email: card.contact?.email || 'info@narvex.id',
      whatsapp: card.contact?.whatsapp || '+62 812 3456 7890'
    }
  }));
  
  // Extract contact form - handle different structures
  let formComponent = components.find(comp => comp.__component === 'contact.form') as ContactForm;
  
  // If no form component found, try to find form data in other structures
  if (!formComponent) {
    const formKeys = Object.keys(data?.data || {}).filter(key => key.includes('form'));
    if (formKeys.length > 0) {
      formComponent = data.data[formKeys[0]] as ContactForm;
    }
  }
  
  const contactForm = {
    title: formComponent?.title || 'Formulir Kontak',
    description: extractTextFromDescription(formComponent?.description) || 'Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.',
    fields: {
      name: { placeholder: formComponent?.fields?.name?.placeholder || 'Nama lengkap Anda' },
      email: { placeholder: formComponent?.fields?.email?.placeholder || 'email@example.com' },
      phone: { placeholder: formComponent?.fields?.phone?.placeholder || '+62 812 3456 7890' },
      company: { placeholder: formComponent?.fields?.company?.placeholder || 'Nama perusahaan (opsional)' },
      message: { placeholder: formComponent?.fields?.message?.placeholder || 'Ceritakan tentang proyek Anda...' },
      budget: { 
        options: formComponent?.fields?.budget?.options || [
          { value: 'under_10m', label: 'Di bawah 10 juta' },
          { value: 'between_10m_25m', label: '10 - 25 juta' },
          { value: 'between_25m_50m', label: '25 - 50 juta' },
          { value: 'between_50m_100m', label: '50 - 100 juta' },
          { value: 'over_100m', label: 'Di atas 100 juta' }
        ]
      },
      timeline: { 
        options: formComponent?.fields?.timeline?.options || [
          { value: 'asap', label: 'Segera' },
          { value: 'within_1_month', label: 'Dalam 1 bulan' },
          { value: 'between_1_3_months', label: '1 - 3 bulan' },
          { value: 'between_3_6_months', label: '3 - 6 bulan' },
          { value: 'over_6_months', label: 'Lebih dari 6 bulan' }
        ]
      }
    },
    submitButton: {
      text: formComponent?.submitButton?.text || 'Kirim Pesan',
      loadingText: formComponent?.submitButton?.loadingText || 'Mengirim...'
    },
    successMessage: {
      title: formComponent?.successMessage?.title || 'Pesan Terkirim!',
      description: formComponent?.successMessage?.description || 'Terima kasih! Tim kami akan segera menghubungi Anda dalam 24 jam.',
      buttonText: formComponent?.successMessage?.buttonText || 'Kirim Pesan Lain'
    }
  };
  
  // Extract contact info - handle different structures
  let infoComponent = components.find(comp => comp.__component === 'contact.info') as ContactInfo;
  
  // If no info component found, try to find info data in other structures
  if (!infoComponent) {
    const infoKeys = Object.keys(data?.data || {}).filter(key => key.includes('info') || key.includes('contact'));
    if (infoKeys.length > 0) {
      infoComponent = data.data[infoKeys[0]] as ContactInfo;
    }
  }
  
  const contactInfo = {
    address: {
      city: infoComponent?.address?.city || 'Jakarta',
      country: infoComponent?.address?.country || 'Indonesia',
      street: infoComponent?.address?.street || '',
      postalCode: infoComponent?.address?.postalCode || ''
    },
    businessHours: {
      weekdays: infoComponent?.businessHours?.weekdays || 'Senin - Jumat: 09:00 - 18:00',
      saturday: infoComponent?.businessHours?.saturday || 'Sabtu: 09:00 - 15:00',
      sunday: infoComponent?.businessHours?.sunday || 'Minggu: Tutup'
    },
    contact: {
      email: infoComponent?.contact?.email || 'info@narvex.id',
      phone: infoComponent?.contact?.phone || '+62 812 3456 7890',
      whatsapp: infoComponent?.contact?.whatsapp || '+62 812 3456 7890'
    },
    socialMedia: {
      instagram: infoComponent?.socialMedia?.instagram || 'https://instagram.com/narvex.id'
    }
  };
  
  // Social section (default)
  const socialSection = {
    title: 'Tetap Terhubung',
    description: 'Ikuti perkembangan terbaru kami melalui media sosial dan dapatkan inspirasi kreatif setiap hari.'
  };
  
  return {
    hero,
    serviceCards,
    contactForm,
    contactInfo,
    socialSection
  };
}

export function transformContactMessageData(formData: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}): ContactMessageData {
  return {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    serviceType: formData.service,
    budget: formData.budget,
    timeline: formData.timeline,
    subject: `Konsultasi ${formData.service} - ${formData.name}`,
    message: formData.message
  };
}
