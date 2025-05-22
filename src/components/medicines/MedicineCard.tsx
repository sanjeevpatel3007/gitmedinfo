import Link from 'next/link';
import Image from 'next/image';
import { Medicine } from '@/store/medicineStore';

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const defaultImage = '/images/default-medicine.jpg';
  const imageUrl = medicine.images?.length > 0 ? medicine.images[0] : defaultImage;
  
  return (
    <Link
      href={`/medicines/${medicine.slug}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:border-blue-200 flex flex-col h-full hover:-translate-y-1 relative"
    >
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10" />
        <Image
          src={imageUrl}
          alt={medicine.name}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {medicine.category && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center bg-blue-600/90 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full font-medium shadow-sm">
              {medicine.category.name}
            </span>
          </div>
        )}

        {new Date(medicine.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000 && (
          <div className="absolute top-3 right-3 z-20">
            <span className="inline-flex items-center bg-green-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
              New
            </span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {medicine.name}
        </h3>
        
        {medicine.composition?.length > 0 && (
          <div className="mb-3">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1 font-medium">Composition</p>
            <p className="text-sm text-gray-700 line-clamp-1">
              {medicine.composition.join(', ')}
            </p>
          </div>
        )}
        
        {medicine.uses?.length > 0 && (
          <div className="mb-4 flex-grow">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium">Common Uses</p>
            <div className="flex flex-wrap gap-1.5">
              {medicine.uses.slice(0, 3).map((use, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md">
                  {use}
                </span>
              ))}
              {medicine.uses.length > 3 && (
                <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-md">
                  +{medicine.uses.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors duration-300">
            View Details
          </div>
          <div className="bg-blue-50 text-blue-600 p-1.5 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
} 