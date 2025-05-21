import axios from 'axios';

export interface Dosage {
  ageGroup: string;
  amount: string;
  frequency: string;
}

export interface Medicine {
  _id: string;
  name: string;
  slug: string;
  composition: string[];
  dosage: Dosage[];
  uses: string[];
  sideEffects: string[];
  workingMechanism: string;
  warnings: string[];
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicineInput {
  name: string;
  composition: string[];
  dosage?: Dosage[];
  uses?: string[];
  sideEffects?: string[];
  workingMechanism: string;
  warnings?: string[];
  category: string;
  images?: string[];
}

interface MedicineResponse {
  success: boolean;
  message?: string;
  medicine?: Medicine;
  medicines?: Medicine[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  error?: string;
}

// Configure axios to always include credentials
axios.defaults.withCredentials = true;

// Get all medicines with pagination and filtering
export const getAllMedicines = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}): Promise<MedicineResponse> => {
  try {
    const response = await axios.get('/api/medicines', { params });
    
    return {
      success: true,
      medicines: response.data.medicines,
      pagination: response.data.pagination
    };
  } catch (error: any) {
    console.error('Error fetching medicines:', error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch medicines'
    };
  }
};

// Get a single medicine by ID
export const getMedicineById = async (id: string): Promise<MedicineResponse> => {
  try {
    const response = await axios.get(`/api/medicines/${id}`);
    
    return {
      success: true,
      medicine: response.data.medicine
    };
  } catch (error: any) {
    console.error(`Error fetching medicine with ID ${id}:`, error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch medicine'
    };
  }
};

// Get a single medicine by slug
export const getMedicineBySlug = async (slug: string): Promise<MedicineResponse> => {
  try {
    const response = await axios.get(`/api/medicines/slug/${slug}`);
    
    return {
      success: true,
      medicine: response.data.medicine
    };
  } catch (error: any) {
    console.error(`Error fetching medicine with slug ${slug}:`, error);
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to fetch medicine'
    };
  }
};

// Create a new medicine (admin only)
export const createMedicine = async (
  medicineData: MedicineInput
): Promise<MedicineResponse> => {
  try {
    const response = await axios.post('/api/medicines', medicineData);
    
    return {
      success: true,
      message: response.data.message || 'Medicine created successfully',
      medicine: response.data.medicine
    };
  } catch (error: any) {
    console.error('Error creating medicine:', error);
    const errorMessage = error.response?.data?.error || 'Failed to create medicine';
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Update a medicine (admin only)
export const updateMedicine = async (
  id: string,
  medicineData: MedicineInput
): Promise<MedicineResponse> => {
  try {
    const response = await axios.put(`/api/medicines/${id}`, medicineData);
    
    return {
      success: true,
      message: response.data.message || 'Medicine updated successfully',
      medicine: response.data.medicine
    };
  } catch (error: any) {
    console.error(`Error updating medicine with ID ${id}:`, error);
    const errorMessage = error.response?.data?.error || 'Failed to update medicine';
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Delete a medicine (admin only)
export const deleteMedicine = async (id: string): Promise<MedicineResponse> => {
  try {
    const response = await axios.delete(`/api/medicines/${id}`);
    
    return {
      success: true,
      message: response.data.message || 'Medicine deleted successfully'
    };
  } catch (error: any) {
    console.error(`Error deleting medicine with ID ${id}:`, error);
    const errorMessage = error.response?.data?.error || 'Failed to delete medicine';
    return {
      success: false,
      error: errorMessage
    };
  }
}; 