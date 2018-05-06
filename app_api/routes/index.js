var express = require('express');
var router  = express.Router();
var ctrlMedia = require('../controllers/media')

//media
router.get('/media/one/:ISBN', ctrlMedia.mediaByType);
router.get('/media/show', ctrlMedia.mediaShowAll);
router.post('/media/add', ctrlMedia.mediaAdd)
router.get('/media/search/:ISBN', ctrlMedia.mediaSearch);
router.delete('/media/show/:ISBN',ctrlMedia.mediaDelete);
router.put('/media/add/:ISBN',ctrlMedia.mediaUpdate);


module.exports = router;