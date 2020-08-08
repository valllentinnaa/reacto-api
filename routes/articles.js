const { Router } = require('express');
const Article = require('../models/article');

const router = Router();


router.get('/all', async (req, res) => {
    const articles = await Article.find().lean();

    res.status(200).json({
        articles
    });
});

router.post('/new', async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body;

    const article = new Article({
        name,
        description,
        imageUrl
    });

    await article.save();

    res.status(201).json({
        message: `Article ${name} is successfully created`
    })
});

router.delete('/delete/:articleId', async (req, res) => {
    const id = req.params.articleId;

    await Article.findByIdAndDelete(id);

    res.status(200).json({
        message: "The article was successfully deleted"
    });
});

router.patch('/edit/:articleId', async (req, res) => {
    const id = req.params.articleId;

    const {
        name,
        description,
        imageUrl
    } = req.body;

    const newData = {};

    name && (newData.name = name);
    description && (newData.description = description);
    imageUrl && (newData.imageUrl = imageUrl);

    await Article.findByIdAndUpdate(id, newData);

    res.status(200).json({
        message: "The article was successfully edited."
    });
});

module.exports = router;