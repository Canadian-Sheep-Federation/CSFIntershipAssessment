const express = require('express');
const dotEnv = require("dotenv");
const path = require('path');
const cors = require('cors')
const getConnection = require('./config/db.js');

const app = express()
dotEnv.config();

getConnection();

port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const routes = require('./api/routes/authors_routes.js');
routes(app);

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.listen(port);
console.log('Authors API server started on: ' + port);
