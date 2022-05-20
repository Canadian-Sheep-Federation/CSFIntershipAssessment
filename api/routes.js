const express = require('express')
const router = express.Router()
const { getAllReviews, makeReview, getReview } = require('./controller')

// The three routes function as specified in the assessment instructions
router.get('/', getAllReviews)
router.post('/', makeReview)
router.get('/:id', getReview)

module.exports = router