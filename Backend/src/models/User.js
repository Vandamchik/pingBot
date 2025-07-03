const mongoose = require('mongoose');

const { ADMINISTRATOR, CLIENT } = require('../constants/userRoles');

const userSchema = new mongoose.Schema({
  telegramId: {
    type: String,
    required: true,
    unique: true,
  },
  queryId: {
    type: String,
  },
  userFirstName: {
    type: String,
  },
  userLastName: {
    type: String,
  },
  role: {
    type: String,
    enum: [CLIENT, ADMINISTRATOR],
    default: CLIENT,
  },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
