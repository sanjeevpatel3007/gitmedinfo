'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      router.push(`/medicines?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <div className="relative bg-blue-50 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="Background pattern"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6">
            Find the Right Medicine Information
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Access reliable and detailed information about medicines, their uses, dosage, side effects, and more.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a medicine..."
              className="flex-grow px-4 py-3 rounded-lg shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-200"
            >
              Search
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="text-gray-500">Popular searches:</span>
            <button 
              onClick={() => {
                setSearchTerm('paracetamol');
                router.push('/medicines?search=paracetamol');
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Paracetamol
            </button>
            <button 
              onClick={() => {
                setSearchTerm('amoxicillin');
                router.push('/medicines?search=amoxicillin');
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Amoxicillin
            </button>
            <button 
              onClick={() => {
                setSearchTerm('ibuprofen');
                router.push('/medicines?search=ibuprofen');
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Ibuprofen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 