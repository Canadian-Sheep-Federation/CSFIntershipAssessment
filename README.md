# Over or Underplayed?

## Background

Over or Underplayed is a RESTful API that allows the user to view and create song reviews.
When creating a song review, the user can display a custom username, a detailed review, and
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
utilizes these technologies but runs on a separate server. The has the ability to run on its
own without the help of a web application. This allows the API to be modular and to be potentially
be incorporated into other web applications with ease. The web application on the otherhand of course
cannot function without the API running simultaniously. The API also features a public MongoDB database
that *should* work on all networks. If by a hopefully slim chance it doesn't, a MongoDB collection can be 
setup, and connected to the API by copy+pasting the connection string into the .env file. The web 
application offers some nice user-friendly functionalities such as search filters for tables, and 
order-able table columns (click on a table header to try!).

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
The endpoint that searches by song review id could be improved simplifying the song
review ids in the database to incrementing integers.

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

-   Set the NODE_ENV in .env to production
-   Set the API_URL in the .env to the new URL
-   Split the API and Web App into two repositories, each to be deployed to Heroku
-   Ensure the correct packages are installed in each repository, and that each have their own .env file
-   Create an account on Heroku
-   Run the following commands in the terminal and follow the steps in the terminal
    -   npm install heroku
    -   heroku login
    -   heroku create
    -   git push heroku main

This process is great for small apps as it can be done free of charge. Further steps may be added
to the process such as installing various middleware softwares for compression and security.