"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const services = [
  {
    icon: '🎨',
    title: 'Creative Design',
    subtitle: 'Branding & Visual Identity',
    bg: 'bg-gold-500'
  },
  {
    icon: '📱',
    title: 'Digital Marketing',
    subtitle: 'Social Media & SEO',
    bg: 'bg-blue-900'
  },
  {
    icon: '🎬',
    title: 'Event Production',
    subtitle: 'Planning & Coordination',
    bg: 'bg-gold-500'
  },
  {
    icon: '⭐',
    title: 'Consultation',
    subtitle: 'Strategy & Planning',
    bg: 'bg-blue-900'
  }
];

const ServiceCoverflow = () => {
  return (
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
        {services.map((service, index) => (
          <SwiperSlide key={index} style={{ width: '300px' }}>
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:bg-white/20 transition-all duration-300">
              <div className={`w-12 h-12 ${service.bg} rounded-lg mb-4 flex items-center justify-center`}>
                <span className="text-white font-bold text-xl">{service.icon}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-200 text-sm">{service.subtitle}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceCoverflow;