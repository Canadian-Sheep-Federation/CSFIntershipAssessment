'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: 'Enter author first name'
    },
    last_name: {
        type: String,
        required: 'Enter author last name'
    },
    birth_date: Date,
    country_of_birth: String,
    works: [{
        type: String
    }],
    Created_date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('Author', AuthorSchema);
