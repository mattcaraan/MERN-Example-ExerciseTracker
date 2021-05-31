const express = require('express');
const cors = require('cors');

//Mongoose is what we will use to connect to MongoDB
const mongoose = require('mongoose');

//Configures environment variables in the dotenv file
require('dotenv').config();

//Create Express Server
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
//Allows us to parse JSON
app.use(express.json());

//Database URI
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

//Connecting to MongoDB
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

//Using the User and Exercise Routers
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Starts the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
