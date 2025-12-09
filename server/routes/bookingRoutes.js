// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();

const Booking = require('../models/Booking');

// --- Validation helper ---
function validateBookingInput(body) {
  const errors = [];

  if (!body.user) errors.push('user is required');
  if (!body.service) errors.push('service is required');
  if (!body.date) errors.push('date is required');

  return errors;
}

// --- Check if time slot is available ---
async function isTimeSlotAvailable(serviceId, date) {
  // date comes as string -> convert to Date
  const bookingDate = new Date(date);

  // SIMPLE VERSION:
  // We treat bookings as exact time slots. If same service & same date/time exists -> not available.
  const existing = await Booking.findOne({
    service: serviceId,
    date: bookingDate,
  });

  return !existing;
}

// POST /booking  -> create a booking
router.post('/', async (req, res) => {
  try {
    const errors = validateBookingInput(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { user, service, date, notes } = req.body;

    const available = await isTimeSlotAvailable(service, date);
    if (!available) {
      return res
        .status(400)
        .json({ message: 'This time slot is already booked for this service.' });
    }

    const booking = await Booking.create({
      user,
      service,
      date: new Date(date),
      notes,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /booking  -> list bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('service', 'name price');

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
