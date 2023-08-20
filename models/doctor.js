const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
    email:{
       type: String,
       required: true,
       unique: true
    },
    username :{
       type: String,
       required: true
    },
    password: {
        type: String,
    }
},{
    timestamps: true
});


const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;