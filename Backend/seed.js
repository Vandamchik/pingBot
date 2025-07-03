const mongoose = require('mongoose');

const UserModel = require('./src/models/User');
const { MONGODB_URI, ADMIN_IDS } = require('./src/config/env');
const { ADMINISTRATOR } = require('./src/constants/userRoles');

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);

    await UserModel.deleteMany();
    const uniqueAdminIds = [...new Set(ADMIN_IDS)];

    const insertedUserSeedData = uniqueAdminIds.map((id) => ({ 
        telegramId: id, 
        role: ADMINISTRATOR,
    }));
  
    await UserModel.insertMany(insertedUserSeedData);

    console.log('✅ Admin user created succesfully througth Seed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding:', err.message);
    process.exit(1);
  }
}

seed();
