const passport= require('passport');
const User = require('../models/user');

const LocalStrategy= require('passport-local').Strategy;
//const User =require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req,email,password, done){
      //find a user and establish identity
      User.findOne({email:email} , function(err,user){
          if(err){
              req.flash('error',err);
              return done(err);
          }

          if(!user || user.password != password){
              req.flash('error','Invalid Username/Password');
              return done(null, false);
          }
          return done(null,user);
      });
    }
));


//srializing the user to decide which key is used to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserialising the usr from the key in cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
});


//check if the user is authenticated

passport.checkAuthentication= function(req,res,next){
   //if the user is signed in pass him to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the local views

        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;

