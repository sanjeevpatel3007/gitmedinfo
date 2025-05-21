'use client';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Define public and protected paths
const PUBLIC_PATHS = [
  '/',
  '/auth/login',
  '/auth/register',
  '/categories',
  '/medicines'
];

const ADMIN_PATHS = ['/admin', '/admin/dashboard', '/admin/categories', '/admin/medicines'];

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    isInitialized,
    error,
    initAuth
  } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const redirectInProgressRef = useRef(false);
  const authInitializedRef = useRef(false);

  // Initialize auth state when component mounts - only once
  useEffect(() => {
    if (!isInitialized && !authInitializedRef.current) {
      authInitializedRef.current = true;
      initAuth();
    }
  }, [isInitialized, initAuth]);

  // Handle auth state changes and path-based redirects
  useEffect(() => {
    // Don't execute if still initializing or loading auth state
    if (!isInitialized || isLoading) return;
    
    // Don't redirect if already in progress to prevent redirect loops
    if (redirectInProgressRef.current) return;

    const isPublicPath = PUBLIC_PATHS.some(path => 
      pathname === path || 
      pathname?.startsWith('/categories/') || 
      pathname?.startsWith('/medicines/')
    );

    const isAdminPath = ADMIN_PATHS.some(path => 
      pathname === path || pathname?.startsWith(path + '/')
    );

    const handleRedirects = async () => {
      try {
        redirectInProgressRef.current = true;
        
        // Handle authenticated users on login/register pages
        if (isAuthenticated && user) {
          if (pathname === '/auth/login' || pathname === '/auth/register') {
            if (user.role === 'admin') {
              router.push('/admin/dashboard');
            } else {
              router.push('/');
            }
            return;
          }

          // Handle non-admin users trying to access admin paths
          if (isAdminPath && user.role !== 'admin') {
            toast.error('You do not have permission to access this page');
            router.push('/');
            return;
          }
        } 
        // Handle unauthenticated users on protected paths
        else if (!isAuthenticated) {
          // If user is on a protected path, redirect to login
          if (!isPublicPath) {
            router.push('/auth/login');
            return;
          }
        }
      } finally {
        // Reset redirect flag after a small delay
        setTimeout(() => {
          redirectInProgressRef.current = false;
        }, 200);
      }
    };

    handleRedirects();
  }, [pathname, router, isAuthenticated, user, isInitialized, isLoading]);

  // If we're still initializing auth, show loading spinner
  if (!isInitialized && isLoading) {
    return <LoadingSpinner fullScreen text="Initializing..." />;
  }

  return <>{children}</>;
}
