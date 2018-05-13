var express = require('express');
var router  = express.Router();
var ctrlMedia = require('../controllers/media');
// var googleModel = require('controllers/google')

//media
router.get('/media/show', ctrlMedia.mediaShowAll);
router.post('/media/add/', ctrlMedia.mediaAdd);

router.get('/media/search/:ISBN', ctrlMedia.googleAPI);
router.get ('/media/search/', ctrlMedia.googleAPI);
router.post('/media/search/', ctrlMedia.mediaBulkAdd);

router.delete('/media/show/:ISBN',ctrlMedia.mediaDelete);
router.put('/media/add/:ISBN',ctrlMedia.mediaUpdate);

//google
// router.get('/google')

module.exports = router;