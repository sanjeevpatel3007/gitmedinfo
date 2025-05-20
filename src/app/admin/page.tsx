'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    medicines: 0,
    categories: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // In a production app, these would be fetched from your API
        const [categoriesRes, medicinesRes] = await Promise.all([
          fetch('/api/categories?limit=1'),
          fetch('/api/medicines?limit=1')
        ]);

        const categoriesData = await categoriesRes.json();
        const medicinesData = await medicinesRes.json();

        setStats({
          medicines: medicinesData.pagination?.total || 0,
          categories: categoriesData.pagination?.total || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard</p>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Medicine Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="h-7 w-7 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div className="ml-5">
              <h2 className="text-sm font-medium text-gray-500">Medicines</h2>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stats.medicines}</p>
                <Link href="/admin/medicines" className="ml-2 text-sm text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="h-7 w-7 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
            <div className="ml-5">
              <h2 className="text-sm font-medium text-gray-500">Categories</h2>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stats.categories}</p>
                <Link href="/admin/categories" className="ml-2 text-sm text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Users Stats (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="h-7 w-7 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-5">
              <h2 className="text-sm font-medium text-gray-500">Users</h2>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">2</p>
                <span className="ml-2 text-sm text-gray-500">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Status (Placeholder) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-full">
              <svg className="h-7 w-7 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div className="ml-5">
              <h2 className="text-sm font-medium text-gray-500">System Status</h2>
              <div className="mt-1">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-bold text-gray-900 mb-5">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/medicines/add" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-blue-600 bg-blue-50 p-2 rounded-lg">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div className="text-gray-400 group-hover:text-blue-600 transition-colors">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-700 transition-colors">Add Medicine</h3>
          <p className="text-sm text-gray-500 mt-1">Create a new medicine entry</p>
        </Link>

        <Link href="/admin/categories/add" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-green-600 bg-green-50 p-2 rounded-lg">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div className="text-gray-400 group-hover:text-green-600 transition-colors">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-700 transition-colors">Add Category</h3>
          <p className="text-sm text-gray-500 mt-1">Create a new category</p>
        </Link>

        <Link href="/admin/medicines" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-purple-600 bg-purple-50 p-2 rounded-lg">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div className="text-gray-400 group-hover:text-purple-600 transition-colors">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-purple-700 transition-colors">Manage Medicines</h3>
          <p className="text-sm text-gray-500 mt-1">View and edit existing medicines</p>
        </Link>

        <Link href="/admin/categories" className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md hover:border-yellow-200 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="text-yellow-600 bg-yellow-50 p-2 rounded-lg">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div className="text-gray-400 group-hover:text-yellow-600 transition-colors">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-yellow-700 transition-colors">Manage Categories</h3>
          <p className="text-sm text-gray-500 mt-1">View and edit existing categories</p>
        </Link>
      </div>
    </div>
  );
} 