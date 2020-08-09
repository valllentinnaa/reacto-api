const express = require('express');
const placesRouter = require('./routes/places');
const articlesRouter = require('./routes/articles');
const userRouter = require('./routes/user');
const {connectDB} = require('./config/db');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use('/api/places', placesRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/user', userRouter);

app.listen(3000, () => {
    console.log("ReactO Rest API is running on port 3000");
});