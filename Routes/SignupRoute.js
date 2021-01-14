const route = require("express").Router();
const SignupController = require("../Controllers/SignupController");

route.post("/register", SignupController().Register);
route.post("/login", SignupController().Login);

module.exports = route;