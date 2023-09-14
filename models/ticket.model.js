const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    metadata: {
        prize: {
            type: Number,
        },
        ticket: {
            type: String,

        },
        stripeId: {
            type: String,
        }
    }
    
}, { timestamps: true })


const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;