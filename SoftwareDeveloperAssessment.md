# Background

As a Canadian Sheep Federation intern, you will be tasked with creating
and developing web applications and APIs. This take home assignment is
designed to test your knowledge of the concepts involved.

You will create the following:

-   An API that writes to a data store
-   A web application that consumes the API you\'ve developed and a
    public API of your choosing

If you\'ve never created an API or a web-application, don\'t worry. Give
it your best shot and leave detailed comments and documentation for what
you don\'t know and what you think it should do.

This task should take approximately two hours

Select your public API from here:
<https://github.com/public-apis/public-apis>

# API

You must build a REST-ful API that represents some sort of form. The
form should mesh well with the public API you\'ve chosen. For instance,
if you\'ve chosen a movie API for your public API, this form could be a
survey about a specific movie or movies of a certain director.

The form must have three (3!) fields minimum.

The language and framework in which the API is implemented is up to you.
At the CSF, we use Node.js and express.

The API must store the form data in some permanent data store. At the
CSF, we use mongodb. A good option for this assessment could be sqlite.

The API must have the following endpoints:

-   POST /: Takes in the form and stores it in your chosen data store.
    Should return the id of the newly created form response.
-   GET /{id}: Returns the form corresponding to the id. E.g. GET /1
    would return the form corresponding to the id 1
-   GET /: Returns all responses to the form

Be sure to document your code thoroughly and include instructions for
how to run your api.

# Web application

You must build a web application that:

-   Allows users to query the public API you\'ve selected
-   Allows users to enter responses to the form you designed earlier and
    view the other responses to the form

# Bonus Points

## Discuss how the application and api could be extended and improved

- Create a connection between the form and the API queries; perhaps use some other API that 
will guess what kind of dog is desired by the User and then display that image

- Add support for more API form endpoints (UPDATE, DELETE, etc.)

- Add more security measures, namely against "injection attacks" (since the web app accepts
untrusted data from an input field with no sanitation.) Add verification to user input, perhaps add a login feature, etc.

- Better styling, mainly on the dog breed list 

## Discuss how the application and api should be deployed

- I would start by deploying the front-end (app) and back-end (api) code onto a virtual machine (AWS EC2 instance, etc.)

- Then, I would setup a web server like Nginx on the virtual machine so that it listens
to a particular port and displays the correct pages or makes back-end requests correctly
depending on what the user requests

- Finally, we need to ensure the front-end and back-end communicate properly on the virtual machine

## Intuitive design and user interface

# Submission

Fork this repository and create a pull request for your branch back into
this repo once completed.


# Starting the application

Navigate to the "api" file and run npm start to start the back-end. Similarily, navigate to the "app" file and run npm start to start the front-end.
