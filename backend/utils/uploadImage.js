
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // Folder name in Cloudinary
    format: async (req, file) => 'jpg', // Optional: You can choose the format (jpeg, png, etc.)
    public_id: (req, file) => Date.now() + '-' + Math.round(Math.random() * 1E9), // Use a unique filename
  },
});

// Set up multer with Cloudinary storage
const uploadImage = multer({ storage: storage });

module.exports = uploadImage;
