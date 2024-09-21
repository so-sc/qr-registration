const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session')
const Razorpay = require('razorpay'); 
const User = require('./models/user')
require('dotenv').config()
require('./auth')
require('./dbInit')
var cors = require('cors')
const app = express();
app.use(express.static('public'))
app.use(session({secret: process.env.sessionSec}))
const PORT = 8079;
app.use(express.json());
app.use(passport.initialize())
app.use(passport.session())
app.use(cors());
const razorpayInstance = new Razorpay({
  key_id: process.env.razorID,
  key_secret: process.env.razorSecret
});
function isLoggedIn(req,res,next){
  req.user? next(): res.sendStatus(401);
}
mongoose.connect(process.env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB cluster'))
    .catch(err => console.error('Could not connect to MongoDB cluster', err));
app.get('/', (req, res) => {
    res.send("Devhost API is running")
});
app.get('/testend',(req,res)=>{
  res.json("Im Up");
})
app.get('/update-details',isLoggedIn ,(req, res) => {
  res.json("hello, "+req.user.username)
});
app.get('/google-callback',passport.authenticate('google', {
  successRedirect: `/update-details`,
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
app.post('/createOrder',isLoggedIn,(req, res)=>{ 
  const {amount,currency,receipt, notes}  = req.body;
  razorpayInstance.orders.create({amount, currency, receipt, notes}, 
    (err, order)=>{
      if(!err){
        res.json(order);
      }
      else res.send(err);
    });
});
app.post('/verPayment',isLoggedIn,(req, res) => {
  // console.log(req);
  console.log(req.user);
  const { payment_id, order_id, signature, events} = req.body;
  const crypto = require('crypto');
  const eSig = crypto.createHmac('sha256', process.env.razorSecret).update(order_id + '|' + payment_id).digest('hex');
  console.log(eSig+" "+signature)
  if (eSig === signature) {
    attachEvents(req.user,events);
  } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const attachEvents= async(luser,events)=>{
  const user=await User.findOne({gID: luser.gID});
  user.events = events
  await user.save();
  console.log(user);

}