const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');
require('dotenv').config();

async function run() {
  const username = process.argv[2];
  const password = process.argv[3];

  if (!username || !password) {
    console.error('Usage: node addAdmin.js <username> <password>');
    process.exit(1);
  }

  const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TheCulinaryHaven';
  await mongoose.connect(MONGO_URI);

  const exists = await Admin.findOne({ username });
  if (exists) {
    console.log('Admin already exists');
    return process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ username, passwordHash });
  console.log(`Admin '${username}' created`);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
