const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')
require('./auth')
var cors = require('cors')
require('dotenv').config()
const app = express();
app.use(session({secret: process.env.sessionSec}))
const PORT = 3000;
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(cors());
function isLoggedIn(req,res,next){
  req.user? next(): res.sendStatus(401);
}
mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB cluster'))
    .catch(err => console.error('Could not connect to MongoDB cluster', err));
app.get('/', (req, res) => {
    res.send("Devhost API is running")
});
app.get('/update-details',isLoggedIn ,(req, res) => {
  res.json("hello, "+req.user.username)
});
app.get('/google-callback',passport.authenticate('google', {
  successRedirect: '/update-details',
  failureRedirect: '/auth/failed'
}));
app.get('/auth/google',passport.authenticate('google',{scope: ['email','profile']}));
app.get('/auth/failed',(req,res)=>{res.send("Couldn't Authenticate")});
app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});