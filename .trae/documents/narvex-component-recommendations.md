# Component Template Recommendations - Narvex Landing Page

## 1. Overview

Dokumen ini berisi rekomendasi template komponen UI yang cocok untuk landing page Narvex, dengan fokus pada modern design, professional appearance, dan conversion optimization.

## 2. Recommended UI Libraries & Resources

### 2.1 Primary UI Libraries

* **Tailwind UI**: Professional components dengan Tailwind CSS <mcreference link="https://www.landingfolio.com/" index="1">1</mcreference>

* **Headless UI**: Unstyled, accessible components untuk React

* **Radix UI**: Low-level UI primitives dengan accessibility built-in

* **Framer Motion**: Animation library untuk smooth interactions

### 2.2 Template Resources

* **Landingfolio**: 805+ premium components untuk Tailwind & Webflow <mcreference link="https://www.landingfolio.com/" index="1">1</mcreference>

* **Lapa Ninja**: 7100+ landing page design examples untuk inspirasi <mcreference link="https://www.lapa.ninja/" index="3">3</mcreference>

* **Tailwind Components**: Free dan premium component collections

## 3. Specific Component Recommendations

### 3.1 Hero Section Components

#### Template 1: Split Hero dengan Video Background

```jsx
// Recommended for Narvex - Professional & Engaging
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/narvex-showreel.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-navy-900/70"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Creative Solutions for
          <span className="text-orange-400"> Your Brand</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Narvex menghadirkan solusi kreatif terpadu untuk branding, 
          event production, dan digital marketing yang memorable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Lihat Portfolio
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-navy-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Konsultasi Gratis
          </button>
        </div>
      </div>
    </section>
  );
};
```

#### Template 2: Animated Text Hero

```jsx
// Alternative - Modern dengan Typography Animation
const AnimatedHero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-6xl lg:text-8xl font-bold text-white mb-6">
              <span className="block">We Create</span>
              <span className="block text-orange-400">Experiences</span>
              <span className="block">That Matter</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Dari konsep hingga eksekusi, Narvex adalah partner kreatif 
              yang mengubah visi Anda menjadi kenyataan yang luar biasa.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold">
              Mulai Project →
            </button>
          </div>
          <div className="relative">
            {/* Floating Cards atau Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/project-1.jpg" className="rounded-lg shadow-2xl" />
              <img src="/images/project-2.jpg" className="rounded-lg shadow-2xl mt-8" />
              <img src="/images/project-3.jpg" className="rounded-lg shadow-2xl -mt-4" />
              <img src="/images/project-4.jpg" className="rounded-lg shadow-2xl mt-12" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

### 3.2 Services Section Components

#### Template: Interactive Service Cards

```jsx
const ServicesSection = () => {
  const services = [
    {
      icon: "🎨",
      title: "Creative Design",
      description: "Branding, logo design, dan visual identity yang memorable",
      features: ["Logo Design", "Brand Guidelines", "Print Design", "Packaging"]
    },
    {
      icon: "🎪",
      title: "Event Production",
      description: "Event planning dan production dari konsep hingga eksekusi",
      features: ["Event Planning", "Stage Design", "Audio Visual", "Coordination"]
    },
    {
      icon: "📱",
      title: "Digital Marketing",
      description: "Strategi digital yang efektif untuk growth bisnis Anda",
      features: ["Social Media", "Content Creation", "SEO", "Advertising"]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Layanan Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi kreatif terpadu yang dirancang untuk mengangkat brand Anda 
            ke level yang lebih tinggi.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 text-orange-500 font-semibold hover:text-orange-600 transition-colors">
                Pelajari Lebih Lanjut →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### 3.3 Portfolio Section Components

#### Template: Masonry Grid dengan Filter

```jsx
const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: "Brand Identity Skywork",
      category: "branding",
      image: "/images/portfolio/skywork-brand.jpg",
      tags: ["Logo Design", "Brand Guidelines"]
    },
    {
      id: 2,
      title: "Wedding Event Production",
      category: "events",
      image: "/images/portfolio/wedding-event.jpg",
      tags: ["Event Planning", "Decoration"]
    },
    {
      id: 3,
      title: "Digital Campaign Gutama",
      category: "digital",
      image: "/images/portfolio/gutama-digital.jpg",
      tags: ["Social Media", "Content Creation"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Portfolio Terpilih
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Lihat beberapa project terbaik yang telah kami kerjakan untuk 
            berbagai klien dari berbagai industri.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'branding', 'events', 'digital'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  activeFilter === filter
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'Semua' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .filter(project => activeFilter === 'all' || project.category === activeFilter)
            .map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-navy-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="bg-orange-500 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-navy-900 hover:bg-navy-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
            Lihat Semua Portfolio
          </button>
        </div>
      </div>
    </section>
  );
};
```

### 3.4 Testimonials Section

#### Template: Carousel dengan Client Logos

```jsx
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Skywork Events",
      avatar: "/images/testimonials/sarah.jpg",
      quote: "Narvex berhasil mengubah visi kami menjadi event yang luar biasa. Tim mereka sangat profesional dan kreatif.",
      rating: 5
    },
    {
      name: "Ahmad Gutama",
      company: "Gutama Learning",
      avatar: "/images/testimonials/ahmad.jpg",
      quote: "Strategi digital marketing dari Narvex meningkatkan engagement kami hingga 300%. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-navy-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Kata Mereka
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kepercayaan klien adalah prioritas utama kami. Lihat apa kata mereka 
            tentang pengalaman bekerja sama dengan Narvex.
          </p>
        </div>
        
        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-navy-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex text-orange-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Client Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-300 mb-8">Dipercaya oleh:</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <img src="/images/clients/skywork-logo.png" alt="Skywork" className="h-12" />
            <img src="/images/clients/gutama-logo.png" alt="Gutama" className="h-12" />
            <img src="/images/clients/creativesky-logo.png" alt="Creative Sky" className="h-12" />
            <img src="/images/clients/evervow-logo.png" alt="Evervow" className="h-12" />
          </div>
        </div>
      </div>
    </section>
  );
};
```

### 3.5 Contact Section

#### Template: Split Layout dengan Map

```jsx
const ContactSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-4xl font-bold text-navy-900 mb-6">
              Mari Wujudkan Project Impian Anda
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Ceritakan visi Anda kepada kami. Tim Narvex siap membantu 
              mewujudkan project yang luar biasa.
            </p>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Nama Lengkap"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
                <input 
                  type="email" 
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  type="tel" 
                  placeholder="Nomor Telepon"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
                />
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none">
                  <option>Pilih Layanan</option>
                  <option>Creative Design</option>
                  <option>Event Production</option>
                  <option>Digital Marketing</option>
                  <option>Konsultasi</option>
                </select>
              </div>
              <textarea 
                rows={4}
                placeholder="Ceritakan project Anda..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-orange-500 focus:outline-none"
              ></textarea>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold transition-colors">
                Kirim Pesan
              </button>
            </form>
          </div>
          
          {/* Contact Info & Map */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-6">Hubungi Kami</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    📍
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">Alamat</p>
                    <p className="text-gray-600">Jakarta, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    📞
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">Telepon</p>
                    <p className="text-gray-600">+62 xxx xxxx xxxx</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    ✉️
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">Email</p>
                    <p className="text-gray-600">narvex.ind@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    📱
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">Instagram</p>
                    <p className="text-gray-600">@narvex.id</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Embedded Map */}
            <div className="bg-gray-300 rounded-2xl h-64 flex items-center justify-center">
              <p className="text-gray-600">Google Maps akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

## 4. Animation & Interaction Recommendations

### 4.1 Scroll Animations

* **Fade in on scroll**: Untuk section headers dan content blocks

* **Parallax effects**: Untuk hero background dan portfolio images

* **Counter animations**: Untuk statistics atau achievements

* **Stagger animations**: Untuk service cards dan portfolio grid

### 4.2 Micro-interactions

* **Hover effects**: Subtle scale dan shadow changes pada cards

* **Button animations**: Loading states dan success feedback

* **Form validation**: Real-time feedback dengan smooth transitions

* **Navigation**: Smooth scroll dan active state indicators

## 5. Implementation Priority

### Phase 1 (MVP)

1. Hero Section dengan video background
2. Services Section dengan interactive cards
3. Portfolio Section dengan basic grid
4. Contact Section dengan form
5. Basic navigation dan footer

### Phase 2 (Enhancement)

1. Portfolio filtering dan animations
2. Testimonials carousel
3. Advanced scroll animations
4. Performance optimizations
5. SEO enhancements

### Phase 3 (Advanced)

1. CMS integration
2. Advanced analytics
3. A/B testing setup
4. Progressive Web App features
5. Multi-language support

## 6. Best Practices

* **Mobile-first design**: Semua komponen harus responsive

* **Accessibility**: Proper ARIA labels, keyboard navigation, color contrast

* **Performance**: Lazy loading, image optimization, code splitting

* **SEO**: Semantic HTML, meta tags, structured data

* **Conversion optimization**: Clear CTAs, social proof, trust signals

