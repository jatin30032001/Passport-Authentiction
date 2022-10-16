const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser =require('body-parser')
const bcrypt = require('bcryptjs')
const user = require ('./models.js')
const passport= require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

routes.use(bodyparser.urlencoded({extended:true}));
routes.use(cookieParser('secret'));
routes.use(session({
    secret :'secret',
    maxAge : 3600000,
    resave:true,
    saveUninitialized:true,
}))


routes.use(passport.initialize());
routes.use(passport.session());

routes.use(flash());

routes.use(function(req, res, next){
    res.locals.success_message = req.flash('success_message')
    res.locals.error_message = req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
})


const checkAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){
        res.set('Cache.Control','no-cache', 'private', 'no-store',  'must-revalidate', 'post-check=0', 'pre-check=0')
        return next();
    }
    else{
        res.redirect('/login');
    }
}


mongoose.connect('mongodb+srv://Jatin:Jatin%40123@cluster0.8vnmjny.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser :true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log("Databse is connected")
});
routes.get('/',(req,res)=>{
  res.render('signup')
})

routes.post('/register',(req,res)=>{
    var{email,username,password,confirmpassword} = req.body;
   var err;

   if(!email || !username || !password || !confirmpassword){
    err = "Plese Fill All the Fields...";
    res.render('signup',{'err':err});
   }

   if(password!=confirmpassword){
    err ="Password Dont match";
    res.render('signup',{'err':err,'email':email,'username':username});
   }
   
   if(typeof err == 'undefined'){
                 user.findOne({email:email},function(err,data){
                    if(err) throw err;
                    if(data){
                        console.log("User exist")
                        err ="Use Alert";
                        res.render('signup',{'err':err,'email':email,'username':username});
                    }
                    else{
                        bcrypt.genSalt(10,(err,salt)=>{
                            if(err) throw err;
                            bcrypt.hash(password,salt,(err,hash)=>{
                                if(err) throw err;
                                password = hash;
                                user({
                                    email,username,password,
                                })
                                .save((err,data)=>{
                                    if(err) throw err;
                                    req.flash('success_message',"Registered Successful...Login To Continue")
                                    res.redirect('/login')
                                })
                            })
                        })
                    }
                 })
   }

})

//Authentication Strategy

var localStrategy = require('passport-local').Strategy;
 passport.use(new localStrategy({usernameField:'email'} ,(email,password,done)=>{
    user.findOne({email:email},(err,data)=>{
        if(err) throw err;
        if(!data){
            return done(null,false,{message:"User Doesn't Exists.."});
        }
        bcrypt.compare(password,data.password,(err,match)=>{
            if(err){
                return done(null,false);
            }

            if(!match){
                return done(null,false,{message :"Password Doesnt Match"});
            }

            if(match){
                return done(null,data)
            }
        })
    });
 }));

 passport.serializeUser(function(user,cb){
    cb(null,user.id);
 })

 passport.deserializeUser(function(id,cb){
    user.findById(id,function(err,user){
        cb(err,user);
    })
 })

//end of Authentication Startegy


 routes.get('/login' , (req,res)=>{
    res.render('login')
 })

 routes.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        failureRedirect:"/login",
        successRedirect:'/success',
        failureFlash:true,
    })(req, res, next);
 })

 routes.get('/success', checkAuthenticated, (req,res)=>{
    res.render('success',{'user':req.user});
 })



 routes.get('/logout',(req,res)=>{
    // req.logout();
    res.redirect('/login')
 })

module.exports= routes;