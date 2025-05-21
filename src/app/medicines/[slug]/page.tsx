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
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (error || !currentMedicine) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Failed to load medicine information
        </div>
      </div>
    );
  }
  
  const medicine = currentMedicine;
  const defaultImage = '/images/default-medicine.jpg';
  const imageUrl = medicine.images?.length > 0 ? medicine.images[0] : defaultImage;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        {' / '}
        <Link href="/medicines" className="text-blue-600 hover:underline">
          Medicines
        </Link>
        {' / '}
        <Link href={`/categories/${medicine.category.name}`} className="text-blue-600 hover:underline">
          {medicine.category.name}
        </Link>
        {' / '}
        <span className="text-gray-500">{medicine.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 mb-6 md:mb-0 md:mr-6">
                <div className="relative h-64 w-full rounded-lg overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={medicine.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{medicine.name}</h1>
                <p className="text-gray-500 mb-4">Category: {medicine.category.name}</p>
                
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Composition</h2>
                  <ul className="list-disc pl-5 text-gray-600">
                    {medicine.composition.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {medicine.dosage && medicine.dosage.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Dosage</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age Group
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {medicine.dosage.map((dose, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dose.ageGroup}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dose.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dose.frequency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600">{medicine.workingMechanism}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {medicine.uses && medicine.uses.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Uses</h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {medicine.uses.map((use, index) => (
                    <li key={index} className="mb-1">{use}</li>
                  ))}
                </ul>
              </div>
            )}

            {medicine.sideEffects && medicine.sideEffects.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Side Effects</h2>
                <ul className="list-disc pl-5 text-gray-600">
                  {medicine.sideEffects.map((effect, index) => (
                    <li key={index} className="mb-1">{effect}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {medicine.warnings && medicine.warnings.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Warnings & Precautions</h2>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                {medicine.warnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-600 text-sm">
              The information provided is for educational purposes only and is not a substitute for professional medical advice.
              Always consult with a healthcare professional before starting, stopping, or changing any medication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 