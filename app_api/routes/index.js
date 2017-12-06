var express = require('express');
var router  = express.Router();
var ctrlMedia = require('../controllers/media')

//media
router.get('/media/one/:mediaid', ctrlMedia.mediaByType);
router.get('/media/show', ctrlMedia.mediaShowAll);
router.post('/media/add', ctrlMedia.mediaAdd)
router.get('/media/search/:mediaid', ctrlMedia.mediaSearch);
router.delete('/media/show/:mediaid',ctrlMedia.mediaDelete);
router.put('/media/add/:mediaid',ctrlMedia.mediaUpdate);


module.exports = router;