const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // Opcional
  subject: {
    type: String,
    enum: ['adoption', 'donation', 'volunteer', 'other'], // Asegurar coherencia con el front-end
    required: true
  },
  message: { type: String, required: true },
  newsletter: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
