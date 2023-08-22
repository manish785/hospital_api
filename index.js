// acquiring the required pacakge
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 8080;
const app = express();
const mongoose = require('mongoose');
const db = require("./config/mongoose");
const dotenv = require('dotenv');
const MongoStore = require("connect-mongo");


app.use(bodyParser.urlencoded({ extended: true }));
// we need to add this middleware before routes
app.use(bodyParser.json()); // This middleware parses JSON data


 //connect to database
 dotenv.config();
 mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("DB connection Succesful"))
    .catch((err)=>{
      console.log(err);
      return;
 });

// used for mantaining the sessions
const session = require("express-session");
const passport = require("passport");
const passportJWT = require('./config/passport-jwt-strategy');
const passportLocal = require("./config/passport-local-strategy");


app.use(cookieParser());



// mongo store is used to store the session cookie in the db
app.use(session({
  name : 'codeial',
  secret : 'blahsomething',
  //user is not logined , Identity has not established
  saveUninitialized : false,
  // Identity has been established, need to save again and again
  resave : false,
  cookie :{
      maxAge: (1000 * 60 * 60)
  },
  store: new MongoStore({
      mongoUrl:  process.env.MONGO_URL,
      mongooseConnection: db,
      autoRemove: 'disabled'
    }, function (err){
      console.log(err || 'connect-mongod db setup');
    }
)}));
  

app.use(passport.initialize());
app.use(passport.session());

// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

// using express routers
app.use('/', require('./routes'));


// running the server on the particular port
app.listen(port, function(err){
    if(err){
        console.log(`Error while listening on port,${err}`);
        return;
    }
    console.log(`Server is listening on port: ${port}`);
});