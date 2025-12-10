// routes/galleryRoutes.js
const express = require('express');
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


// NEW: upload-related imports
const multer = require('multer');
const cloudinary = require('../config/cloudinary'); // adjust path if needed

const router = express.Router();

// NEW: Multer setup (in-memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===========================
// Existing routes (unchanged)
// ===========================

// POST /gallery - add image via direct URL (existing behavior)
router.post('/', auth, admin, async (req, res) => {
  try {
    const { imageUrl, caption, service } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }

    const image = await Gallery.create({
      imageUrl,
      caption,
      service,
      category: category || 'portfolio',
    });

    res.status(201).json(image);
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /gallery - list images (existing behavior)
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().populate('service', 'name');
    res.json(images);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================
// NEW: File upload route
// ===========================

// POST /gallery/upload - upload real image file to Cloudinary
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { caption, service } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Convert buffer to base64 Data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'gallery', // optional folder name in Cloudinary
    });

    // Save in MongoDB using your existing schema
    const image = await Gallery.create({
      imageUrl: result.secure_url,
      caption,
      service: service || undefined, // optional
      category: category || 'portfolio',
    });

    res.status(201).json(image);
  } catch (err) {
    console.error('Error uploading gallery image:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
