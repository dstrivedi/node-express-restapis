require('dotenv').config();
const express  = require('express');
const mongoose =  require('mongoose');
const routes = require('./routes/routes');

// getting the database URL from .env file
const mongoString = process.env.DATABASE_URL;
// console.log(process.env)

// connect the database to our server using Mongoose
mongoose.connect(mongoString);
const database = mongoose.connection;

// throw a success or an error message depending on whether our database connection is successful or fails
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log("Database connected!!")
});

const app = express();

//this will allow us to accept the data in the JSON format
app.use(express.json());

//app.use takes two things. One is the base endpoint, and the other is the contents of the routes. Now, all our endpoints will start from '/api'.
app.use('/api', routes);

app.listen(3000,() => {
    console.log(`Server started at ${3000}`)
})
