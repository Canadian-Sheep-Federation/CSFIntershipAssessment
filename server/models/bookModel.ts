const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 100 },
  author: { type: String },
  subject: { type: String }
});

module.exports = mongoose.model('Book', BookSchema);