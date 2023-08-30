const express = require("express");
const morgan = require("morgan");
const hbs = require("hbs");
const mongoose = require('mongoose')

//configuración Database
require("./config/db.config")

const app = express();

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);
<<<<<<< HEAD

/** Support req.body **/
app.use(express.urlencoded({ extended: true }));

/** Congiure static files */
app.use(express.static("public"));

const router = require("./config/routes.config");
app.use('/', router);

=======
>>>>>>> f2ec20379c7a914734912f7ca3152f825c5eeff4

app.listen( 3000, () => {console.log("listen in port 3000")})
