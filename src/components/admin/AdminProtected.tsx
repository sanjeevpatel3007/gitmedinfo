'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'react-toastify';

interface AdminProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isInitialized, checkAuth } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyAdminAccess = async () => {
      setIsVerifying(true);
      
      // If not initialized, check auth status
      if (!isInitialized) {
        await checkAuth();
      }
      
      // If authenticated and user exists
      if (isAuthenticated && user) {
        // Check if user is admin
        if (user.role !== 'admin') {
          toast.error('You do not have permission to access this page');
          router.push('/');
        }
      } else {
        // Not authenticated, redirect to login
        toast.error('Please log in to continue');
        router.push('/auth/login');
      }
      
      setIsVerifying(false);
    };

    verifyAdminAccess();
  }, [isInitialized, isAuthenticated, user, router, checkAuth]);

  // Show loading state during verification
  if (isVerifying || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-700">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  // If we're here, the user is an admin
  return <>{children}</>;
} 