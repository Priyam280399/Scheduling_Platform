const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  timezone: { type: String, required: true },
  status: { type: String, default: 'scheduled' },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
