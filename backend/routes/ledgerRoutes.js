const { getAccountBalance } = require('../services/hederaClient');
const express = require('express');
const router = express.Router();

router.get('/transactions', (req, res) => {
  res.json([
    { date: "Jul 8", transaction: "Station A", station: "Retion", amount: 3627, status: "Verified" },
    { date: "Jul 9", transaction: "Station B", station: "Retion", amount: 6085, status: "Verified" },
    { date: "Jul 11", transaction: "Station C", station: "Retion", amount: 7210, status: "Verified" },
  ]);
});

router.get('/nodes', (req, res) => {
  res.json([
    { name: "Node-01", type: "Smart Node", status: "Active" },
    { name: "Node-02", type: "Smart Node", status: "Active" },
    { name: "Node-03", type: "DiFiIN Node", status: "Active" }
  ]);
});

router.get('/contracts', (req, res) => {
  res.json(["DH124_1893", "OH8974_3432"]);
});

// GET /api/ledger/hedera/:accountId/balance
router.get('/hedera/:accountId/balance', async (req, res) => {
  const { accountId } = req.params
  if (!accountId) return res.status(400).json({ error: 'accountId required' })
  try {
    const balance = await getAccountBalance(accountId)
    res.json({ accountId, balance })
  } catch (err) {
    res.status(500).json({ error: err.message || 'Hedera query failed' })
  }
})
// GET /api/ledger/balance?accountId=0.0.7117952

router.get('/balance', async (req, res) => {
  const { accountId } = req.query;
  if (!accountId) {
    return res.status(400).json({ error: 'accountId query parameter is required' });
  }
  try {
    const balance = await getAccountBalance(accountId);
    res.json({ accountId, balance });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Hedera query failed' });
  }
});

module.exports = router;

//GET request: http://localhost:5000/api/ledger/balance?accountId=0.0.7117952


