const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idCardNumber: { type: Number, required: true },
  address: { type: String, required: true },
});

const Member = mongoose.model('Member', memberSchema);
module.exports = mongoose.model('Member', memberSchema);
export { mongoose };
