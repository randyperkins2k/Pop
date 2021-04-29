require('dotenv').config();

const passport = require('passport');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const GoogleStrategy = require('passport-google-oauth2').Strategy;

//puts information into cookie
passport.serializeUser((user, done) => {
  done(null, user);
});

//decodes cookie and persists session
passport.deserializeUser((user, done) => {
  done(null, user);
});


//Strategy config
passport.use( new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true
},
(request, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  done(null, profile); //passes profile data to serialize user
}
));