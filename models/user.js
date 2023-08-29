const mongoose = require("mongoose");

const schema = new mongoose.Schema ({
    name: { 
        type: String,
        required: "User name is required"
     },
    
})