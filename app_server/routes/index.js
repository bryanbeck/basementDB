var express = require('express');
var router = express.Router();
// var ctrlMain = require('../controllers/main');
var ctrlMedia = require('../controllers/media');
var ctrlOthers = require('../controllers/others');

// /* GET home page. */
// router.get('/', ctrlMain.index);

/* media pages */
router.get('/', ctrlMedia.home);
router.get('/media',ctrlMedia.collections); // shows media colletions 
router.get('/media/add', ctrlMedia.addMedia); //add media to collections
router.get('/media/show',ctrlMedia.showMedia); // shows specific media
router.get('/media/search',ctrlMedia.searchMedia); // searches whole database

/* Other pages */
router.get('/about', ctrlOthers.about); //shows the about page 
 
module.exports = router;
