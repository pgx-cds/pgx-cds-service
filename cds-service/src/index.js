/*jslint node: true */
"use strict";

var express = require("express");
var cors = require("cors");
var logger = require('morgan');
var pgxService = require("./service");
var config = require("./config");

var app = express();

app.use(cors());
app.use(logger('dev'));

app.use("/cds-services", pgxService);

module.exports = app;

if (!module.parent) {
  app.listen(config.port);
  console.log("Server running on port " + config.port);
}
