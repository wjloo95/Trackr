require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Replace this
app.use('/', router);

// with this in production to send static React page
// app.use(express.static(`${__dirname}/client`));

// app.use('/', router);
// app.use((_req, res) => res.sendFile(`${__dirname}/client/index.html`));

module.exports = app;
