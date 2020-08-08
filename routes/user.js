const { Router } = require('express');

const router = Router();

router.get('/all', (req, res) => {
    res.status(200).json({
        places: [
            {
                name: 'Test',
                description: 'Long Test'
            },
            {
                name: 'Test 2',
                description: 'Long Test2'
            }
        ]
    })
});

router.post('/new', (req, res) => {
    const {
        name,
        description
    } = req.body;

    res.status(201).json({
       message: `Place ${name} is successfully created`
    })
});

module.exports = router;