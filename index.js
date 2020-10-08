const express = require('express');
const { number } = require('joi');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const userRoute = require('./route/UserRoute');
const dotenv = require('dotenv');
const verifyToken = require('./route/VerifyToken');
const userPrivateRoute = require('./route/UserPrivateRoute');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('db is connected!');
});

//Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/user', userRoute);

app.use('/api/user/private', verifyToken, userPrivateRoute);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})