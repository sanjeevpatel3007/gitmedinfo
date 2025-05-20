'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCategoryStore, Category } from '@/store/categoryStore';

export default function CategoriesPage() {
  const { categories, isLoading, error, fetchCategories } = useCategoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Medicine Categories</h1>
      
      <div className="mb-8 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load categories
                </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No categories found matching "{searchTerm}"
              </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
        ))}
      </div>
      )}
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="bg-white rounded-lg shadow-md p-6 border border-gray-100 transition duration-300 hover:shadow-lg hover:border-blue-200 group"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-700">
        {category.name}
      </h2>
      
      <p className="text-gray-600 mb-4 line-clamp-3">
        {category.description}
      </p>
      
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Added: {new Date(category.createdAt).toLocaleDateString()}
        </span>
        <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
          View Medicines →
        </span>
      </div>
    </Link>
  );
} 