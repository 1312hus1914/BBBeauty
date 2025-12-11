// models/Gallery.js
const mongoose = require('../db');
const { Schema } = mongoose;

const gallerySchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ['portfolio', 'interior', 'certificates', 'smiles'],
      default: 'portfolio',
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: false, // can be general gallery if not set
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false, // може да го направиш true, ако искаш винаги да има собственик
    },
    publicId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
