import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedMedicines from '@/components/home/FeaturedMedicines';
import InfoSection from '@/components/home/InfoSection';
import FAQSection from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <div className="max-w-full min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero section takes full width */}
      <HeroSection />
      
      {/* Content sections with consistent container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <CategoriesSection />
        <FeaturedMedicines />
        <InfoSection />
        <FAQSection />
      </div>
    </div>
  );
}
