const mongoose = require('mongoose');

const connectWithDB = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to Database Successfully");
    })
    .catch((err) => {
        console.log("Error on connecting to Database");
        console.log(err);
        process.exit(1);
    })
}

module.exports = connectWithDB;