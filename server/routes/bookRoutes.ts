import express from 'express';
import mongoose from 'mongoose';

const bookModel = require("../models/bookModel"); 
const router = express.Router()

// middleware for this router
router.use((req, res, next) => {
  // validation and other stuff
  next()
});

router.get('/', async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const book = new bookModel(req.body);
    await book.save();
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:bookId', async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.bookId);
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
})

module.exports = router;