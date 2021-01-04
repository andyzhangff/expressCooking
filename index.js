const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./route/UserRoute');
const dotenv = require('dotenv');
const cors = require('cors');
const usertestRoute = require('./route/Usertest.route');
const genreRoute = require('./route/GenreRoute');
const receipeRoute = require('./route/ReceipeRoute');
const port = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('db is connected!');
});

//Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

//Route Middlewares
app.use('/api/receipes/', receipeRoute);
app.use('/api/user', userRoute);

// API Route

app.use('/api/test/', usertestRoute);
app.use('/api/genre/', genreRoute);


// Error favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})