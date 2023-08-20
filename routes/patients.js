const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt'); // Import passport-jwt module
const patientsController = require('../controllers/patientsController');
const reportController =require('../controllers/reportController');


router.post('/register',passport.authenticate('jwt', {session:true}), patientsController.register);

 
 //- /patients/:id/create_report
 router.post('/:id/create_report', passport.authenticate('jwt', {session:true}), reportController.create_report);
 router.get('/:id/all_reports', passport.authenticate('jwt', {session:true}), reportController.all_reports);




module.exports = router;
