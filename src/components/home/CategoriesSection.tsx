'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCategoryStore } from '@/store/categoryStore';

export default function CategoriesSection() {
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Medicine Categories</h2>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Medicine Categories</h2>
          <p className="text-red-600">Failed to load categories</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of medicines organized by categories for easy navigation
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories && categories.length > 0 ? categories.map((category) => (
            <Link 
              key={category._id}
              href={`/categories/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition duration-300 hover:shadow-lg hover:border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700">
                  {category.name}
                </h3>
                <p className="text-gray-600 line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-4 inline-block text-blue-600 text-sm group-hover:text-blue-800">
                  View Medicines →
                </div>
              </div>
            </Link>
          )) : (
            <p className="col-span-full text-center text-gray-500">No categories found</p>
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
} 