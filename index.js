 const express = require( 'express');
 const app = express();
const routes = require('./routes.js');
const path = require('path');
const { ppid } = require('process');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

app.get('/',routes);
app.post('/register',routes);
app.get('/login',routes);



 const PORT = process.env.PORT || 5000;
 app.listen(PORT,()=>console.log("Server Started at Port",PORT));