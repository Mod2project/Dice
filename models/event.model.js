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
        type: Date,
        required: "Date is required"
    },
    capacity: {
        type : Number,
        required: "Capacity is required"
    },
    public:{
        type: Boolean,
        default: false
    },
    prize: {
        type: Number,
        default: 0,
        min: [0, "Prize must be positive"]
    },
    address: {
        type: String,
        required: "Address is mandatory"
    },
    description: {
        type: String,
        required: "Description is mandatory"
    },
    poster: {
        type: String,
        required: "Poster is mandatory"
    }

})