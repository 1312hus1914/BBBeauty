// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();

const Review = require('../models/Review');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// ----------------------
// Validation helper
// ----------------------
function validateReviewInput(body) {
  const errors = [];
  if (!body.serviceId) errors.push('serviceId is required');
  if (body.rating == null) errors.push('rating is required');
  else if (body.rating < 1 || body.rating > 5) errors.push('rating must be 1–5');

  return errors;
}

// ----------------------
// POST /review  (add review, user must be logged in)
// ----------------------
router.post('/', auth, async (req, res) => {
  try {
    const errors = validateReviewInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { serviceId, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,   // now set by auth middleware
      service: serviceId,
      rating,
      comment,
      isApproved: false,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// ----------------------
// GET /review  (public – returns only approved reviews)
// optional query: ?serviceId=xxxxx
// ----------------------
router.get('/', async (req, res) => {
  try {
    const filter = { isApproved: true };

    if (req.query.serviceId) {
      filter.service = req.query.serviceId;
    }

    const reviews = await Review.find(filter)
      .populate('user', 'name')
      .populate('service', 'name');

    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----------------------
// GET /review/pending  (admin – see reviews waiting for approval)
// ----------------------
router.get('/pending/list', auth, admin, async (req, res) => {
  try {
    const pending = await Review.find({ isApproved: false })
      .populate('user', 'name')
      .populate('service', 'name');

    res.json(pending);
  } catch (err) {
    console.error('Error fetching pending reviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----------------------
// PATCH /review/:id/approve  (admin – approve a review)
// ----------------------
router.patch('/:id/approve', auth, admin, async (req, res) => {
  try {
    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error approving review:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----------------------
// PATCH /review/:id/reject  (admin – optional, reject/delete)
// ----------------------
router.patch('/:id/reject', auth, admin, async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review rejected and removed' });
  } catch (err) {
    console.error('Error rejecting review:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
