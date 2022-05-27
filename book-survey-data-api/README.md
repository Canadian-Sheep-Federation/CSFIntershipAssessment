# Book Survey Data API
API which allows users to access a database storing responses to a survey about favorite books.
Written with Node.js, Express, database using SQLite.

## Running the API
Navigate to the book-survey-data-api directory and run `node index.js`. 
By default the API runs on `http://localhost:3000`.

## API Endpoints:
The API has the following endpoints:
- POST /: Takes in a form and stores it in the database. Returns the id of the newly created form response.
- GET /{id}: Returns the form corresponding to the id.
- GET /: Returns all responses to the form

## Improvements I should make:
- Data received isn't being cleaned or processed to make sure its formated properly. E.g the program crashes if
if one of the form fields included an apostrope, blank fields are allowed to be inserted into the database
- Errors probably aren't being handled in the best way. I think I should be using try... catch in some places
- Wouldn't be surprised if responses are not properly formated, not sure about the convention regarding this
e.g queries with id's that don't exist send an empty array as a response (i feel like it should send some sort of status code?)
- Definitely a lot of security issues (I think SQL injection is one of them, probably more I don't know about). I think I should look into
https protocol and authentication
