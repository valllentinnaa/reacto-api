const express = require('express');
const app = express();
const placesRouter = require('./routes/places');
const articlesRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const cors = require('cors');
require('dotenv').config();

app.locals.ENV = process.env.NODE_ENV;
app.locals.ENV_DEVELOPMENT = process.env.NODE_ENV === 'development';

const {connectDB} = require('./config/db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB(process.env.DATABASE_URL);

app.use('/api/places', placesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/user', userRouter);

app.use('/', (req, res, next) => {
    console.log("Welcome to beginning of nothingness...");
});

module.exports = app;