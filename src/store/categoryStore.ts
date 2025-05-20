import { create } from 'zustand';
import axios from 'axios';

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  getCategory: (slug: string) => Category | undefined;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  
  fetchCategories: async () => {
    // Don't fetch if we already have categories and we're not in loading state
    if (get().categories.length > 0 && !get().isLoading) return;
    
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/api/categories', { 
        withCredentials: true // Ensure cookies are sent with the request
      });
      
      // Make sure we have a valid response with categories
      if (response.data && Array.isArray(response.data.categories)) {
        set({ categories: response.data.categories, isLoading: false });
      } else {
        // If response is unexpected, set empty array
        set({ categories: [], isLoading: false, error: 'Invalid response format' });
      }
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      
      // Check for authentication errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        set({ 
          categories: [],
          error: 'Authentication error. Please log in again.', 
          isLoading: false 
        });
      } else {
        set({ 
          categories: [], // Ensure we reset to empty array on error
          error: error.response?.data?.error || 'Failed to load categories', 
          isLoading: false 
        });
      }
    }
  },
  
  getCategory: (slug: string) => {
    return get().categories.find(category => category.slug === slug);
  }
})); 