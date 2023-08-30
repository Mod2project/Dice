const User = require("../models/user.model");
const bcrypt = require("bcrypt");
;

module.exports.create = (req, res, next) => {
    res.render("users/create")
}

module.exports.doCreate = (req, res, next) => {
    
}

module.exports.detail = (req, res, next) => {}

module.exports.login = (req, res, next) => {}

module.exports.doLogin = (req, res, next) => {}

