'use strict';
const authors = require("../controllers/authors_controller");
module.exports = (app) => {
    const authors = require('../controllers/authors_controller.js');
    app.route('/author/')
        .get(authors.return_all_authors)
        .post(authors.add_author);
    app.route('/author/:author_id')
        .get(authors.get_author)
        .post(authors.add_works)
        .put(authors.update_author)
        .delete(authors.delete_author);
};
