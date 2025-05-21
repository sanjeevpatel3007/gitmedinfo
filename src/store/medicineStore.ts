import { create } from 'zustand';
import axios from 'axios';
import { 
  getAllMedicines,
  getMedicineById,
  getMedicineBySlug, 
  createMedicine as createMedicineService, 
  updateMedicine as updateMedicineService, 
  deleteMedicine as deleteMedicineService,
  Medicine as MedicineType,
  MedicineInput
} from '@/lib/services/medicineService';
import { toast } from 'react-hot-toast';

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
  success: string | null;
  
  // Methods
  fetchMedicines: (params?: SearchParams) => Promise<void>;
  fetchMedicineBySlug: (slug: string) => Promise<Medicine | null>;
  fetchMedicineById: (id: string) => Promise<Medicine | null>;
  getMedicinesByCategory: (categorySlug: string) => Medicine[];
  setSearchParams: (params: SearchParams) => void;
  
  // Admin CRUD operations
  createMedicine: (medicineData: MedicineInput) => Promise<Medicine | null>;
  updateMedicine: (id: string, medicineData: MedicineInput) => Promise<Medicine | null>;
  deleteMedicine: (id: string) => Promise<boolean>;
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
  success: null,
  
  // Fetch medicines with optional search, pagination, and filtering
  fetchMedicines: async (params?: SearchParams) => {
    const searchParams = params || get().searchParams;
    
    set({ searchLoading: true, error: null });
    
    const response = await getAllMedicines(searchParams);
    
    if (response.success && response.medicines) {
      // Update current page medicines and pagination
      set({ 
        currentPageMedicines: response.medicines,
        pagination: response.pagination || {
          total: 0,
          page: 1,
          limit: 10,
          pages: 0
        },
        searchParams,
        searchLoading: false
      });
      
      // Add to our cache of medicines if not already present
      if (response.medicines.length > 0) {
        const existingIds = get().medicines.map(m => m._id);
        const newMedicines = response.medicines.filter(
          (m: Medicine) => !existingIds.includes(m._id)
        );
        
        if (newMedicines.length > 0) {
          set(state => ({ 
            medicines: [...state.medicines, ...newMedicines] 
          }));
        }
      }
    } else {
      set({ 
        currentPageMedicines: [],
        searchLoading: false,
        error: response.error || 'Failed to load medicines'
      });
    }
  },
  
  // Fetch a single medicine by ID
  fetchMedicineById: async (id: string) => {
    // First check our cache
    const cachedMedicine = get().medicines.find(m => m._id === id);
    if (cachedMedicine) {
      set({ currentMedicine: cachedMedicine });
      return cachedMedicine;
    }
    
    // If not in cache, fetch from API
    set({ isLoading: true, error: null });
    
    const response = await getMedicineById(id);
    
    if (response.success && response.medicine) {
      const medicine = response.medicine;
      set({ 
        currentMedicine: medicine,
        medicines: [...get().medicines, medicine],
        isLoading: false 
      });
      return medicine;
    } else {
      set({ 
        isLoading: false,
        error: response.error || 'Failed to load medicine' 
      });
      return null;
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
    
    const response = await getMedicineBySlug(slug);
    
    if (response.success && response.medicine) {
      const medicine = response.medicine;
      set({ 
        currentMedicine: medicine,
        medicines: [...get().medicines, medicine],
        isLoading: false 
      });
      return medicine;
    } else {
      set({ 
        isLoading: false,
        error: response.error || 'Failed to load medicine' 
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
  },
  
  // Admin: Create a new medicine
  createMedicine: async (medicineData: MedicineInput) => {
    set({ isLoading: true, error: null, success: null });
    
    // Show loading toast
    const loadingToastId = toast.loading("Creating medicine...");
    
    const response = await createMedicineService(medicineData);
    
    // Dismiss loading toast
    toast.dismiss(loadingToastId);
    
    if (response.success && response.medicine) {
      // Add the new medicine to the medicines array
      set(state => ({
        medicines: [...state.medicines, response.medicine!],
        isLoading: false,
        success: response.message || 'Medicine created successfully'
      }));
      
      // Show success toast
      toast.success(response.message || 'Medicine created successfully');
      return response.medicine;
    } else {
      // Show error toast
      toast.error(response.error || 'Failed to create medicine');
      
      set({
        isLoading: false,
        error: response.error || 'Failed to create medicine'
      });
      return null;
    }
  },
  
  // Admin: Update an existing medicine
  updateMedicine: async (id: string, medicineData: MedicineInput) => {
    set({ isLoading: true, error: null, success: null });
    
    // Show loading toast
    const loadingToastId = toast.loading("Updating medicine...");
    
    const response = await updateMedicineService(id, medicineData);
    
    // Dismiss loading toast
    toast.dismiss(loadingToastId);
    
    if (response.success && response.medicine) {
      // Update the medicine in the medicines array
      set(state => ({
        medicines: state.medicines.map(med => 
          med._id === id ? response.medicine! : med
        ),
        currentMedicine: response.medicine,
        isLoading: false,
        success: response.message || 'Medicine updated successfully'
      }));
      
      // Show success toast
      toast.success(response.message || 'Medicine updated successfully');
      return response.medicine;
    } else {
      // Show error toast
      toast.error(response.error || 'Failed to update medicine');
      
      set({
        isLoading: false,
        error: response.error || 'Failed to update medicine'
      });
      return null;
    }
  },
  
  // Admin: Delete a medicine
  deleteMedicine: async (id: string) => {
    set({ isLoading: true, error: null, success: null });
    
    // Show loading toast
    const loadingToastId = toast.loading("Deleting medicine...");
    
    const response = await deleteMedicineService(id);
    
    // Dismiss loading toast
    toast.dismiss(loadingToastId);
    
    if (response.success) {
      // Remove the medicine from the medicines array
      set(state => ({
        medicines: state.medicines.filter(med => med._id !== id),
        isLoading: false,
        success: response.message || 'Medicine deleted successfully'
      }));
      
      // Show success toast
      toast.success(response.message || 'Medicine deleted successfully');
      return true;
    } else {
      // Show error toast
      toast.error(response.error || 'Failed to delete medicine');
      
      set({
        isLoading: false,
        error: response.error || 'Failed to delete medicine'
      });
      return false;
    }
  }
})); 