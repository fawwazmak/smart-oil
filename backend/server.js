const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./models/db');



// Connect to MongoDB
connectDB();

// ...your existing express setup

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('OilPulse Backend API Running');
});

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

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});