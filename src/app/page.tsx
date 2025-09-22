'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ArrowRight, Play, Palette, Calendar, Megaphone, ExternalLink, Star, MapPin, Phone, Mail, Instagram, Send, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import ClientCarousel from '@/components/ui/ClientCarousel';
import MapComponent from '@/components/ui/MapComponent';
import InstagramFeed from '@/components/social/InstagramFeed';
import { getRecentArticles } from '@/data/blog';
import { initializeAnimations } from '@/lib/animations';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Types
interface Service {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

interface Project {
  id: number;
  title: string;
  category: 'branding' | 'events' | 'digital' | 'all';
  image: string;
  description: string;
  tags: string[];
  client?: string;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  avatar: string;
  quote: string;
  rating: number;
  project?: string;
}

interface Client {
  name: string;
  logo: string;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Data
const services: Service[] = [
  {
    id: 'creative-design',
    icon: <Palette className="w-8 h-8 text-white" />,
    title: 'Creative Design',
    description: 'Branding, logo design, dan visual identity yang memorable untuk membuat brand Anda tampil menonjol.',
    features: ['Logo Design', 'Brand Guidelines', 'Print Design', 'Packaging Design']
  },
  {
    id: 'event-production',
    icon: <Calendar className="w-8 h-8 text-white" />,
    title: 'Event Production',
    description: 'Event planning dan production dari konsep hingga eksekusi untuk menciptakan pengalaman yang tak terlupakan.',
    features: ['Event Planning', 'Stage Design', 'Audio Visual', 'Event Coordination']
  },
  {
    id: 'digital-marketing',
    icon: <Megaphone className="w-8 h-8 text-white" />,
    title: 'Digital Marketing',
    description: 'Strategi digital yang efektif untuk growth bisnis Anda di era digital yang kompetitif.',
    features: ['Social Media Management', 'Content Creation', 'SEO Optimization', 'Digital Advertising']
  }
];

const coverflowServices = [
  {
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20creative%20design%20workspace%20with%20tools%20palette%20brushes%20computer%20vibrant%20colors&image_size=landscape_4_3',
    title: 'Creative Design',
    subtitle: 'Branding & Visual Identity'
  },
  {
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=digital%20marketing%20dashboard%20analytics%20social%20media%20graphs%20smartphone%20modern%20office&image_size=landscape_4_3',
    title: 'Digital Marketing',
    subtitle: 'Social Media & SEO'
  },
  {
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=event%20production%20stage%20lighting%20camera%20equipment%20concert%20venue%20professional&image_size=landscape_4_3',
    title: 'Event Production',
    subtitle: 'Planning & Coordination'
  },
  {
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=business%20consultation%20meeting%20room%20strategy%20charts%20professional%20office%20planning&image_size=landscape_4_3',
    title: 'Consultation',
    subtitle: 'Strategy & Planning'
  }
];

const defaultProjects: Project[] = [
  {
    id: 1,
    title: 'Brand Identity Skywork',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center',
    description: 'Comprehensive brand identity design untuk Skywork Events dengan fokus pada profesionalisme dan kreativitas.',
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity'],
    client: 'Skywork Events'
  },
  {
    id: 2,
    title: 'Wedding Event Production',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop&crop=center',
    description: 'Event production untuk pernikahan mewah dengan konsep elegant dan romantic yang tak terlupakan.',
    tags: ['Event Planning', 'Stage Design', 'Decoration'],
    client: 'Private Client'
  },
  {
    id: 3,
    title: 'Digital Campaign Gutama',
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center',
    description: 'Kampanye digital marketing untuk Gutama Learning yang meningkatkan engagement hingga 300%.',
    tags: ['Social Media', 'Content Creation', 'Digital Strategy'],
    client: 'Gutama Learning'
  },
  {
    id: 4,
    title: 'Creative Sky Branding',
    category: 'branding',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center',
    description: 'Rebranding lengkap untuk Creative Sky dengan pendekatan fresh dan modern.',
    tags: ['Rebranding', 'Logo Design', 'Marketing Materials'],
    client: 'Creative Sky'
  },
  {
    id: 5,
    title: 'Corporate Event Evervow',
    category: 'events',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&crop=center',
    description: 'Event production untuk corporate gathering Evervow dengan tema professional dan engaging.',
    tags: ['Corporate Event', 'Audio Visual', 'Event Management'],
    client: 'Evervow'
  },
  {
    id: 6,
    title: 'Social Media Strategy',
    category: 'digital',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop&crop=center',
    description: 'Strategi social media comprehensive untuk meningkatkan brand awareness dan engagement.',
    tags: ['Social Media', 'Content Strategy', 'Brand Awareness'],
    client: 'Multiple Clients'
  }
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'Skywork Events',
    position: 'Event Director',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    quote: 'Narvex berhasil mengubah visi kami menjadi event yang luar biasa. Tim mereka sangat profesional, kreatif, dan detail-oriented. Hasil akhirnya melebihi ekspektasi kami.',
    rating: 5,
    project: 'Corporate Event Production'
  },
  {
    id: '2',
    name: 'Ahmad Gutama',
    company: 'Gutama Learning',
    position: 'Marketing Manager',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    quote: 'Strategi digital marketing dari Narvex meningkatkan engagement kami hingga 300% dalam 6 bulan. ROI yang luar biasa! Highly recommended untuk semua bisnis.',
    rating: 5,
    project: 'Digital Marketing Campaign'
  },
  {
    id: '3',
    name: 'Maria Creative',
    company: 'Creative Sky',
    position: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    quote: 'Rebranding yang dilakukan Narvex memberikan fresh perspective untuk brand kami. Proses kolaborasinya sangat smooth dan hasilnya beyond expectations.',
    rating: 5,
    project: 'Brand Identity Design'
  },
  {
    id: '4',
    name: 'David Wilson',
    company: 'Evervow',
    position: 'CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    quote: 'Partnership dengan Narvex adalah salah satu keputusan terbaik untuk company kami. Mereka tidak hanya deliver hasil yang excellent, tapi juga memberikan strategic insights.',
    rating: 5,
    project: 'Comprehensive Branding'
  }
];

const defaultClients: Client[] = [
  { name: 'Bank Indonesia', logo: '/logos/BI.png' },
  { name: 'Kominfo', logo: '/logos/Kominfo.png' },
  { name: 'Kementerian Perhubungan RI', logo: '/logos/Mentri_perhubungan.png' },
  { name: 'Upscaled', logo: '/logos/Upscaled.png' },
  { name: 'Basarnas', logo: '/logos/Basarnas.png' },
  { name: 'Universitas Airlangga', logo: '/logos/Unair.png' },
  { name: 'SD Muhammadiyah Taman', logo: '/logos/SDMTaman.png' },
  { name: 'SMAN 2', logo: '/logos/SMAN2.png' },
  { name: 'Madiun', logo: '/logos/Madiun.png' },
  { name: 'Puma', logo: '/logos/Puma.png' },
  { name: 'Campina', logo: '/logos/Campina.png' },
  { name: 'Erajaya', logo: '/logos/Erajaya.png' },
  { name: 'Erafone', logo: '/logos/Erafone.png' },
  { name: 'Badanamu', logo: '/logos/Badanamu.png' },
  { name: 'Jaya', logo: '/logos/Jaya.png' },
  { name: 'RCH', logo: '/logos/RCH.png' },
  { name: 'Plaza Surabaya', logo: '/logos/PlazaSBY.png' },
  { name: 'DGW', logo: '/logos/DGW.png' },
  { name: 'SAW Tour', logo: '/logos/SAWTour.png' },
  { name: 'J99', logo: '/logos/J99.png' }
];

export default function Home() {
  // State for portfolio filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'branding' | 'events' | 'digital'>('all');
  
  // State for contact form
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    // Initialize scroll animations
    const animationController = initializeAnimations();
    
    // Cleanup on unmount
    return () => {
      if (animationController) {
        animationController.destroy();
      }
    };
  }, []);

  // Helper functions
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Portfolio filter
  const filters = [
    { key: 'all' as const, label: 'Semua' },
    { key: 'branding' as const, label: 'Branding' },
    { key: 'events' as const, label: 'Events' },
    { key: 'digital' as const, label: 'Digital' }
  ];

  const filteredProjects = defaultProjects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  // Testimonials helper
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'fill-current' : 'text-gray-300'
        }`}
        style={index < rating ? {color: 'var(--gold-500)'} : undefined}
      />
    ));
  };

  // Contact form helpers
  const contactServices = [
    'Pilih Layanan',
    'Creative Design',
    'Event Production',
    'Digital Marketing',
    'Konsultasi',
    'Lainnya'
  ];

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-gold-500" />,
      label: 'Alamat',
      value: 'Jakarta, Indonesia',
      description: 'Lokasi kantor pusat kami'
    },
    {
      icon: <Phone className="w-6 h-6 text-gold-500" />,
      label: 'Telepon',
      value: '+62 xxx xxxx xxxx',
      description: 'Hubungi kami langsung'
    },
    {
      icon: <Mail className="w-6 h-6 text-gold-500" />,
      label: 'Email',
      value: 'narvex.ind@gmail.com',
      description: 'Kirim email untuk inquiry'
    },
    {
      icon: <Instagram className="w-6 h-6 text-gold-500" />,
      label: 'Instagram',
      value: '@narvex.id',
      description: 'Follow untuk update terbaru'
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor telepon wajib diisi';
    }

    if (!formData.service || formData.service === 'Pilih Layanan') {
      newErrors.service = 'Pilih layanan yang diinginkan';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen scroll-snap-container">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-section">
          {/* Background Gradient */}
          <div className="absolute inset-0 gradient-hero">
            {/* Overlay Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse bg-gold-500"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000 bg-blue-500"></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000 bg-gold-500"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 scroll-animate animate-stagger-1">
                  <span className="block">Creative Solutions</span>
                  <span className="block">for</span>
                  <span className="block text-gold-500">Your Brand</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 scroll-animate animate-stagger-2">
                  CV. Nara Exhibition Indonesia
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start scroll-animate animate-stagger-3">
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() => scrollToSection('#portfolio')}
                    className="group animate-glow"
                  >
                    Lihat Portfolio
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="large"
                    onClick={() => scrollToSection('#contact')}
                    className="border-white text-white hover:bg-white hover:text-[#6382b4] group animate-pulse-hover"
                  >
                    <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    Konsultasi Gratis
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-16 scroll-animate animate-stagger-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 text-gold-500">50+</div>
                    <div className="text-gray-300 text-sm md:text-base">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 text-gold-500">25+</div>
                    <div className="text-gray-300 text-sm md:text-base">Happy Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2 text-gold-500">3+</div>
                    <div className="text-gray-300 text-sm md:text-base">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Visual Content - Service Coverflow */}
              <div className="relative lg:block hidden w-full coverflow-container">
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {coverflowServices.map((service, index) => (
                    <SwiperSlide key={index} style={{ width: '300px' }}>
                      <div 
                        className="relative rounded-2xl overflow-hidden h-80 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        style={{
                          backgroundImage: `url(${service.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/40 hover:bg-black/30 transition-all duration-300"></div>
                        
                        {/* Text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="font-semibold text-lg mb-2 drop-shadow-lg">{service.title}</h3>
                          <p className="text-gray-200 text-sm drop-shadow-md">{service.subtitle}</p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>
        
        {/* Company Introduction - CV. Nara Exhibition Indonesia */}
        <section id="about" className="section-padding bg-white scroll-snap-section">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto scroll-animate">
              <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">
                CV. Nara Exhibition Indonesia
              </h2>
              <p className="body-large text-gray-600 mb-8 scroll-animate animate-stagger-2">
                Perusahaan induk yang menaungi ekosistem layanan kreatif terintegrasi, 
                mengkhususkan diri dalam MICE services, event production, dan solusi kreatif 
                komprehensif. Dengan 4 subsidiary yang saling melengkapi, kami memberikan 
                layanan end-to-end untuk kesuksesan setiap project Anda.
              </p>
              <div className="grid md:grid-cols-4 gap-6 mt-12 scroll-animate animate-stagger-3">
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="0">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-blue-50">
                    <span className="text-2xl">&#127912;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Creative Design & Branding</h3>
                  <p className="text-gray-600 flex-1">Brand identity, graphic design, dan visual communication</p>
                </div>
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="150">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gold-50">
                    <span className="text-2xl">&#127914;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Event Production</h3>
                  <p className="text-gray-600 flex-1">Event planning, design, dan technical support</p>
                </div>
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="300">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-blue-50">
                    <span className="text-2xl">&#128241;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Digital Marketing</h3>
                  <p className="text-gray-600 flex-1">Social media, SEO, digital advertising, dan website development</p>
                </div>
                <div className="service-card text-center flex flex-col h-full min-h-[200px] scroll-animate-scale" data-stagger="450">
                  <div className="service-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gold-50">
                    <span className="text-2xl">&#128188;</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-blue-900">Brand Consultation</h3>
                  <p className="text-gray-600 flex-1">Strategic planning dan brand positioning</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 scroll-snap-section">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 scroll-animate">
              <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1" style={{color: '#6382b4'}}>
                Layanan Kami
              </h2>
              <p className="body-large max-w-3xl mx-auto text-gray-700 scroll-animate animate-stagger-2">
                Solusi kreatif terpadu yang dirancang untuk mengangkat brand Anda ke level yang lebih tinggi.
              </p>
            </div>
            
            {/* Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  variant="service"
                  className={`group scroll-animate-scale hover:shadow-2xl flex flex-col h-full`}
                  data-stagger={index * 150}
                >
                  {/* Icon */}
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-pulse-hover">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow-gold transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 transition-colors" style={{color: '#6382b4'}}>
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed text-justify">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-3 mb-6 flex-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 scroll-animate animate-stagger-3" data-stagger={(index * 150) + (idx * 50)}>
                          <div className="w-3 h-3 rounded-full mr-3 transition-colors shadow-sm" style={{backgroundColor: '#dbc48a'}}></div>
                          <span className="text-sm font-medium group-hover:text-blue-900 transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <button 
                      onClick={scrollToContact}
                      className="font-semibold transition-all duration-300 group flex items-center hover:shadow-lg px-4 py-2 rounded-lg hover:bg-blue-50 mt-auto" style={{color: '#dbc48a'}}
                    >
                      Pelajari Lebih Lanjut
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center scroll-animate animate-stagger-4">
              <p className="body-large mb-8 text-gray-600">
                Siap untuk mengembangkan bisnis Anda? Mari diskusikan project impian Anda bersama tim ahli kami.
              </p>
              <Button
                variant="primary"
                size="large"
                onClick={scrollToContact}
                className="group"
              >
                Mulai Project Sekarang
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Portfolio Section */}
        <section id="portfolio" className="section-padding bg-white scroll-snap-section">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 scroll-animate">
              <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">
                Portfolio Terpilih
              </h2>
              <p className="body-large max-w-3xl mx-auto text-gray-600 mb-8 scroll-animate animate-stagger-2">
                Lihat beberapa project terbaik yang telah kami kerjakan untuk berbagai klien dari berbagai industri.
              </p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      activeFilter === filter.key
                        ? 'bg-gold-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  variant="portfolio"
                  className={`group cursor-pointer scroll-animate-scale`}
                  data-stagger={index * 150}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="relative w-full h-64">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-6 text-white w-full">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-200 text-sm mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="bg-gold-500 px-3 py-1 rounded-full text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-300">{project.client}</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Bottom CTA */}
            <div className="text-center scroll-animate animate-stagger-4">
              <p className="body-large mb-8 text-gray-600">
                Tertarik dengan hasil kerja kami? Mari diskusikan project Anda dan wujudkan visi kreatif bersama.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="large"
                  className="group"
                >
                  Lihat Semua Portfolio
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="primary"
                  size="large"
                  onClick={scrollToContact}
                  className="group"
                >
                  Mulai Project Anda
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding bg-blue-900 scroll-snap-section">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 scroll-animate">
              <h2 className="text-5xl font-bold leading-tight mb-6 scroll-animate animate-stagger-1" style={{color: 'var(--white)', fontFamily: 'var(--font-primary)'}}>
                Kata Mereka
              </h2>
              <p className="text-xl font-normal leading-relaxed max-w-3xl mx-auto scroll-animate animate-stagger-2" style={{color: 'var(--white)', fontFamily: 'var(--font-secondary)'}}>
                Kepercayaan klien adalah prioritas utama kami. Lihat apa kata mereka tentang pengalaman bekerja sama dengan Narvex.
              </p>
            </div>
            
            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {defaultTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`bg-white p-8 scroll-animate-scale`}
                  data-stagger={index * 200}
                  hover={false}
                >
                  {/* Rating */}
                  <div className="flex mb-6">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg" style={{color: 'var(--blue-900)'}}>{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.position}</p>
                      <p className="text-sm font-medium" style={{color: 'var(--gold-500)'}}>{testimonial.company}</p>
                      {testimonial.project && (
                        <p className="text-gray-500 text-xs mt-1">{testimonial.project}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Client Logos Carousel */}
            <div className="animate-fade-in animation-delay-600">
              <p className="text-center mb-8 text-lg" style={{color: 'var(--white)'}}>
                Dipercaya oleh:
              </p>
              <ClientCarousel clients={defaultClients} autoScroll={true} scrollSpeed={25} />
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in animation-delay-900">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{color: 'var(--gold-500)'}}>98%</div>
                <div className="text-gray-300">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{color: 'var(--gold-500)'}}>50+</div>
                <div className="text-gray-300">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{color: 'var(--gold-500)'}}>25+</div>
                <div className="text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2" style={{color: 'var(--gold-500)'}}>3+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Latest Updates - Blog/News Integration */}
        <section className="section-padding bg-white scroll-snap-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate">
              <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">Latest Updates</h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto scroll-animate animate-stagger-2">
                Berita terbaru, insights industri, dan stories dari project-project terbaru kami.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Articles */}
              <div className="lg:col-span-2 scroll-animate-left">
                <div className="grid md:grid-cols-2 gap-6">
                  {getRecentArticles(4).map((article, index) => (
                    <article key={article.id} className="article-card bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow scroll-animate-scale" data-stagger={index * 200}>
                      <div className="h-40 bg-gray-200 flex items-center justify-center">
                        <div className="text-4xl font-bold opacity-20 text-gold-500">{index + 1}</div>
                      </div>
                      <div className="p-6">
                        <div className="text-sm font-medium mb-2 capitalize text-gold-500">
                          {article.category.replace('-', ' ')}
                        </div>
                        <h3 className="text-lg font-bold mb-3 line-clamp-2 text-blue-900">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt}
                        </p>
                        <a 
                          href={`/blog/${article.slug}`}
                          className="font-medium transition-colors text-sm hover:opacity-80 text-gold-500"
                        >
                          Baca Selengkapnya →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              
              {/* Instagram Feed */}
              <div className="lg:col-span-1 scroll-animate-right">
                <div className="bg-gray-50 rounded-2xl p-6 card">
                  <InstagramFeed 
                    username="skywork.id"
                    displayName="Skywork.id"
                    limit={4}
                    showHeader={true}
                    className=""
                  />
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <a href="/blog" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block hover:opacity-90 bg-blue-900">
                Lihat Semua Artikel
              </a>
            </div>
          </div>
        </section>
        
        {/* Multi-Channel Contact CTA */}
        <section className="section-padding bg-blue-900 scroll-snap-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 scroll-animate-scale">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 scroll-animate animate-stagger-1">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto scroll-animate animate-stagger-2">
                Hubungi kami melalui berbagai channel yang tersedia. Tim ahli kami siap membantu 
                mewujudkan visi kreatif Anda menjadi kenyataan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 scroll-animate">
              <a href="/contact" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="0">
                <div className="contact-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-gold-500">
                  <img src="/icons/email.png" alt="Email" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 text-sm">narvex.ind@gmail.com</p>
              </a>
              
              <a href="https://wa.me/62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="100">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icons/whatsapp.png" alt="WhatsApp" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
              
              <a href="https://instagram.com/narvex.id" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="200">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icons/instagram.png" alt="Instagram" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 text-sm">@narvex.id</p>
              </a>
              
              <a href="tel:+62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="300">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <img src="/icons/phone.png" alt="Phone" className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
            </div>
            
            <div className="text-center scroll-animate animate-stagger-4">
              <a href="/contact" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block mr-4 hover:opacity-90 bg-gold-500 animate-pulse-glow">
                Konsultasi Gratis
              </a>
              <a href="/portfolio" className="border-2 border-white text-white hover:bg-white hover:text-[#27364d] px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block animate-pulse-hover">
                Lihat Portfolio
              </a>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <div className="scroll-snap-section">
          {isSubmitted ? (
            <section id="contact" className="section-padding bg-gray-50 scroll-snap-section">
              <div className="container mx-auto px-6">
                <div className="max-w-2xl mx-auto text-center">
                  <Card className="p-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h3 className="heading-3 mb-4 text-green-600">Pesan Terkirim!</h3>
                    <p className="body-large text-gray-600 mb-6">
                      Terima kasih telah menghubungi kami. Tim Narvex akan segera merespons inquiry Anda dalam 1x24 jam.
                    </p>
                    <Button
                      variant="primary"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Kirim Pesan Lain
                    </Button>
                  </Card>
                </div>
              </div>
            </section>
          ) : (
            <section id="contact" className="section-padding bg-gray-50 scroll-snap-section">
              <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <div className="scroll-animate">
                    <h2 className="heading-2 mb-6 scroll-animate animate-stagger-1">
                      Mari Wujudkan Project Impian Anda
                    </h2>
                    <p className="body-large text-gray-600 mb-8 scroll-animate animate-stagger-2">
                      Ceritakan visi Anda kepada kami. Tim Narvex siap membantu mewujudkan project yang luar biasa.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6 scroll-animate animate-stagger-3">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <input
                            type="text"
                            name="name"
                            placeholder="Nama Lengkap"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                              errors.name ? 'border-red-500' : 'border-gray-300 focus:border-gold-500'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                              errors.email ? 'border-red-500' : 'border-gray-300 focus:border-gold-500'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Nomor Telepon"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                              errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-gold-500'
                            }`}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 ${
                              errors.service ? 'border-red-500' : 'border-gray-300 focus:border-gold-500'
                            }`}
                          >
                            {contactServices.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          {errors.service && (
                            <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Ceritakan project Anda..."
                          value={formData.message}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gold-300 resize-none ${
                            errors.message ? 'border-red-500' : 'border-gray-300 focus:border-gold-500'
                          }`}
                        ></textarea>
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        size="large"
                        className="w-full group"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            Kirim Pesan
                            <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                  
                  {/* Contact Info & Map */}
                  <div className="scroll-animate-right">
                    <Card className="p-8 mb-8 scroll-animate animate-stagger-4">
                      <h3 className="heading-4 mb-6 scroll-animate animate-stagger-5">Hubungi Kami</h3>
                      <div className="space-y-6">
                        {contactInfo.map((info, index) => (
                          <div key={index} className="flex items-start scroll-animate animate-stagger-6" data-stagger={index * 100}>
                            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              {info.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-blue-900 text-lg">{info.label}</p>
                              <p className="text-gray-700 font-medium">{info.value}</p>
                              <p className="text-gray-500 text-sm">{info.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                    
                    {/* Interactive Map */}
                    <div className="rounded-lg overflow-hidden shadow-lg scroll-animate animate-stagger-7">
                      <MapComponent height="h-64" className="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
