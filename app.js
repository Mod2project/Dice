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
app.use(express.static(`${__dirname}/public`));
/** Support req.body **/
app.use(express.urlencoded({ extended: false }));

/** Congiure static files */


const sessionConfig = require ('./config/session.config')
app.use (sessionConfig.session);
app.use(sessionConfig.loadSessionUser);


const router = require("./config/routes.config");
app.use('/', router);


app.listen( 3000, () => {console.log("listen in port 3000")})
