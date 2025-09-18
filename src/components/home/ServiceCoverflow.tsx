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
  );
};

export default ServiceCoverflow;