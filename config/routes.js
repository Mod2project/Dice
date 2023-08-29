const express = require("express");
const router = express.Router();
const users = ("../controllers/user.controller.js");

//users routes
router.get("/create", users.create);
router.post("/create", users.doCreate);
router.get("/profile/:id", users.detail);
router.get("/login", users.login);
router.post("/login", users.doLogin);