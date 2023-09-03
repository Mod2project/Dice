const mongoose = require ('mongoose');
require("dotenv").config()


mongoose
   .connect(process.env.MONGODB_URI) 
    .then(()=> {
        console.log("db connected")
    })
    .catch((error) =>{
        console.error ('error to database', error)
    })