const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
module.exports = function(passport) {
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          //Find the user associated with the email provided by the user
          let user = await User.findOne({ email });
          if (!user) {
            //If the user isn't found in the database, return a message
            return done("user not found", false, { message: "User not found" });
          }
          //Validate password and make sure it matches with the corresponding hash stored in the database
          //If the passwords match, it returns a value of true.
          const validate = await user.isValidPassword(password);
          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }
          //Send the user information to the next middleware
          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      async (email, password, done) => {
        try {
          //Save the information provided by the user to the the database
          const user = await User.create({ email, password });
          //Send the user information to the next middleware
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
