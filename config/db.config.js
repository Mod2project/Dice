const mongoose = require ('mongoose');
require("dotenv").config()


mongoose
    .connect(process.env.NEBOA_DB) 
    .then(()=> {
        console.log('conected to database')
    })
    .catch((error) =>{
        console.error ('error to database', error)
    })