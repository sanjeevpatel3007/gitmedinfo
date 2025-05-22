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
    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-blue-400/20 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-indigo-500/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-700/30 to-transparent"></div>
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full mix-blend-overlay opacity-40"
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(79,70,229,0.1)',
              transform: `scale(${Math.random() * 0.5 + 0.8})`,
              filter: 'blur(8px)'
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-6 py-2 bg-white/10 backdrop-blur-lg rounded-full text-white text-sm font-medium">
            Your Trusted Health Information Source
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find the <span className="text-blue-200">Right Medicine</span> Information
          </h1>
          
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Access reliable and detailed information about medicines, their uses, dosage, side effects, and more.
          </p>
          
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto backdrop-blur-lg rounded-full p-1 border border-white/20 bg-white/10">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a medicine..."
              className="flex-grow px-6 py-3.5 rounded-full shadow bg-white/90 border-0 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button 
              type="submit"
              className="md:w-auto w-full px-6 py-3.5 bg-white hover:bg-blue-50 text-blue-600 font-medium rounded-full shadow transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Search
            </button>
          </form>
          
          <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
            <span className="text-blue-200">Popular searches:</span>
            {['Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Aspirin'].map((term) => (
              <button 
                key={term}
                onClick={() => {
                  setSearchTerm(term.toLowerCase());
                  router.push(`/medicines?search=${term.toLowerCase()}`);
                }}
                className="text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full transition-colors duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 