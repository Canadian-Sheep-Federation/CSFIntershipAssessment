import express from 'express';

// load mongoDB config from .env to process.env
const dotenv = require('dotenv');
dotenv.config('../.env');

/**
 * Express.js entry point
 */
const main = async () => {
  // express setup
  const app = express();
  const PORT = process.env.PORT || 4000
  const cors = require('cors');
  app.use(cors());
  app.use(express.json());

  // mongoose setup
  const mongoose = require('mongoose');
  await mongoose.connect(process.env.ATLAS_URI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // mount book entity routes
  const books = require('./routes/bookRoutes');
  app.use('/', books);

  app.listen(PORT, () => {
    console.log(`express server started on localhost:${PORT}`);
  })
}

main();