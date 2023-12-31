const mongoose = require('mongoose');
const Schema =  mongoose.Schema

const eventSchema = new Schema ({
    name: {
        type: String,
        required: "Name is required"
    },
    artist: {
        type: String,
        required: "Artist is required"
    },
    date: {
        type: Date
     }, 
     
     
    hour: {
        type: String,
         validate: {
          validator: function (value) {
            return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
           },
          message: 'Please insert hour in format HH:MM',
         },
        required: "hour is required",
        
    },
    capacity: {
        type : Number,
        required: "Capacity is required"
    },
    public:{
        type: Boolean,
        default: true,
    },
    prize: {
        type: Number,
        default: 0,
        min: [0, "Prize must be positive"]
    },
    lat: {
        type: Number,     
    },
    lng: {
        type: Number,  
    },
    address: {
        type: String,
        required: "Address is mandatory"
    },
    song: {
        type: String,
    },

    description: {
        type: String,
        required: "Description is mandatory"
    },
    poster: {
        type: String,
        required: "Poster is mandatory"
    },
    users: { type: [mongoose.Schema.Types.ObjectId], ref: "User"}

});




const Event = mongoose.model ('Event', eventSchema) ;

module.exports = Event