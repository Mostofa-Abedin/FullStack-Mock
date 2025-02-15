import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../../models/User.js';

dotenv.config(); // ✅ Load environment variables

// ✅ Ensure MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  throw new Error('❌ MONGO_URI is undefined. Check your .env file.');
}

// ✅ Connect to MongoDB before tests run
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB connected for tests');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}, 20000); // ⬅️ Extended timeout to 20 seconds to prevent test failures

// ✅ Clean up database before each test
beforeEach(async () => {
    if (mongoose.connection.readyState === 1) {
      await User.deleteMany({});
      const count = await User.countDocuments();
      console.log(`✅ Database cleared. User count: ${count}`);
    }
  });
  

// ✅ Disconnect from MongoDB after all tests
afterAll(async () => {
  await mongoose.disconnect();
  console.log('✅ MongoDB disconnected after tests');
});
