const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/TheCulinaryHaven')

  const exists = await Admin.findOne({ username: 'admin' });
  if (exists) {
    console.log('Admin already exists');
    return process.exit(0);
  }

  const passwordHash = await bcrypt.hash('admin123', 12);
  await Admin.create({ username: 'admin', passwordHash });
  console.log('Admin created');
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
