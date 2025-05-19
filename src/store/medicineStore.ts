import { create } from 'zustand';
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

interface SearchParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface MedicineState {
  medicines: Medicine[];
  currentMedicine: Medicine | null;
  isLoading: boolean;
  searchLoading: boolean;
  currentPageMedicines: Medicine[];
  pagination: PaginationData;
  searchParams: SearchParams;
  error: string | null;
  
  // Methods
  fetchMedicines: (params?: SearchParams) => Promise<void>;
  fetchMedicineBySlug: (slug: string) => Promise<Medicine | null>;
  getMedicinesByCategory: (categorySlug: string) => Medicine[];
  setSearchParams: (params: SearchParams) => void;
}

export const useMedicineStore = create<MedicineState>((set, get) => ({
  medicines: [],
  currentMedicine: null,
  currentPageMedicines: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  },
  isLoading: false,
  searchLoading: false,
  searchParams: {
    page: 1,
    limit: 10,
    search: '',
    category: ''
  },
  error: null,
  
  // Fetch medicines with optional search, pagination, and filtering
  fetchMedicines: async (params?: SearchParams) => {
    const searchParams = params || get().searchParams;
    
    set({ searchLoading: true, error: null });
    try {
      const response = await axios.get('/api/medicines', {
        params: searchParams
      });
      
      set({ 
        currentPageMedicines: response.data.medicines,
        pagination: response.data.pagination,
        searchParams,
        searchLoading: false
      });
      
      // Add to our cache of medicines if not already present
      const existingIds = get().medicines.map(m => m._id);
      const newMedicines = response.data.medicines.filter(
        (m: Medicine) => !existingIds.includes(m._id)
      );
      
      if (newMedicines.length > 0) {
        set(state => ({ 
          medicines: [...state.medicines, ...newMedicines] 
        }));
      }
    } catch (error: any) {
      console.error('Error fetching medicines:', error);
      set({ 
        error: error.response?.data?.error || 'Failed to load medicines',
        searchLoading: false 
      });
    }
  },
  
  // Fetch a single medicine by slug
  fetchMedicineBySlug: async (slug: string) => {
    // First check our cache
    const cachedMedicine = get().medicines.find(m => m.slug === slug);
    if (cachedMedicine) {
      set({ currentMedicine: cachedMedicine });
      return cachedMedicine;
    }
    
    // If not in cache, fetch from API
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`/api/medicines/slug/${slug}`);
      const medicine = response.data.medicine;
      
      set({ 
        currentMedicine: medicine,
        medicines: [...get().medicines, medicine],
        isLoading: false 
      });
      
      return medicine;
    } catch (error: any) {
      console.error('Error fetching medicine:', error);
      set({ 
        error: error.response?.data?.error || 'Failed to load medicine',
        isLoading: false 
      });
      return null;
    }
  },
  
  // Get medicines by category from cache
  getMedicinesByCategory: (categorySlug: string) => {
    return get().medicines.filter(m => m.category.slug === categorySlug);
  },
  
  // Update search parameters
  setSearchParams: (params: SearchParams) => {
    set({ searchParams: { ...get().searchParams, ...params } });
  }
})); 