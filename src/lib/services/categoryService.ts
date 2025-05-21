import axios from 'axios';

export interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  success: boolean;
  message?: string;
  category?: Category;
  categories?: Category[];
  error?: string;
}

// Configure axios to always include credentials
axios.defaults.withCredentials = true;

// Get all categories
export const getAllCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await axios.get('/api/categories');
    
    return {
      success: true,
      categories: response.data.categories
    };
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch categories'
    };
  }
};

// Get a single category by ID
export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  try {
    const response = await axios.get(`/api/categories/${id}`);
    
    return {
      success: true,
      category: response.data.category
    };
  } catch (error: any) {
    console.error(`Error fetching category with ID ${id}:`, error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch category'
    };
  }
};

// Create a new category (admin only)
export const createCategory = async (
  categoryData: { name: string; description: string }
): Promise<CategoryResponse> => {
  try {
    const response = await axios.post('/api/categories', categoryData);
    
    return {
      success: true,
      message: response.data.message || 'Category created successfully',
      category: response.data.category
    };
  } catch (error: any) {
    console.error('Error creating category:', error);
    const errorMessage = error.response?.data?.error || 'Failed to create category';
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Update a category (admin only)
export const updateCategory = async (
  id: string,
  categoryData: { name: string; description: string }
): Promise<CategoryResponse> => {
  try {
    const response = await axios.put(`/api/categories/${id}`, categoryData);
    
    return {
      success: true,
      message: response.data.message || 'Category updated successfully',
      category: response.data.category
    };
  } catch (error: any) {
    console.error(`Error updating category with ID ${id}:`, error);
    const errorMessage = error.response?.data?.error || 'Failed to update category';
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Delete a category (admin only)
export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
  try {
    const response = await axios.delete(`/api/categories/${id}`);
    
    return {
      success: true,
      message: response.data.message || 'Category deleted successfully'
    };
  } catch (error: any) {
    console.error(`Error deleting category with ID ${id}:`, error);
    const errorMessage = error.response?.data?.error || 'Failed to delete category';
    return {
      success: false,
      error: errorMessage
    };
  }
}; 