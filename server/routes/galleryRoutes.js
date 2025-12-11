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
// POST /gallery - add image via direct URL (existing behavior)
router.post('/', auth, admin, async (req, res) => {
  try {
    const { imageUrl, caption, service, category } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }

    const image = await Gallery.create({
      imageUrl,
      caption,
      service,
      category: category || 'portfolio',
      uploadedBy: req.user && req.user._id, // по желание
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
// POST /gallery/upload - upload real image file to Cloudinary
// POST /gallery/upload - upload real image file to Cloudinary
router.post('/upload', auth, upload.single('image'), async (req, res) => {
  try {
    const { caption, service, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // взимаме категорията от body-то, ако липсва -> 'portfolio'
    const cat = category || 'portfolio';

    // Категории, в които само admin може да качва
    const adminOnlyCategories = ['portfolio', 'interior', 'certificates'];

    if (adminOnlyCategories.includes(cat) && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Само администратор може да качва в тази категория.' });
    }

    // валидна категория
    if (!['portfolio', 'interior', 'certificates', 'smiles'].includes(cat)) {
      return res.status(400).json({ message: 'Невалидна категория.' });
    }

    // Convert buffer to base64 Data URI
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'gallery',
    });

    // Save in MongoDB
    const image = await Gallery.create({
      imageUrl: result.secure_url,
      caption,
      service: service || undefined,
      category: cat,
      uploadedBy: req.user._id, // ако имаш това поле в модела
      publicId: result.public_id,
    });

    res.status(201).json(image);
  } catch (err) {
    console.error('Error uploading gallery image:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// DELETE /gallery/:id - only admin can delete images
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const { id } = req.params;

    const img = await Gallery.findById(id);
    if (!img) {
      return res.status(404).json({ message: 'Снимката не е намерена.' });
    }

    // 1) Опитваме да изтрием от Cloudinary, ако имаме publicId
    if (img.publicId) {
      try {
        await cloudinary.uploader.destroy(img.publicId);
        console.log('Cloudinary image deleted:', img.publicId);
      } catch (cloudErr) {
        console.error('Error deleting from Cloudinary:', cloudErr);
        // НЕ хвърляме грешка към клиента – не искаме да блокираме изтриването от базата
      }
    } else {
      // по желание: опит да извлечем publicId от URL за стари записи
      // ако не искаш, може да махнеш целия else блок
      console.log('No publicId on image, skipping Cloudinary delete');
    }

    // 2) Трием документа от MongoDB
    await img.deleteOne();

    res.json({ message: 'Снимката е изтрита успешно.' });
  } catch (err) {
    console.error('Error deleting gallery image:', err);
    res.status(500).json({ message: 'Server error' });
  }
});





module.exports = router;
