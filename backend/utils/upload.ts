
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: 'products',
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      public_id: file.originalname.split('.')[0],
    };
  },
});

// Multer middleware for file uploads
export const upload = multer({ storage });
