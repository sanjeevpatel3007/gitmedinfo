'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { useMedicineStore } from '@/store/medicineStore';
import { useCategoryStore } from '@/store/categoryStore';
import { MedicineInput } from '@/lib/services/medicineService';

interface DosageItem {
  ageGroup: string;
  amount: string;
  frequency: string;
}

export default function AddMedicinePage() {
  const router = useRouter();
  const { createMedicine, isLoading: medicineLoading } = useMedicineStore();
  const { categories, fetchCategories, isLoading: categoriesLoading } = useCategoryStore();
  
  const [formData, setFormData] = useState({
    name: '',
    composition: [''],
    workingMechanism: '',
    category: '',
    uses: [''],
    sideEffects: [''],
    warnings: [''],
    images: [] as string[]
  });
  
  const [dosages, setDosages] = useState<DosageItem[]>([
    { ageGroup: '', amount: '', frequency: '' }
  ]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev]] as string[];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };

  const addArrayField = (field: string) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev]] as string[];
      newArray.push('');
      return { ...prev, [field]: newArray };
    });
  };

  const removeArrayField = (field: string, index: number) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev]] as string[];
      if (newArray.length > 1) {
        newArray.splice(index, 1);
      }
      return { ...prev, [field]: newArray };
    });
  };

  const handleDosageChange = (index: number, field: keyof DosageItem, value: string) => {
    const newDosages = [...dosages];
    newDosages[index][field] = value;
    setDosages(newDosages);
  };

  const addDosage = () => {
    setDosages([...dosages, { ageGroup: '', amount: '', frequency: '' }]);
  };

  const removeDosage = (index: number) => {
    if (dosages.length > 1) {
      const newDosages = [...dosages];
      newDosages.splice(index, 1);
      setDosages(newDosages);
    }
  };

  const handleImagesChange = (newImages: string[]) => {
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) return;
    
    // Validate form
    if (!formData.name || !formData.composition[0] || !formData.workingMechanism || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Filter out empty values
    const cleanedFormData: MedicineInput = {
      ...formData,
      composition: formData.composition.filter(item => item.trim() !== ''),
      uses: formData.uses.filter(item => item.trim() !== ''),
      sideEffects: formData.sideEffects.filter(item => item.trim() !== ''),
      warnings: formData.warnings.filter(item => item.trim() !== ''),
      dosage: dosages.filter(d => d.ageGroup && d.amount && d.frequency)
    };

    try {
      setIsSubmitting(true);
      const result = await createMedicine(cleanedFormData);
      
      if (result) {
        // Use setTimeout to prevent immediate navigation which can cause issues
        // with toast notifications or state updates
        setTimeout(() => {
          router.push('/admin/medicines');
        }, 500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Medicine</h1>
        <Link 
          href="/admin/medicines"
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Back to Medicines
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Medicine Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={categoriesLoading || isSubmitting}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Composition */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Composition *
              </label>
              <button
                type="button"
                onClick={() => addArrayField('composition')}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Ingredient
              </button>
            </div>
            {formData.composition.map((item, index) => (
              <div key={`comp-${index}`} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(index, 'composition', e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ingredient"
                  required={index === 0}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('composition', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                  disabled={formData.composition.length === 1 || isSubmitting}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Working Mechanism */}
          <div className="mb-6">
            <label htmlFor="workingMechanism" className="block text-sm font-medium text-gray-700 mb-1">
              Working Mechanism *
            </label>
            <textarea
              id="workingMechanism"
              name="workingMechanism"
              value={formData.workingMechanism}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Dosage */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Dosage Information
              </label>
              <button
                type="button"
                onClick={addDosage}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Dosage
              </button>
            </div>
            {dosages.map((dosage, index) => (
              <div key={`dosage-${index}`} className="grid grid-cols-3 gap-2 mb-3 p-3 border border-gray-200 rounded-md">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Age Group</label>
                  <input
                    type="text"
                    value={dosage.ageGroup}
                    onChange={(e) => handleDosageChange(index, 'ageGroup', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Adults, Children"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Amount</label>
                  <input
                    type="text"
                    value={dosage.amount}
                    onChange={(e) => handleDosageChange(index, 'amount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 5ml, 1 tablet"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex-grow">
                    <label className="block text-xs text-gray-500 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={dosage.frequency}
                      onChange={(e) => handleDosageChange(index, 'frequency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Twice daily"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDosage(index)}
                    className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
                    disabled={dosages.length === 1 || isSubmitting}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Uses */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Uses
              </label>
              <button
                type="button"
                onClick={() => addArrayField('uses')}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Use
              </button>
            </div>
            {formData.uses.map((item, index) => (
              <div key={`use-${index}`} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(index, 'uses', e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter use"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('uses', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                  disabled={formData.uses.length === 1 || isSubmitting}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Side Effects */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Side Effects
              </label>
              <button
                type="button"
                onClick={() => addArrayField('sideEffects')}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Side Effect
              </button>
            </div>
            {formData.sideEffects.map((item, index) => (
              <div key={`side-${index}`} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(index, 'sideEffects', e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter side effect"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('sideEffects', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                  disabled={formData.sideEffects.length === 1 || isSubmitting}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Warnings */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Warnings
              </label>
              <button
                type="button"
                onClick={() => addArrayField('warnings')}
                className="text-sm text-blue-600 hover:text-blue-800"
                disabled={isSubmitting}
              >
                + Add Warning
              </button>
            </div>
            {formData.warnings.map((item, index) => (
              <div key={`warning-${index}`} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(index, 'warnings', e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter warning"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('warnings', index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                  disabled={formData.warnings.length === 1 || isSubmitting}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Images - using the new Cloudinary image uploader */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <ImageUploader
              images={formData.images}
              onImagesChange={handleImagesChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={medicineLoading || isSubmitting}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded ${
                (medicineLoading || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating...' : 'Create Medicine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
