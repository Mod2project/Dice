const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const events = require("../controllers/event.controller")
const secure = require("../middlewares/secure.middleware")

//users routes
router.get("/create", users.create);
router.post("/create", users.doCreate);
router.get("/profile", secure.isLogged, users.detail);
router.get("/login", users.login);
router.post("/login", users.doLogin);

//events routes
router.get("/events", events.list);
router.get("/events/:id", events.detail);
router.post("/events/:id", events.detail);

module.exports = router; 