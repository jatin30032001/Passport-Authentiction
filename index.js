 const express = require( 'express');
 const app = express();

 app.get('/', (req, res)=>{
    res.send("Hi from Passport Authentiction")
 })

 const PORT = process.env.PORT || 5000;
 app.listen(PORT,()=>console.log("Server Started at Port",PORT));