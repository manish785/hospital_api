const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('passport-jwt'); 
const reportController = require('../controllers/reportController');


router.get('/:status', passport.authenticate('jwt', {session:true}), reportController.report_by_status);


module.exports = router;
