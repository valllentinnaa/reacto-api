require('dotenv').config();
const env = process.env.NODE_ENV;

const mongoose = require('mongoose');
const config = require('./config')[env];

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true)

const connectDB = () => {
    mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if(err) {
            console.log(err);
            throw err;
        }
        console.log('Database is setup and running');
    });
};

module.exports = {
    connectDB
};