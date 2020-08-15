const config = require('./config/config');
const dbConnection = require('./config/db');

const app = require('express')();

dbConnection().then(() => {
    console.log('Database is setup and running!');
    require('./config/express')(app);

    require('./config/routes')(app);

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500).send(err.message);
    });

    app.listen(config.port, console.log(`Listening on port ${config.port}!`))

}).catch(console.error);