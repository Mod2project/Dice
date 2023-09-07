const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')



module.exports.create = (req, res, next) => {
    res.render("users/create")
}

module.exports.doCreate = (req, res, next) => {

    User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        res.render('users/create', { 
          user: req.body, 
          errors: { 
            username: 'Username already exists' 
          } 
        })
      } else {
        return User.create(req.body)
          .then(() => {
            res.redirect('/login')
          })
      }
    })
    .catch((error) => {
      console.log(error)
        if(error instanceof mongoose.Error.ValidationError){
          res.render('users/create', {user: req.body, errors: error.errors})
        }else {
          next(error);
        }
        
     
    })
}

module.exports.login = (req, res, next) => { res.render('users/login')}

module.exports.doLogin = (req, res, next) => {

  //función para el error de que usuario o password es inválido
  function renderInvalidUsername() {
    res.render('users/login', {
      user: req.body,
      errors: {
        password: 'password or username no valid'
      }
    })
  }

  User.findOne({username: req.body.username})
  .then((user)=>{
    if (user) { 
     return user.checkPassword(req.body.password)
     .then((match) => {
        if(match) {
          req.session.userId = user.id;
          res.redirect(`/profile`)
        }else {
         renderInvalidUsername();
        }
     })

    } else {
    renderInvalidUsername();
    }
  })
  .catch((error) => next(error))
}; 



module.exports.detail = (req, res, next) => {
  res.render('users/detail', { user: req.user })
}




