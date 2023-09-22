const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  authController.protected
);

module.exports = router;
