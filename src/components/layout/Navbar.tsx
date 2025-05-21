'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Use auth store with proper status checks
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    isInitialized, 
    checkAuth,
    logout 
  } = useAuthStore();

  // Use a memoized version of auth check to prevent excessive renders
  const debouncedCheckAuth = useCallback(() => {
    if (isInitialized || isLoading) return;
    checkAuth();
  }, [checkAuth, isInitialized, isLoading]);
  
  // Only check auth on initial mount, not on every render
  useEffect(() => {
    // Only check auth once when component mounts and when not already initialized
    if (!isInitialized && !isLoading) {
      debouncedCheckAuth();
    }
  }, [debouncedCheckAuth, isInitialized, isLoading]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Create variables for visibility conditions to improve readability
  const isUserAuthenticated = !isLoading && isAuthenticated && user;
  const showAuthButtons = !isLoading && !isAuthenticated;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Image src="/logo.jpg" alt="logo" width={32} height={32} />
              <Link href="/" className="text-2xl font-bold text-blue-600">
                GetMedInfo
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Home
              </Link>
              <Link
                href="/categories"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/categories' || pathname?.startsWith('/categories/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Categories
              </Link>
              <Link
                href="/medicines"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === '/medicines' || pathname?.startsWith('/medicines/')
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Medicines
              </Link>
            </nav>
          </div>
          
          {/* Auth buttons - Render loading state during authentication check */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoading && (
              <div className="text-sm text-gray-500">
                <LoadingSpinner size="sm" />
              </div>
            )}
            {isUserAuthenticated && (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  {user.role === 'admin' ? (
                    <Link href="/admin/dashboard" className="text-blue-600 hover:text-blue-800">
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link href="/profile" className="text-blue-600 hover:text-blue-800">
                      {user.name}
                    </Link>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            )}
            
            {showAuthButtons && (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/categories"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/categories' || pathname?.startsWith('/categories/')
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Categories
            </Link>
            <Link
              href="/medicines"
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                pathname === '/medicines' || pathname?.startsWith('/medicines/')
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Medicines
            </Link>
          </div>
          
          {/* Mobile auth buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isLoading ? (
              <div className="px-4 py-2 text-base font-medium text-gray-500">
                <LoadingSpinner size="sm" />
              </div>
            ) : isUserAuthenticated ? (
              <div className="space-y-1">
                <div className="px-4 py-2 text-base font-medium text-gray-500">
                  Signed in as: <span className="font-medium text-gray-900">{user.name}</span>
                </div>
                {user.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-red-500 hover:bg-gray-50 hover:border-red-300 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  href="/auth/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 