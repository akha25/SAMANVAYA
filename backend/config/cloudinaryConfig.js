const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'sample_name',
  api_key: process.env.CLOUDINARY_API_KEY || 'sample_key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'sample_secret'
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'samanvaya_fitness_uploads',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
