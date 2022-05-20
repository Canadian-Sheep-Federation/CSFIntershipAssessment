const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artists: {
        type: String,
        required: true
    }
})

const reviewSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    overOrUnder: {
        type: String,
        required: true
    },
    song: {
        type: songSchema,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)