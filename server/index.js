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
    origin : process.env.CLIENT_URL,
}))


app.use(express.json());
app.use(cookieParser());

//connecting to database
connectWithDB();

app.use('',require('./routes'));

app.listen(port,() => {
    console.log("Listening on Port:" + port);
})