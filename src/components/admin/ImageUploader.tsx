'use client';

import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export default function ImageUploader({ images, onImagesChange }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create an array of new files to upload
      const filesToUpload = Array.from(files);
      
      // Create a form data object
      for (const file of filesToUpload) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Upload each file to our API endpoint
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setUploadProgress(percentCompleted);
          }
        });
        
        console.log('Upload response:', response.data);
        
        // Add the new image URL to our array
        if (response.data.url) {
          onImagesChange([...images, response.data.url]);
          toast.success('Image uploaded successfully');
        } else {
          toast.error('Received invalid response from server');
        }
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      const errorMessage = error.response?.data?.error || 'Failed to upload image';
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      // Reset the input value to allow uploading the same file again
      if (e.target.value) e.target.value = '';
    }
  };
  
  const handleRemoveImage = (indexToRemove: number) => {
    onImagesChange(images.filter((_, index) => index !== indexToRemove));
    toast.success('Image removed');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mt-2">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="w-24 h-24 rounded-md overflow-hidden border border-gray-300">
              <Image 
                src={image} 
                alt={`Medicine image ${index + 1}`} 
                width={96} 
                height={96} 
                className="object-cover w-full h-full"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
              <span className="mt-2 text-xs text-gray-500">{uploadProgress}%</span>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="mt-1 text-xs text-gray-500">Add Image</span>
            </>
          )}
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload}
            disabled={isUploading} 
          />
        </label>
      </div>
      <p className="text-sm text-gray-500">Upload medicine images (PNG, JPG, WEBP)</p>
    </div>
  );
} 