// routes/galleryRoutes.js
const express = require('express');
const Gallery = require('../models/Gallery');

const router = express.Router();

// POST /gallery - add image
router.post('/', async (req, res) => {
  try {
    const { imageUrl, caption, service } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ message: 'imageUrl is required' });
    }

    const image = await Gallery.create({
      imageUrl,
      caption,
      service,
    });

    res.status(201).json(image);
  } catch (err) {
    console.error('Error creating gallery item:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /gallery - list images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find().populate('service', 'name');
    res.json(images);
  } catch (err) {
    console.error('Error fetching gallery:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
