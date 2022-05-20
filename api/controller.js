const { ObjectId } = require('bson')
const asyncHandler = require('express-async-handler')
const Review = require('./model')

// @desc    Get all song reviews
// @route   GET /
// @access  Public
const getAllReviews = asyncHandler(async (req, res) => {

    // Queries all objects in the Review collection
    const reviews = await Review.find()

    res.status(200).json(reviews)
})

// @desc    Create song review
// @route   POST /
// @access  Public
const makeReview = asyncHandler(async (req, res) => {

    // Throws error if a field is empty
    if (!req.body.text || !req.body.username || !req.body.overOrUnder || !req.body.title || !req.body.artists) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const review = await Review.create({
        username: req.body.username,
        text: req.body.text,
        overOrUnder: req.body.overOrUnder,
        song: {
            title: req.body.title,
            artists: req.body.artists
        }
    })

    res.status(200).json(review)
})

// @desc    Get a song review
// @route   GET /:id
// @access  Public
const getReview = asyncHandler(async (req, res) => {

    // Searches using the url's id parameter as shown in the route
    const review = await Review.findById(new ObjectId(req.params.id))
    console.log(review)
    res.status(200).json(review)
})

module.exports = { getAllReviews, makeReview, getReview }