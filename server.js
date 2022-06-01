'use strict';
const log = console.log;
const path = require('path');

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectId } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { DogForm } = require('./models/dogform')

function isMongoError(error) {
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

/*
	Webpage routes below.
*/
app.use(express.static(path.join(__dirname, '/pub')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/index.html'))
})


/* 
   DogForm API routes below.
*/

/// Route for adding dogs.
/* 
Request body expects:
{
	"owner": <dog owner's name>
	"name": <dog name>
	"breed": <dog breed>
}
Returns id of the newly created form response.
*/
// POST /api/dogform
app.post('/api/dogform', async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	// Create a new dog using mongoose model
	const dog = new DogForm({
		owner: req.body.owner,
		name: req.body.name,
		breed: req.body.breed,
	})

	// Save dog to the database
	try {
		const result = await dog.save()	
		res.send(result._id)
	} catch(error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

/// Route for getting all dogs in the forms.
// GET /api/dogform
app.get('/api/dogform', async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Get the dogs
	try {
		const dogs = await DogForm.find()
		res.send(dogs)
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

/// Route for getting information for the form corresponding to the id.
// GET /dogform/<id>
app.get('/api/dogform/:id', async (req, res) => {

	const id = req.params.id

	// Validate id
	if (!ObjectId.isValid(id)) {
		res.status(404).send()
		return;
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const dog = await DogForm.findById(id)
		if (!dog) {
			res.status(404).send('Resource not found')
		} else {
			res.send(dog)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')
	}
})


const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
