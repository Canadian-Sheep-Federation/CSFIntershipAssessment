const asyncHandler = require('express-async-handler')
const { getTop20, getReview, getAllReviews, postReview } = require('./apiHandler')

// @desc    Display the charts
// @route   GET /
// @access  Public
const displayCharts = asyncHandler(async (req, res) => {
    top20 = await getTop20()
    res.render("index", { top20: top20 })
})

// @desc    Displays a review based on it's id
// @route   GET /:id
// @access  Public
const displayReview = asyncHandler(async (req, res) => {
    reviews = await getReview(req.params.id)
    if (reviews === "error") {
        res.redirect('/')
    }
    res.render("reviews", { 
        reviews: reviews,
        search: req.query.search || ""
    })
})

// @desc    Display all reviews
// @route   GET /
// @access  Public
const displayAllReviews = asyncHandler(async (req, res) => {
    reviews = await getAllReviews()
    if (reviews === "error") {
        res.redirect('/')
    }
    res.render("reviews", { 
        reviews: reviews,
        search: req.query.search || ""
    })
})

// @desc    Display the write review page
// @route   GET /write_review/
// @access  Public
const displayWriteReview = asyncHandler(async (req, res) => {
    res.render("writeReview", {
        title: req.query.title,
        artists: req.query.artists,
        username: "",
        text: "",
        overOrUnder: "",
    })
})

// @desc    Post to the write review page
// @route   POST /write_review/
// @access  Public
const writeReview = asyncHandler(async (req, res) => {
    let status = await postReview(
        req.body.username,
        req.body.text,
        req.body.overOrUnder,
        req.body.title,
        req.body.artists,
    )
    if (status === "error") {
        res.render("writeReview", {
            title: req.body.title,
            artists: req.body.artists,
            username: req.body.username,
            text: req.body.text,
            overOrUnder: req.body.overOrUnder
        })
    }
    else {
        res.redirect('/')
    }
})

module.exports = { getCharts: displayCharts, displayReview, displayAllReviews, displayWriteReview, writeReview }