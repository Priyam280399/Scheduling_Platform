const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  calendarId: { type: String },  // Placeholder for calendar integration
});

module.exports = mongoose.model('User', userSchema);
