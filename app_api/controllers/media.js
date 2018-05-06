var mongoose = require('mongoose');
var Med = mongoose.model('Media');

var sendJsonResponse = function(res,status, content) {
	res.status(status);
	res.json(content);
};



module.exports.mediaByType = function (req, res) {
	if(req.params && req.params.mediaid) {
		Med
		 .findById(req.params.mediaid)
		 .exec(function(err, medias){
			if (!medias){
				sendJsonResponse(res, 404, {
					"message": "mediaid not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, medias);
		});	
	} else {
		sendJsonResponse(res, 404, {
			"message": "No mediaid in request"
		});
	}
	
};

module.exports.mediaShowAll = function (req, res) {
	Med
		.find()
		.exec(function(err,medias){
			sendJsonResponse(res, 200, medias);
		});	
};


module.exports.mediaAdd = function() {

	console.log(req.body);
	Med.create({
		ISBN: req.body.ISBN
	}, function(err, medias) {
	  function getBookDetails(isbn) {
		var isbn = document.getElementById("isbnID").value; //"9781451648546"; // Steve Jobs book 
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
  
  }

})
  
};

// 			if (err) {
// 				console.log(err);
// 				sendJsonResponse(res, 400, err);
// 			} else {
// 				console.log(medias);
// 				sendJsonResponse(res, 201, medias);
// 			}
// 		});
// };

module.exports.mediaSearch = function (req, res) {
	if(req.params && req.params.mediaid) {
		Med
		 .findById(req.params.mediaid)
		 .exec(function(err, medias){
			if (!medias){
				sendJsonResponse(res, 404, {
					"message": "mediaid not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, medias);
		});	
	} else {
		sendJsonResponse(res, 404, {
			"message": "No mediaid in request"
		});
	}
	
};

module.exports.mediaDelete = function (req, res) {
	var mediaid = req.params.mediaid;
	if (mediaid) {
		Med
		.findByIdAndRemove(mediaid)
		.exec(
			function(err, medias) {
				if (err) {
					console.log(err);
					sendJsonResponse(res, 404, err);
					return;
				}
				console.log("Media id " + mediaid + " deleted");
				sendJsonResponse(res, 204, null);
			}
		);
	} else {
		sendJSONresponse(res, 404, {
			"message": "No mediaid"
		});
}
};

module.exports.mediaUpdate = function (req, res) {
  if (!req.params.mediaid) {
    sendJsonResponse(res, 404, {
      "message": "Not found, mediaid is required"
    });
    return;
  }
  Med
    .findById(req.params.mediaid)
    .select('-dateAdded')
    .exec(
      function(err, medias) {
        if (!medias) {
          sendJsonResponse(res, 404, {
            "message": "mediaid found"
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }
        medias.mediaType = req.body.mediaType;
        medias.name = req.body.name;
        medias.artist = req.body.artist;
        medias.title = req.body.title;
        medias.publisher = req.body.publisher;
        medias.genre = req.body.genre;
        medias.year = req.body.year;
        medias.notes = req.body.notes;
        medias.save(function(err, medias) {
          if (err) {
            sendJsonResponse(res, 404, err);
          } else {
            sendJsonResponse(res, 200, medias);
          }
        });
      }
  );
};