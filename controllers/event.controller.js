const Event = require("../models/event.model");
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
    Event.find()
      .sort({ createdAt: -1 })
      .then((events) => res.render('events/list', {events}))
      .catch((error) => next(error));
  }
  
  module.exports.detail = (req, res, next) => {
    console.log(req.params.id)
    Event.findById(req.params.id)
      .populate("users")
      .then((event) => {
        console.log(event)
        res.render("events/detail", { event });
      })
      .catch(next);
  };