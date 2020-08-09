const Article = require('../models/article');

const getArticle = async(id) => {
    const article = await Article.findById(id).lean();

    return article;
};

const getArticles = async(id) => {
    const articles = await Article.find().lean();

    return articles;
};

module.exports = {
    getArticle,
    getArticles
};