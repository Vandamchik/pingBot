const mongoose = require('mongoose');

const { MONGODB_URI } = require('./env');

const connectDB = async () => {
    if (!MONGODB_URI) throw new Error('MONGODB_URI is not defined');

    try {
      await mongoose.connect(MONGODB_URI);
      console.log('✅ MongoDB connected');
    } catch (err) {
      throw new Error(`MongoDB connection failed: ${err.message}`);
    }
};

module.exports = connectDB;
