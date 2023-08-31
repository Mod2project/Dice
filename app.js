const express = require("express");
const morgan = require("morgan");
const hbs = require("hbs");
const mongoose = require('mongoose')

//config env
//require('dotenv').config();

//configuración Database
require("./config/db.config")

const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

/** Support req.body **/
app.use(express.urlencoded({ extended: true }));

/** Congiure static files */
app.use(express.static("public"));

const router = require("./config/routes.config");
app.use('/', router);


app.listen( 3000, () => {console.log("listen in port 3000")})
