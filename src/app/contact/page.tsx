'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import MapComponent from '@/components/ui/MapComponent';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import {
  initializeAnimations,
  addGSAPHoverAnimations,
  cleanupGSAPHoverAnimations,
  DepthAnimationController,
  add3DCardEffect,
  addEnhancedParallax,
  createMorphingBackground
} from '@/lib/animations';
import { 
  contactAPI, 
  defaultServiceCategories, 
  defaultContactInfo, 
  defaultContactPageContent,
  type ServiceCategory,
  type ContactInfo,
  type ContactPageContent,
  type FormSubmission
} from '@/data/contact';

export default function ContactPage() {
  const [selectedService, setSelectedService] = useState('branding');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // CMS data (would be fetched from API in real implementation)
  const [serviceCategories] = useState<ServiceCategory[]>(defaultServiceCategories);
  const [contactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [pageContent] = useState<ContactPageContent>(defaultContactPageContent);

  const selectedServiceData = serviceCategories.find(s => s.id === selectedService);

  useEffect(() => {
    // Initialize GSAP scroll animations
    const animationController = initializeAnimations();
    
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
      
      // Add 3D effects to contact cards
      document.querySelectorAll('.contact-card').forEach(card => {
        add3DCardEffect(card, {
          maxRotation: 8,
          perspective: 1000,
          shadowIntensity: 0.2,
          liftHeight: 12
        });
      });
      
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
      if (depthController) {
        depthController.destroy();
      }
      // Clean up hover animations to prevent duplicate listeners
      cleanupGSAPHoverAnimations();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const submissionData: Omit<FormSubmission, 'id' | 'submittedAt' | 'status'> = {
        ...formData,
        targetService: selectedService,
        source: 'website'
      };

      const result = await contactAPI.submitContactForm(submissionData);
      
      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
          budget: '',
          timeline: ''
        });
      } else {
        setSubmitError(result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceSelection = (serviceId: string) => {
    setSelectedService(serviceId);
    setFormData({ ...formData, service: '' }); // Reset service selection
  };

  return (
    <div className="min-h-screen scroll-snap-container overflow-x-hidden">
      
        {/* Hero Section - Consistent with other pages */}
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
          <div className="relative z-depth-3 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl transform-3d text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 scroll-animate" data-element="breadcrumb" data-text-animation="fade-in" data-delay="0.05" data-duration="0.3">
              <ol className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <Link href="/" className="hover:text-gold-400 transition-colors duration-200">Home</Link>
                </li>
                <li className="flex items-center">
                  <span className="mx-2 text-gray-500">/</span>
                  <span className="text-gold-400">Kontak</span>
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl mx-auto depth-layer-2" data-mouse-parallax="0.1">
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 text-depth-lg leading-tight" data-element="title" data-text-animation="wave" data-delay="0.1" data-duration="0.5" data-stagger="0.03">
                <span className="block transform-3d break-words" data-tilt="8">{pageContent.hero.title}</span>
                <span className="block text-gold-500 transform-3d break-words" data-tilt="10">{pageContent.hero.subtitle}</span>
              </h1>
              <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto text-depth">
                {pageContent.hero.description}
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Service Selection Section */}
        <section className="section-padding bg-gradient-to-br from-white via-blue-50 to-white scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gold-200/10 rounded-full filter blur-2xl" data-parallax="0.6" data-float="true" data-float-amplitude="25" data-float-duration="10"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.4" data-float="true" data-float-amplitude="18" data-float-duration="7"></div>
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16 scroll-animate">
              <h2 className="heading-2 mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 bg-clip-text text-transparent" data-element="heading" data-text-animation="wave" data-delay="0.1" data-duration="0.4" data-stagger="0.025">
                {pageContent.serviceSelection.title}
              </h2>
              <p className="body-large text-gray-contrast-700 leading-relaxed px-4" data-element="content" data-text-animation="fade-in" data-delay="0.15" data-duration="0.25" data-stagger="0.01">
                {pageContent.serviceSelection.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 stagger-children">
              {serviceCategories.map((service) => (
                <div 
                  key={service.id}
                  className={`service-card p-4 sm:p-6 rounded-2xl cursor-pointer transition-all duration-300 glass-morphism backdrop-blur-sm hover-depth-subtle ${
                    selectedService === service.id 
                      ? 'bg-blue-900 text-white shadow-blue-depth scale-105 border-blue-500/30' 
                      : 'bg-white/90 text-blue-900 shadow-md hover:shadow-lg border-white/50'
                  }`}
                  onClick={() => handleServiceSelection(service.id)}
                  data-element="service-card"
                  data-animation="slide-up"
                  data-delay="0.1"
                  data-duration="0.35"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${selectedService === service.id ? 'bg-gold-500' : service.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 shadow-depth-2 mx-auto`}>
                    <span className="text-white text-xl sm:text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="heading-4 mb-2 sm:mb-3 text-center">{service.name}</h3>
                  <p className={`body-normal text-center leading-relaxed ${selectedService === service.id ? 'text-blue-100' : 'text-gray-contrast-600'}`}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and Information Section */}
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-snap-section morphing-bg-section layered-bg perspective-1500 parallax-container">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-200/15 rounded-full filter blur-xl" data-parallax="0.3" data-float="true" data-float-amplitude="20" data-float-duration="8"></div>
            <div className="absolute bottom-1/3 right-1/5 w-24 h-24 bg-gold-200/20 rounded-full filter blur-lg" data-parallax="0.4" data-float="true" data-float-amplitude="15" data-float-duration="6"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <Card variant="service" className="contact-card glass-morphism depth-4 bg-white/90 backdrop-blur-sm border-white/50">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6 sm:mb-8 scroll-animate" data-element="form-header" data-text-animation="fade-in" data-delay="0.2">
                    <h3 className="heading-3 mb-3 text-blue-900">{pageContent.contactForm.title} {selectedServiceData?.name}</h3>
                    <p className="body-normal text-gray-contrast-600">{pageContent.contactForm.description}</p>
                  </div>
                  
                  {submitSuccess ? (
                    <div className="text-center py-8 scroll-animate" data-element="success-message" data-text-animation="fade-in" data-delay="0.1">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h4 className="heading-4 text-blue-900 mb-3">{pageContent.contactForm.successMessage.title}</h4>
                      <p className="body-normal text-gray-contrast-600 mb-6">{pageContent.contactForm.successMessage.description}</p>
                      <button 
                        onClick={() => setSubmitSuccess(false)} 
                        className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                      >
                        {pageContent.contactForm.successMessage.buttonText}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 scroll-animate" data-element="contact-form" data-animation="fade-in" data-delay="0.4">
                      {submitError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                          {submitError}
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-blue-900">Nama Lengkap *</label>
                          <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:outline-none transition-all duration-300 focus:border-gold-500 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base" 
                            placeholder={pageContent.contactForm.fields.name.placeholder}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-blue-900">Email *</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base" 
                            placeholder={pageContent.contactForm.fields.email.placeholder}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Nomor Telepon *</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            required 
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base" 
                            placeholder={pageContent.contactForm.fields.phone.placeholder}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Nama Perusahaan</label>
                          <input 
                            type="text" 
                            name="company" 
                            value={formData.company} 
                            onChange={handleInputChange} 
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base" 
                            placeholder={pageContent.contactForm.fields.company.placeholder}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">Jenis Layanan *</label>
                        <select 
                          name="service" 
                          value={formData.service} 
                          onChange={handleInputChange} 
                          required 
                          className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base"
                        >
                          <option value="">Pilih layanan yang dibutuhkan</option>
                          {selectedServiceData?.services.map((service, idx) => (
                            <option key={idx} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Estimasi Anggaran</label>
                          <select 
                            name="budget" 
                            value={formData.budget} 
                            onChange={handleInputChange} 
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base"
                          >
                            <option value="">Pilih rentang anggaran</option>
                            {pageContent.contactForm.fields.budget.options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Timeline Proyek</label>
                          <select 
                            name="timeline" 
                            value={formData.timeline} 
                            onChange={handleInputChange} 
                            className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base"
                          >
                            <option value="">Pilih timeline</option>
                            {pageContent.contactForm.fields.timeline.options.map((option) => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">Detail Proyek *</label>
                        <textarea 
                          name="message" 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          required 
                          rows={5} 
                          className="w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-xl focus:border-gold-500 focus:outline-none transition-all duration-300 resize-none hover:border-blue-300 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-gold-500/20 text-sm sm:text-base" 
                          placeholder={pageContent.contactForm.fields.message.placeholder}
                        ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center hover:opacity-90 hover:scale-105 hover:shadow-lg transform bg-gradient-to-r from-gold-500 to-gold-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            {pageContent.contactForm.submitButton.loadingText}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {pageContent.contactForm.submitButton.text}
                          </>
                        )}
                      </button>
                      
                      <p className="text-xs sm:text-sm text-gray-contrast-500 text-center">
                        Dengan mengirim formulir ini, Anda setuju untuk dihubungi oleh tim kami.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Service Information and Location */}
              <div className="space-y-6 sm:space-y-8">
                {/* Selected Service Information */}
                <Card variant="service" className="contact-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50">
                  <CardContent className="p-6 sm:p-8">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 ${selectedServiceData?.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-depth-2`}>
                      <span className="text-white text-xl sm:text-2xl">{selectedServiceData?.icon}</span>
                    </div>
                    <h3 className="heading-3 mb-3 text-blue-900">{selectedServiceData?.name}</h3>
                    <p className="body-normal text-gray-contrast-600 mb-4 sm:mb-6">{selectedServiceData?.description}</p>
                    
                    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-gold-500 flex-shrink-0" />
                        <span className="text-gray-contrast-700 text-sm sm:text-base break-all">{selectedServiceData?.contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-gold-500 flex-shrink-0" />
                        <span className="text-gray-contrast-700 text-sm sm:text-base break-all">{selectedServiceData?.contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-contrast-700 text-sm sm:text-base">WhatsApp: {selectedServiceData?.contact.whatsapp}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 sm:pt-6 border-t border-gray-200">
                      <h4 className="font-semibold mb-3 sm:mb-4 text-blue-900 text-sm sm:text-base">Layanan Tersedia:</h4>
                      <div className="space-y-2 sm:space-y-3">
                        {selectedServiceData?.services.map((service, idx) => (
                          <div key={idx} className="flex items-start">
                            <div className="w-2 h-2 rounded-full mr-3 bg-gold-500 flex-shrink-0 mt-2"></div>
                            <span className="text-gray-contrast-700 text-xs sm:text-sm leading-relaxed">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Location - Fixed alignment and responsiveness */}
                <Card variant="service" className="contact-card glass-morphism depth-3 bg-white/90 backdrop-blur-sm border-white/50">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="heading-3 mb-4 sm:mb-6 text-blue-900">Lokasi Kantor</h3>
                    
                    <div className="space-y-4 sm:space-y-6 mb-6">
                      {/* Address Section - Fixed alignment */}
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <MapPin className="w-5 h-5 text-gold-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-blue-900 text-sm sm:text-base mb-1">Alamat Kantor</p>
                          <p className="text-gray-contrast-600 text-sm sm:text-base leading-relaxed">
                            {contactInfo.address.city}, {contactInfo.address.country}
                          </p>
                          <p className="text-gray-contrast-500 text-xs sm:text-sm mt-1 leading-relaxed">
                            Alamat lengkap akan diberikan setelah konfirmasi pertemuan
                          </p>
                        </div>
                      </div>
                      
                      {/* Business Hours Section - Fixed alignment */}
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <Clock className="w-5 h-5 text-gold-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-blue-900 text-sm sm:text-base mb-2">Jam Operasional</p>
                          <div className="space-y-1">
                            <p className="text-gray-contrast-600 text-sm sm:text-base leading-relaxed">
                              {contactInfo.businessHours.weekdays}
                            </p>
                            <p className="text-gray-contrast-600 text-sm sm:text-base leading-relaxed">
                              {contactInfo.businessHours.saturday}
                            </p>
                            {contactInfo.businessHours.sunday && (
                              <p className="text-gray-contrast-600 text-sm sm:text-base leading-relaxed">
                                {contactInfo.businessHours.sunday}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Component - Responsive */}
                    <div className="w-full">
                      <MapComponent 
                        height="h-40 sm:h-48 lg:h-56" 
                        className="shadow-sm rounded-xl w-full overflow-hidden" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Contact Section */}
        <section className="section-padding bg-gradient-to-b from-blue-900 to-blue-800 text-white scroll-snap-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-8 sm:mb-12 scroll-animate" data-element="social-header" data-text-animation="fade-in" data-delay="0.2">
              <h2 className="heading-2 mb-4 text-white">{pageContent.socialSection.title}</h2>
              <p className="body-large text-blue-100 max-w-2xl mx-auto px-4">{pageContent.socialSection.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto stagger-children">
              <a 
                href={`mailto:${contactInfo.contact.email}`} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 group hover-depth-subtle min-h-[120px] sm:min-h-[140px] flex flex-col justify-center touch-manipulation"
                data-element="social-card"
                data-animation="slide-up"
                data-delay="0.1"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-gold-depth">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="heading-4 mb-1 sm:mb-2 text-white text-sm sm:text-base">Email</h3>
                <p className="body-small text-blue-100 text-xs sm:text-sm break-all">{contactInfo.contact.email}</p>
              </a>
              
              <a 
                href={contactInfo.socialMedia.instagram} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 group hover-depth-subtle min-h-[120px] sm:min-h-[140px] flex flex-col justify-center touch-manipulation"
                data-element="social-card"
                data-animation="slide-up"
                data-delay="0.2"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-gold-depth">
                  <Image 
                    src="/icons/instagram.png" 
                    alt="Instagram" 
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        `;
                      }
                    }}
                  />
                </div>
                <h3 className="heading-4 mb-1 sm:mb-2 text-white text-sm sm:text-base">Instagram</h3>
                <p className="body-small text-blue-100 text-xs sm:text-sm">@narvex.id</p>
              </a>
              
              <a 
                href={`tel:${contactInfo.contact.phone}`} 
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 group hover-depth-subtle min-h-[120px] sm:min-h-[140px] flex flex-col justify-center touch-manipulation"
                data-element="social-card"
                data-animation="slide-up"
                data-delay="0.3"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-gold-depth">
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="heading-4 mb-1 sm:mb-2 text-white text-sm sm:text-base">Phone</h3>
                <p className="body-small text-blue-100 text-xs sm:text-sm">{contactInfo.contact.phone}</p>
              </a>
              
              <a 
                href={`https://wa.me/${contactInfo.contact.whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 group hover-depth-subtle min-h-[120px] sm:min-h-[140px] flex flex-col justify-center touch-manipulation"
                data-element="social-card"
                data-animation="slide-up"
                data-delay="0.4"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gold-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-gold-depth">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="heading-4 mb-1 sm:mb-2 text-white text-sm sm:text-base">WhatsApp</h3>
                <p className="body-small text-blue-100 text-xs sm:text-sm">{contactInfo.contact.whatsapp}</p>
              </a>
            </div>
          </div>
        </section>
    </div>
  );
}