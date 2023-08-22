const Patient = require('../models/patient');
const Doctor = require('../models/doctor');


module.exports.register = async function(req, res) {
    try {
        const { phone_number, name } = req.body;
        // Note - getting the ID through the token which passing inside Authorization header
        const authenticatedDoctorId = req.user._id; // Assuming authenticated doctor's _id is available in req.user
        
        // console.log('This is authenticated doctorID : ' + req.user);

        let patient = await Patient.findOne({ phone_number });
        
        if (patient) {
            return res.status(200).json({
                data: {
                   patient: patient,
                },
                message: 'Patient Info Already Exists In Our Database!',
            });
        }

        patient = await Patient.create({
            phone_number: req.body.phone_number,
            name: req.body.name,
            doctor: authenticatedDoctorId, // Associate the patient with the authenticated doctor's _id
        });

        return res.status(200).json({
            data: {
                patient: patient,
            },
            message: 'Patient Registered Successfully!',
        });
    } catch (err) {
        console.log('error', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
