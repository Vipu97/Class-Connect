const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectWithDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
const port = process.env.PORT;

const allowedOrigins = [process.env.CLIENT_URL];

// Configure CORS middleware with multiple allowed origins
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Check if the request origin is in the list of allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  }
}));

app.use(express.json());
app.use(cookieParser());

//connecting to database
connectWithDB();

app.use('',require('./routes'));

app.listen(port,() => {
    console.log("Listening on Port:" + port);
})