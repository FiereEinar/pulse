require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

passport.use(new JwtStrategy(
  opts,
  async (payload, done) => {
    try {
      const user = await User.findById(payload.user._id);
      if (!user) {
        return done(null, false);
      }

      const match = user.password === payload.user.password;
      if (!match) {
        return done(null, false);
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    };
  }
));

module.exports = passport;
