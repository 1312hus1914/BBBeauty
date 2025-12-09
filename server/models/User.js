// models/User.js
const mongoose = require('../db');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: false,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,    // or true, depending on your needs
      trim: true,
    },
    password: {
      type: String,
      required: true, // store hashed password, not plain
    },
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer',
    },
  },
  { timestamps: true } // adds createdAt, updatedAt
);

module.exports = mongoose.model('User', userSchema);
