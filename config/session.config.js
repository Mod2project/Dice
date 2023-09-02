const expressSession = require('express-session'); 
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const User = require('../models/user.model')

module.exports.session = expressSession({
    //para firmar || no lo queremos saber porque si lo sabemos CARCEL
    secret: process.env.SESSION_SECRET || 'super suuuuuuuper secreto',
    //para en cada petición se guarde la cookie
    resave: false,
    //aunque no se haya generado un Login, se genere una cookie
    saveUninitialized: false,
    //donde se tiene que almacenar, por defecto es en la memoria
    store: MongoStore.create({
        mongoUrl: mongoose.connection._connectionString,
        //time to live, lo que dura la cookie
        ttl: 14*24*60*60, //14 días
    }), 
    //flags de la cookie
    cookie: {
        //siempre es true, para solo se pueda leer con http, para que no te lea la cookie mediante el navegador del cliente
        httpOnly: true,
        //siempre es true, solo envia info si el candadito es verde.
        secure: process.env.SESSION_SECRET === "true",
    }

})


module.exports.loadSessionUser = (req, res, next) => {
    const userId = req.session.userId
    if(userId){
      User.findById(userId)
      .then((user)=>{
        req.user = user;
        res.locals.currentUser = user;
        next()
      })
      .catch((error)=> next(error))
    
    } else {
      next();
      }
  }

