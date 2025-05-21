'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { useCategoryStore } from '@/store/categoryStore';
import { useAuthStore } from '@/store/authStore';

interface CategoryParams {
  params: {
    id: string;
  };
}

export default function EditCategoryPage({ params }: CategoryParams) {
  const { id } = params;
  const { 
    categories, 
    isLoading, 
    error, 
    success, 
    fetchCategories, 
    getCategoryById, 
    updateCategory 
  } = useCategoryStore();
  const { user, isAuthenticated, checkAuth, initAuth } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [fetchLoading, setFetchLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize auth on page load
  useEffect(() => {
    const init = async () => {
      await initAuth();
      setAuthChecked(true);
    };
    init();
  }, [initAuth]);

  // Check authentication on page load
  useEffect(() => {
    const verifyAuth = async () => {
      if (authChecked) {
        const isAuth = await checkAuth();
        if (!isAuth) {
          toast.error('You must be logged in to access this page');
          router.push(`/auth/login?redirect=/admin/categories/edit/${id}`);
          return;
        }
        
        if (user && user.role !== 'admin') {
          toast.error('Admin access required');
          router.push('/');
        }
      }
    };
    verifyAuth();
  }, [authChecked, checkAuth, router, user, id]);

  // Initially load categories and initialize the form with the category data
  useEffect(() => {
    const initCategory = async () => {
      if (!authChecked || !isAuthenticated || (user && user.role !== 'admin')) {
        return;
      }
      
      setFetchLoading(true);
      
      // If categories are empty, fetch them
      if (categories.length === 0) {
        await fetchCategories();
      }
      
      const category = getCategoryById(id);
      if (category) {
        setFormData({
          name: category.name,
          description: category.description
        });
        setFetchLoading(false);
      } else {
        // If category not found in store, fetch directly
        try {
          const response = await fetch(`/api/categories/${id}`, {
            credentials: 'include' // Include cookies for authentication
          });
          if (!response.ok) throw new Error('Failed to fetch category');
          
          const data = await response.json();
          const { name, description } = data.category;
          setFormData({ name, description });
        } catch (error: any) {
          console.error('Error fetching category:', error);
          toast.error(error.message || 'Failed to load category');
          router.push('/admin/categories');
        } finally {
          setFetchLoading(false);
        }
      }
    };
    
    initCategory();
  }, [id, categories, fetchCategories, getCategoryById, router, authChecked, isAuthenticated, user]);

  // Handle store errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [error]);

  // Handle success messages and redirect
  useEffect(() => {
    if (success && isSubmitting) {
      toast.success(success);
      // Add a short delay before redirecting to ensure toast is visible
      const redirectTimer = setTimeout(() => {
        router.replace('/admin/categories');
      }, 800);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [success, router, isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting || isLoading) {
      return;
    }
    
    // Check authentication
    if (!isAuthenticated) {
      const isAuth = await checkAuth();
      if (!isAuth) {
        toast.error('Please log in again to continue');
        router.push(`/auth/login?redirect=/admin/categories/edit/${id}`);
        return;
      }
    }
    
    if (!user || user.role !== 'admin') {
      toast.error('Admin access required');
      return;
    }
    
    // Validate form
    if (!formData.name.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Show loading toast and set submitting state
    setIsSubmitting(true);
    const loadingToast = toast.loading('Updating category...');
    
    try {
      const result = await updateCategory(id, formData);
      if (result) {
        toast.success('Category updated successfully', { id: loadingToast });
        // Redirect handled in useEffect
      } else {
        toast.error('Failed to update category', { id: loadingToast });
        setIsSubmitting(false);
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while updating the category', { id: loadingToast });
      setIsSubmitting(false);
    }
  }, [checkAuth, formData, id, isAuthenticated, isLoading, isSubmitting, router, updateCategory, user]);

  if (!authChecked || !isAuthenticated || (user && user.role !== 'admin')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (fetchLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <Link 
          href="/admin/categories"
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Back to Categories
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting || isLoading}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting || isLoading}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded ${
                isSubmitting || isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting || isLoading ? 'Updating...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
