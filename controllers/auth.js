require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = data => {
    const token = jwt.sign(data, config.privateKey, {expiresIn: '2h'});

    return token
};

const saveUser = async(req, res) => {
    const {
        username,
        password
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt, );

    try {
        const user = new User({
            username,
            password: hashedPassword
        });

        const userObject = await user.save();

        const token = generateToken({
            userID: userObject._id,
            username: userObject.username
        });

        return res.send({
            token
        });
    } catch (err) {

        res.send ({
            error: true,
            message: err
        })
    }
};

const verifyUser = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).send({
                error: true,
                message: 'There is no such user'
            })
        }

        const status = await bcrypt.compare(password, user.password);
        if (status) {
            const token = generateToken({
                userID: user._id,
                username: user.username
            });
            return res.send({
                token
            })
        }
        res.send({
            error: true,
            message: 'Wrong password!'
        })
    } catch (err) {

        res.send({
            error: true,
            message: 'There is no such user',
            status
        })
    }
};

module.exports = {
    saveUser,
    verifyUser,
};