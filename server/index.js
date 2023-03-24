const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./dbConnection/connectDb');

// configure env
dotenv.config();

//mongodb connection
connectDb();

// create rest object
const app = express();

// adding middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes

app.get('/', (req, res)=> {
    res.status(400).send({'message':'hello'})
})

//Port
const PORT = process.env.PORT

// listen
app.listen(PORT, () => {
    console.log(`Server is running ${process.env.DEV_MODE} mode in port ${PORT}`.bgCyan.bgWhite)
})