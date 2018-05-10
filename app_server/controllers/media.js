var request =  require('request');
var apiOptions = {
	server : "http://localhost:3000",
	google : "https://www.googleapis.com/books/v1/volumes?q=isbn:"
};
	if (process.env.NODE_ENV === 'production'){
		apiOptions.server = "https://murmuring-sands-70518.herokuapp.com/"
	}

/*GET 'Home' page*/
module.exports.home = function(req,res){
	res.render('media-home', {
		title: 'MongoDB',
		pageHeader: {
			title: 'A database using noSQL with monogoDB',
		},
		sidebar:"This database has been created to store books from my library, the goal is to store all books in the library without having to enter in any information besides ISBN.",
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
			subheading: 'Add new books by ISBN number'
		},
		{
			hyperlink: '/media/search',
			title: 'Search the database by ISBN',
			description:'Search for media within collection',
			types:['Search By:','ISBN'],
			subheading: 'Criteria Based Search'
		}]
	});
};

var renderPopulateMedia = function(req,res, responseBody){
	res.render('media-populate',{
		title: 'Populate Media data',
		pageHeader: {title: 'Populate Media data to be passed to MongoDB'}

	});
}

module.exports.loadPopulate = function(req, res){
	var requestOptions, path;
	path ='/media/add/' + req.params.ISBN+'/populate';
	requestOptions ={
		url : apiOptions.server + path,
		method : "GET",
		json : true,
		qs : {},
	};
	request(
		requestOptions,
		function(err, response, body) {
			renderPopulateMedia(req, res, body);
		}
	);
};

module.exports.populateMedia = function(req, res){
	res.redirect('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ req.params.ISBN);

}

/*GET 'addMedia' page*/
var renderAddMedia = function(req, res) {
		res.render('media-add',{
			title: 'Add Media',
			pageHeader: {title: 'Add new books via ISBN'}
	});
}



module.exports.addMedia = function(req,res){

	renderAddMedia(req, res);
}


	

//POST book to database
module.exports.doAddMedia = function(req, res){
	var requestOptions, path, entry, postdata;
	path = "/api/media/add/";
	entry = req.body.ISBN+'/populate';
		postdata = {
			isbn: req.body.ISBN,
			image: req.body.img,
			author: req.body.author,
			description: req.body.desc,
			publishdate: req.body.pubDate,
			title: req.body.bookname
		 };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata) {
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
	// res.redirect('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ req.params.ISBN);

	res.render('media-search',{
		title: 'Search Books by ISBN',
		pageHeader: {title: 'Show description by ISBN'},
		collections: {
			type: mediaD,
			mediaTypes: {
			}
		},
		medias: mediaD
	});
};


module.exports.searchMedia = function(req,res){
	var requestOptions, path, entry, url;

	entry = req.body.title;
	url = apiOptions.google + '9781617292033';


	
	path = "/api/media/search/" + req.params.ISBN;
	requestOptions = {
		url : url,
		method : "GET",
		json : true
	};
	request(
		requestOptions,
		function(err, response, body) {
			if (response.statusCode === 200){
				res.send(body)
			}
			renderMediaSearch(req, res, body);
			}
		);
};

