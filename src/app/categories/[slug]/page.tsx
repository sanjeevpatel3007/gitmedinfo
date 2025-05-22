'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCategoryStore } from '@/store/categoryStore';
import { useMedicineStore } from '@/store/medicineStore';
import MedicineCard from '@/components/medicines/MedicineCard';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const { slug } = params;
  const router = useRouter();
  const { categories, getCategory, fetchCategories, isLoading: categoryLoading } = useCategoryStore();
  const { fetchMedicines, currentPageMedicines, searchLoading, pagination } = useMedicineStore();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);
  
  useEffect(() => {
    const category = getCategory(slug);
    if (category) {
      fetchMedicines({ category: category._id, page: currentPage });
    }
  }, [slug, currentPage, getCategory, fetchMedicines]);
  
  const category = getCategory(slug);
  
  // If category not found and not loading, redirect to 404
  useEffect(() => {
    if (!categoryLoading && categories.length > 0 && !category) {
      router.push('/404');
    }
  }, [category, categories.length, categoryLoading, router]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (categoryLoading || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <div className="h-16 w-16 rounded-full border-r-4 border-l-4 border-transparent absolute top-0 animate-ping opacity-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm font-medium">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-500 flex items-center">
            <svg className="h-4 w-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </li>
          <li>
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 transition-colors">
              Categories
            </Link>
          </li>
          <li className="text-gray-500 flex items-center">
            <svg className="h-4 w-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </li>
          <li className="text-gray-600 font-semibold truncate max-w-[200px]">{category.name}</li>
        </ol>
      </nav>

      {/* Category header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-12 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-white/20 backdrop-blur rounded-xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
        </div>
        <p className="text-lg text-blue-100 max-w-3xl leading-relaxed">{category.description}</p>
        
        <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
          <div className="text-blue-100">
            <span className="text-white font-semibold">
              {pagination.total || 0}
            </span> medicines in this category
          </div>
          
          <Link 
            href="/categories" 
            className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back to All Categories
          </Link>
        </div>
      </div>

      {searchLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="relative">
            <div className="h-14 w-14 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : currentPageMedicines.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-8 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">No medicines found</h3>
              <p className="mt-2 text-yellow-700">
                This category doesn't have any medicines yet. Please check back later or browse other categories.
              </p>
              <div className="mt-4">
                <Link
                  href="/categories"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Browse categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Medicines count */}
          <div className="mb-8 pb-4 border-b border-gray-100">
            <p className="text-gray-600">
              Showing <span className="font-medium">{currentPageMedicines.length}</span> of <span className="font-medium">{pagination.total}</span> medicines in <span className="text-blue-600 font-semibold">{category.name}</span>
            </p>
          </div>
          
          {/* Medicines grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentPageMedicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="mt-12 pt-6 border-t border-gray-100">
              <nav className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{pagination.page}</span> of <span className="font-medium">{pagination.pages}</span>
                  </p>
                </div>
                <div className="flex flex-1 justify-center md:justify-end">
                  <div className="inline-flex shadow-sm rounded-md">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Previous
                    </button>
                    
                    {/* Page numbers */}
                    <div className="hidden md:flex">
                      {Array.from({ length: pagination.pages }).map((_, idx) => {
                        const pageNumber = idx + 1;
                        
                        // Show current page and a few surrounding pages
                        if (
                          pageNumber === 1 ||
                          pageNumber === pagination.pages ||
                          (pageNumber >= pagination.page - 1 && pageNumber <= pagination.page + 1)
                        ) {
                          return (
                            <button
                              key={idx}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                                pagination.page === pageNumber
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                        
                        // Show ellipsis for gaps
                        if (pageNumber === pagination.page - 2 || pageNumber === pagination.page + 2) {
                          return (
                            <span key={idx} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700">
                              ...
                            </span>
                          );
                        }
                        
                        return null;
                      })}
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.pages}
                      className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        pagination.page === pagination.pages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Next
                      <svg className="h-5 w-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
} 