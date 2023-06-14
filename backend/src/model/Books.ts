const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  released: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
