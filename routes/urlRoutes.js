const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

router.get('/', urlController.renderHome);
router.post('/shorten', urlController.createShortUrl);
router.get('/:shortId', urlController.redirectToOriginal);
// Authentication


module.exports = router;
