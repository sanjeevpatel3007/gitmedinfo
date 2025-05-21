'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { useCategoryStore } from '@/store/categoryStore';
import { useAuthStore } from '@/store/authStore';

export default function AddCategoryPage() {
  const { createCategory, isLoading, error, success } = useCategoryStore();
  const { user, isAuthenticated, checkAuth, initAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
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
          router.push('/auth/login?redirect=/admin/categories/add');
          return;
        }
        
        if (user && user.role !== 'admin') {
          toast.error('Admin access required');
          router.push('/');
        }
      }
    };
    verifyAuth();
  }, [authChecked, checkAuth, router, user]);

  // Handle errors from store
  useEffect(() => {
    if (error) {
      toast.error(error);
      setIsSubmitting(false);
    }
  }, [error]);

  // Handle success message and redirect
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
        router.push('/auth/login?redirect=/admin/categories/add');
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
    const loadingToast = toast.loading('Creating category...');
    
    try {
      const result = await createCategory(formData);
      if (result) {
        toast.success('Category created successfully', { id: loadingToast });
        // Redirect handled in useEffect
      } else {
        toast.error('Failed to create category', { id: loadingToast });
        setIsSubmitting(false);
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred while creating the category', { id: loadingToast });
      setIsSubmitting(false);
    }
  }, [checkAuth, createCategory, formData, isAuthenticated, isLoading, isSubmitting, router, user]);

  if (!authChecked || !isAuthenticated || (user && user.role !== 'admin')) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Category</h1>
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
              {isSubmitting || isLoading ? 'Creating...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
