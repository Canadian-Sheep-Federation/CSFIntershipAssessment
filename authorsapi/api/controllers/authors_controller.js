'use strict';
const mongoose = require('mongoose'),
    Author = mongoose.model('Author');

exports.return_all_authors = (req, res) => {
    Author.find({}, (err, author) => {
        if (err)
            res.send(err);
        res.json(author);
    });
};

exports.add_author = (req, res) => {
    if (req.body.works != null) {
        req.body.works = req.body.works.split(';');
    }
    let new_author = new Author(req.body);
    new_author.save((err, author) => {
        if (err)
            res.send(err);
        res.json(author);
    });
};

// Append new works to author's works
exports.add_works = (req, res) => {
    req.body.works = req.body.works.split(';');
    Author.findOneAndUpdate({_id: req.params.author_id},
        { $addToSet: { works: req.body.works } }, {new: true}, (err, author) => {
        if (err)
            res.send(err);
        res.json(author);
    });
};

exports.get_author = (req, res) => {
    Author.findById(req.params.author_id, (err, author) => {
        if (err)
            res.send(err);
        res.json(author);
    });
};

// Replace author's information
exports.update_author = (req, res) => {
    Author.findOneAndUpdate({_id: req.params.author_id}, req.body, {new: true}, (err, author) => {
        if (err)
            res.send(err);
        res.json(author);
    });
};

exports.delete_author = (req, res) => {
    Author.remove({
        _id: req.params.author_id
    }, (err, author) => {
        if (err)
            res.send(err);
        res.json({ message: 'Author successfully deleted' });
    });
};


