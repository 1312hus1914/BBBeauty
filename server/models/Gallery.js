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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
