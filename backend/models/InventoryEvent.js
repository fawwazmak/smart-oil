const mongoose = require('mongoose');

const inventoryEventSchema = new mongoose.Schema({
  tank: { type: mongoose.Schema.Types.ObjectId, ref: 'Tank', required: true },
  station: { type: String, required: true },
  level: { type: Number, required: true },   // Oil level in liters
  timestamp: { type: Date, default: Date.now },
  eventType: { type: String, default: 'sensor_reading' }
});

module.exports = mongoose.model('InventoryEvent', inventoryEventSchema);
