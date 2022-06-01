# CSFInternshipAssessment

A web application for users to enter responses to a form about their dogs.
The web application can also be used to view random images of a dog with a specified breed from the public Dog API.


## Running the app locally
1. Install required `node` modules:

```
npm install
```

2. Set up local database. Note that MongoDB must be installed.

```
mkdir mongo-data
mongod --dbpath mongo-data
```

3. In another terminal window, start the server:

```
node server.js
```

4. The app can now be accessed through `http://localhost:5000/`.

## Possible extensions and improvements
- Use React, especially as the web application gets more complex
- Dropdown with the valid breeds in the Dog API. This will prevent images from failing to be retrieved when invalid breeds are entered in the bottom form.
- CSS styles to make the webpage more visually attractive
