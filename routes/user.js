const { Router } = require('express');
const User = require('../models/user');
const {saveUser, verifyUser} =  require('../controllers/auth');

const router = Router();

router.get('/all', async (req, res) => {
    const users = await User.find().lean();

    res.status(200).json({
        users
    });
});

router.post('/register', async (req, res) => {
    const { password } = req.body;

    if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/)) {
        return res.send({
            error: 'Username or password is not valid'
        })
    }

    const { error } = await saveUser(req, res);

    if (error) {
        return res.send({
            error: 'Username or password is not valid'
        })
    }
});

router.post('/login', async (req, res) => {
    const { error } = await verifyUser(req, res);

    if (error) {
        return res.send( {
            error: 'Username or password is not correct'
        })
    }

});

module.exports = router;