const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const plantRouter = require('./routers/plant.router.js');
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

/** ---------- ROUTES ---------- **/
app.use('/api/plant-details', plantRouter);
// app.use('/api/genre', genreRouter)

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log('Listening on port: ', port);
});
