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
      <div className="py-16">
        <div className="text-center">
          <div className="inline-flex items-center justify-center py-1.5 px-4 mb-4 rounded-full bg-blue-50 border border-blue-100">
            <span className="text-sm font-medium text-blue-600">Featured</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Featured Medicines</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Medicines</h2>
          <p className="text-red-600">Failed to load medicines</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-14">
        <div className="inline-flex items-center justify-center py-1.5 px-4 mb-4 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-sm font-medium text-blue-600">Featured</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Medicines</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our most popular medicines and find detailed information about their uses, dosage, side effects, and more
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {currentPageMedicines.length > 0 ? (
          currentPageMedicines.map((medicine) => (
            <MedicineCard key={medicine._id} medicine={medicine} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <div className="inline-block p-4 rounded-full bg-gray-100">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h6"></path>
              </svg>
            </div>
            <p className="mt-4 text-lg text-gray-500">No medicines found</p>
            <p className="text-gray-400">Check back later for updates</p>
          </div>
        )}
      </div>
      
      <div className="text-center mt-12">
        <Link
          href="/medicines"
          className="inline-flex items-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300 shadow-sm hover:shadow"
        >
          View All Medicines
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </section>
  );
} 