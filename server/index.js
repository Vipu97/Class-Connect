const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectWithDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const port = process.env.PORT;

app.use(cors({
    credentials : true,
    origin : 'http://localhost:5173'
}))


app.use(express.json());
app.use(cookieParser());

//connecting to database
connectWithDB();

app.use('',require('./routes'));

app.listen(port,(req,res) => {
    console.log("Listening on Port:" + port);
})