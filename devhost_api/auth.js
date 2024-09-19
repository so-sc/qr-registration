const passport = require('passport');
const User = require('./models/user')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
    clientID:     process.env.gclient_ID,
    clientSecret: process.env.gclient_SECRET,
    callbackURL: "http://localhost:3000/google-callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try{
    let ex_user=await User.findOne({gID: profile.id})
    if(ex_user) return done(null,ex_user);
    const newUser = new User({
        gID: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        events:[],
        usn: null,
        college: null
    });
    await newUser.save();
    return done(null,newUser);
}
catch(err){
    console.log(err);
}
  }
));
passport.serializeUser(function(user,done){
    done(null,user._id)
});
passport.deserializeUser(async function(id,done){
    try{
    const user=await User.findById(id);
    return done(null,user)}
    catch(err){
        console.log(err)
    }
})