const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');
const bodyparser =require('body-parser')
const bcrypt = require('bcryptjs')
const user = require ('./models.js')
const passport= require('passport');

routes.use(bodyparser.urlencoded({extended:true}));

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
 


 routes.get('/login' , (req,res)=>{
    res.render('login')
 })



module.exports= routes;