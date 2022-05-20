const express = require('express')
const router = express.Router()
const { getCharts: displayCharts, displayReview, displayAllReviews, displayWriteReview, writeReview } = require('./controller')

router.get('/', displayCharts)
router.get('/all_reviews/', displayAllReviews)
router.get('/write_review/', displayWriteReview)
router.post('/write_review/', writeReview)
router.get('/:id', displayReview)

module.exports = router