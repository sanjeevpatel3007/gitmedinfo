'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMedicineStore } from '@/store/medicineStore';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function MedicinePage({ params }: PageProps) {
  const { slug } = params;
  const router = useRouter();
  const { 
    fetchMedicineBySlug, 
    currentMedicine, 
    isLoading, 
    error 
  } = useMedicineStore();
  
  useEffect(() => {
    const loadMedicine = async () => {
      const result = await fetchMedicineBySlug(slug);
      if (!result) {
        router.push('/404');
      }
    };
    
    loadMedicine();
  }, [slug, fetchMedicineBySlug, router]);
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
            <div className="h-16 w-16 rounded-full border-r-4 border-l-4 border-transparent absolute top-0 animate-ping opacity-20"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !currentMedicine) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">Failed to load medicine information</h3>
              <p className="mt-2 text-red-700">Please try refreshing the page or go back to the medicines page.</p>
              <div className="mt-4">
                <Link
                  href="/medicines"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Back to Medicines
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const medicine = currentMedicine;
  const defaultImage = '/images/default-medicine.jpg';
  const imageUrl = medicine.images?.length > 0 ? medicine.images[0] : defaultImage;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm font-medium">
          <li>
            <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
              Home
            </Link>
          </li>
          <li className="text-gray-500 flex items-center">
            <svg className="h-4 w-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </li>
          <li>
            <Link href="/medicines" className="text-blue-600 hover:text-blue-800 transition-colors">
              Medicines
            </Link>
          </li>
          <li className="text-gray-500 flex items-center">
            <svg className="h-4 w-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </li>
          {medicine.category && (
            <>
              <li>
                <Link 
                  href={`/categories/${medicine.category.slug}`} 
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {medicine.category.name}
                </Link>
              </li>
              <li className="text-gray-500 flex items-center">
                <svg className="h-4 w-4 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
            </>
          )}
          <li className="text-gray-600 font-semibold truncate max-w-[200px]">{medicine.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          {/* Medicine Header */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl font-bold">{medicine.name}</h1>
                {medicine.category && (
                  <span className="inline-flex items-center mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
                    {medicine.category.name}
                  </span>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0 md:mr-8">
                  <div className="relative h-72 w-full rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={imageUrl}
                      alt={medicine.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  {medicine.composition?.length > 0 && (
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        </svg>
                        Composition
                      </h2>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <ul className="space-y-2">
                          {medicine.composition.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <span className="flex-shrink-0 h-5 w-5 text-blue-500">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </span>
                              <span className="ml-3 text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {medicine.workingMechanism && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        How It Works
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{medicine.workingMechanism}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {medicine.dosage && medicine.dosage.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Recommended Dosage
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age Group
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicine.dosage.map((dose, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          {dose.ageGroup}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {dose.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {dose.frequency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {medicine.uses && medicine.uses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Uses
                </h2>
                <ul className="space-y-3">
                  {medicine.uses.map((use, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-green-500">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {medicine.sideEffects && medicine.sideEffects.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  Side Effects
                </h2>
                <ul className="space-y-3">
                  {medicine.sideEffects.map((effect, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-amber-500">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-700">{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {medicine.warnings && medicine.warnings.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Warnings & Precautions
              </h2>
              <div className="bg-red-50 rounded-lg p-4">
                <ul className="space-y-3">
                  {medicine.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-red-500">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </span>
                      <span className="ml-3 text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Medical Disclaimer
            </h2>
            <div className="p-4 bg-blue-50 rounded-lg text-gray-600 text-sm">
              <p className="mb-3">
                The information provided is for educational purposes only and is not a substitute for professional medical advice.
              </p>
              <p>
                Always consult with a healthcare professional before starting, stopping, or changing any medication.
              </p>
            </div>
          </div>
          
          <div className="sticky top-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-md p-6 text-white">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Need Help?
              </h2>
              <p className="mb-6 text-blue-100">
                Have questions about this medicine or need professional advice?
              </p>
              <Link 
                href="/contact" 
                className="block w-full py-3 px-4 bg-white text-blue-600 font-medium text-center rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact a Pharmacist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 