const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set. Skipping MongoDB connection (running in dev mode without DB).')
    return
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // don't exit process; allow server to run in degraded mode for auth/local testing
  }
};

module.exports = connectDB;
