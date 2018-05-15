var express = require('express');
var router = express.Router();
// var ctrlMain = require('../controllers/main');
var ctrlMedia = require('../controllers/media');
var ctrlOthers = require('../controllers/others');

// /* GET home page. */
// router.get('/', ctrlMain.index);

/* media pages */
router.get('/', ctrlMedia.home);
router.get('/media/one/:mediaid',ctrlMedia.collections); // shows detials of media
router.get('/media/one/:mediaid',ctrlMedia.delete);
router.get('/media/add', ctrlMedia.addMedia); //add media to collections
router.post('/media/add/', ctrlMedia.doAddMedia);
router.get('/media/search/:ISBN/update', ctrlMedia.updateMedia)
router.put('/media/search/:ISBN/update', ctrlMedia.doUpdateMedia);
router.get('/media/show',ctrlMedia.showMedia); // shows specific media
router.get('/media/search/',ctrlMedia.searchMedia); 
router.get('/media/search/:mediaid',ctrlMedia.searchMedia); // searches whole database


/* Other pages */
router.get('/about', ctrlOthers.about); //shows the about page 
 
module.exports = router;
