const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const WORK_FACTOR = 10;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema ({
    name: { 
        type: String,
        required: "User name is required"
     },
    mail : {
        type: String,
        required: 'User mail is required',
        lowercase: true,
        trim: true,
        match: [EMAIL_PATTERN, 'Invalid mail format']
    },
    username : {
        type: String,
        required: 'User username is required',
        trim: true,
        unique: true,
        validate: {
            validator: function(value) {
              return !value.includes(' ')
            },
            message: 'Invalid username, username can not contains white spaces'
          }
    },
    birthday: {
        type : Date,
        required: 'Birthday username is required',
        validate: { 
            validator: function(value) { 
                return Math.floor(Math.floor((new Date() - value) / 1000 / 60 / 60 / 24 / 365)) >= 16;
            }, 
            message: 'Yoghurines are not allowed'
        }
    }, 
    password : {
        type: String,
        required: 'User password is required',
        minLength: [7, 'User password needs at least 7 chars']
    },
    avatar : {
        type : String,
        type: String,
        default: function () {
          return `https://i.pravatar.cc/150?u=${this.email}`}
    },
    bio : {
        type : String, 
        max : [250, 'no queremos saber tanto de ti <3'],
    }, 
    city: {
        type : String
        //coordenadas
    }    
},
{
    timestamps: true,
})

userSchema.pre('save', function(next){
    const user = this;

    if (user.isModified('password')){
        bcrypt.hash(user.password, WORK_FACTOR)
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch ((error) => next(error))
    } else {
        next();
    }
}) 

//Método de mongoose para comparar una contraseña sin estar hachearla

userSchema.methods.checkPassword = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }

const User = mongoose.model ('User', userSchema) ;

module.exports = User