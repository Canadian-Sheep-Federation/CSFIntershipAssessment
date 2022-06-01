/* Dog Form Model */

const mongoose = require('mongoose');

const DogFormSchema = new mongoose.Schema({
    owner: String,
    name: String,
    breed: String,
});

const DogForm = mongoose.model('DogForm', DogFormSchema);

module.exports = { DogForm };
