const express = require('express')
const dotenv = require('dotenv').config({ path: __dirname+'/../.env' })
const { errorHandler } = require('./errorMiddleware')
const connectDB = require('./db')
const port = process.env.API_PORT

connectDB()

const api = express()

// Allows the API to parse JSON data
api.use(express.json())
api.use(express.urlencoded({ extended: false }))

api.use('', require('./routes'))

// Overrides express' error handler
api.use(errorHandler)

api.listen(port, () => console.log(`API server started on port ${port}`))