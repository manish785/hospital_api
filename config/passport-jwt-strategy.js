const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');



let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'manish',
}
passport.use(
    new JWTStrategy(opts, async (jwtPayload, done) => {
      console.log(jwtPayload);
      try {
        const doctor = await Doctor.findById(jwtPayload._id);
        console.log(doctor);
        if (doctor) {
          return done(null, doctor);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log('Error in finding user from JWT payload:', err);
        return done(err); // or return done(err, false) if you want to indicate authentication failure
      }
    })
  );

module.exports = passport;