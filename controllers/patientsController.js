const Patient = require('../models/patient');
const Doctor = require('../models/doctor');


module.exports.register = async function(req, res) {
    try {
       // const doctorId = req.doctor._id; // Assuming the authenticated doctor's _id is available in req.user
        
        let doctor = await Doctor.findOne({});
        
        let patient = await Patient.findOne({});
        
     
        if(patient.length > 0){
            return res.status(200).json({
                data: {
                    patient: patient,
                },
                message: 'Patient Info Already Exist In Our Database!',
            });
        }

        patient = await Patient.create({
            phone_number: req.body.phone_number,
            name: req.body.name,
            doctor: doctor._id, // Associate the patient with the doctor's _id
        });

        return res.status(200).json({
            data: {
                patient: patient,
            },
            message: 'Patient Registered Successfully!',
        });
    } catch (err) {
        console.log('error', err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
};
