const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "My new Event",
    },
    eventCode: {
        type: String,
        unique: true,
    },
    organiser: {
        type : String,
        required : true,
    },
    date: {
        type: Date,
        required: true,
    },
    responses: {
        type: [{
            userId: {
                type : String,
                required : true,
            },
            userName : {
                type : String,
                required : true,
            },
            response : [mongoose.Schema.Types.Mixed],
        }]
    }
})

const Event = new mongoose.model('Event', eventSchema);

module.exports = Event;