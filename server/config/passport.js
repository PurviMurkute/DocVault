import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "user not found with this email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "invalid credentials" });
        }

        return done(null, user, { message: "Login Successful" });
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/google/callback`,
    },

    async (accessToken, refreshToken, profile, cb) => {

      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: email
          });
        }

        return cb(null, user, { message: "Login successful" })
      } catch (error) {
        return cb(error);
      }
    }
  )
);

export default passport;