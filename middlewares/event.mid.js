const Event = require("../models/event.model.js");

module.exports.exists = (req, res, next) => {
    Event.findById(req.params.id)
    .then((event) => {
        if (event) {
            req.event = event
            next()
        } else {
            res.redirect("/events")
        }
    })
    .catch((error) => next(error))
}