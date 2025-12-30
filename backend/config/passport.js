import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { User } from "../models/userModel.js"

const BASE_URL = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOneAndUpdate(
          { googleId: profile.id },
          { isLoggedIn: true },
          { new: true }
        )

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            isLoggedIn: true,
            isVerified: true,
          })
        }

        return done(null, user)
      } catch (err) {
        return done(err, null)
      }
    }
  )
)
