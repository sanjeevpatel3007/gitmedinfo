'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, setUser, setIsAuthenticated, setIsLoading, isLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication status on mount and when pathname changes
  useEffect(() => {
    const checkAuth = async () => {
      // Skip re-checking if already authenticated
      if (isAuthenticated && user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
          
          // Redirect admin to admin dashboard if trying to access regular auth pages
          if (data.user.role === 'admin' && 
             (pathname === '/auth/login' || pathname === '/auth/register')) {
            router.push('/admin/dashboard');
          }
        } else {
          // If not authenticated but trying to access protected routes - except admin routes
          // Admin routes will handle their own auth in the component
          if (pathname === '/profile') {
            router.push('/auth/login');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, setUser, setIsAuthenticated, setIsLoading, router, isAuthenticated, user]);

  return <>{children}</>;
}
