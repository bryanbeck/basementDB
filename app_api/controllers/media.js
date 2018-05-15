var mongoose = require('mongoose');
var Med = mongoose.model('Media');
var request = require("request");

var sendJsonResponse = function(res,status, content) {
	res.status(status);
	res.json(content);
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
		isbn: req.body.ISBN
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

module.exports.mediaBulkAdd = function(req, res) {
    console.log(req.body);
    Med.insertOne({
        jsonObject: req.body.jsonOBJ
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
	
module.exports.googleAPI = function (req, res) {
	var myjson;
	console.log(req.body);

	var ISBN = req.params.ISBN;
	var URL = "https://www.googleapis.com/books/v1/volumes?q=isbn:9781451648546";

		requestOptions = {
		url : URL,
		method : "GET",
		json : true
	};
	request(
		requestOptions,
		function(err, response, body) {
			if (response.statusCode === 200){
				myjson = JSON.stringify(body);
				res.send(myjson);
				//cb.json(body)
			}

		});
};

// ignore below this line for now

module.exports.mediaSearch = function (req, res) {
	if(req.params && req.params.mediaid) {
		Med
		 .findById(req.params.ISBN)
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