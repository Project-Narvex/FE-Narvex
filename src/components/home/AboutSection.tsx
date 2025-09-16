'use client';

import React from 'react';
import { CheckCircle, Target, Users, Lightbulb, Award, TrendingUp } from 'lucide-react';

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Kreativitas",
      description: "Kami percaya bahwa kreativitas adalah kunci untuk menciptakan solusi yang unik dan memorable dengan perspektif fresh dan ide-ide inovatif."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Profesionalisme",
      description: "Berkomitmen memberikan layanan dengan standar profesional tertinggi, mulai dari komunikasi yang jelas hingga hasil yang berkualitas."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Kolaborasi",
      description: "Membangun partnership yang kuat dengan klien melalui komunikasi terbuka, feedback konstruktif, dan kerja sama yang sinergis."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Inovasi",
      description: "Selalu mengikuti perkembangan tren dan teknologi terbaru untuk memastikan solusi yang kami berikan selalu relevan dan up-to-date."
    }
  ];

  const achievements = [
    "Tim multidisiplin dengan profesional berpengalaman",
    "Pendekatan terintegrasi end-to-end",
    "Menggunakan teknologi dan tools terkini",
    "Fleksibilitas sesuai kebutuhan dan budget klien",
    "Track record solid dengan hasil yang terukur"
  ];

  return (
    <section id="about" className={`py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
          Tentang <span className="text-gold-400">Narvex</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Narvex adalah perusahaan creative services yang berdedikasi untuk membantu brand &quot;berkembang&quot; 
            melalui solusi kreatif yang inovatif. Kami percaya bahwa setiap brand memiliki &quot;cerita unik&quot; 
            yang layak untuk diceritakan dengan cara yang menarik dan berkesan.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Vision */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Visi Perusahaan</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              &quot;Menjadi perusahaan creative services terdepan di Indonesia yang memberikan solusi 
              inovatif dan berkualitas tinggi untuk membantu klien mencapai kesuksesan bisnis mereka.&quot;
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">Misi Perusahaan</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Memberikan layanan creative services berkualitas tinggi dengan pendekatan profesional dan inovatif</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Membantu klien membangun brand identity yang kuat melalui strategi kreatif yang tepat sasaran</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Menghadirkan event production yang memorable dan impactful dengan eksekusi sempurna</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 text-gold-400 mr-3 mt-0.5 flex-shrink-0" />
                <span>Mengoptimalkan digital presence melalui strategi marketing yang efektif</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-blue-900 mb-4">Nilai-Nilai Perusahaan</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nilai-nilai yang menjadi fondasi dalam setiap layanan dan kerjasama yang kami bangun
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gold-50 rounded-lg flex items-center justify-center mb-4 text-gold-400">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold text-blue-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="bg-blue-900 rounded-2xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Keunggulan <span className="text-gold-400">Kompetitif</span>
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Narvex menggabungkan kreativitas, teknologi, dan strategi bisnis untuk membantu 
                klien mencapai tujuan mereka melalui pendekatan yang profesional dan hasil yang terukur.
              </p>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gold-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-gold-400 mb-2">3+</div>
                <div className="text-gray-300">Tahun Pengalaman</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-gold-400 mb-2">50+</div>
                <div className="text-gray-300">Proyek Selesai</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-gold-400 mb-2">25+</div>
                <div className="text-gray-300">Klien Puas</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-gold-400 mb-2">100%</div>
                <div className="text-gray-300">Komitmen Kualitas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
export type { AboutSectionProps };