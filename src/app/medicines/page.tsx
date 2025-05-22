'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMedicineStore } from '@/store/medicineStore';
import { useCategoryStore } from '@/store/categoryStore';
import MedicineCard from '@/components/medicines/MedicineCard';

export default function MedicinesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialPage = parseInt(searchParams.get('page') || '1');
  
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  
  const { 
    fetchMedicines, 
    currentPageMedicines, 
    searchLoading, 
    pagination, 
    error 
  } = useMedicineStore();
  
  const { 
    categories, 
    fetchCategories, 
    isLoading: categoriesLoading 
  } = useCategoryStore();
  
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  
  useEffect(() => {
    fetchMedicines({
      search: initialSearch,
      category: initialCategory,
      page: initialPage
    });
  }, [fetchMedicines, initialSearch, initialCategory, initialPage]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateQueryParams(1, search, selectedCategory);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateQueryParams(1, search, category);
  };
  
  const handlePageChange = (page: number) => {
    updateQueryParams(page, search, selectedCategory);
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    updateQueryParams(1, '', '');
  };
  
  const updateQueryParams = (page: number, search: string, category: string) => {
    const params = new URLSearchParams();
    
    if (page > 1) params.set('page', page.toString());
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    
    const query = params.toString();
    router.push(`/medicines${query ? `?${query}` : ''}`);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 mb-10 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M213.5,476.5Q129,553,129,650L129,750L319.5,750Q510,750,606.5,650Q703,550,703,450Q703,350,606.5,244Q510,138,324.5,138Q139,138,176,269Q213,400,213.5,476.5Z" fill="currentColor" />
          </svg>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">Medicines Directory</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Browse our comprehensive collection of medicines or use the search to find specific information about any medication
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="flex-grow">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Medicines
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Enter medicine name, composition, or use..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="block w-full py-3 px-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="md:flex-shrink-0 flex gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                Search
              </button>
              
              {(search || selectedCategory) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center w-full md:w-auto px-5 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {/* Active filters */}
          {(search || selectedCategory) && (
            <div className="flex items-center space-x-2 pt-2">
              <span className="text-sm font-medium text-gray-500">Active filters:</span>
              {search && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Search: {search}
                </span>
              )}
              {selectedCategory && categories.find(c => c._id === selectedCategory) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  Category: {categories.find(c => c._id === selectedCategory)?.name}
                </span>
              )}
            </div>
          )}
        </form>
      </div>

      {searchLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <div className="h-16 w-16 rounded-full border-r-4 border-l-4 border-transparent absolute top-0 animate-ping opacity-20"></div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">Failed to load medicines</h3>
              <p className="mt-2 text-red-700">Please try refreshing the page.</p>
            </div>
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
                No medicines match your search criteria. Try adjusting your filters or search terms.
              </p>
              {(search || selectedCategory) && (
                <div className="mt-4">
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 pb-4 border-b border-gray-100">
            <p className="text-gray-600">
              Showing <span className="font-medium">{currentPageMedicines.length}</span> of <span className="font-medium">{pagination.total}</span> medicines
              {search && <span> matching "<span className="text-blue-600 font-semibold">{search}</span>"</span>}
              {selectedCategory && categories.find(c => c._id === selectedCategory) && (
                <span> in category <span className="text-blue-600 font-semibold">{categories.find(c => c._id === selectedCategory)?.name}</span></span>
              )}
            </p>
          </div>
          
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