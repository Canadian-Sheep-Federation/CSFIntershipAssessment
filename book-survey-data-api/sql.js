// This program connects to store.db and runs a command to create a table to store survey results
// I assume there are better ways to accomplish this task but I found this method worked for now

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('store.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log("Database connection successful");
    }
})

db.run('CREATE TABLE survey_results (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, favorite_book TEXT NOT NULL, book_author TEXT NOT NULL)');

db.close();