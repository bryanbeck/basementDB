var express = require('express');
var router  = express.Router();
var ctrlMedia = require('../controllers/media')
// var googleModel = require('controllers/google')

//media
router.get('/media/show', ctrlMedia.mediaShowAll);
router.post('/media/add/:ISBN/populate', ctrlMedia.mediaAdd);
// router.get('/media/add/:ISBN', ctrlMedia.mediaLookup);
router.post('/media/search/', ctrlMedia.mediaAdd);
router.delete('/media/show/:ISBN',ctrlMedia.mediaDelete);
router.put('/media/add/:ISBN',ctrlMedia.mediaUpdate);

//google
// router.get('/google')



module.exports = router;