const Event = require("../models/event.model");
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  res.render("events/create")
}

module.exports.doCreate = (req, res, next) => {
  Event.create({
    name: req.body.name,
    artist: req.body.artist,
    date: req.body.date,
    hour: req.body.hour, 
    capacity: req.body.capacity,
    public: req.body.public,
    prize: req.body.prize,
    address: req.body.address,
    description: req.body.description,
    poster: req.body.poster
  })
  .then(() => res.redirect('/events'))
  .catch((error) => next(error));
}

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

module.exports.edit = (req, res, next) => {
  Event.findById(req.params.id)
  .then((event) => {
    res.render("events/edit", { event })
  })
  .catch(next);
}   

module.exports.doEdit = (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    artist: req.body.artist,
    date: req.body.date,
    hour: req.body.hour, 
    capacity: req.body.capacity,
    public: req.body.public,
    prize: req.body.prize,
    address: req.body.address,
    description: req.body.description,
    poster: req.file.path
  })
  .then((event) => {
    res.render(`events/${event.id}`)
  })
  .catch((error) => next(error));
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

module.exports.search = async (req, res, next) =>{
  try {
    const searchTerm = req.query.q;
    const events = await Event.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        //{ description: { $regex: searchTerm, $options: 'i' } },
      ],
    }).exec()
    console.log(events)
    res.render('events/search', { events });
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({ error: 'Error al buscar eventos' });
  }
}