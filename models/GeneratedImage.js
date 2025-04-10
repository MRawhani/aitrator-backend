const mongoose = require('mongoose');

const generatedImageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GeneratedImage', generatedImageSchema);