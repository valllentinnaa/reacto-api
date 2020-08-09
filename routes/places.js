const { Router } = require('express');
const Place = require('../models/place');
const {authenticate} = require('../utils/auth');

const router = Router();

router.get('/all', async (req, res) => {
    const places = await Place.find().lean();

    res.status(200).json({
        places
    });
});

router.post('/new', authenticate, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const place = new Place({
        name,
        description,
        imageUrl
    });

    await place.save();

    res.status(201).json({
        message: `Place ${name} is successfully created`
    })
});


router.delete('/delete/:placeId', authenticate, async (req, res) => {
    const id = req.params.placeId;

    await Place.findByIdAndDelete(id);

    res.status(200).json({
        message: "The place was successfully deleted"
    });
});

router.patch('/edit/:placeId', authenticate, async (req, res) => {
    const id = req.params.placeId;

    const {
        name,
        description,
        imageUrl
    } = req.body;

    const newData = {};

    name && (newData.name = name);
    description && (newData.description = description);
    imageUrl && (newData.imageUrl = imageUrl);

    await Place.findByIdAndUpdate(id, newData);

    res.status(200).json({
        message: "The place was successfully edited."
    });
});


module.exports = router;