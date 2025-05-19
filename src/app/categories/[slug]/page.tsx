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
  };
  
  if (categoryLoading || !category) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        {' / '}
        <Link href="/categories" className="text-blue-600 hover:underline">
          Categories
        </Link>
        {' / '}
        <span className="text-gray-500">{category.name}</span>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">{category.name}</h1>
        <p className="text-gray-600 max-w-3xl">{category.description}</p>
      </div>

      {searchLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : currentPageMedicines.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          No medicines found in this category.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentPageMedicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </div>
          
          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    pagination.page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Previous
                </button>
                {[...Array(pagination.pages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                      pagination.page === i + 1
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    pagination.page === pagination.pages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
} 