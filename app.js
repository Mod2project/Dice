const express = require("express");
const logger = require("morgan");
const hbs = require("hbs");
const mongoose = require('mongoose')



//configuración Database
require("./config/db.config")

const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(logger('dev'))

/** Support req.body **/
app.use(express.urlencoded({ extended: true }));

/** Congiure static files */
app.use(express.static("public"));

const sessionConfig = require ('./config/session.config')
app.use (sessionConfig.session);
app.use(sessionConfig.loadSessionUser);


const router = require("./config/routes.config");
app.use('/', router);


app.listen( 3000, () => {console.log("listen in port 3000")})
