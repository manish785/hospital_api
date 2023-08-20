const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
    phone_number:{
       type: String,
       unqiue: true
    },
    name:{
        type: String,
    },
    // here, doctor will register the patient in the App
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    }
},{
    timestamps: true
});


const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;