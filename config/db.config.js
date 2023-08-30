const mongoose = require ('mongoose');


mongoose
    .connect("mongodb+srv://neboafresco:DiceProject2023@dice.ok0mbi7.mongodb.net/") //77.27.48.243/32 
    .then(()=> {
        console.log('conected to database')
    })
    .catch((error) =>{
        console.error ('error to database', error)
    })