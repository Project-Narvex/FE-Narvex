'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { Star } from 'lucide-react';
import Image from 'next/image';

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

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  clients?: Client[];
}

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
  {
    name: 'Skywork Events',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop&crop=center'
  },
  {
    name: 'Gutama Learning',
    logo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop&crop=center'
  },
  {
    name: 'Creative Sky',
    logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop&crop=center'
  },
  {
    name: 'Evervow',
    logo: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&h=200&fit=crop&crop=center'
  }
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = "Kata Mereka",
  subtitle = "Kepercayaan klien adalah prioritas utama kami. Lihat apa kata mereka tentang pengalaman bekerja sama dengan Narvex.",
  testimonials = defaultTestimonials,
  clients = defaultClients
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-gold-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="section-padding bg-blue-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="heading-2 text-white mb-6">
            {title}
          </h2>
          <p className="body-large max-w-3xl mx-auto text-gray-300">
            {subtitle}
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={`bg-white p-8 animate-fade-in`}
              style={{ animationDelay: `${index * 200}ms` }}
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
                  <h4 className="font-bold text-blue-900 text-lg">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  <p className="text-gold-500 text-sm font-medium">{testimonial.company}</p>
                  {testimonial.project && (
                    <p className="text-gray-500 text-xs mt-1">{testimonial.project}</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Client Logos */}
        <div className="animate-fade-in animation-delay-600">
          <p className="text-center text-gray-300 mb-8 text-lg">
            Dipercaya oleh:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {clients.map((client, index) => (
              <div
                key={client.name}
                className={`relative w-24 h-24 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-fade-in`}
                style={{ animationDelay: `${(index + 4) * 150}ms` }}
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain filter brightness-0 invert"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in animation-delay-900">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">98%</div>
            <div className="text-gray-300">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">50+</div>
            <div className="text-gray-300">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">25+</div>
            <div className="text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gold-400 mb-2">3+</div>
            <div className="text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
export type { TestimonialsSectionProps, Testimonial, Client };