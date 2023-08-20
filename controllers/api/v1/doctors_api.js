const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
   
    try{
       let doctor = await Doctor.findOne();
       if(!doctor){
        return res.json(422, {
            'message': 'Inavlid username or password',
        });
       }
       
       var token = jwt.sign(doctor.toJSON(),  'manish', {expiresIn: '1000000'});
        return res.status(200).json({
            data: {
                token : token,
            },
            'message': 'Sign in successfully, here is your token, please keep it safe',
        });
    }catch(err){
        console.log("**********", err);
        return res.json(500, {
            'message': 'Internal Server Error',
        });
    }
}
