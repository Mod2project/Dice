const Event = require("../models/event.model");
const mongoose = require('mongoose');


module.exports.list = (req, res, next) => {
    Event.find()
      .sort({ createdAt: -1 })
      .then((events) => {
        res.render('events/list', {events})
      })
      .catch((error) => next(error));
  }
  
  module.exports.detail = (req, res, next) => {
    console.log(req.params.id)
    Event.findById(req.params.id)
      .populate("users")
      .then((event) => {
        
        res.render("events/detail", { event });
      })
      .catch(next);
    }


module.exports.join = (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) {
        event.users.push(req.user.id)

        event.save()
          .then(() => {
            res.redirect('/events')
          })
      } else {
        res.redirect('/events')
      }
    })
}

module.exports.search = (req, res, next) =>{
  try {
    const searchTerm = req.query.q; 
    const results = Event.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    res.render('events/search', { results });
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al buscar eventos' });
  }
}