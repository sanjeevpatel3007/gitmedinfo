import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'getmedinfo',
      transformation: [
        { width: 800, crop: 'scale' },
        { quality: 'auto' },
      ],
      public_id: `medicine_${Date.now()}`,
      resource_type: 'auto',
      overwrite: true,
      access_mode: 'public',
    });
    
    console.log('Cloudinary upload success:', result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
};

export const getPublicIdFromUrl = (url: string): string | null => {
  if (!url || !url.includes('cloudinary.com')) {
    return null;
  }
  try {
    const parts = url.split('/');
    const fileWithExt = parts[parts.length - 1];
    const fileName = fileWithExt.split('.')[0];
    const folder = parts[parts.length - 2];
    return `${folder}/${fileName}`;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

export default cloudinary; 