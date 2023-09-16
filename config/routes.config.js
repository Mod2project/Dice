const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller");
const events = require("../controllers/event.controller");
const secure = require("../middlewares/secure.middleware");
const upload = require("../config/multer.config");
const eventMids = require("../middlewares/event.mid.js");

//users routes
router.get("/create", users.create);
router.post("/create", users.doCreate);
router.get("/profile", secure.isLogged, users.detail);
router.get("/login", users.login);
router.post("/login", users.doLogin);
router.get("/logout", users.logout )

//events routes
router.get("/events/create", events.create);
router.post(
    "/events/create",
    secure.isLogged,
    upload.single("poster"),
    events.doCreate);
router.get("/events", events.list);
router.get("/events/:id", eventMids.exists, events.detail);
router.get("/events/:id/edit", eventMids.exists, events.edit);
router.post("/events/:id", events.doEdit);
router.post("/events/:id/join", eventMids.exists, events.join);
router.get("/events/:id/success-payment", eventMids.exists, events.paymentSuccessCb);
router.get("/search", events.search)
router.post("/events/:id/delete", events.delete);

//search routes
router.get("/", (req,res) => res.redirect ("/events"));


module.exports = router; 