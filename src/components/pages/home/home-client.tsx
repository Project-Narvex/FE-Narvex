'use client';

import React, { useEffect, useState } from 'react';
import { BlogArticle } from '@/data/blog';
import { Project } from '@/data/projects';
import { ClientLogo } from '@/data/clients';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ArrowRight, Play, Palette, Calendar, Megaphone, ExternalLink, Star, MapPin, Phone, Mail, Instagram, Send, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import ClientCarousel from '@/components/ui/ClientCarousel';
import MapComponent from '@/components/ui/MapComponent';

import { 
  initializeAnimations, 
  initializeHeroAnimation, 
  addGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';

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

// Removed unused Client interface - using ClientLogo from data/clients instead

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// Props interface for HomeClient component
interface HomeClientProps {
  recentArticles: BlogArticle[];
  defaultProjects: Project[];
  defaultTestimonials: Testimonial[];
  defaultClients: ClientLogo[];
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
    image: 'https://picsum.photos/800/600?random=1',
    title: 'Creative Design',
    subtitle: 'Branding & Visual Identity'
  },
  {
    image: 'https://picsum.photos/800/600?random=2',
    title: 'Digital Marketing',
    subtitle: 'Social Media & SEO'
  },
  {
    image: 'https://picsum.photos/800/600?random=3',
    title: 'Event Production',
    subtitle: 'Planning & Coordination'
  },
  {
    image: 'https://picsum.photos/800/600?random=4',
    title: 'Consultation',
    subtitle: 'Strategy & Planning'
  }
];





export default function HomeClient({ 
  recentArticles, 
  defaultProjects, 
  defaultTestimonials, 
  defaultClients 
}: HomeClientProps) {
  // State for portfolio filter
  const [activeFilter, setActiveFilter] = useState<'all' | 'creative' | 'exhibition' | 'corporate' | 'wedding'>('all');
  
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

  // State for animation attributes to prevent hydration mismatch
  const [animationAttrs, setAnimationAttrs] = useState({
    delay: "0",
    duration: "0.3", 
    stagger: "0.02"
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag to prevent hydration mismatch
    setIsClient(true);
    
    // Set standardized animation attributes
    setAnimationAttrs({
      delay: "0",
      duration: "0.3",
      stagger: "0.02"
    });

    // Update all animation attributes client-side to prevent hydration mismatch
    const updateAnimationAttributes = () => {
      const animatedElements = document.querySelectorAll('[data-delay], [data-duration], [data-stagger]');
      animatedElements.forEach(element => {
        element.setAttribute('data-delay', '0');
        element.setAttribute('data-duration', '0.3');
        element.setAttribute('data-stagger', '0.02');
      });
    };

    // Apply updates after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(updateAnimationAttributes, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Only initialize animations on client-side after hydration
    if (!isClient) return;
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
    // Initialize hero entrance animation
    const heroAnimation = initializeHeroAnimation();
    
    // Initialize depth animation controller
    const depthController = new DepthAnimationController();
    
    // Add hover animations
    addGSAPHoverAnimations();
    
    // Add depth effects to specific elements after a delay
    const depthEffectsTimeout = setTimeout(() => {
      // Add 3D card effects to service cards
      document.querySelectorAll('.service-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 12,
          perspective: 1200,
          shadowIntensity: 0.25,
          liftHeight: 15
        });
      });
      
      // Add 3D effects to portfolio items
      document.querySelectorAll('.portfolio-item').forEach(item => {
        add3DCardEffect(item, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
      // Add 3D effects to testimonial cards
      document.querySelectorAll('.testimonial-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 10,
          perspective: 1100,
          shadowIntensity: 0.3,
          liftHeight: 18
        });
      });
      
      // Create floating shapes in hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        depthController.createFloatingShapes(heroSection, 8);
      }
      
      // Create morphing background for sections
      const sectionsWithMorphing = document.querySelectorAll('.morphing-bg-section');
      sectionsWithMorphing.forEach(section => {
        createMorphingBackground(section);
      });
      
      // Add enhanced parallax to background elements
      document.querySelectorAll('[data-parallax]').forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
        const depth = parseFloat(element.getAttribute('data-depth') || '1');
        addEnhancedParallax(element, {
          speed,
          depth,
          blur: Math.max(0, (depth - 1) * 1.5),
          opacity: Math.max(0.4, 1 - (depth - 1) * 0.15)
        });
      });
    }, 500);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(depthEffectsTimeout);
      if (animationController) {
        animationController.destroy();
      }
      if (heroAnimation) {
        heroAnimation.kill();
      }
      if (depthController) {
        depthController.destroy();
      }
    };
  }, [isClient]);

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
    { key: 'creative' as const, label: 'Creative' },
    { key: 'exhibition' as const, label: 'Exhibition' },
    { key: 'corporate' as const, label: 'Corporate' },
    { key: 'wedding' as const, label: 'Wedding' }
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
          index < rating ? 'fill-current' : 'text-gray-contrast-300'
        }`}
        style={index < rating ? {color: 'var(--gold-700)'} : undefined}
        aria-hidden="true"
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
    <div className="min-h-screen scroll-snap-container overflow-x-hidden" suppressHydrationWarning>
        {/* Hero Section */}
        <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden scroll-snap-section floating-container layered-bg perspective-2000">
          {/* Enhanced Background Layers */}
          <div className="absolute inset-0 gradient-hero">
            {/* Depth Layer 1 - Furthest back */}
            <div className="absolute inset-0 opacity-15" data-depth-layer="3" data-parallax="0.8">
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse bg-gold-500" data-float="true" data-float-amplitude="15" data-float-duration="4"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-2000 bg-blue-500" data-float="true" data-float-amplitude="20" data-float-duration="5"></div>
                <div className="absolute bottom-1/4 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000 bg-gold-500" data-float="true" data-float-amplitude="12" data-float-duration="3.5"></div>
              </div>
            </div>
            
            {/* Depth Layer 2 - Middle */}
            <div className="absolute inset-0 opacity-25" data-depth-layer="2" data-parallax="0.5">
              <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-gold-400/20 filter blur-lg" data-float="true" data-float-amplitude="10" data-float-duration="6"></div>
              <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full bg-gradient-to-tr from-gold-400/15 to-blue-400/15 filter blur-lg" data-float="true" data-float-amplitude="18" data-float-duration="4.5"></div>
            </div>
            
            {/* Depth Layer 3 - Closest */}
            <div className="absolute inset-0 opacity-30" data-depth-layer="1" data-parallax="0.2">
              <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-white/10 filter blur-sm" data-float="true" data-float-amplitude="8" data-float-duration="3" data-mouse-parallax="0.3"></div>
              <div className="absolute top-1/4 right-1/2 w-24 h-24 rounded-full bg-gold-300/20 filter blur-sm" data-float="true" data-float-amplitude="12" data-float-duration="4" data-mouse-parallax="0.2"></div>
              <div className="absolute bottom-1/2 right-1/4 w-40 h-40 rounded-full bg-blue-300/15 filter blur-sm" data-float="true" data-float-amplitude="15" data-float-duration="5.5" data-mouse-parallax="0.25"></div>
            </div>
            
            {/* Morphing Gradient Overlay */}
            <div className="absolute inset-0 morphing-gradient opacity-60"></div>
          </div>

          {/* Content */}
          <div className="relative z-depth-3 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl transform-3d">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="text-center lg:text-left depth-layer-2 w-full" data-mouse-parallax="0.1">
                <h1 
                  className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-depth-lg leading-tight" 
                  data-element="title" 
                  data-text-animation="wave" 
                  data-delay={animationAttrs.delay} 
                  data-duration={animationAttrs.duration} 
                  data-stagger={animationAttrs.stagger}
                  suppressHydrationWarning
                >
                  <span className="block transform-3d break-words" data-tilt="8">Indonesia&apos;s Premier</span>
                  <span className="block text-gold-500 transform-3d break-words" data-tilt="10">MICE & Exhibition</span>
                  <span className="block transform-3d break-words" data-tilt="6">Specialists</span>
                </h1>
                
                <p 
                  className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-200 mb-3 sm:mb-4 max-w-2xl mx-auto lg:mx-0 text-depth" 
                  data-element="subtitle" 
                  data-text-animation="fade-in" 
                  data-delay={animationAttrs.delay} 
                  data-duration={animationAttrs.duration} 
                  data-stagger={animationAttrs.stagger} 
                  data-mouse-parallax="0.05"
                  suppressHydrationWarning
                >
                  CV. Nara Exhibition Indonesia
                </p>
                
                <p 
                  className="text-base sm:text-lg md:text-xl text-gold-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 text-depth font-medium" 
                  data-element="trust-badge" 
                  data-text-animation="fade-in" 
                  data-delay={animationAttrs.delay} 
                  data-duration={animationAttrs.duration} 
                  data-stagger={animationAttrs.stagger} 
                  data-mouse-parallax="0.05"
                  suppressHydrationWarning
                >
                  Trusted by Government & Fortune 500 Companies
                </p>
                
                <div className="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" data-mouse-parallax="0.08">
                  <Button
                    variant="secondary"
                    size="normal"
                    onClick={() => scrollToSection('#portfolio')}
                    className="group animate-glow hover-depth shadow-depth-3 backdrop-blur-sm w-full sm:w-auto"
                    data-tilt="5"
                  >
                    Lihat Portfolio
                    <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="normal"
                    onClick={() => scrollToSection('#contact')}
                    className="border-white text-white hover:bg-white hover:text-gray-900 group animate-pulse-hover hover-depth-subtle glass-morphism w-full sm:w-auto"
                    data-tilt="5"
                  >
                    <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    Konsultasi Gratis
                  </Button>
                </div>

                {/* Stats */}
                <div className="hero-stats grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 stagger-children" data-mouse-parallax="0.06">
                  <div className="text-center hover-depth-subtle glass-morphism rounded-lg p-3 sm:p-4 backdrop-blur-sm" data-tilt="3">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-gold-500 text-depth">50+</div>
                    <div className="text-gray-300 text-xs sm:text-sm md:text-base leading-tight">Projects Completed</div>
                  </div>
                  <div className="text-center hover-depth-subtle glass-morphism rounded-lg p-3 sm:p-4 backdrop-blur-sm" data-tilt="3">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-gold-500 text-depth">25+</div>
                    <div className="text-gray-300 text-xs sm:text-sm md:text-base leading-tight">Happy Clients</div>
                  </div>
                  <div className="text-center hover-depth-subtle glass-morphism rounded-lg p-3 sm:p-4 backdrop-blur-sm" data-tilt="3">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 text-gold-500 text-depth">3+</div>
                    <div className="text-gray-300 text-xs sm:text-sm md:text-base leading-tight">Years Experience</div>
                  </div>
                </div>
              </div>

              {/* Visual Content - Service Coverflow */}
              <div className="relative hidden lg:block w-full coverflow-container depth-layer-1 overflow-hidden" data-mouse-parallax="0.15">
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={'auto'}
                  coverflowEffect={{
                    rotate: 40,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation={true}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  className="mySwiper perspective-1500"
                >
                  {coverflowServices.map((service, index) => (
                    <SwiperSlide key={index} style={{ width: '300px' }}>
                      <div 
                        className="relative rounded-2xl overflow-hidden h-80 shadow-depth-3 hover:shadow-depth-5 hover-depth transform-3d backdrop-blur-sm"
                        style={{
                          backgroundImage: `url(${service.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                        data-tilt="12"
                      >
                        {/* Enhanced overlay with depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent hover:from-black/50 hover:via-black/20 transition-all duration-500"></div>
                        
                        {/* Glass morphism overlay */}
                        <div className="absolute inset-0 glass-morphism-dark opacity-20 hover:opacity-30 transition-opacity duration-300"></div>
                        
                        {/* Text content with depth */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform-3d">
                          <h3 className="font-semibold text-lg mb-2 text-depth-lg">{service.title}</h3>
                          <p className="text-gray-200 text-sm text-depth">{service.subtitle}</p>
                        </div>
                        
                        {/* Floating accent */}
                        <div className="absolute top-4 right-4 w-3 h-3 bg-gold-400 rounded-full opacity-60 animate-pulse" data-float="true" data-float-amplitude="3" data-float-duration="2"></div>
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
        <section id="about" className="section-padding bg-gradient-to-br from-white via-blue-50/30 to-gray-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container relative overflow-hidden">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute top-10 left-10 w-28 h-28 bg-blue-300/10 rounded-full blur-3xl" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-20 right-20 w-36 h-36 bg-gold-300/12 rounded-full blur-2xl" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-blue-200/15 rounded-full blur-xl" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/6 right-1/8 w-16 h-16 bg-blue-300/18 rounded-full filter blur-lg" data-parallax="0.25" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/6 left-1/4 w-24 h-24 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.35" data-float="true" data-float-amplitude="16" data-float-duration="8"></div>
            <div className="absolute top-3/5 right-1/3 w-20 h-20 bg-blue-200/10 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-2/5 left-1/8 w-32 h-32 bg-gold-200/12 rounded-full filter blur-3xl" data-parallax="0.2" data-float="true" data-float-amplitude="22" data-float-duration="11"></div>
            <div className="absolute top-1/8 left-2/3 w-18 h-18 bg-blue-100/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute bottom-1/8 right-2/5 w-28 h-28 bg-gold-300/10 rounded-full filter blur-2xl" data-parallax="0.15" data-float="true" data-float-amplitude="20" data-float-duration="9"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative z-10">
            {/* Decorative Top Divider */}
            <div className="flex items-center justify-center mb-8 sm:mb-12">
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-16 sm:w-24"></div>
              <div className="mx-3 sm:mx-4 w-2 h-2 rounded-full bg-gold-500"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent w-16 sm:w-24"></div>
            </div>
            
            <div className="max-w-7xl mx-auto z-depth-2">
              <h2 
                className="heading-2 mb-4 sm:mb-6 text-depth-lg transform-3d text-blue-brand"  
                data-element="heading" 
                data-text-animation="rotate-in" 
                data-delay={animationAttrs.delay} 
                data-duration={animationAttrs.duration} 
                data-stagger={animationAttrs.stagger} 
                data-tilt="4"
                suppressHydrationWarning
              >
                CV. Nara Exhibition Indonesia
              </h2>
              <p className="body-large text-gray-contrast-700 mb-12 leading-relaxed max-w-3xl mx-auto" data-element="description" data-text-animation="blur-focus" data-delay="0" data-duration="0.3" data-stagger="0.02" data-mouse-parallax="0.03">
                Perusahaan induk yang menaungi ekosistem layanan kreatif terintegrasi, 
                mengkhususkan diri dalam MICE services, event production, dan solusi kreatif 
                komprehensif. Dengan 4 partner company yang saling melengkapi, kami memberikan 
                layanan end-to-end untuk kesuksesan setiap project Anda.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-12 sm:mt-16 animate-stagger">
                <Card 
                  variant="service" 
                  className="service-card group text-center flex flex-col h-full min-h-[280px] scroll-animate-scale rounded-3xl will-change-transform" 
                  data-stagger="0"
                >
                  <CardContent className="px-4 py-8 flex flex-col h-full">
                    <div className="service-icon w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🎨</span>
                    </div>
                    <h3 className="text-base font-bold mb-4 text-high-contrast group-hover:text-blue-800 transition-colors duration-300 leading-snug text-center">Creative Design & Branding</h3>
                    <p className="text-sm text-gray-contrast-600 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300 mb-4">Brand identity, graphic design, dan visual communication</p>
                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                  </CardContent>
                </Card>
                <Card 
                  variant="service" 
                  className="service-card group text-center flex flex-col h-full min-h-[280px] scroll-animate-scale rounded-3xl will-change-transform" 
                  data-stagger="100"
                >
                  <CardContent className="px-4 py-8 flex flex-col h-full">
                    <div className="service-icon w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-gold-100 to-gold-200 group-hover:from-gold-200 group-hover:to-gold-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🎬</span>
                    </div>
                    <h3 className="text-base font-bold mb-4 text-high-contrast group-hover:text-blue-800 transition-colors duration-300 leading-snug text-center">Event Production</h3>
                    <p className="text-sm text-gray-contrast-600 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300 mb-4">Event planning, design, dan technical support</p>
                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-gold-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                  </CardContent>
                </Card>
                <Card 
                  variant="service" 
                  className="service-card group text-center flex flex-col h-full min-h-[280px] scroll-animate-scale rounded-3xl will-change-transform" 
                  data-stagger="200"
                >
                  <CardContent className="px-4 py-8 flex flex-col h-full">
                    <div className="service-icon w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📱</span>
                    </div>
                    <h3 className="text-base font-bold mb-4 text-high-contrast group-hover:text-blue-800 transition-colors duration-300 leading-snug text-center">Digital Marketing</h3>
                    <p className="text-sm text-gray-contrast-600 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300 mb-4">Social media, SEO, digital advertising, dan website development</p>
                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-gold-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                  </CardContent>
                </Card>
                <Card 
                  variant="service" 
                  className="service-card group text-center flex flex-col h-full min-h-[280px] scroll-animate-scale rounded-3xl will-change-transform" 
                  data-stagger="300"
                >
                  <CardContent className="px-4 py-8 flex flex-col h-full">
                    <div className="service-icon w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-gold-100 to-gold-200 group-hover:from-gold-200 group-hover:to-gold-300 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">💼</span>
                    </div>
                    <h3 className="text-base font-bold mb-4 text-high-contrast group-hover:text-blue-800 transition-colors duration-300 leading-snug text-center">Brand Consultation</h3>
                    <p className="text-sm text-gray-contrast-600 flex-1 leading-relaxed group-hover:text-gray-contrast-700 transition-colors duration-300 mb-4">Strategic planning dan brand positioning</p>
                    <div className="mt-4 h-1 w-0 bg-gradient-to-r from-gold-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full mx-auto"></div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Bottom Decorative Element */}
              <div className="flex items-center justify-center mt-16">
                <div className="h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent w-32"></div>
                <div className="mx-4 w-3 h-3 rounded-full bg-blue-500"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-gold-300 to-transparent w-32"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="section-padding bg-gradient-to-br from-gray-50 to-blue-50 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/20 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/25 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-2/3 left-2/3 w-40 h-40 bg-blue-100/15 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-depth-2">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 scroll-animate depth-layer-1" data-mouse-parallax="0.05">
              <h2 className="heading-2 mb-4 sm:mb-6 text-depth-lg transform-3d text-blue-brand" data-element="heading" data-text-animation="rotate-in" data-delay="0" data-duration="0.3" data-stagger="0.02" data-tilt="4">
                Layanan Kami
              </h2>
              <p className="body-large max-w-3xl mx-auto text-gray-contrast-700 text-depth" data-element="description" data-text-animation="blur-focus" data-delay="0" data-duration="0.3" data-stagger="0.02" data-mouse-parallax="0.03">
                Solusi kreatif terpadu yang dirancang untuk mengangkat brand Anda ke level yang lebih tinggi.
              </p>
            </div>

            
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-stagger stagger-children" data-mouse-parallax="0.08">
              {services.map((service, index) => (
                <Card
                  key={service.id}
                  variant="service"
                  className={`service-card group text-center flex flex-col h-full min-h-[280px] scroll-animate-scale rounded-3xl will-change-transform`}
                  data-stagger={index * 150}
                  data-tilt="8"
                  data-mouse-parallax="0.12"
                >
                  {/* Icon */}
                  <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 animate-pulse-hover">
                    <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-glow-gold transition-all duration-300">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-4 transition-colors text-high-contrast">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-contrast-600 mb-6 leading-relaxed text-justify">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-3 mb-6 flex-1 list-none">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-gray-contrast-700 scroll-animate animate-stagger-3" data-stagger={(index * 150) + (idx * 50)}>
                          <span className="w-2 h-2 bg-gold-500 rounded-full mt-2 mr-3 flex-shrink-0 transition-all duration-300 hover:scale-150" aria-hidden="true"></span>
                          <span className="text-sm font-medium group-hover:text-blue-800 transition-colors leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <button 
                      onClick={scrollToContact}
                      className="font-semibold transition-all duration-300 group flex items-center hover:shadow-lg px-4 py-2 rounded-lg hover:bg-blue-50 mt-auto" style={{color: 'var(--gold-700)'}}
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
              <p className="body-large mb-8 text-gray-contrast-600">
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
        <section id="portfolio" className="section-padding bg-white scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Original circles */}
            <div className="absolute top-1/5 right-1/4 w-28 h-28 bg-gold-100/15 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
            <div className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-blue-100/12 rounded-full filter blur-2xl" data-parallax="0.35" data-float="true" data-float-amplitude="22" data-float-duration="9"></div>
            <div className="absolute top-3/4 right-1/3 w-20 h-20 bg-gold-200/18 rounded-full filter blur-lg" data-parallax="0.15" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-blue-200/10 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="16" data-float-duration="6"></div>
            <div className="absolute bottom-1/2 right-1/5 w-32 h-32 bg-gold-100/12 rounded-full filter blur-2xl" data-parallax="0.2" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            
            {/* Additional circles for enhanced visual depth */}
            <div className="absolute top-1/8 left-1/8 w-22 h-22 bg-blue-300/15 rounded-full filter blur-xl" data-parallax="0.4" data-float="true" data-float-amplitude="14" data-float-duration="6"></div>
            <div className="absolute bottom-1/8 right-1/8 w-26 h-26 bg-gold-200/12 rounded-full filter blur-2xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
            <div className="absolute top-2/3 left-1/4 w-18 h-18 bg-blue-100/20 rounded-full filter blur-lg" data-parallax="0.35" data-float="true" data-float-amplitude="12" data-float-duration="5"></div>
            <div className="absolute bottom-3/4 right-2/3 w-30 h-30 bg-gold-100/10 rounded-full filter blur-3xl" data-parallax="0.25" data-float="true" data-float-amplitude="20" data-float-duration="10"></div>
            <div className="absolute top-1/6 right-1/6 w-20 h-20 bg-blue-200/12 rounded-full filter blur-2xl" data-parallax="0.45" data-float="true" data-float-amplitude="16" data-float-duration="7"></div>
            <div className="absolute bottom-1/6 left-2/3 w-24 h-24 bg-gold-300/15 rounded-full filter blur-xl" data-parallax="0.2" data-float="true" data-float-amplitude="15" data-float-duration="9"></div>
          </div>
          
          {/* Decorative divider */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-depth-2">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 scroll-animate depth-layer-1" data-mouse-parallax="0.04">
              <h2 className="heading-2 mb-4 sm:mb-6 text-depth-lg transform-3d" data-element="heading" data-text-animation="elastic" data-delay="0" data-duration="0.3" data-stagger="0.02" data-tilt="3">
                Portfolio Terpilih
              </h2>
              <p className="body-large max-w-3xl mx-auto text-gray-contrast-600 mb-6 sm:mb-8 text-depth" data-element="filters" data-text-animation="slide-up" data-delay="0" data-duration="0.3" data-stagger="0.02" data-mouse-parallax="0.02">
                Lihat beberapa project terbaik yang telah kami kerjakan untuk berbagai klien dari berbagai industri.
              </p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4" data-mouse-parallax="0.06">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 hover-depth-subtle transform-3d backdrop-blur-sm min-h-[44px] touch-manipulation text-sm sm:text-base ${
                      activeFilter === filter.key
                        ? 'bg-gold-500 text-white shadow-depth-3 transform scale-105 text-depth'
                        : 'bg-gray-contrast-100 text-gray-contrast-700 hover:bg-gray-contrast-200 hover:scale-105 glass-morphism shadow-depth-1'
                    }`}
                    data-tilt="5"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-stagger stagger-children" data-mouse-parallax="0.1">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  variant="portfolio"
                  className={`portfolio-item group cursor-pointer shadow-depth-2 hover:shadow-depth-4 hover-depth transform-3d backdrop-blur-sm`}
                  data-stagger={index * 150}
                  data-tilt="6"
                  data-mouse-parallax="0.15"
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <div className="relative w-full h-64">
                      <Image
                        src={project.images[0] || '/placeholder-image.jpg'}
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
              <p className="body-large mb-8 text-gray-contrast-600">
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
        <section id="testimonials" className="section-padding bg-blue-900 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container floating-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/6 left-1/8 w-40 h-40 bg-gold-300/15 rounded-full filter blur-2xl" data-parallax="0.4" data-float="true" data-float-amplitude="25" data-float-duration="12"></div>
            <div className="absolute bottom-1/5 right-1/6 w-32 h-32 bg-blue-300/20 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
            <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-white/10 rounded-full filter blur-lg" data-parallax="0.5" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-1/4 right-2/3 w-28 h-28 bg-gold-200/12 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="20" data-float-duration="10"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-depth-2">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 scroll-animate depth-layer-1" data-mouse-parallax="0.03">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-6 text-depth-lg transform-3d testimonial-heading text-white" data-element="heading" data-text-animation="glitch" data-delay="0" data-duration="0.3" data-stagger="0.02" data-tilt="3">
                Kata Mereka
              </h2>
              <p className="text-lg sm:text-xl font-normal leading-relaxed max-w-3xl mx-auto text-depth testimonial-description text-gray-200" data-element="content" data-text-animation="fade-in" data-delay="0" data-duration="0.3" data-stagger="0.02" data-mouse-parallax="0.02">
                Kepercayaan klien adalah prioritas utama kami. Lihat apa kata mereka tentang pengalaman bekerja sama dengan Narvex.
              </p>
            </div>
            
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 stagger-children" data-mouse-parallax="0.08">
              {defaultTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id}
                  className={`service-card group text-center flex flex-col h-full min-h-[280px] scroll-animate-scale rounded-3xl will-change-transform testimonial-accessible bg-white card-accessible`}
                  data-stagger={index * 200}
                  data-tilt="8"
                  data-mouse-parallax="0.12"
                  hover={true}
                >
                  {/* Rating */}
                  <div className="flex mb-6" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="quote font-normal text-medium-contrast text-lg mb-6 italic leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={`${testimonial.name}, ${testimonial.position} at ${testimonial.company}`}
                        fill
                        className="rounded-full object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="author-name font-bold text-lg text-high-contrast">{testimonial.name}</h4>
                      <p className="author-position text-gray-contrast-600 text-sm font-medium">{testimonial.position}</p>
                      <p className="author-company text-sm font-semibold author-company-gold">{testimonial.company}</p>
                      {testimonial.project && (
                        <p className="author-project text-gray-contrast-500 text-xs mt-1 font-medium">{testimonial.project}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Client Logos Carousel */}
            <div className="animate-fade-in animation-delay-600 no-shadow">
              <p className="text-center mb-8 text-lg client-carousel-text">
                Dipercaya oleh:
              </p>
              <div className="no-shadow">
                <ClientCarousel clients={defaultClients} autoScroll={true} scrollSpeed={25} />
              </div>
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
              <p className="body-large text-gray-contrast-600 max-w-3xl mx-auto scroll-animate animate-stagger-2">
                Berita terbaru, insights industri, dan stories dari project-project terbaru kami.
              </p>
            </div>
            
            {/* Centered Blog Articles Container */}
            <div className="flex justify-center">
              <div className="w-full max-w-5xl">
                {/* Blog Articles */}
                <div className="scroll-animate-left">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                    {recentArticles.map((article, index) => (
                      <article key={article.id} className="article-card bg-gray-contrast-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow scroll-animate-scale card-accessible" data-stagger={index * 200}>
                        <div className="h-40 bg-gray-contrast-200 flex items-center justify-center">
                          <div className="text-4xl font-bold opacity-20 text-gold-500">{index + 1}</div>
                        </div>
                        <div className="p-6">
                          <div className="text-sm font-medium mb-2 capitalize" style={{color: 'var(--gold-700)'}}>
                            {article.category.replace('-', ' ')}
                          </div>
                          <h3 className="text-lg font-bold mb-3 line-clamp-2 text-high-contrast">
                            {article.title}
                          </h3>
                          <p className="text-gray-contrast-600 mb-4 line-clamp-2 text-sm">
                            {article.excerpt}
                          </p>
                          <a 
                            href={`/blog/${article.slug}`}
                            className="font-medium transition-colors text-sm hover:opacity-80 link-accessible" style={{color: 'var(--gold-700)'}}
                          >
                            Baca Selengkapnya →
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link href="/blog" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block hover:opacity-90 btn-accessible-primary blog-button">
                Lihat Semua Artikel
              </Link>
            </div>
          </div>
        </section>
        
        {/* Multi-Channel Contact CTA */}
        <section className="min-h-screen flex items-center py-20 bg-blue-900 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container floating-container">
          {/* Enhanced floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/6 left-1/8 w-40 h-40 bg-gold-300/15 rounded-full filter blur-2xl" data-parallax="0.4" data-float="true" data-float-amplitude="25" data-float-duration="12"></div>
            <div className="absolute bottom-1/5 right-1/6 w-32 h-32 bg-blue-300/20 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="18" data-float-duration="8"></div>
            <div className="absolute top-2/3 left-1/2 w-24 h-24 bg-white/10 rounded-full filter blur-lg" data-parallax="0.5" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
            <div className="absolute top-1/4 right-2/3 w-28 h-28 bg-gold-200/12 rounded-full filter blur-xl" data-parallax="0.25" data-float="true" data-float-amplitude="20" data-float-duration="10"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-depth-2">
            <div className="text-center mb-12 scroll-animate-scale">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 scroll-animate animate-stagger-1" data-element="heading" data-text-animation="wave" data-delay="0" data-duration="0.3" data-stagger="0.02">
                Siap Memulai Project Anda?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto scroll-animate animate-stagger-2" data-element="content" data-text-animation="fade-in" data-delay="0" data-duration="0.3" data-stagger="0.02">
                Hubungi kami melalui berbagai channel yang tersedia. Tim ahli kami siap membantu 
                mewujudkan visi kreatif Anda menjadi kenyataan.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 scroll-animate">
              <a href="/contact" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="0">
                <div className="contact-icon w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform bg-gold-500">
                  <Image src="/icons/email.png" alt="Email" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <p className="text-gray-300 text-sm">narvex.ind@gmail.com</p>
              </a>
              
              <a href="https://wa.me/62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="100">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image src="/icons/whatsapp.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
              
              <a href="https://instagram.com/narvex.id" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="200">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image src="/icons/instagram.png" alt="Instagram" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Instagram</h3>
                <p className="text-gray-300 text-sm">@narvex.id</p>
              </a>
              
              <a href="tel:+62xxx" className="contact-card bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors group animate-bounce-in-delay" data-stagger="300">
                <div className="contact-icon w-16 h-16 bg-gold-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image src="/icons/phone.png" alt="Phone" width={32} height={32} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <p className="text-gray-300 text-sm">+62 xxx xxxx xxxx</p>
              </a>
            </div>
            
            <div className="text-center scroll-animate animate-stagger-4">
              <Link href="/contact" className="text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block mr-4 hover:opacity-90 bg-gold-500 animate-pulse-glow">
                Konsultasi Gratis
              </Link>
              <Link href="/portfolio" className="border-2 border-white text-white hover:bg-white hover:text-[#27364d] px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block animate-pulse-hover">
                Lihat Portfolio
              </Link>
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
                    <p className="body-large text-gray-contrast-600 mb-6">
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
                    <h2 className="heading-2 mb-6" data-element="heading" data-text-animation="wave" data-delay="0" data-duration="0.3" data-stagger="0.02">
                      Mari Wujudkan Project Impian Anda
                    </h2>
                    <p className="body-large text-gray-contrast-600 mb-8" data-element="form" data-text-animation="slide-up" data-delay="0" data-duration="0.3" data-stagger="0.02">
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
                            className={`form-input-accessible w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                              errors.name ? 'border-red-500' : 'border-gray-contrast-400 focus:border-blue-700'
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
                            className={`form-input-accessible w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                              errors.email ? 'border-red-500' : 'border-gray-contrast-400 focus:border-blue-700'
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
                            className={`form-input-accessible w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                              errors.phone ? 'border-red-500' : 'border-gray-contrast-400 focus:border-blue-700'
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
                            className={`form-input-accessible w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                              errors.service ? 'border-red-500' : 'border-gray-contrast-400 focus:border-blue-700'
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
                          className={`form-input-accessible w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none ${
                            errors.message ? 'border-red-500' : 'border-gray-contrast-400 focus:border-blue-700'
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
                      <h3 className="heading-4 mb-6" data-element="info" data-text-animation="fade-in" data-delay="0" data-duration="0.3" data-stagger="0.02">Hubungi Kami</h3>
                      <div className="space-y-6">
                        {contactInfo.map((info, index) => (
                          <div key={index} className="flex items-start scroll-animate animate-stagger-6" data-stagger={index * 100}>
                            <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                              {info.icon}
                            </div>
                            <div>
                              <p className="font-semibold text-high-contrast text-lg">{info.label}</p>
                              <p className="text-gray-contrast-700 font-medium">{info.value}</p>
                              <p className="text-gray-contrast-500 text-sm">{info.description}</p>
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
    </div>
  );
}
