// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();

const Service = require('../models/Service');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET service - list all services (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true};

    // ако е подаден ?category=manicure | pedicure | ...
    if (req.query.category) filter.category = req.query.category;

    const services = await Service.find(filter).sort({ name: 1 });
    res.json(services);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /service/:id - get single service (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    console.error('Error fetching service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST service - create new service (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const { name, description, price, duration, isActive, category } = req.body;

    // basic validation
    if (!name || price == null || !category) {
      return res
        .status(400)
        .json({ message: 'Name, price and category are required' });
    }

    const service = new Service({
      name,
      description,
      price,
      duration,
      category, 
      isActive: isActive !== undefined ? isActive : true,
    });

    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// PUT /service/:id - update service (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const { name, description, price, duration, isActive, category  } = req.body;

    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (duration !== undefined) updates.duration = duration;
    if (isActive !== undefined) updates.isActive = isActive;
    if (category !== undefined) updates.category = category;
    
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true } // return updated doc
    );

    if (!updated) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /service/:id - delete service (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
