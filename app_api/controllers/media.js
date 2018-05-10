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
		image: req.body.img,
		author: req.body.author,
		description: req.body.desc,
		publishdate: req.body.pubDate,
		title: req.body.bookname
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