# CSFIntershipAssessment
Software Development Assessment

API:
The API is implemented with Node.js and express.

How To Run:
- npm install
- npm start

API endpoints:
- GET: Returns the JSON data for all stored authors in the database
- POST: Stores author info into MongoDB and returns response in JSON data
- GET/{id}: Returns the JSON data for the author with the given unique id.

Web Application:
The web applciation is implemented with React.

How To Run:
- npm install
- npm start

Usage: 
There are three pages in the application: Home, PublicAPI, and FormAPI. 
PublicAPI provides the interface for querying the public Authors API by allowing the user to search for an author by their name and returns a list of authors with their info. 
FormAPI provides the interface for querying the API developed in this assessment. To use it, run the API project first before running the web application.

