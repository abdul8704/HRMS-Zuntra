const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reminder', reminderSchema);