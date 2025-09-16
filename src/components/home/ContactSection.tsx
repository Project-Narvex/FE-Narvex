'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import Button from '../ui/Button';
import { MapPin, Phone, Mail, Instagram, Send, CheckCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Mari Wujudkan Project Impian Anda",
  subtitle = "Ceritakan visi Anda kepada kami. Tim Narvex siap membantu mewujudkan project yang luar biasa."
}) => {
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

  const services = [
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

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-gray-50">
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
    );
  }

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-fade-in">
            <h2 className="heading-2 mb-6">
              {title}
            </h2>
            <p className="body-large text-gray-600 mb-8">
              {subtitle}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    {services.map((service) => (
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
          <div className="animate-fade-in animation-delay-300">
            <Card className="p-8 mb-8">
              <h3 className="heading-4 mb-6">Hubungi Kami</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
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
            
            {/* Map Placeholder */}
            <Card className="h-64 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Google Maps</p>
                <p className="text-gray-500 text-sm">Lokasi kantor akan ditampilkan di sini</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
export type { ContactSectionProps, ContactFormData };