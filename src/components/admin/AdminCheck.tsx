'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminCheck({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, setUser, setIsAuthenticated } = useAuthStore();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // If already authenticated as admin, don't need to check again
        if (isAuthenticated && user?.role === 'admin') {
          setPageLoading(false);
          return;
        }

        // Explicitly fetch auth status instead of relying on store
        const response = await fetch('/api/auth/me');
        
        if (response.ok) {
          const data = await response.json();
          
          // Update store with user data
          setUser(data.user);
          setIsAuthenticated(true);
          
          if (data.user.role !== 'admin') {
            console.log('User is not an admin, redirecting to home');
            router.push('/');
          } else {
            setPageLoading(false);
          }
        } else {
          // Not authenticated
          console.log('User not authenticated, redirecting to login');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
        router.push('/auth/login');
      }
    };

    checkAdminAuth();
  }, [user, isAuthenticated, isLoading, router, setUser, setIsAuthenticated]);

  // Show loading state while authentication is being checked
  if (isLoading || pageLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
} 