import { create } from 'zustand';
import { 
  getAllCategories, 
  getCategoryById as fetchCategoryById, 
  createCategory as createCategoryService, 
  updateCategory as updateCategoryService, 
  deleteCategory as deleteCategoryService,
  Category as CategoryType
} from '@/lib/services/categoryService';

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
  success: string | null;
  fetchCategories: () => Promise<void>;
  getCategory: (slug: string) => Category | undefined;
  getCategoryById: (id: string) => Category | undefined;
  
  // Admin operations
  createCategory: (categoryData: { name: string; description: string }) => Promise<Category | null>;
  updateCategory: (id: string, categoryData: { name: string; description: string }) => Promise<Category | null>;
  deleteCategory: (id: string) => Promise<boolean>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,
  success: null,
  
  fetchCategories: async () => {
    // Don't fetch if we already have categories and we're not in loading state
    if (get().categories.length > 0 && !get().isLoading) return;
    
    set({ isLoading: true, error: null });
    
    const response = await getAllCategories();
    
    if (response.success && response.categories) {
      set({ categories: response.categories, isLoading: false });
    } else {
      set({ 
        categories: [], 
        isLoading: false, 
        error: response.error || 'Failed to load categories' 
      });
    }
  },
  
  getCategory: (slug: string) => {
    return get().categories.find(category => category.slug === slug);
  },
  
  getCategoryById: (id: string) => {
    return get().categories.find(category => category._id === id);
  },
  
  // Admin: Create a new category
  createCategory: async (categoryData) => {
    set({ isLoading: true, error: null, success: null });
    
    const response = await createCategoryService(categoryData);
    
    if (response.success && response.category) {
      // Add the new category to the categories array
      set(state => ({
        categories: [...state.categories, response.category!],
        isLoading: false,
        success: response.message || 'Category created successfully'
      }));
      return response.category;
    } else {
      set({
        isLoading: false,
        error: response.error || 'Failed to create category'
      });
      return null;
    }
  },
  
  // Admin: Update an existing category
  updateCategory: async (id, categoryData) => {
    set({ isLoading: true, error: null, success: null });
    
    const response = await updateCategoryService(id, categoryData);
    
    if (response.success && response.category) {
      // Update the category in the categories array
      set(state => ({
        categories: state.categories.map(cat => 
          cat._id === id ? response.category! : cat
        ),
        isLoading: false,
        success: response.message || 'Category updated successfully'
      }));
      return response.category;
    } else {
      set({
        isLoading: false,
        error: response.error || 'Failed to update category'
      });
      return null;
    }
  },
  
  // Admin: Delete a category
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null, success: null });
    
    const response = await deleteCategoryService(id);
    
    if (response.success) {
      // Remove the category from the categories array
      set(state => ({
        categories: state.categories.filter(cat => cat._id !== id),
        isLoading: false,
        success: response.message || 'Category deleted successfully'
      }));
      return true;
    } else {
      set({
        isLoading: false,
        error: response.error || 'Failed to delete category'
      });
      return false;
    }
  }
})); 