'use strict';

require('marko/node-require').install();
require('marko/express');
const express = require("express");
const { json, urlencoded } = require("express");
const { config } = require("dotenv");
const db = require('./app/database/functions');



const app = express();
config();
app.use(json());
app.use(urlencoded({ extended: false }));

db.createTable();

require("./app/controllers/index")(app);

app.listen(3001);   