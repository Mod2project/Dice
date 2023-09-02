const Event = require('../models/event.model');

const mongoose = require("mongoose");
require("../config/db.config");
const data = require("../data/events.json")


    Event.create(data)
    .then((events) => {
        console.log("event created")})
    .catch((error) => console.error(error))
    
