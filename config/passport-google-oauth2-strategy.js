const passport= require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User= require('../models/user');


//tell passport to use a new startegy for google login
passport.use(new googleStrategy({
    clientID:"106858603110-mdu9ri69mimkf6jh1k8ca49fr1lge6mv.apps.googleusercontent.com",
    clientSecret: "2_FMLY3tAM94HjE7kgfQNvA4",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    function(accessToken, refreshedToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }
            console.log(profile);
            if(user){
                //if found set this user as req.user
                return done(null,user);
            }else{
                // if not found create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err,user){
                    if(err){
                        console.log('error in google strategy-passport',err);
                        return; 
                    }
                    return done(null,user);
                });
            }
        });
    }
));

module.exports= passport;