var request =  require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
	if (process.env.NODE_ENV === 'production'){
		apiOptions.server = "https://murmuring-sands-70518.herokuapp.com/"
	}

/*GET 'Home' page*/
module.exports.home = function(req,res){
	res.render('media-home', {
		title: 'NOSQLDB - Store & Catalog your Books',
		pageHeader: {
			title: 'NOSQLDB',
			strapline: 'An exercise in NOSQL '
		},
		sidebar:"Track your whole collection of books & easily view it here! More media types to come soon",
		navigations: [{
			hyperlink: '/media/show',
			title: 'Click to display all items in collection',
			description:'A list view of all items',
			types:'',
			subheading: 'View All!'
		},
		{
			hyperlink: '/media/add',
			title: 'Click to add new media',
			description:'Add new media to the collection',
			types:'+',
			subheading: 'Add new!'
		},
		{
			hyperlink: '/media/search',
			title: 'Search the database',
			description:'Search for media within collection',
			types:['Seach By:','Type','Year'],
			subheading: 'Criteria Based Search'
		}]
	});
};

/*GET 'Collections' page*/
var renderDelete = function(req, res){
	res.render('media-erase',{
		title: "item has been removed from db"
		});
	console.log("item deleted");
}

var renderMediaCollection = function (req, res, mediaD) {
	res.render('media-collection', {
		title: 'view item',
		pageHeader: {title: 'Media Item'},
		sidebar: {
			context: 'Output from search function displays here',
			callToAction: 'Detailed view'
		},
		textadd: "View Specific items from the collection",
		collections: {
			type: mediaD.title,
			mediaTypes: {
				mediaPublisher: mediaD.publisher,
				mediaArtist: mediaD.artist,
				mediaType: mediaD.mediaType,
				mediaDateAdded: mediaD.dateAdded,
				mediaGenre: mediaD.genre,
				mediaYear: mediaD.year,
				mediaNotes: mediaD.notes
			}
		},
		medias: mediaD
		});
};

module.exports.delete = function(req,res){
	var requestOptions, path;
	path = "/api/media/one/" + req.params.mediaid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "delete",
		json : {},
		qs : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			renderDelete(req, res);
			}
		);
	
};

module.exports.collections = function(req,res){
    var requestOptions, path;
    path = "/api/media/one/" + req.params.mediaid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "get",
        json : {},
        qs : {}
    };
    request(
        requestOptions,
        function(err, response, body) {
            renderMediaCollection(req, res, body);
        }
    );

};

/*GET 'addMedia' page*/
var renderAddMedia = function(req, res) {
		res.render('media-add',{
		title: 'Add Media',
		pageHeader: {title: 'Add new Media'}
	});
}

module.exports.addMedia = function(req,res){
	renderAddMedia(req, res);
};
//POST add review page
module.exports.doAddMedia = function(req, res){
	var requestOptions, path,mediaid, postdata;
	mediaid = req.params.mediaid;
	path = "/api/media/add";
		postdata = {
		    mediaType: req.body.mediaType,
		    artist: req.body.artist,
		    title: req.body.title,
		    publisher: req.body.publisher,
		    genre: req.body.genre,
		    notes: req.body.notes,
		    year: req.body.year,
		    dateAdded: req.body.dateAdded,
			isbn: req.body.isbn,
			thumbnail: req.body.thumbnail
		  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.artist || !postdata.title || !postdata.mediaType) {
    res.redirect('/media/add');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
         res.redirect('/media/show');
        } else {
          console.log(body);
         // _showError(req, res, response.statusCode);
        }
      }
    );
}
};

var renderUpdateMedia = function(req, res){
    res.render('update',{
        title: 'update Media by _id',
        pageHeader: {title: 'Add new Media'}
    });
};

module.exports.updateMedia = function(req, res){
	renderUpdateMedia(req, res);
};

module.exports.doUpdateMedia = function(req, res){
	let requestOptions, path,mediaid, postdata;
    mediaid = req.body.title;
    path = "/api/media/search/"+mediaid/update;
    postdata = {
        mediaType: req.body.mediaType,
        artist: req.body.artist,
        title: req.body.title,
        publisher: req.body.publisher,
        genre: req.body.genre,
        notes: req.body.notes,
        year: req.body.year,
        dateAdded: req.body.dateAdded,
        isbn: req.body.isbn,
        thumbnail: req.body.thumbnail
    };
    requestOptions = {
        url : apiOptions.server + path,
        method : "PUT",
        json : postdata
    };
    if (!postdata.artist || !postdata.title || !postdata.mediaType) {
        res.redirect('/media/add');
    } else {
        request(
            requestOptions,
            function(err, response, body) {
                if (response.statusCode === 201) {
                    res.redirect('/media/show');
                } else {
                    console.log(body);
                    //_showError(req, res, response.statusCode);
                }
            }
        );
    }
};


/*GET 'showMedia' page*/
var renderShowMedia = function (req, res, responseBody) {

	res.render('media-show',{
		title: 'Show All Media',
		pageHeader: {
			title: 'Show All',
			strapline: 'Show all media in basementDB'
		},
		sidebar: 'Every item currently stored in basementDB',
		medias: responseBody
	});
};

module.exports.showMedia = function(req,res){
	var requestOptions, path;
	path ='/api/media/show';
	requestOptions ={
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {},
	};
	request(
		requestOptions,
		function(err, response, body) {
			renderShowMedia(req, res, body);
		}
	);
};

/*GET 'searchMedia' page*/
var renderMediaSearch = function (req, res, mediaD) {
	res.render('media-search',{
		title: 'Search Media',
		pageHeader: {title: 'Search by ID'},
		collections: {
			type: mediaD.title,
			mediaTypes: {
				mediaPublisher: mediaD.publisher,
				mediaArtist: mediaD.artist,
				mediaType: mediaD.mediaType,
				mediaDateAdded: mediaD.dateAdded,
				mediaGenre: mediaD.genre,
				mediaYear: mediaD.year,
				mediaNotes: mediaD.notes
			}
		},
		medias: mediaD
	});
};


module.exports.searchMedia = function(req,res){
	var requestOptions, path, entry;
	entry = req.body.title;
	path = "/api/media/search/" + entry;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {title : req.body.title},
		qs : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			renderMediaSearch(req, res, body);
			}
		);
};