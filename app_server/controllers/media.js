/*GET 'Home' page*/
module.exports.home = function(req,res){
	res.render('media-home', {title: 'Home'});
};

/*GET 'Collections' page*/
module.exports.collections = function(req,res){
	res.render('media-collection', {title: 'Collections'});
};

/*GET 'addMedia' page*/
module.exports.addMedia = function(req,res){
	res.render('media-add', {title: 'Add Media'});
};

/*GET 'showMedia' page*/
module.exports.showMedia = function(req,res){
	res.render('media-show', {title: 'Show Media'});
};

/*GET 'searchMedia' page*/
module.exports.searchMedia = function(req,res){
	res.render('media-search', {title: 'Search Media'});
};