const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm) // Show Signup Route -> Render the signup form
  .post(wrapAsync(userController.signup)); // Create User Route -> Handle user signup

router
  .route("/login")
  .get(userController.renderLoginForm) // Show Login Route -> Render the login form
  .post(
    // Login User Route -> Handle user login
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Logout User Route -> Handle user logout

router.get("/logout", userController.logout);

module.exports = router;
