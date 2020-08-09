const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const connectDB = (dbUrl) => {
    mongoose.connect(dbUrl, {
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