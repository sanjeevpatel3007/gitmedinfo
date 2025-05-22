'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCategoryStore } from '@/store/categoryStore';

export default function CategoriesSection() {
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  // Show only the first 6 categories
  const displayedCategories = categories?.slice(0, 6) || [];

    return (
    <section className="py-16 md:py-24 bg-white">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center py-1.5 px-4 mb-4 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-sm font-medium text-blue-600">Top Categories</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Explore by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find the right medicines by browsing our most popular categories.
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center mb-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 mb-8">
          Something went wrong while loading categories.
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {displayedCategories.map((category) => (
            <Link key={category._id} href={`/categories/${category.slug}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 h-full flex flex-col">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{category.description}</p>
                  <div className="inline-flex items-center text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                    View Medicines
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
        
      {!isLoading && displayedCategories.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300 shadow-sm hover:shadow"
          >
            View All Categories
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
} 
