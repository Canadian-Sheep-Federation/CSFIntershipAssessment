'use strict';
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/DogFormAPI', { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { mongoose }