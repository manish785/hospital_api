const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorsController = require('../controllers/doctorsController');



router.get('/register', doctorsController.Register);
router.get('/login', doctorsController.signIn);
router.post('/create', doctorsController.create);




module.exports = router;