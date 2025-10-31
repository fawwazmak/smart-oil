const mongoose = require('mongoose');

const tankSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  capacity: { type: Number, required: true }, // in liters
  currentLevel: { type: Number, default: 0 }, // in liters
  station: { type: String, required: true },  // station ID or name
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tank', tankSchema);
