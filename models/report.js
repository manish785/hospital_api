const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    // here, doctor will register the patient in the App
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    status:{
        type: String,
       // required: true,
        emum : ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
    }
},{
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;