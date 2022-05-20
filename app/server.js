const express = require('express')
const dotenv = require('dotenv').config({ path: __dirname+'/../.env' })

const port = process.env.APP_PORT

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('', require('./routes'))

app.listen(port, () => console.log(`APP server started on port ${port}`))