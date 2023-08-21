const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');


// get the Sign Up data
module.exports.register = async function(req, res) {
    const {email, username, password, confirm_password} = req.body;

    if (password != confirm_password) {
      return res.status(422).json({
        message: 'Password and Confirm Password Mismatch',
    });
    }
  
    try {
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        // when we will create a new user, it will render towards the users's sign in page
        let data ={
          username: username,
          email : email,
          password: password
        }
        await Doctor.create(data);
        return res.status(200).json({
          message: 'Doctor Registered Successfully!',
      });
      } else {
        return res.status(400).json({
          message: 'Doctor Already Exist.',
      });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Internal Server Error',
    });
    }
  };
  


  module.exports.login = async function(req, res){
   
    try{
        const {email, password} = req.body;

        let doctor = await Doctor.findOne( {email} );
        if(!doctor){
          return res.status(422).json({
            'message': 'Invalid Credentials',
        });
       }
       
      return res.status(200).json({
          data: {
              token : jwt.sign(doctor.toJSON(),  'manish', {expiresIn: '1000000'})
          },
          'message': 'Sign in successfully, here is your token, Please keep it safe',
      });
    }catch(err){
      return res.status(500).json({
        'message': 'Internal Server Error',
    });
    }
}
