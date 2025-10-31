const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  tanks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tank' }]
});

module.exports = mongoose.model('Station', stationSchema);
