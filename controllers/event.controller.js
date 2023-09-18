const Event = require("../models/event.model");
const mongoose = require('mongoose');
const stripe = require('../config/stripe.config')
const Ticket = require("../models/ticket.model");
const QRCode = require("qrcode");

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
  let usersInEvent = []
  Ticket.find({event: req.params.id})
  .populate("user")
  .then((tickets) => {
     usersInEvent = tickets.map((ticket) => {
      return ticket.user
     })
     console.log(usersInEvent)
  res.render("events/detail", { event: req.event, usersInEvent });
  })
}

module.exports.edit = (req, res, next) => {
  res.render("events/edit", { event: req.event })
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
  const event = req.event
  Ticket.findOne({ event: event.id, user: req.user.id })
    .then((ticket) => {
      if (ticket) {
        res.redirect(`/events/${event.id}`)
      } else if (event.public) {
        return Ticket.create({ event: event.id, user: req.user.id })
          .then(() => res.redirect(`/events/${event.id}`))
      } else {
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
          success_url: `http://localhost:3000/events/${event.id}/success-payment`,
          cancel_url: `http://localhost:3000/events/${event.id}/cancel-payment`,
        }).then((session) => res.redirect(session.url))
      }
    })
    .catch((error) => next(error))
}

module.exports.paymentSuccessCb = (req, res, next) => {
  const event = req.event
  Ticket.findOne({ event: event.id, user: req.user.id })
    .then((ticket) => {
      if (ticket) {
        res.redirect(`/events/${event.id}`)
      } else {
        return QRCode.toDataURL(`${event.id}-${req.user.id}`)
          .then((qr) => {
            return Ticket.create({
              event: event.id,
              user: req.user.id,
              metadata: {
                ticket: qr,
                prize: event.prize,
              }
            })
          }).then(() => res.redirect(`/events/${event.id}`))
      }
    })
    .catch((error) => next(error))
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