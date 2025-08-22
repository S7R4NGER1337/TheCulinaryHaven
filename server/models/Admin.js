const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true},
  passwordHash: { type: String, required: true },
});

AdminSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin