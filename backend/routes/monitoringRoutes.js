const express = require('express');
const router = express.Router();

router.get('/tanks', (req, res) => {
  res.json([
    { id: 'T1', location: "Dock 4", level: "85%", status: "OK" },
    { id: 'T2', location: "Site 7", level: "52%", status: "Refill Needed" },
    { id: 'T3', location: "Depot", level: "73%", status: "OK" }
  ]);
});

module.exports = router;
