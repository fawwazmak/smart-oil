const express = require('express');
const Tank = require('../models/Tank');
const router = express.Router();

// Create a new tank
router.post('/', async (req, res) => {
  try {
    const { name, capacity, station } = req.body;
    if (!name || !capacity || !station) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const tank = new Tank({ name, capacity, station, currentLevel: 0 });
    await tank.save();
    res.status(201).json(tank);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Get all tanks
router.get('/', async (req, res) => {
  const tanks = await Tank.find();
  res.json(tanks);
});

// Get a tank by ID
router.get('/:id', async (req, res) => {
  const tank = await Tank.findById(req.params.id);
  if (!tank) return res.status(404).json({error: 'Tank not found'});
  res.json(tank);
});

// Update a tank by ID
router.put('/:id', async (req, res) => {
  const tank = await Tank.findByIdAndUpdate(req.params.id, req.body, {new: true});
  if (!tank) return res.status(404).json({error: 'Tank not found'});
  res.json(tank);
});

// Delete a tank by ID
router.delete('/:id', async (req, res) => {
  const tank = await Tank.findByIdAndDelete(req.params.id);
  if (!tank) return res.status(404).json({error: 'Tank not found'});
  res.json({success: true});
});
console.log('tankRoutes loaded');

module.exports = router;
