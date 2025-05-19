import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturedMedicines from '@/components/home/FeaturedMedicines';
import InfoSection from '@/components/home/InfoSection';

export default function HomePage() {
  // Mock data for recent medicines
  const recentMedicines = [
    {
      id: '1',
      name: 'Paracetamol',
      slug: 'paracetamol',
      category: { name: 'Painkillers', slug: 'painkillers' },
      uses: ['Pain relief', 'Fever reduction'],
      workingMechanism: 'Acts on the central nervous system to reduce pain signals and affect the temperature regulating center in the brain.',
    },
    {
      id: '2',
      name: 'Amoxicillin',
      slug: 'amoxicillin',
      category: { name: 'Antibiotics', slug: 'antibiotics' },
      uses: ['Bacterial infections', 'Respiratory tract infections'],
      workingMechanism: 'Inhibits bacterial cell wall synthesis, leading to cell death.',
    },
    {
      id: '3',
      name: 'Vitamin D3',
      slug: 'vitamin-d3',
      category: { name: 'Supplements', slug: 'supplements' },
      uses: ['Bone health', 'Immune support'],
      workingMechanism: 'Helps the body absorb calcium and phosphorus, which are essential for bone health.',
    },
  ];

  // Mock data for categories
  const categories = [
    { name: 'Painkillers', slug: 'painkillers', count: 15 },
    { name: 'Antibiotics', slug: 'antibiotics', count: 12 },
    { name: 'Supplements', slug: 'supplements', count: 22 },
    { name: 'Antihistamines', slug: 'antihistamines', count: 8 },
    { name: 'Antidepressants', slug: 'antidepressants', count: 10 },
  ];

  return (
    <main>
      <HeroSection />
      <CategoriesSection />
      <FeaturedMedicines />
      <InfoSection />
    </main>
  );
}
