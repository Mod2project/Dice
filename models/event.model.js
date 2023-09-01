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
        type: date,
        required: "Date is required"
    },

    capacity: {
        type : Number,
        required: "Date is required"
    },

    public:{
        type: Boolean,
    },

    prize: {
        type: Number,
    }

})