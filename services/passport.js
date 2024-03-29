const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.googleClientID,
//       clientSecret: keys.googleClientSecret,
//       callbackURL: "/auth/google/callback",
//       proxy: true
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // console.log("access token:", accessToken);
//       // console.log("refresh token: ", refreshToken);
//       console.log("profile: ", profile);
//
//       User.findOne({ googleId: profile.id })
//         .then(existingUser => {
//           if (existingUser) {
//             // we already have a record of this google User with given profile id
//             done(null, existingUser);
//           } else {
//             // we don't have this user with given profile id, make new record in our db
//             new User({ googleId: profile.id })
//               .save()
//               .then(user => done(null, user));
//           }
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   )
// );

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("access token:", accessToken);
      // console.log("refresh token: ", refreshToken);
      //console.log("profile: ", profile);

      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        // we already have a record of this google User with given profile id
        done(null, existingUser);
      } else {
        // we don't have this user with given profile id, make new record in our db
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
