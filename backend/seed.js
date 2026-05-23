const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const existing = await User.findOne({ email: 'admin@timesheet.com' });
  if (existing) {
    console.log('Admin already exists');
    process.exit();
  }
  const hashed = await bcrypt.hash('Admin@123', 10);
  await User.create({
    name: 'Super Admin',
    email: 'admin@timesheet.com',
    password: hashed,
    role: 'admin',
  });
  console.log('✅ Admin seeded: admin@timesheet.com / Admin@123');
  process.exit();
};

seed();