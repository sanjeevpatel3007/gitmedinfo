import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCurrentUser, logoutUser } from '@/lib/services/authService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
  lastChecked: number | null;
  authCheckCount: number; // Track number of auth checks for debugging
  
  // Actions
  setUser: (user: User | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  setInitialized: (value: boolean) => void;
  
  // Async actions
  initAuth: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Threshold for re-checking auth (30 minutes)
const AUTH_RECHECK_THRESHOLD = 30 * 60 * 1000;
// Max number of allowed auth checks in a short time period
const MAX_AUTH_CHECKS_THRESHOLD = 3;
// Short time period definition (3 seconds)
const SHORT_TIME_PERIOD = 3000;

// Create auth store with persistence
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      error: null,
      lastChecked: null,
      authCheckCount: 0,
      
      // Synchronous actions
      setUser: (user) => set({ user }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setIsLoading: (value) => set({ isLoading: value }),
      setError: (error) => set({ error }),
      setInitialized: (value) => set({ isInitialized: value }),
      
      // Asynchronous actions
      initAuth: async () => {
        // Skip if already initialized and we have a user
        if (get().isInitialized && get().user && get().isAuthenticated) {
          return;
        }
        
        // If we have a stored user but were recently checked, don't recheck
        const now = Date.now();
        const lastChecked = get().lastChecked;
        if (get().user && 
            get().isAuthenticated && 
            lastChecked !== null && 
            (now - lastChecked < AUTH_RECHECK_THRESHOLD)) {
          set({ isInitialized: true });
          return;
        }
        
        // Track auth check count to prevent excessive calls
        const authCheckCount = get().authCheckCount;
        const currentTime = Date.now();
        
        // If there have been too many auth checks in a short period, skip this one
        if (authCheckCount > MAX_AUTH_CHECKS_THRESHOLD && 
            lastChecked !== null && 
            (currentTime - lastChecked < SHORT_TIME_PERIOD)) {
          console.log('Rate limiting auth checks - too many in a short period');
          set({ isInitialized: true });
          return;
        }
        
        set({ 
          isLoading: true,
          authCheckCount: authCheckCount + 1
        });
        
        try {
          const response = await getCurrentUser();
          
          if (response.success && response.user) {
            set({ 
              user: response.user,
              isAuthenticated: true,
              error: null,
              lastChecked: Date.now()
            });
          } else {
            // Clear any stored user data if API says we're not authenticated
            set({ 
              user: null,
              isAuthenticated: false,
              error: response.message,
              lastChecked: Date.now()
            });
          }
        } catch (error: any) {
          set({ 
            user: null,
            isAuthenticated: false,
            error: error.message || 'Authentication failed',
            lastChecked: Date.now()
          });
        } finally {
          set({ 
            isLoading: false,
            isInitialized: true
          });
          
          // Reset auth check count after a delay
          setTimeout(() => {
            set({ authCheckCount: 0 });
          }, SHORT_TIME_PERIOD);
        }
      },
      
      checkAuth: async () => {
        // If we're loading, don't initiate another check
        if (get().isLoading) {
          return get().isAuthenticated;
        }
        
        // If we have checked auth recently and we're authenticated, return early
        const now = Date.now();
        const lastChecked = get().lastChecked;
        if (get().isAuthenticated && 
            get().user && 
            lastChecked !== null && 
            (now - lastChecked < AUTH_RECHECK_THRESHOLD)) {
          return true;
        }
        
        // If already initialized but not authenticated, use caching to prevent frequent rechecks
        if (get().isInitialized && !get().isAuthenticated && 
            lastChecked !== null && 
            (now - lastChecked < SHORT_TIME_PERIOD * 10)) {
          return false;
        }
        
        // Track auth check count to prevent excessive calls
        const authCheckCount = get().authCheckCount;
        
        // If there have been too many auth checks in a short period, skip this one
        if (authCheckCount > MAX_AUTH_CHECKS_THRESHOLD && 
            lastChecked !== null && 
            (now - lastChecked < SHORT_TIME_PERIOD)) {
          console.log('Rate limiting auth checks - too many in a short period');
          return get().isAuthenticated;
        }
        
        if (!get().isInitialized) {
          await get().initAuth();
          return get().isAuthenticated;
        }
        
        set({ 
          isLoading: true,
          authCheckCount: authCheckCount + 1
        });
        
        try {
          const response = await getCurrentUser();
          
          if (response.success && response.user) {
            set({ 
              user: response.user,
              isAuthenticated: true,
              error: null,
              lastChecked: Date.now()
            });
            return true;
          } else {
            set({ 
              user: null,
              isAuthenticated: false,
              error: response.message,
              lastChecked: Date.now()
            });
            return false;
          }
        } catch (error: any) {
          set({ 
            user: null,
            isAuthenticated: false,
            error: error.message || 'Authentication check failed',
            lastChecked: Date.now()
          });
          return false;
        } finally {
          set({ isLoading: false });
          
          // Reset auth check count after a delay
          setTimeout(() => {
            set({ authCheckCount: 0 });
          }, SHORT_TIME_PERIOD);
        }
      },
      
      logout: async () => {
        set({ isLoading: true });
        try {
          await logoutUser();
          
          // Always clear state, even if API call fails
          set({ 
            user: null, 
            isAuthenticated: false,
            error: null,
            lastChecked: Date.now()
          });
        } catch (error: any) {
          set({ 
            error: error.message || 'Logout failed',
            user: null,
            isAuthenticated: false,
            lastChecked: Date.now()
          });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage instead of localStorage for security
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        lastChecked: state.lastChecked,
        isInitialized: state.isInitialized,
      }),
    }
  )
); 