const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.articles.get);

router.post('/', auth(), controllers.articles.post);

router.put('/:id', auth(), controllers.articles.put);

router.delete('/:id', auth(), controllers.articles.delete);

module.exports = router;