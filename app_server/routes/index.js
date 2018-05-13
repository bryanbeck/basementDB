var express = require('express');
var router = express.Router();
// var ctrlMain = require('../controllers/main');
var ctrlMedia = require('../controllers/media.js');
var ctrlOthers = require('../controllers/others.js');


/* media pages */
router.get('/', ctrlMedia.home);
router.get('/media/add', ctrlMedia.addMedia); //add media to collections
router.post('/media/add/', ctrlMedia.doAddMedia);

//router.get('/media/add/:ISBN/', ctrlMedia.doAddMedia)
//router.get('/media/add/:ISBN/populate', ctrlMedia.doAddMedia)

router.get('/media/show',ctrlMedia.showMedia); // shows specific media

router.get('/media/search/', ctrlMedia.searchMedia);
router.get('/media/search', ctrlMedia.doSearchMedia);

router.post('/media/search/', ctrlMedia.doAddBulk)
router.get('/media/search/:ISBN/populate', ctrlMedia.populateMedia)
router.get('/media/search/:ISBN', ctrlMedia.doSearchMedia)
//router.get('/media/search/:ISBN', ctrlMedia.searchMedia);
/* Other pages */
router.get('/about', ctrlOthers.about); //shows the about page 
 
module.exports = router;
