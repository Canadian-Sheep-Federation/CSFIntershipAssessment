# Local Dev setup
- include ($ATLAS_URI='...') variable in a .env file placed in root directory that links to an active mongodb atlas cluster
- run `yarn` twice in ~/ and ~/frontend to build dependencies
- `yarn tsnode` in ~/ to start express.js on port 4000
- `yarn start` in ~/frontend to start react on port 3000

# Background

Canadian Sheep Federation intern take home assignment.

Tasks completed:

-   An API that writes to a data store
-   A web application that consumes the API developed and a
    public API of my choosing


Select your public API from here:
<https://github.com/public-apis/public-apis>

Chosen public API: [Gutendex](https://gutendex.com/)

# API development notes

- Created a barebones api with express.js/typescript
- included routes for 'get', 'get/:id', and 'post'
- data stored in a mongoDB atlas cluster and accessed via mongoose
- .env needs to be include in root folder for mongoose access (ie. prove your own $ATLAS_URI = '...')



The API contains the following endpoints:

-   POST /: Takes in the form and stores it in your chosen data store.
    Should return the id of the newly created form response.
-   GET /{id}: Returns the form corresponding to the id. E.g. GET /1
    would return the form corresponding to the id 1
-   GET /: Returns all responses to the form

# Web application + development notes

Built a web application that:

-   Allows users to query the public API you\'ve selected
-   Allows users to enter responses to the form you designed earlier and
    view the other responses to the form

- created a single page app with react and stylized with chakra-ui
- includes option to query from backend DB or public api
- lists and can post to backend DB

# Bonus Points

## Discuss how the application and api could be extended and improved

Backend improvements:
- implement full crud functionality
- implement filters and pagination for queries
- add more robust middleware such as validation/authentication for requests
- maybe find an alternative to mongoDB's use of string IDs?

Frontend improvements:
- add option to post publicAPI queries straight to DB
- make css styling more "professional"


## Discuss how the application and api should be deployed
- wrap codebase in a docker container
- setup mongoDB with AWS
- buy a domain from digital ocean or another competitor

## Intuitive design and user interface
an intuitive design to me means:
- a ui that is responsive 
- ui that provides adequate mouse/keyboard event feedback
- accessbility to impaired users

# Submission

Fork this repository and create a pull request for your branch back into
this repo once completed.
