require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(402).send({
            message: "Missing Authorization Header"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, config.privateKey);
        next();
    } catch(e) {
        return res.status(402).send({
            message: "Not allowed!"
        });
    }
};

module.exports = {
    authenticate
};