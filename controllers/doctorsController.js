const Doctor = require('../models/doctor');
// const crypto = require('crypto');


// render the Sign Up page
module.exports.Register = function(req, res){
    // If the user is signed up, then hittig this Sign Up route, will render to the same Sign Up page
    if(req.isAuthenticated()){
      return res.redirect('back');
    }

    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up',
   });
}

// render the Sign In page
module.exports.signIn = function(req, res){
    // If the user is signed in, then hittig this Sign In route, will render to the same Sign In page
    if(req.isAuthenticated()){
      return res.redirect('back');
    }

    return res.render('user_sign_in', {
        title: 'Codeial | Sign In',
   });
}

// get the Sign Up data
module.exports.create = async function(req, res) {
    if (req.body.password != req.body.confirm_password) {
      console.log('Password and Confirm Password is not matching!');
      return res.redirect('back');
    }
  
    try {
      const doctor = await Doctor.findOne({ email: req.body.email });
      if (!doctor) {
        // when we will create a new user, it will render towards the users's sign in page
        let data ={
          username: req.body.username,
          email : req.body.email,
          password: req.body.password
        }
        await Doctor.create(data);
        console.log('Sign UP successfully');
        return res.redirect('/doctors/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('error in signing up:', err);
      return res.redirect('back');
    }
  };
  

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    console.log( 'Logged in successfully');
    return res.redirect('/');
}


