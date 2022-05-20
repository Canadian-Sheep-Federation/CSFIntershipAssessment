# Over or Underplayed?

## API Background

Over or Underplayed is a RESTful API that allows the user to view and create song reviews.
When creating a song review, the user can submit a custom username, a detailed review, and
their conclusion as to whether they think the song is over or underplayed. The API is very 
simple and has the following 3 endpoints:

-   POST /: Takes in the song review form and stores it in a MongoDB database.
    It then returns the JSON data for the newly created form response.
-   GET /{id}: Returns the song review corresponding to the id. E.g. GET /1
    would return the JSON data for the song review corresponding to the id 1, however, the ids are much 
    more complicated than single digit integers, and some examples have been provided for test.
-   GET /: Returns the JSON data for all the song reviews in the database.

Example song review ids: 6287064ceeaa715ff57999de, 62870670eeaa715ff57999e1, 62870693eeaa715ff57999e4

Over or Underplayed was built using Node.js, Express.js, and MongoDB. The web application also
utilizes these technologies but runs on a separate server. The API has the ability to run on its
own without the help of a web application. This allows the API to be modular and gives it the potential
to be incorporated into other web applications with ease. The web application on the otherhand of course
cannot function without the API running simultaniously. The API also features a public MongoDB database
that *should* work on all networks. If by a hopefully slim chance it doesn't, a new MongoDB collection can be 
setup, and connected to the API by copy+pasting the connection string into the .env file.

## Web App Background

The Over or Underplayed web application allows users to both view and create song reviews for the current
top 20 songs as listed on the public Shazam API. The web application offers both search filters and
sortable columns for all of its tables for a user-friendly experience. The web application has the following
endpoints:

-   GET /: Gets the current top 20 songs from the Shazam API and displays them in a table.
-   GET /{id}: Gets a song review from the Over or Under API by its id and displays it in a table.
-   GET /all_reviews: Gets all the reviews from the Over or Under API and displays them all in a table.
-   GET /write_review: Displays the write review view and auto-fills the song data portion of the form based on
    the URL query that is auto-generated when navigating to the page using a button in the index view.
-   POST /write_review: Posts the data in the write review form to the Over or Under API and redirects the
    user to the '/' endpoint.

## How to run the API

In order to successfully run the Over or Underplayed API, download the repository, navigate to 
the root folder, and run the following commands in the terminal:

-   npm init
-   npm install express express-async-handler mongoose dotenv concurrently
-   npm run api

###### NOTE - This is to run the API **ONLY**! Run the following commands to run the Web App. They run on the ports 5000 & 5001 respectively which can be changed in the .env file.

-   npm install axios ejs
-   npm start

## How could the API and application be extended and improved?

#### The API

The biggest issue with the API is it\' susceptibility to CSRF attacks. Protection against this
form of attack would be a major improvement. Although the simplicity of the API is nice, it has
an issue of limited functionality. One way to improve the functionality is by creating a GET
endpoint that takes uses the URL parameters to perform a search query that returns song reviews.
The endpoint that searches by song review id could be improved by simplifying the song
review ids in the database to incrementing integers. Knowing a review\'s id is impossible without
querying the database in the first place with the GET / endpoint, which at that point client-side
filtering would be a better option for obtaining a specific review.

#### The Application

Like the API, the application is also susceptible to CSRF attacks, and protection against this
form of attack would be a major improvement. Another major improvement to the application would
be a way of viewing song review data. The main purpose of the app is for users to publicize their
opinion on the current most popular songs as to whether they believe they are over or underplayed.
The ability to view the amount of over and underplayed reviews for various catagories would be
interesting for the user experience.

## Deployment

For a web application as such, I believe the best method of deployment would be to use Heroku.
The process is simple as all that must be done is to:

-   Split the API and Web App into two repositories, each to be deployed to Heroku
-   Set the NODE_ENV in .env to production
-   Set the API_URL in the .env to the new URL
-   Set the ports to either 80 or 443 for HTTP or HTTPS respectively
-   Ensure the correct packages are installed in each repository, and that each have their own .env file
-   Create an account on Heroku
-   Run the following commands in the terminal for each project file and follow the steps in the terminal
    -   npm install heroku
    -   heroku login
    -   heroku create
    -   git push heroku main

This process is great for small apps as it can be done free of charge. Further steps may be added
to the process such as installing various middleware softwares for compression and security.