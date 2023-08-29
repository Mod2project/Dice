const express = require("express");
const morgan = require("morgan");
const hbs = require("hbs");

const app = express()

app.set("view engine", "hbs");
app.set("views", `${__direname}/views`);

app.listen( 3000, () => {console.log("listen in port 3000")})
