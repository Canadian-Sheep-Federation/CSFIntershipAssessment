// Implements a REST-ful API that stores data from a survey about favorite books
// The API has the following endpoints:
// * POST /: Takes in a form and stores it in the database. Returns the id of the newly created form response.
// * GET /{id}: Returns the form corresponding to the id.
// * GET /: Returns all responses to the form

const express = require('express');
const app = express();

// set up middleware (I believe its for parsing requests, I needed it to access the form fields)
app.use(express.urlencoded());
app.use(express.json());

// middleware to enable cors
const cors = require('cors');
app.use(cors());

// Create database connection to run queries. store.db is found withing the same directory
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./store.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log("Database connection successful");
    }
});

//  Returns all responses to the form
app.get('/', (req, res, next) => {
    db.all('SELECT * FROM survey_results;', (err, row) => {
        if (err) {
            return console.error(err.message);
        } else {
            // console.log("GET /");
            return res.send(row);
        }
    });
});

// Determines if a string represents a number
function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Returns the form corresponding to the id
app.get('/:id', (req, res, next) => {
    const id = req.params.id;

    // I was running into a strange error where the endpoint would always be called with a non-numeric id, despite 
    //  passing a proper id and receiving the proper data anyways. It seemed like it would be called twice for 
    //  some reason. Not sure if this solved anything :(
    if (!isNumeric(id)) {
        // console.log('Bad Request');
        return res.status(400).send('Bad Request');
    }
    db.all(`SELECT id, name, favorite_book, book_author FROM survey_results WHERE id = ${id};`, (err, row) => {
        if (err) {
            return console.error(err.message);
        } else {
            // console.log("GET /:id");
            return res.send(row);
        }
    });
});

// Takes in form and stores it in database. Returns the id of the newly created form response.
app.post('/', (req, res, next) => {
    // console.log(req.body.user);
    const { name, favorite_book, book_author } = req.body.user; // extract form values

    db.run(`INSERT INTO survey_results (name, favorite_book, book_author) VALUES ('${name}', '${favorite_book}', '${book_author}');`);
    db.all('SELECT LAST_INSERT_ROWID() from survey_results;', (err, row) => {
        if (err) {
            return console.error(err.message);
        } else {
            // console.log("POST /");
            return res.send({newId: row[0]['LAST_INSERT_ROWID()']});
        }
    })
});

const port = process.env.PORT || 3000; // I believe its best to set the port using an environment variable, I wasn't confident in doing that for this project though
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
