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
	renderPopulateMedia;

}

/*GET 'addMedia' page*/
var renderAddMedia = function(req, res, body) {
		res.render('media-add',{
			title: 'Add Media',
			pageHeader: {title: 'Add new books via ISBN'},
			author: body
	});
}



module.exports.addMedia = function(req,res, body){

	renderAddMedia(req, res, body);
}

module.exports.doAddBulk = function(req, res){
    let requestOptions, path, entry, postdata;
    path = "/api/media/search/";
    postdata = {
        isbn: req.body.text
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
	

//POST book to database
module.exports.doAddMedia = function(req, res){
	let requestOptions, path, postdata;
	ISBN = req.query.ISBN;
	path = "/api/media/add/";
		postdata = {
			isbn: req.body.ISBN,
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
var renderMediaSearch = function (req, res, bodyContent) {
	// res.redirect('https://www.googleapis.com/books/v1/volumes?q=isbn:'+ req.params.ISBN);

	res.render('media-search',{
		title: 'Search Books by ISBN',
		pageHeader: {title: 'Show description by isbn'},
		author: bodyContent
	});
};

module.exports.searchMedia = function(req, res){
    renderMediaSearch(req, res);
}


module.exports.doSearchMedia = function(req,res) {
    var requestOptions, path, ISBN;
    ISBN = req.body.ISBN;
    path = '/api/media/add?ISBN='+ISBN;


    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: true,
		qs: {ISBN: ISBN}
    };
    request(
        requestOptions,
        function (err, response, body) {
            renderAddMedia(req, res, body);
        });
};



//     requestOptions = {
//     	url : apiOptions.google+"9781451648546",
//     	method : "GET",
//     	json : true
//     };
//     request(
//     	requestOptions,
//     	function(err, response, body) {
//     		if (response.statusCode === 200){
//     			var myjson = JSON.stringify(body);
//                    // myjson.author = body.items.volumeInfo;
//     		}
//     		// renderMediaSearch(req,res);
// 			res.render('media-search', {
// 				title: 'Find books by ISBN number',
// 				pageHeader:{
// 					title: 'Show description from google API'
// 				},
// 				textobj: myjson
//
// 			});
// 		});
// };