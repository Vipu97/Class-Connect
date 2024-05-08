const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type : {
       type : String,
       required : true
    },
    question : {
        type : String,
        required : true,
    },
    options : {
        type : [mongoose.Schema.Types.Mixed],
    },
    answers : {
        type : [mongoose.Schema.Types.Mixed],
        required : true,
    },
    eventCode : {
        type : String,
        required : true,
    },
    photos : String,
})

const Question = mongoose.model("Question",questionSchema);

module.exports = Question;