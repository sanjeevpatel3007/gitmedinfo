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
      className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition duration-300 hover:shadow-lg hover:border-blue-200"
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={medicine.name}
          fill
          style={{ objectFit: 'cover' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        {medicine.category && (
          <div className="mb-2">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {medicine.category.name}
            </span>
          </div>
        )}
        
        {!medicine.category && (
          <div className="mb-2">
            <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
              Uncategorized
            </span>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
          {medicine.name}
        </h3>
        
        {medicine.composition?.length > 0 && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            <span className="font-medium">Composition:</span> {medicine.composition.join(', ')}
          </p>
        )}
        
        {medicine.uses?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">Common Uses:</p>
            <p className="text-sm text-gray-700 line-clamp-2">
              {medicine.uses.join(', ')}
            </p>
          </div>
        )}
        
        <div className="text-blue-600 text-sm font-medium group-hover:text-blue-800">
          View Details →
        </div>
      </div>
    </Link>
  );
} 