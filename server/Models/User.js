const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : {
        type : String,
        required : true,
    },
    name: String,
    email: {
        type: String,
        unique: true,
    },
    phone: Number,
    emailVerified : {
        type : Boolean,
        default : false,
    },
    instituteName : String,
    country : String,
})

const User = mongoose.model("User", userSchema);

module.exports = User;