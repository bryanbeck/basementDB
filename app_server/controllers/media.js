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

/*GET 'Collections' page*/
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
//add media via isbn 
module.exports.collections = function(req,res){
	var requestOptions, path;
	path = req.params.mediaid;
	requestOptions = {
		url : apiOptions.google + path,
		method : "GET",
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

function getBookDetails(isbninput) {
	var isbn = document.getElementById(isbninput).value; //"9781451648546"; // Steve Jobs book 
	var url = "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn;
	$.getJSON(url, displayBooks);
	function displayBooks(data) {
	// Start off by defining a variable called htmlString
	var htmlString = "<div>";
	// For each of the JSON API results... 
	$.each(data.items, function (i, item) {
	// Add some HTML with CSS
		htmlString += '<div class="col-xs-3">';
		// Build up the HTML using the data from the API
		htmlString += '<img src="' + item.volumeInfo.imageLinks.thumbnail + '" alt="' + item.id + '" title="' + item.id + '", class ="img-thumbnail img-responsive"/><br/>';
		htmlString += '<strong class="small">Pub: ' + item.volumeInfo.publishedDate + '</strong></div>';
		htmlString += '<div class="col-xs-9"><h1>' + item.volumeInfo.title + '</h1>';
		$.each(item.volumeInfo.authors, function (i, author) {
			htmlString += '<p class="bg-info"><i>' + author + '</i></p>';
			});
			htmlString += '<p class="small">' + item.volumeInfo.description + '</p>';
			//htmlString += '<p class="well small">Extract: "' + item.searchInfo.textSnippet + '"<a href="' + item.accessInfo.webReaderLink + '" target="_blank"> Read more</a></p>';
			htmlString += '</div>';
			});
		// And then wherever there's a div with an ID of 'book' in the HTML, replace it with our htmlString. See over on the right for the results!     
		$('#book').html(htmlString + "</div>");
		}
		//alert(url);
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



};

//POST add review page
module.exports.doAddMedia = function(req, res){
	var requestOptions, path,mediaid, postdata;
	mediaisbn = req.params.mediaisbn;

	getBookDetails(mediaisbn);

	path = "/api/media/add";
		postdata = {

			
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
         // _showError(req, res, response.statusCode);
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
//post
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
		title: 'Search Books by ISBN',
		pageHeader: {title: 'Show description by ISBN'},
		collections: {
			type: mediaD.ISBN,
			mediaTypes: {
				mediaISBN: mediaD.ISBN
			}
		},
		medias: mediaD
	});
};


module.exports.searchMedia = function(req,res){
	var requestOptions, path, entry;
	entry = req.body.title;
	path = "/api/media/search/" + req.params.mediaid;
	requestOptions = {
		url : apiOptions.server + entry,
		method : "GET",
		json : {},
		qs : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			renderMediaSearch(req, res, body);
			}
		);
};