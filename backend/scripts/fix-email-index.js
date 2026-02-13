import mongoose from 'mongoose';
import { Register } from '../model/register.model.js';

// This script removes the old unique email index and creates a compound index
// Run this once to fix the database

const fixIndexes = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
    console.log('Connected to MongoDB');

    // Drop the old email_1 index
    try {
      await Register.collection.dropIndex('email_1');
      console.log('✓ Dropped old email_1 index');
    } catch (err) {
      console.log('Note: email_1 index might not exist or already dropped');
    }

    // Ensure the new compound index exists
    await Register.collection.createIndex({ email: 1, eventId: 1 }, { unique: true });
    console.log('✓ Created compound index on email and eventId');

    console.log('\n✓ Index migration completed successfully!');
    console.log('Users can now register for multiple events with the same email.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing indexes:', error);
    process.exit(1);
  }
};

fixIndexes();
