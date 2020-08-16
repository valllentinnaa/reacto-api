const models = require('../models');

module.exports = {
    get: (req, res, next) => {
        const length = req.query.length ? parseInt(req.query.length) : 20;
        models.Article.find().sort('-created_at').limit(length).populate('author')
            .then((articles) => res.send(articles))
            .catch(next);
    },

    post: (req, res, next) => {
        const { name } = req.body;
        const { description } = req.body;
        const { imageUrl } = req.body;
        const { _id } = req.user;

        models.Article.create({ name, description, imageUrl, author: _id })
            .then((createdArticle) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { posts: createdArticle } }),
                    models.Article.findOne({ _id: createdArticle._id })
                ]);
            })
            .then(([modifiedObj, articleObj]) => {
                res.send(articleObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { name } = req.body;
        const { description } = req.body;
        const { imageUrl } = req.body;

        models.Origami.updateOne({ _id: id },{name}, { description }, {imageUrl})
            .then((updatedArticle) => res.send(updatedArticle))
            .catch(next)
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        models.Article.deleteOne({ _id: id })
            .then((removedArticle) => res.send(removedArticle))
            .catch(next)
    }
};