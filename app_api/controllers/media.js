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


module.exports.mediaAdd = function(req, res) {
	console.log(req.body);
	Med.create({
		mediaType: req.body.mediaType,
		title: req.body.title,
		artist: req.body.artist,
		publisher: req.body.publisher,
		dateAdded: req.body.dateAdded,
		genre: req.body.genre,
		year: req.body.year,
		notes: req.body.notes,
        isbn: req.body.isbn,
		thumbnail: req.body.thumbnail
	}, function(err, medias) {
			if (err) {
				console.log(err);
				sendJsonResponse(res, 400, err);
			} else {
				console.log(medias);
				sendJsonResponse(res, 201, medias);
			}
		});
};

module.exports.mediaSearch = function (req, res) {
	if(req.params && req.params.title) {
		Med
		 .findById(req.query.title)
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