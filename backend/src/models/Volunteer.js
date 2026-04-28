const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: String }],
  availability: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
