const express = require("express");
const logger = require("morgan");
const hbs = require("hbs");
const mongoose = require('mongoose')
const stripe = require('stripe')


//configuración Database
require("./config/db.config")
require('./config/hbs.config')
const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
//no soy capaz de meterlo en un hbs.config.js
hbs.registerPartials(__dirname + "/views/partials")

  



app.use(logger('dev'))
app.use(express.static(`${__dirname}/public`));
/** Support req.body **/
app.use(express.urlencoded({ extended: false }));


  


const sessionConfig = require ('./config/session.config')
app.use (sessionConfig.session);
app.use(sessionConfig.loadSessionUser);


app.use((req, res, next) => {
    res.locals.navigationPath = req.path;
    next();
  })

const router = require("./config/routes.config");
app.use('/', router);


app.listen( 3000, () => {console.log("listen in port 3000")})
