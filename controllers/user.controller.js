const User = require("../models/user.model");
const bcrypt = require("bcrypt");


module.exports.create = (req, res, next) => {
    res.render("users/create")
}

module.exports.doCreate = (req, res, next) => {
    User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render('users/register', { 
          user: req.body, 
          errors: { 
            username: 'Username already exists' 
          } 
        })
      } else {
        return User.create(req.body)
          .then(() => {
            req.flash('data', JSON.stringify({ info: 'Please login in'}));
            res.redirect('/login')
          })
      }
    })
    .catch((error) => {
        //falta hacer bien el error
        next(error);
     
    })
}

module.exports.detail = (req, res, next) => {}

module.exports.login = (req, res, next) => {}

module.exports.doLogin = (req, res, next) => {}

