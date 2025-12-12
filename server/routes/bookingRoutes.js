const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');



// GET /bookings/slots?serviceId=...&date=YYYY-MM-DD
// връща заетите часове за дадена услуга и дата
router.get('/slots', auth, async (req, res) => {
  try {
    const { serviceId, date } = req.query;

    if (!serviceId || !date) {
      return res
        .status(400)
        .json({ message: 'serviceId и date са задължителни' });
    }

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayStart.getDate() + 1);

    const bookings = await Booking.find({
      service: serviceId,
      datetime: { $gte: dayStart, $lt: dayEnd },
      status: { $ne: 'cancelled' },
    });

    const takenSlots = bookings.map((b) => {
      const h = String(b.datetime.getHours()).padStart(2, '0');
      const m = String(b.datetime.getMinutes()).padStart(2, '0');
      return `${h}:${m}`;
    });

    res.json({ takenSlots });
  } catch (err) {
    console.error('Error fetching slots:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// примерни помощни рутове (по-късно може да ги ползваме)

// GET /bookings/my - моите резервации
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user._id })
      .sort({ datetime: 1 })
      .populate('service', 'name duration price category');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching my bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /bookings/admin - всички резервации (само админ)
router.get('/admin', auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ datetime: 1 })
      .populate('service', 'name duration price category')
      .populate('customer', 'name email phone');
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching all bookings:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /bookings - създаване на резервация за текущия потребител
router.post('/', auth, async (req, res) => {
  try {
    const { serviceId, datetime, note } = req.body;

    if (!serviceId || !datetime) {
      return res
        .status(400)
        .json({ message: 'serviceId и datetime са задължителни' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Услугата не е намерена' });
    }

    const when = new Date(datetime);
    if (isNaN(when.getTime())) {
      return res.status(400).json({ message: 'Невалидна дата/час' });
    }

    const booking = await Booking.create({
      service: service._id,
      customer: req.user._id,
      datetime: when,
      note: note || '',
      status: 'pending',
    });

    const populated = await Booking.findById(booking._id)
      .populate('service', 'name duration price category')
      .populate('customer', 'name email phone');

    res.status(201).json(populated);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// PATCH /booking/:id/confirm - admin only
// PATCH /booking/:id/confirm - admin only
router.patch('/:id/confirm', auth, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'pending') {
      return res.status(409).json({ message: 'Only pending bookings can be confirmed' });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'confirmed' },
      { new: true }
    )
      .populate('service', 'name duration price category')
      .populate('customer', 'name email phone');

    res.json(updated);
  } catch (err) {
    console.error('Error confirming booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /booking/:id/cancel - customer can cancel ONLY own booking
router.patch('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // owner check
    if (String(booking.customer) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    // optional: prevent cancelling past bookings
    if (booking.datetime && new Date(booking.datetime) < new Date()) {
      return res.status(409).json({ message: 'Cannot cancel past booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(409).json({ message: 'Already cancelled' });
    }

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    )
      .populate('service', 'name duration price category')
      .populate('customer', 'name email phone');

    res.json(updated);
  } catch (err) {
    console.error('Error cancelling my booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /booking/:id/admin-cancel - admin only
router.patch('/:id/admin-cancel', auth, admin, async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    )
      .populate('service', 'name duration price category')
      .populate('customer', 'name email phone');

    if (!updated) return res.status(404).json({ message: 'Booking not found' });

    res.json(updated);
  } catch (err) {
    console.error('Error admin-cancelling booking:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// // PATCH /booking/:id/cancel - admin only
// router.patch('/:id/cancel', auth, admin, async (req, res) => {
//   try {
//     const updated = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { status: 'cancelled' },
//       { new: true } // връща обновения документ
//     )
//       .populate('service', 'name duration price category')
//       .populate('customer', 'name email phone');

//     if (!updated) return res.status(404).json({ message: 'Booking not found' });

//     res.json(updated);
//   } catch (err) {
//     console.error('Error cancelling booking:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });





module.exports = router;
