'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMedicineStore } from '@/store/medicineStore';
import MedicineCard from '@/components/medicines/MedicineCard';

export default function FeaturedMedicines() {
  const { 
    currentPageMedicines, 
    searchLoading, 
    error, 
    fetchMedicines 
  } = useMedicineStore();
  
  useEffect(() => {
    fetchMedicines({ limit: 8 });
  }, [fetchMedicines]);
  
  if (searchLoading && currentPageMedicines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Featured Medicines</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Medicines</h2>
          <p className="text-red-600">Failed to load medicines</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Medicines</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most popular medicines and find detailed information about their uses, dosage, side effects, and more
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentPageMedicines.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/medicines"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
          >
            View All Medicines
          </Link>
        </div>
      </div>
    </div>
  );
} 