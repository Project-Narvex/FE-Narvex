import React from 'react';
import { StrapiContentService } from '@/lib/strapi/content';
import { transformContactPageData } from '@/lib/contact-utils';
import { strapi } from '@/lib/strapi';
import ContactClient from '@/components/pages/contact/contact-client';

export default async function ContactPage() {
  try {
    const strapiService = new StrapiContentService();
    
    // Try to fetch contact page data from Strapi
    const contactPageData = await strapiService.getContactPage();
    
    // Transform the data to our expected format
    const transformedData = transformContactPageData(contactPageData);
    
    // Fetch homepage data for contact information
    let homepageData = null;
    try {
      homepageData = await strapi.getHomepage();
    } catch (homepageError) {
      console.warn('Could not fetch homepage data for contact info:', homepageError);
    }
    
    return <ContactClient {...transformedData} homepageData={homepageData} />;
    
  } catch (error) {
    console.warn('Error fetching contact page data from Strapi, using fallback:', error);
    
    // Fallback data in case of API error
    const fallbackData = {
      hero: {
        title: 'Hubungi Kami',
        subtitle: 'Mari Diskusikan Proyek Anda',
        description: 'Tim kami siap membantu mewujudkan visi kreatif Anda dengan solusi yang inovatif dan profesional.'
      },
      serviceCards: [
        {
          id: 'branding',
          name: 'Branding & Design',
          description: 'Solusi branding lengkap untuk membangun identitas visual yang kuat dan memorable.',
          icon: '🎨',
          color: 'bg-blue-500',
          services: ['Logo Design', 'Brand Identity', 'Visual Guidelines', 'Marketing Materials'],
          contact: {
            phone: '+62 812 3456 7890',
            email: 'branding@narvex.id',
            whatsapp: '+62 812 3456 7890'
          }
        },
        {
          id: 'events',
          name: 'Event Production',
          description: 'Produksi event profesional dengan konsep kreatif dan eksekusi yang sempurna.',
          icon: '🎪',
          color: 'bg-gold-500',
          services: ['Corporate Events', 'Product Launch', 'Exhibition', 'Conference'],
          contact: {
            phone: '+62 812 3456 7891',
            email: 'events@narvex.id',
            whatsapp: '+62 812 3456 7891'
          }
        },
        {
          id: 'digital',
          name: 'Digital Marketing',
          description: 'Strategi digital marketing yang efektif untuk meningkatkan brand awareness dan engagement.',
          icon: '📱',
          color: 'bg-green-500',
          services: ['Social Media', 'Content Marketing', 'SEO/SEM', 'Digital Campaigns'],
          contact: {
            phone: '+62 812 3456 7892',
            email: 'digital@narvex.id',
            whatsapp: '+62 812 3456 7892'
          }
        },
        {
          id: 'consulting',
          name: 'Business Consulting',
          description: 'Konsultasi bisnis strategis untuk mengoptimalkan operasional dan pertumbuhan perusahaan.',
          icon: '💼',
          color: 'bg-purple-500',
          services: ['Strategic Planning', 'Process Optimization', 'Market Analysis', 'Growth Strategy'],
          contact: {
            phone: '+62 812 3456 7893',
            email: 'consulting@narvex.id',
            whatsapp: '+62 812 3456 7893'
          }
        }
      ],
      contactForm: {
        title: 'Formulir Kontak',
        description: 'Isi formulir di bawah ini dan tim kami akan segera menghubungi Anda.',
        fields: {
          name: { placeholder: 'Nama lengkap Anda' },
          email: { placeholder: 'email@example.com' },
          phone: { placeholder: '+62 812 3456 7890' },
          company: { placeholder: 'Nama perusahaan (opsional)' },
          message: { placeholder: 'Ceritakan tentang proyek Anda...' },
          budget: { 
            options: [
              { value: 'under_10m', label: 'Di bawah 10 juta' },
              { value: 'between_10m_25m', label: '10 - 25 juta' },
              { value: 'between_25m_50m', label: '25 - 50 juta' },
              { value: 'between_50m_100m', label: '50 - 100 juta' },
              { value: 'over_100m', label: 'Di atas 100 juta' }
            ]
          },
          timeline: { 
            options: [
              { value: 'asap', label: 'Segera' },
              { value: 'within_1_month', label: 'Dalam 1 bulan' },
              { value: 'between_1_3_months', label: '1 - 3 bulan' },
              { value: 'between_3_6_months', label: '3 - 6 bulan' },
              { value: 'over_6_months', label: 'Lebih dari 6 bulan' }
            ]
          }
        },
        submitButton: {
          text: 'Kirim Pesan',
          loadingText: 'Mengirim...'
        },
        successMessage: {
          title: 'Pesan Terkirim!',
          description: 'Terima kasih! Tim kami akan segera menghubungi Anda dalam 24 jam.',
          buttonText: 'Kirim Pesan Lain'
        }
      },
      contactInfo: {
        address: {
          city: 'Jakarta',
          country: 'Indonesia',
          street: '',
          postalCode: ''
        },
        businessHours: {
          weekdays: 'Senin - Jumat: 09:00 - 18:00',
          saturday: 'Sabtu: 09:00 - 15:00',
          sunday: 'Minggu: Tutup'
        },
        contact: {
          email: 'info@narvex.id',
          phone: '+62 812 3456 7890',
          whatsapp: '+62 812 3456 7890'
        },
        socialMedia: {
          instagram: 'https://instagram.com/narvex.id'
        }
      },
      socialSection: {
        title: 'Tetap Terhubung',
        description: 'Ikuti perkembangan terbaru kami melalui media sosial dan dapatkan inspirasi kreatif setiap hari.'
      }
    };
    
    return <ContactClient {...fallbackData} homepageData={null} />;
  }
}