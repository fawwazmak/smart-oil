const express = require('express');
const Tank = require('../models/Tank');
const InventoryEvent = require('../models/InventoryEvent');
const logToHedera = require('../services/hederaLogger');

const router = express.Router();


// POST /api/inventory/event
router.post('/event', async (req, res) => {
  try {
    const { tankId, station, level } = req.body;
    if (!tankId || !station || typeof level !== 'number') {
      return res.status(400).json({ error: 'Missing tankId, station, or level' });
    }

    // Save the event
    const event = new InventoryEvent({ tank: tankId, station, level });
    await event.save();

    // Update currentLevel of the tank
    await Tank.findByIdAndUpdate(tankId, { currentLevel: level, lastUpdate: new Date() });

    const hederaMessage = JSON.stringify({ tankId, station, level, eventId: event._id, time: new Date() });
    const txId = await logToHedera(hederaMessage);

    res.status(201).json({ ...event.toObject(), hederaTx: txId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/inventory/events
router.get('/events', async (req, res) => {
  try {
    const events = await InventoryEvent.find();
    res.json(events);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


  module.exports = router;
