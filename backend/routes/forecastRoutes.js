const express = require('express');
const router = express.Router();

router.get('/fuel-consumption', (req, res) => {
  res.json({
    advice: "Restock premium within 8 days - consumption is increasing.",
    forecast: [
      { day: "Mon", liters: 2100 },
      { day: "Tue", liters: 2200 },
      { day: "Wed", liters: 2250 },
      { day: "Thu", liters: 2300 },
      { day: "Fri", liters: 2450 },
      { day: "Sat", liters: 2600 },
      { day: "Sun", liters: 2700 }
    ]
  });
});

module.exports = router;
