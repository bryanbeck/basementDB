var express = require('express');
var router  = express.Router();
var ctrlMedia = require('../controllers/media')

//media
//router.get('/media/one/:ISBN', ctrlMedia.mediaByType);
//router.get('/media/show', ctrlMedia.mediaShowAll);
router.post('/media/add/:ISBN', ctrlMedia.mediaAdd);
//router.post('/media/add/:ISBN', ctrlMedia.google);
//router.post('/media/search/', ctrlMedia.mediaAdd);
//router.delete('/media/show/:ISBN',ctrlMedia.mediaDelete);
//router.get('/media/add/:ISBN',ctrlMedia.mediaUpdate);



module.exports = router;