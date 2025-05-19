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
    // Don't fetch if we already have categories
    if (get().categories.length > 0) return;
    
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('/api/categories');
      set({ categories: response.data.categories, isLoading: false });
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      set({ 
        error: error.response?.data?.error || 'Failed to load categories', 
        isLoading: false 
      });
    }
  },
  
  getCategory: (slug: string) => {
    return get().categories.find(category => category.slug === slug);
  }
})); 