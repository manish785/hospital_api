const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Doctor = require('../models/doctor');


// authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback: true
    },
    function(req, email, password, done){
        //find the user and establish the identity
        Doctor.findOne({email: email})
        .then(doctor => {
          if (!doctor || doctor.password !== password) {
           console.log('Invalid Username/Password');
            // req.flash('error', 'Invalid Username/Password');
            return done(null, false);
          }
          return done(null, doctor);
        })
        .catch(err => {
          //console.log('Error in finding user --> Passport', err);
          req.flash('error', err);
          return done(err);
        });
    }
));


// serializing the user to decide which key is to keep in the cookie
passport.serializeUser(function(doctor, done){
    done(null, doctor.id);
})


// deserialize the user from the key in the cookie
passport.deserializeUser(function(id, done){
  Doctor.findById(id)
  .then(doctor => {
    if (!doctor) {
      console.log('Doctor not found');
      return done(null, false);
    }
    return done(null, doctor);
  })
  .catch(err => {
    console.log('Error in finding the user --> Passport', err);
    return done(err);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/doctors/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        res.locals.doctor = req.doctor;
    }
    next();
}



module.exports = passport;







