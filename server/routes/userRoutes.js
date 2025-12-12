// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Helper: create JWT token
function createToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

/* ============================================================
   REGISTER USER  (POST /users/register)
   ============================================================ */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: 'name, email, phone and password are required',
      });
    }

    // Check if phone or email already exists
    const existingPhone = await User.findOne({ phone });
    const existingEmail = await User.findOne({ email });

    if (existingPhone) {
      return res.status(409).json({ message: 'Phone number already in use' });
    }

    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'customer',
    });

    // Generate token
    const token = createToken(user);

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ============================================================
   LOGIN USER (POST /users/login)
   ============================================================ */
router.post('/login', async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    // Allow login with either phone OR email
    const user = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password match
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = createToken(user);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/* ============================================================
   GET ALL USERS (admin only)
   ============================================================ */
router.get('/', auth, admin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;