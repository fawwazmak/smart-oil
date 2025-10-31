const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./models/db');

const app = express();

// ✅ Allow your frontend to access the backend
app.use(
  cors({
    origin: [
      'https://oilpulse-frontend.onrender.com', // your Render frontend URL
      'http://localhost:5173', // allow local dev too
    ],
  })
);

app.use(bodyParser.json());

// ✅ Simple health check
app.get('/', (req, res) => {
  res.send('OilPulse Backend API Running');
});

// ✅ Register routes
const tankRoutes = require('./routes/tankRoutes');
const forecastRoutes = require('./routes/forecastRoutes');
const monitoringRoutes = require('./routes/monitoringRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');
const accountRoutes = require('./routes/accountRoutes');
const stationRoutes = require('./routes/stationRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

app.use('/api/tanks', tankRoutes);
app.use('/api/forecast', forecastRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/inventory', inventoryRoutes);

console.log('Routes registered');

// ✅ Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});