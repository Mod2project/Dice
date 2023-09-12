const Event = require("../models/event.model");
const mongoose = require('mongoose');
const stripe = require('../config/stripe.config')

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
      res.render('events/list', { events })
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
        if (event.public) {
          event.users.push(req.user.id)
          return event.save()
            .then(() => {
              res.redirect('/events')
            })
        } else {
          const priceID =  "{{event.prize}}"
          return stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: "eur",
                  product_data: {
                    name: event.name,
                  },
                  unit_amount: event.prize * 100,
                },
                quantity: 1,
              },
            ],

            success_url:`http://localhost:3000/events/${event.id}/success-payment` ,
            cancel_url: `http://localhost:3000/events/${event.id}/cancel-payment`,
          }).then((session)=> res.redirect(session.url))
        }

      } else {
        res.redirect('/events')
      }
    }).catch((error) => next(error))
}

module.exports.paymentSuccessCb = (req, res, next) => {
  console.log(req.body)
}

module.exports.search = async (req, res, next) => {
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

module.exports.delete = (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/events");
    })
    .catch(next);
};